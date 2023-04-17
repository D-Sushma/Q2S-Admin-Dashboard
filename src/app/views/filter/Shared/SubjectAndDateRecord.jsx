import React from 'react';
import moment from 'moment';
import { SimpleCard } from 'app/components';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Icon, Box } from '@mui/material';
import { Span } from 'app/components/Typography';
import ItemStore from '../../../utils/store';

const options = [
  {
    label: 'GK - 13',
    value: 13,
  },
  {
    label: 'ENGLISH - 6',
    value: 6,
  },
];

export default function SubjectAndDateRecord({ setRegRecord }) {
  //step B----->
  const addExpiryDate = ItemStore((state) => state.addExpiryDate)
  // ----------DB FETCH-----------------------------
  // const [expiryDate, setExpiryDate] = useState([]);
  const fetchData1 = async () => {
    await fetch('http://localhost:4000/member-registration')
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log('inside data subject date record', data.response);
        //step C----->
        await addExpiryDate({ 'expiry_date': data.response.dates });
        // setExpiryDate(data.response.dates);
      });
  };
  // console.log('expiryDate', expiryDate);
  useEffect(() => {
    fetchData1();
  }, []);

  //step D ----->
  const { expiryDate } = ItemStore();
  console.log('expiryDate========>>>', expiryDate);
  // .......................................................
  // const [submitData, setSubmitData] = useState([]);
  const fetchSubmitData = async () => {
    // STEP-> 6.......
    await myItems();
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        expiry_date: week_date,
        subject_id: subjectId,
      })
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log('raw', raw);
      await fetch('http://localhost:4000/submit-data', requestOptions)
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          console.log('Get SUBMIT data', data);
          // setSubmitData(data.results);
          setRegRecord(data);
          // step5-->> set dynamic total record ... go totalRecord
          await setTotalReg(data.totalReg);
          await setTotalComp(data.totalComp);
        });
    } catch (error) {
      console.log('error', error)
    }

  };
  useEffect(() => {
    // fetchSubmitData();
  }, []);

  // ** from store 2.--------------------
  // step2-->> store data that we want--------for Total Record
  const addTotalRegistration = ItemStore((state) => state.addTotalRegistration);
  const addTotalCompetition = ItemStore((state) => state.addTotalCompetition);
  // step3-->>
  const setTotalReg = async (data) => {
    // step4-->>
    await addTotalRegistration({ 'total_reg': data })
    console.log('total_reg======>>>', data)
  }

  const setTotalComp = async (data) => {
    // step4-->>
    await addTotalCompetition({ 'total_comp': data })
    console.log('total_comp=====>>>', data)
  }

  // ===============FOR SELECT OPTION IN WEEKLY RECORD======
  let [week_date, setWeek_date] = useState('');
  let [weeklyDate, setWeeklyDate] = useState('');
  const selectionChangeHandler = (event) => {
    setWeeklyDate(event.target.value);
    setWeek_date(moment(event.target.value, 'DD-MM-YYYY').format('YYYY-MM-DD'));
    // setWeek_date("2022-10-16");
    console.log('event.target.value', event.target.value, week_date, weeklyDate)

  };
  // ===============FOR SELECT OPTION IN WEEKLY RECORD======
  // let [subject_id, setSubject_id] = useState('');
  let [subjectId, setSubjectId] = useState('');
  const selectionOptionChangeHandler = (event) => {
    setSubjectId(event.target.value);
    // setSubject_id(event.target.value);
    console.log('event.target.value', event.target.value)

  };

  // ** from store 1.---------------------------------------------
  // STEP-> 2... store addItem in addItem variable-------------
  const addItem = ItemStore((state) => state.addItem);
  // STEP-> 4... 
  const myItems = () => {
    // STEP-> 5... set current updated value from select box--------
    addItem({ 'sub_id': subjectId, 'ex_date': weeklyDate })
    console.log('addItems', { 'sub_id': subjectId, 'ex_date': weeklyDate })
  }
  // STEP-> 7... set in state 
  const state = ItemStore()
  console.log('state', state.items[0])

  // STEP-> 8... -----get value-----
  const getData = () => {
    const data = state.items;
    var subId;
    var exDate;
    data?.forEach(obj => {
      console.log('obj', obj.sub_id, obj.ex_date);
      subId = obj.sub_id;
      exDate = obj.ex_date;
    });
    setSubjectId(subId);
    setWeeklyDate(exDate);
  }
  useEffect(() => {
    // fetchData1();
    getData();
  }, [])

  // const f2 = () => {
  //   if (subjectId || weeklyDate === 0) {
  //     alert("something went wrong")
  //   }
  // }

  console.log('weekly_date', weeklyDate);
  console.log('subject_id', subjectId);


  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="0px">
        {console.log("options----------------------------------", options)}
        {console.log("options----------------------------------", expiryDate[0]?.expiry_date)}

        {/* // FOR SUBJECT RECORD................................................... */}
        < SimpleCard SimpleCard title="GK/ENGLISH" >
          <Box sx={{ width: 300, height: 50, backgroundColor: "white" }}>
            <Box display="flex" border="1px solid white" justifyContent="space-evenly">
              <Box>
                <FormControl sx={{ width: 300, marginTop: 0, marginLeft: 0 }}>
                  <InputLabel sx={{ background: "white", px: 0.5 }}>Select Subject Code...</InputLabel>
                  {/* STEP-> 3.... value = subjectId goes into store */}
                  <Select value={subjectId} onChange={(e) => selectionOptionChangeHandler(e)} >
                    {options.map((option, index) => (
                      <MenuItem value={option.value} key={index}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </SimpleCard>

        {/* // FOR WEEKLY RECORD..................................................... */}
        <SimpleCard title="WEEKLY">
          <Box sx={{ width: 300, height: 50, backgroundColor: "white" }}>
            <Box display="flex" border="1px solid white" justifyContent="space-evenly">
              <Box>
                <FormControl sx={{ width: 300, marginTop: 0, marginLeft: 0 }}>
                  <InputLabel sx={{ background: "white", px: 0.5 }}>Select Weekly Date...</InputLabel>
                  {/* STEP-> 3.... value = weeklyDate goes into store */}
                  <Select value={weeklyDate} onChange={(e) => selectionChangeHandler(e)} >
                    {/* //step E -----> */}
                    {expiryDate[0]?.expiry_date?.map((eDate, i) => (
                      <MenuItem value={eDate.expiryDate} key={i}>
                        {eDate.startDate} TO {eDate.expiryDate}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </SimpleCard>

        {/* SUBMIT BUTTON ........................................................... */}
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: 100, height: 40 }}
          disabled={!subjectId || !weeklyDate}
          onClick={() => fetchSubmitData()}
        // onClick={() => { fetchSubmitData(); f2() }}

        >
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>

      </Box >
    </>
  );
}
