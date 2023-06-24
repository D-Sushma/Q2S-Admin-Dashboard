var express = require("express");
var cors = require("cors");
// =======for formatting date
var moment = require("moment");
var bodyParser = require("body-parser");

const corsOptions = {
  // origin: "http://127.0.0.1:3000",
  // Access_Control_Allow_Origin:"http://127.0.0.1:3000",
  Access_Control_Allow_Origin: "*",
};

// IMPORT==============

var con = require("./connections"); //step #1
const { query } = require("express");
const { connect } = require("./connections");

//2. we are initializing the app using the express
var app = express();
// var jsonParser = bodyParser.json()
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// --------START----------------------------------------
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// ---------------- *** START ADMIN ***   -----------------------------
app.post("/admin/login", function (req, res) {
  console.log("req.body", req.body);
  let email = req.body.email;
  let password = req.body.password;
  let query = `SELECT * FROM q2s_admin where email='${email}' and password='${password}'`;
  console.log('query', query)
  con.query(query, (error, results) => {
    if (error) throw error;
    // console.log(results);
    if (results.length === 0) {
      res.status(404).send(apiResponse("Not Found"));
    } else {
      res.send(apiResponse(results));
    }
    // res.send(apiResponse(results));
  });
});
app.get("/admin/login", function (req, res) {
  let query =
    "SELECT * FROM q2s_admin where email='admin@smartscoreanalytics.com' and password='smartscore321#'";
  con.query(query, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.send(apiResponse(results));
  });
});
app.post("/login", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  console.log("req.body", req.body);
  let query = `SELECT * FROM quiz_login where email='${email}' and pass='${password}'`;
  console.log("email,password", email, password);
  con.query(query, (err, results) => {
    if (err) throw err;
    // console.log(results);
    if (results.length === 0) {
      res.status(404).send(apiResponse("Not Found"));
    } else {
      res.send(apiResponse(results));
    }
    // res.send(apiResponse(results));
  });
});
// ---------------- *** END ADMIN ***   -----------------------------
app.post("/insert/registration", function (req, res) {
  let userid = req.body.userid;
  let subject = req.body.subject;
  let subscription = req.body.subscription;
  let status = req.body.status;
  let updated_at = req.body.updated_at;
  let created_at = req.body.created_at;
  let expiry_date = req.body.expiry_date;
  let query = `INSERT INTO competetion_registration(userid, subject, subscription, status, updated_at, created_at, expiry_date) VALUES ('${userid}', '${subject}', '${subscription}', '${status}', '${updated_at}', '${created_at}', '${expiry_date}')`;
  con.query(query, (err, rows) => {
    if (err) throw err;
    console.log(rows);
    res.send(apiResponse(rows));
  });
});

