const express = require("express");
var moment = require("moment");
var con = require("../connections");

const router = express.Router();

var cors = require('cors')
var app = express()

app.use(cors())

router.get('/hello', function (req, res, next) {
    res.send({ msg: 'This is CORS-enabled for all origins!' })
})

// router.get('/hello', (req, res) => {
//     res.send("hello i am ,ake the routes");
// })
router.get("/join", (req, res) => {
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
        // res.send(apiResponse({ results: results, items: items }));
        res.send({ results: results, items: items }
        );
    });
});
module.exports = router;

// const fetchJoinData = async () => {
//     // // fetch('http://localhost:4000/join')
//     // fetch('http://localhost:4000/reg/join')
//     //     .then((response) => {
//     //         // console.log(' JOIN response');
//     //         return response.json();
//     //     })
//     //     .then((data) => {
//     //         console.log('inside JOIN data inside TableData', data);
//     //         setRegMember(data.response.items);

//     //     });
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//     };

//     await fetch("http://localhost:4000/reg/hello", requestOptions)
//         .then(response => response.json())
//         .then(result => console.log('result', result))
//         .catch(error => console.log('error', error));
// };
