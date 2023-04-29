import React from 'react';
import moment from 'moment';
import { SimpleCard } from 'app/components';
// **  1..for loader - CircularProgress--> not use in submit fun
import { MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Icon, Box } from '@mui/material';
import { Span } from 'app/components/Typography';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  // **  3..for loader - CircularProgress
  const [loading, setLoading] = useState(true)
  // ----------DB FETCH-----------------------------
  const [expiryDate, setExpiryDate] = useState([]);
  const fetchData1 = async () => {
    // **  4..for loader - CircularProgress
    setLoading(true)
    await fetch('http://localhost:4000/member-registration')
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log('inside data subject date record', data.response);
        // **  4..for loader - CircularProgress
        setLoading(false)
        setExpiryDate(data.response.dates);
      });
    // **  4..for loader - CircularProgress
    setLoading(false)
  };
  // console.log('expiryDate', expiryDate);
  useEffect(() => {
    fetchData1();
  }, []);

  // .......................................................
  const [submitData, setSubmitData] = useState([]);
  const fetchSubmitData = async () => {
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
        .then((data) => {
          console.log('Get SUBMIT data', data);

          setSubmitData(data);
          // setRegRecord(data);
        });
    } catch (error) {
      console.log('error', error)
    }

  };
  console.log('submitData---', submitData)
  useEffect(() => {
    // fetchSubmitData();
  }, []);



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
  };

  // **  2..for loader - CircularProgress than set it in multiple fun
  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="0px">

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
                    {expiryDate?.map((eDate, i) => (
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
      <br />
      <br />
      <br />
      <br />
      <Box display="flex" justifyContent="space-evenly" sx={{ width: "100%", height: "400px" }}>
        <Box>
          Total Registration
          <br />
          <br />
          <Button
            variant="outlined" color="primary"
            sx={{ width: 150 }}
          // onClick={() => navigate('/filter/TotalRegistrationDetails', { state: regRecord.totalReg })}
          // onClick={() => { (total_reg.length > 0) ? navigate('/filter/TotalRegistrationDetails', { state: total_reg }) : alert("change pattern!") }}
          >
            {'-'}
            {/* {regRecord ? regRecord.totalReg.length : "-"} */}
          </Button>
        </Box>

        <Box>
          Total Competition
          <br />
          <br />
          <Button variant="outlined" color="primary" sx={{ width: 150 }}
          // onClick={() => navigate('/filter/TotalCompetitionDetails', { state: regRecord.totalComp })}
          // onClick={() => { total_comp.length > 0 ? navigate('/filter/TotalCompetitionDetails', { state: total_comp }) : alert('no data found check your details') }}
          >
            {'-'}
            {/* {regRecord ? regRecord.totalComp.length : "-"} */}
          </Button>
        </Box>
      </Box >
    </>
  );
}