app.get("/usertabledetails", (req, res) => {
  // let sqlQuery = "SELECT * FROM employee";
  let sqlQuery = "SELECT * FROM quiz_regdetails";

  let items = [];
  let query = con.query(sqlQuery, (err, results) => {
    if (err) throw err;
    // console.log(results);
    // ** make for MUI-DATATABLES PACKAGE...
    else {
      for (let i = 0; i < results.length; i++) {
        const id = results[i].id;
        const name = results[i].name;
        const lname = results[i].lname;
        const mobile = results[i].mobile;
        const emailid = results[i].emailid;
        const status = results[i].status;
        const created_at = results[i].created_at;

        items.push({
          id: id,
          full_name: name + " " + lname,
          mobile: mobile,
          emailid: emailid,
          status: status === 1 ? "Active" : "Inactive",
          created_at: moment(created_at).format("DD/MM/YYYY"),
        });
      }
    }
    // res.send(apiResponse(results));
    res.send(apiResponse({ results: results, items: items }));
  });
});
// ``````````````` --- FILTER RECORD SECTION start--- `````````````````
app.get("/member-registration", (req, res) => {
  let query =
    "SELECT expiry_date,subject FROM competetion_registration WHERE subject = 13 OR subject =6";
  con.query(query, (err, results) => {
    if (err) throw err;
    // console.log(results);
    const result = results.reduce(
      (acc, curr) => {
        const eDate = moment(curr.expiry_date).format("DD-MM-YYYY");
        if (!acc.expiryDate.includes(eDate)) {
          acc.expiryDate.push(eDate);
          const startDate = moment(curr.expiry_date)
            .subtract(6, "days")
            .format("DD-MM-YYYY");
          acc.dates.push({ expiryDate: eDate, startDate });
        }
        if (!acc.subjectId.includes(curr.subject)) {
          acc.subjectId.push(curr.subject);
        }
        return acc;
      },
      { subjectId: [], expiryDate: [], dates: [] }
    );
    res.send(apiResponse(result));
  });
});
app.post("/submit-data", (req, res) => {
  let sub_id = req.body.subject_id;
  let ex_date = req.body.expiry_date;
  let st_date = moment(ex_date).subtract(6, "days").format("YYYY-MM-DD");
  console.log("sub_id, ex_date, st_date", sub_id, ex_date, st_date);
  // let query1 = `SELECT * FROM competetion_registration WHERE subject = "${sub_id}" AND expiry_date = "${ex_date}"`;
  // let query1 = `SELECT cr.id, cr.userid, cr.subscription, cr.status, cr.updated_at, cr.created_at, cr.expiry_date, CONCAT(q.name,' ',q.lname) AS userid_name FROM (SELECT * FROM competetion_registration WHERE subject = "${sub_id}" AND expiry_date = "${ex_date}") AS cr INNER JOIN quiz_regdetails q ON cr.userid = q.id`;
  let query1 = `SELECT cr.*, CONCAT(q.name,' ',q.lname) AS userid_name FROM (SELECT * FROM competetion_registration WHERE subject = "${sub_id}" AND expiry_date = "${ex_date}") AS cr INNER JOIN quiz_regdetails q ON cr.userid = q.id`;
  // let query2 = `SELECT * FROM competition_new_initiate WHERE subject_id = "${sub_id}" AND test_date>= "${st_date}" AND test_date<"${ex_date}"`;
  let query2 = `SELECT cni.*, q1.id AS q1_id, q2.id as q2_id, CONCAT(q1.name,' ',q1.lname) AS p1_name, CONCAT(q2.name,' ',q2.lname) AS p2_name FROM (SELECT * FROM competition_new_initiate WHERE subject_id = "${sub_id}" AND test_date>= "${st_date}" AND test_date<"${ex_date}") AS cni LEFT JOIN quiz_regdetails q1 ON cni.p1 = q1.id LEFT JOIN quiz_regdetails q2 ON cni.p2 = q2.id`;
  console.log("query1", query1);
  console.log("query2", query2);

  let totalRegItems = [];
  let totalCompItems = [];
  con.query(query1, (err, results) => {
    if (err) throw err;
    // console.log(results);
    // ** make for MUI-DATATABLES PACKAGE...(for totalReg = query1)
    else {
      // console.log(results);
      for (let i = 0; i < results.length; i++) {
        const id = results[i].id;
        const userid_name = results[i].userid_name;
        const subject = results[i].subject;
        const subscription = results[i].subscription;
        const status = results[i].status;
        const updated_at = results[i].updated_at;
        const created_at = results[i].created_at;
        const expiry_date = results[i].expiry_date;

        totalRegItems.push({
          id: id,
          userid_name: userid_name,
          subject: subject === 13 ? "GK" : subject === 6 ? "ENGLISH" : "---",
          subscription: subscription === 1 ? "Weekly" : "---",
          status: status === 1 ? "Active" : "Inactive",
          updated_at: moment(updated_at).format("DD/MM/YYYY"),
          created_at: moment(created_at).format("DD/MM/YYYY"),
          expiry_date: moment(expiry_date).format("DD/MM/YYYY"),
        });
      }
    }
    con.query(query2, (err, results2) => {
      if (err) throw err;
      // console.log(results2);
      // ** make for MUI-DATATABLES PACKAGE...(for totalComp = query2)
      else {
        // console.log(results2);
        for (let i = 0; i < results2.length; i++) {
          const id = results2[i].id;
          const p1 = results2[i].p1;
          const p2 = results2[i].p2;
          const p1_name = results2[i].p1_name;
          const p2_name = results2[i].p2_name;
          const p1_correct_count = results2[i].p1_correct_count;
          const p2_correct_count = results2[i].p2_correct_count;
          const p1_time_taken = results2[i].p1_time_taken;
          const p2_time_taken = results2[i].p2_time_taken;
          const winner_id = results2[i].winner_id;
          const slot_start = results2[i].slot_start;
          const slot_end = results2[i].slot_end;
          const is_walk_over = results2[i].is_walk_over;

          totalCompItems.push({
            id: id,
            p1_name: p1_name,
            p2_name: p2_name,
            p1: p1,
            p2: p2,
            p1_correct_count: p1_correct_count,
            p2_correct_count: p2_correct_count,
            p1_time_taken: p1_time_taken,
            p2_time_taken: p2_time_taken,
            slot_start: slot_start,
            slot_end: slot_end,
            is_walk_over: is_walk_over,
            winner_id:
              winner_id === p1 ? p1_name : winner_id === p2 ? p2_name : "---",
          });
        }
      }
      res.send({
        totalReg: results,
        totalComp: results2,
        totalRegItems: totalRegItems,
        totalCompItems: totalCompItems,
      });
    });
    // res.send(results);
  });
});
// ``````````````` --- FILTER RECORD SECTION end--- `````````````````
app.get("/registration", (req, res) => {
  let query =
    "SELECT * FROM competetion_registration WHERE (expiry_date='2022-10-23' and subject = 13)";
  con.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(apiResponse(results));
  });
});

app.get("/totalRegistration/:sId/:dateRecord", (req, res) => {
  console.log(req.params.sId, req.params.dateRecord);
  // let subjectId = req.params.sId;
  // let date = req.params.dateRecord;
  // let query = "SELECT * FROM competetion_registration WHERE (expiry_date='2022-10-23' and subject = 13)";
  // // let query = `SELECT * FROM competetion_registration WHERE (expiry_date='${date}' and subject = '${subjectId}')`;
  // con.query(query,(err, results) => {
  //   if (err) throw err;
  //   else {
  //     let subjectId = req.params.sId;
  //     let date = req.params.dateRecord;
  //     let totalRegistration = [];
  //     for (let index = 0; index < results.length; index++) {
  //       totalRegistration.push({
  //         label: date,
  //         value: subjectId,
  //       });
  //     }
  //     console.log('totalRegistration', totalRegistration)
  //     console.log('result',results);
  //     res.send(apiResponse(results));
  //   }
  // });
});

// JOIN
app.get("/join", (req, res) => {
  // console.log("put inner join");
  // let query = "SELECT quiz_regdetails.name,quiz_regdetails.lname from competetion_registration INNER JOIN quiz_regdetails WHERE competetion_registration.userid = quiz_regdetails.id";
  let query =
    "SELECT competetion_registration.id, competetion_registration.subject, competetion_registration.subscription, competetion_registration.status, competetion_registration.updated_at, competetion_registration.created_at, competetion_registration.expiry_date, quiz_regdetails.name,quiz_regdetails.lname, CONCAT(quiz_regdetails.name,' ',quiz_regdetails.lname) AS full_name from competetion_registration INNER JOIN quiz_regdetails ON competetion_registration.userid = quiz_regdetails.id";
  let items = [];
  con.query(query, (err, results) => {
    if (err) throw err;
    else {
      // console.log(results);
      // ** make for MUI-DATATABLES PACKAGE...
      for (let i = 0; i < results.length; i++) {
        const updated_at = moment(results[i].updated_at).format("DD/MM/YYYY");
        const created_at = moment(results[i].created_at).format("DD/MM/YYYY");
        const expiry_date = moment(results[i].expiry_date).format("DD/MM/YYYY");
        const id = results[i].id;
        const full_name = results[i].full_name;
        const status = results[i].status;
        const subject = results[i].subject;
        const subscription = results[i].subscription;
        items.push({
          updated: updated_at,
          created: created_at,
          expiryDate: expiry_date,
          id: id,
          full_name: full_name,
          status: status === 1 ? "Active" : "Inactive",
          subject: subject === 13 ? "GK" : "English",
          subscription: subscription === 1 ? "Weekly" : "---",
        });
      }
    }
    // res.send(apiResponse(results));
    res.send(apiResponse({ results: results, items: items }));
  });
});

app.get("/competitionlistdetails", (req, res) => {
  console.log("Competition List");
  // let query = "SELECT * FROM competition_new_initiate";
  /**** ACCESS SINGLE COLUMN IF NOT DEFINE SHORT NAME***/
  // let  query = "SELECT competition_new_initiate.id,competition_new_initiate.competition_group_id,competition_new_initiate.subject_id,competition_new_initiate.p1,competition_new_initiate.p2, competition_new_initiate.test_date,competition_new_initiate.subscription_id,competition_new_initiate.slot_start, competition_new_initiate.slot_end, quiz_regdetails.name,quiz_regdetails.lname from competition_new_initiate INNER JOIN quiz_regdetails ON competition_new_initiate.p1 = quiz_regdetails.id";
  /* ******ACCESS MULTIPLE COLUMN WITH DEFINE SHORT NAME****** */
  let query =
    "SELECT c.*, CONCAT(q1.name,' ',q1.lname) AS p1_name, CONCAT(q2.name,' ',q2.lname) AS p2_name from competition_new_initiate c INNER JOIN quiz_regdetails q1 ON c.p1 = q1.id INNER JOIN quiz_regdetails q2 ON c.p2 = q2.id";
  let items = [];
  con.query(query, (err, results) => {
    if (err) throw err;
    // console.log(results);
    else {
      // console.log(results);
      // ** make for MUI-DATATABLES PACKAGE...
      for (let i = 0; i < results.length; i++) {
        const id = results[i].id;
        const competition_group_id = results[i].competition_group_id;
        const subject = results[i].subject_id;
        const p1_name = results[i].p1_name;
        const p2_name = results[i].p2_name;
        const test_date = results[i].test_date;
        const subscription = results[i].subscription_id;
        const slot_start = results[i].slot_start;
        const slot_end = results[i].slot_end;

        items.push({
          sno: id,
          competition_group_id: competition_group_id,
          subject: subject === 13 ? "GK" : subject === 6 ? "ENGLISH" : "---",
          p1_name: p1_name,
          p2_name: p2_name,
          test_date: moment(test_date).format("DD/MM/YYYY"),
          subscription: subscription === 1 ? "Weekly" : "---",
          slot_start: slot_start,
          slot_end: slot_end,
        });
      }
    }
    // res.send(apiResponse(results));
    res.send(apiResponse({ results: results, items: items }));
  });
});

app.get("/competitiongroupdetails", (req, res) => {
  console.log("Competition group");
  // let query = "SELECT id,competition_group_id, winner_id,test_date, COUNT(competition_group_id) as grp_cnt FROM competition_new_initiate GROUP BY competition_group_id";
  //  let query = "SELECT competition_new_initiate.id,competition_new_initiate.competition_group_id, competition_new_initiate.winner_id,competition_new_initiate.test_date, COUNT(competition_group_id) AS grp_cnt, CONCAT(quiz_regdetails.name,' ',quiz_regdetails.lname) AS winner_name FROM competition_new_initiate INNER JOIN quiz_regdetails ON competition_new_initiate.winner_id = quiz_regdetails.id GROUP BY competition_group_id";
  // let query = "SELECT c.id,c.competition_group_id, c.winner_id,c.test_date, COUNT(competition_group_id) AS grp_cnt, CONCAT(q.name,' ',q.lname) AS winner_name FROM (competition_new_initiate c INNER JOIN quiz_regdetails q ON c.winner_id = q.id) GROUP BY competition_group_id";
  let query =
    "SELECT t1.id,t1.competition_group_id, t1.winner_id,t1.test_date,t1.grp_cnt,CONCAT(q.name,' ',q.lname) AS winner_name from (SELECT id,competition_group_id, winner_id,test_date, COUNT(competition_group_id) as grp_cnt FROM competition_new_initiate GROUP BY competition_group_id) AS t1 LEFT JOIN quiz_regdetails q ON t1.winner_id = q.id";
  let items = [];
  con.query(query, (err, results) => {
    if (err) throw err;
    // console.log(results);
    // ** make for MUI-DATATABLES PACKAGE...
    else {
      // console.log(results);
      for (let i = 0; i < results.length; i++) {
        const id = results[i].id;
        const competition_group_id = results[i].competition_group_id;
        const winner_name = results[i].winner_name;
        const test_date = results[i].test_date;
        const grp_cnt = results[i].grp_cnt;

        items.push({
          sno: id,
          competition_group_name: competition_group_id,
          winner_name: winner_name,
          competition_date: moment(test_date).format("DD/MM/YYYY"),
          total_competition: grp_cnt,
        });
      }
    }
    // res.send(apiResponse(results));
    res.send(apiResponse({ results: results, items: items }));
  });
});

app.get("/moredetailstable/:id", (req, res) => {
  // console.log("more details table");
  console.log(req.params.id);
  let cgId = req.params.id;
  // let query = "SELECT * FROM competition_new_initiate WHERE competition_group_id = 'CG_2022-10-14_13_1_2_5_1'"
  // let query = `SELECT * FROM competition_new_initiate WHERE competition_group_id = "${cgId}"`;
  // ===========wrong=====
  // let query = `SELECT c.*, CONCAT(q1.name,' ',q1.lname) AS p1_name, CONCAT(q2.name,' ',q2.lname) AS p2_name FROM competition_new_initiate c INNER JOIN quiz_regdetails q1 ON c.p1 = q1.id INNER JOIN quiz_regdetails q2 ON c.p2 = q2.id WHERE competition_group_id = "${cgId}"`;
  // ==========right=======
  let query = `SELECT t1.*, q1.id AS q1_id, q2.id AS q2_id, CONCAT(q1.name,' ',q1.lname) AS p1_name, CONCAT(q2.name,' ',q2.lname) AS p2_name FROM (SELECT * FROM competition_new_initiate) AS t1 LEFT JOIN quiz_regdetails q1 ON t1.p1 = q1.id LEFT JOIN  quiz_regdetails q2 ON t1.p2 = q2.id WHERE t1.competition_group_id = "${cgId}"`;
  let items = [];
  con.query(query, (err, results) => {
    if (err) throw err;
    // console.log(results);
    // ** make for MUI-DATATABLES PACKAGE...(for totalComp = query2)
    else {
      // console.log(results);
      for (let i = 0; i < results.length; i++) {
        const id = results[i].id;
        const p1 = results[i].p1;
        const p2 = results[i].p2;
        const p1_name = results[i].p1_name;
        const p2_name = results[i].p2_name;
        const p1_correct_count = results[i].p1_correct_count;
        const p2_correct_count = results[i].p2_correct_count;
        const p1_time_taken = results[i].p1_time_taken;
        const p2_time_taken = results[i].p2_time_taken;
        const winner_id = results[i].winner_id;
        const slot_start = results[i].slot_start;
        const slot_end = results[i].slot_end;
        const is_walk_over = results[i].is_walk_over;

        items.push({
          id: id,
          p1_name: p1_name,
          p2_name: p2_name,
          p1: p1,
          p2: p2,
          p1_correct_count: p1_correct_count,
          p2_correct_count: p2_correct_count,
          p1_time_taken: p1_time_taken,
          p2_time_taken: p2_time_taken,
          slot_start: slot_start,
          slot_end: slot_end,
          is_walk_over: is_walk_over,
          winner_id:
            winner_id === p1 ? p1_name : winner_id === p2 ? p2_name : "---",
        });
      }
    }
    // res.send(apiResponse(results));
    res.send({ results: results, items: items });
  });
});
// PASS DYNAMIC DATA----------------------------->>>>>>>>>>>>
app.get("/moredetailstable1/:cgId", (req, res) => {
  // console.log("more details table");
  // let query = "SELECT competition_group_id FROM competition_new_initiate WHERE competition_group_id = 'CG_2023-01-07_13_1_0_6_1'"
  // let query = "SELECT * FROM competition_new_initiate";
  let cgId = req.params.cgId;
  let query = `SELECT * FROM competition_new_initiate WHERE competition_group_id = "${cgId}"`;
  con.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(apiResponse(results));
  });
});

app.get("/subjectrecord", (req, res) => {
  console.log("record basis of subject in filter section");
  // let query = "SELECT *, COUNT(expiry_date) AS subject_record FROM `competetion_registration` WHERE subject=13";
  let query =
    "SELECT c1.*, c2.*, COUNT(c2.expiry_date) AS c2_subject_record FROM (SELECT *, COUNT(expiry_date) AS subject_record FROM `competetion_registration` WHERE subject = 13) AS c1 INNER JOIN `competetion_registration` c2 ON  c2.id WHERE c2.subject = 6";
  con.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(apiResponse(results));
  });
});

app.get("/totalrecord", (req, res) => {
  console.log(req.params.id);
  let cgId = req.params.id;
  // console.log("total record field inside filter section");
  let query = `SELECT * FROM competetion_registration WHERE expiry_date = "${trId}"`;
  // let query = "SELECT *,COUNT(subject) AS total_record FROM `competetion_registration` where expiry_date='2022-10-09' AND subject=6";
  // let query = "SELECT * FROM `competetion_registration` WHERE subject=13 AND expiry_date='2023-02-12'";
  // let query = "SELECT COUNT(subject) AS tcount FROM `competetion_registration` GROUP BY subject=13 AND expiry_date='2023-02-12'";
  con.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(apiResponse(results));
  });
});
app.get("/current-week-active-user", (req, res) => {
  let current = moment();
  let today = current.format('YYYY-MM-DD');
  let sunday = current.weekday(7);
  let comingSunday = sunday.format('YYYY-MM-DD');
  // console.log('today','comingSunday', today," ", comingSunday);
  // let query = `SELECT * FROM competetion_registration WHERE status = 1 AND expiry_date = '${comingSunday}' `;
  let query = `SELECT c.*, CONCAT(q.name,' ',q.lname) AS full_name from (SELECT * FROM competetion_registration WHERE status = 1 AND expiry_date = '${comingSunday}') AS c INNER JOIN quiz_regdetails q ON c.userid = q.id`;
  let items = [];
  con.query(query, (err, results) => {
    if (err) throw err;
    else {
      // console.log(results);
      for (let i = 0; i < results.length; i++) {
        const id = results[i].id;
        const userid = results[i].userid;
        const subject = results[i].subject;
        const subscription = results[i].subscription;
        const status = results[i].status;
        const created_at = results[i].created_at;
        const updated_at = results[i].updated_at;
        const expiry_date = results[i].expiry_date;
        const full_name = results[i].full_name;
        items.push({
          id: id, userid: userid,
          full_name: full_name,
          subject: (subject === 13) ? "GK" : "English",
          subscription: (subscription === 1) ? "Weekly" : "---",
          status: (status === 1) ? "Active" : "Inactive",
          created_at: moment(created_at).format('DD/MM/YYYY'),
          updated_at: moment(updated_at).format('DD/MM/YYYY'),
          expiry_date: moment(expiry_date).format('DD/MM/YYYY'),
        })
      }
    }
    res.send(apiResponse({ results: results, items: items }));
  });
})
app.get("/current-week-registration", (req, res) => {
  const current = moment();
  let today = current.format('YYYY-MM-DD');
  let sunday = current.weekday(7);
  let comingSunday = sunday.format('YYYY-MM-DD');
  // console.log('today','comingSunday', today," ", comingSunday);
  // let query = `SELECT * FROM competetion_registration WHERE expiry_date = '${comingSunday}'`;
  let query = `SELECT c.*, CONCAT(q.name,' ',q.lname) AS full_name from (SELECT * FROM competetion_registration WHERE expiry_date = '${comingSunday}') AS c INNER JOIN quiz_regdetails q ON c.userid = q.id`;
  let items = [];
  con.query(query, (err, results) => {
    if (err) throw err;
    else {
      // console.log(results);
      for (let i = 0; i < results.length; i++) {
        const id = results[i].id;
        const userid = results[i].userid;
        const subject = results[i].subject;
        const subscription = results[i].subscription;
        const status = results[i].status;
        const created_at = results[i].created_at;
        const updated_at = results[i].updated_at;
        const expiry_date = results[i].expiry_date;
        const full_name = results[i].full_name;
        items.push({
          id: id, userid: userid,
          full_name: full_name,
          subject: (subject === 13) ? "GK" : "English",
          subscription: (subscription === 1) ? "Weekly" : "---",
          status: (status === 1) ? "Active" : "Inactive",
          created_at: moment(created_at).format('DD/MM/YYYY'),
          updated_at: moment(updated_at).format('DD/MM/YYYY'),
          expiry_date: moment(expiry_date).format('DD/MM/YYYY'),
        })
      }
    }
    res.send(apiResponse({ results: results, items: items }));
  })
})
app.get("/current-week-competetion", (req, res) => {
  const current = moment();
  let today = current.format('YYYY-MM-DD');
  console.log(today)
  // let query = `SELECT * FROM competition_new_initiate WHERE test_date = '2023-05-26' AND is_completed = 0`;
  let query =
    `SELECT c.*, CONCAT(q1.name,' ',q1.lname) AS p1_name, CONCAT(q2.name,' ',q2.lname) AS p2_name from (SELECT * FROM competition_new_initiate WHERE test_date = '${today}' AND is_completed = 0) c INNER JOIN quiz_regdetails q1 ON c.p1 = q1.id INNER JOIN quiz_regdetails q2 ON c.p2 = q2.id`
  let items = [];
  con.query(query, (err, results) => {
    if (err) throw err;
    else {
      // console.log(results);
      for (let i = 0; i < results.length; i++) {
        const id = results[i].id;
        const competition_group_id = results[i].competition_group_id;
        const subject_id = results[i].subject_id;
        const p1_name = results[i].p1_name;
        const p2_name = results[i].p2_name;
        const test_date = results[i].test_date;
        const subscription_id = results[i].subscription_id;
        const slot_start = results[i].slot_start;
        const slot_end = results[i].slot_end;
        items.push({
          id: id, competition_group_id: competition_group_id,
          subject_id: (subject_id === 13) ? "GK" : "English",
          p1_name: p1_name, p2_name: p2_name,
          test_date: moment(test_date).format('DD/MM/YYYY'),
          subscription_id: (subscription_id === 1) ? "Weekly" : "---",
          slot_start: slot_start, slot_end: slot_end,
        })
      }
    }
    res.send(apiResponse({ results: results, items: items }));
  });
});
app.post("/leaderboard", (req, res) => {
  const today = req.body.today;
  const subId = req.body.subId;
  console.log('today', today)
  // const currentDate = moment();
  // const mon = currentDate.day(6); // Saturday
  // const mon = currentDate.weekday(1); 
  // const monday = moment(mon).format("YYYY-MM-DD")
  // console.log('monday', monday)
  // const dates = [];
  // for (let i = 0; i < 7; i++) {
  //   dates.push(currentDate.format('YYYY-MM-DD'));
  //   currentDate.add(1, 'day');
  // }
  // console.log('dates', dates)
  let query = `SELECT *,CASE WHEN p1_correct_count > p2_correct_count THEN p1_correct_count ELSE p2_correct_count END AS score FROM competition_new_initiate WHERE test_date='${today}' AND is_completed = 1 AND subject_id ='${subId}'`;
  console.log(query)
  con.query(query, (err, results) => {
    if (err) throw err;
    console.log(results)
    res.send(apiResponse(results));
  })
})

app.get("/receive-subject-id", (req, res) => {
  let query = "SELECT * FROM `project_catt` WHERE UNDER = 0";
  con.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(apiResponse(results));
  });
});
app.get("/receive-id-details", (req, res) => {
  let query = "SELECT * FROM project_catt where id in (SELECT id from project_catt where under = 13)";
  const idArray = [];
  const finalObj = {};
  con.query(query, (err, results) => {
    if (err) throw err;
    console.log(results.length);
    for (let i = 0; i < results.length; i++) {
      const idElement = results[i].id;
      const under = results[i].UNDER;
      idArray.push({
        idElement: idElement, under: under
      })
    }
    // for(let i = 0; i < idArray.length; i++ ) {
    //   Object.assign(finalObj, idArray[i]);
    // }
    const topicArray = idArray.map((obj) => {
      return obj.idElement;
    })

    const query2 = `SELECT id,name from project_catt where under IN (${topicArray})`;
    con.query(query2, (err, results2) => {
      if (err) throw err;
      console.log(results2.length);

      const subTopicArray = results2.map((obj) => {
        return obj.id;
      })
      // console.log(subTopicArray)

      const query3 = `SELECT id,name from project_catt where under IN (${subTopicArray})`;
      con.query(query3, (err, results3) => {
        if (err) throw err;
        console.log(results3.length)
        res.send(apiResponse({ results: results, results2: results2, results3: results3 }));
      })
    })
  });
});

function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}
// --------END------------------------------------------
app.listen(4000);
// app.listen(4000, () => {
//   console.log(`Example app listening on port 3000`);
// });
