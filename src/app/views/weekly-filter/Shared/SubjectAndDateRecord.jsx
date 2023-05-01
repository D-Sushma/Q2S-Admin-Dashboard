import React from 'react';
import moment from 'moment';
// **  1..for loader - CircularProgress--> not use in submit fun
import { MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Icon, Box, Card, styled } from '@mui/material';
// import { convertHexToRGB } from 'app/utils/utils';
import { Span } from 'app/components/Typography';
import { useNavigate } from 'react-router-dom';

// ** card style
const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  // background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  background: '#F4F4F4',
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));
const CardTitle = styled('div')(({ subtitle }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
  marginBottom: !subtitle && '16px',
}));

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

var lastDate = [];
var totalRegData = [];
var totalCompData = [];
export default function SubjectAndDateRecord() {
  const navigate = useNavigate();
  // **  3..for loader - CircularProgress
  const [loading, setLoading] = useState(true)
  // ----------DB FETCH-----------------------------
  const [expiryDate, setExpiryDate] = useState(lastDate);
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
        lastDate = data.response.dates;
        // setExpiryDate(data.response.dates);
        setExpiryDate(lastDate);

      });
    // **  4..for loader - CircularProgress
    setLoading(false)
  };
  // console.log('expiryDate', expiryDate);
  console.log('lastDate', lastDate)
  useEffect(() => {
    fetchData1();
  }, []);

  // .......................................................
  // const [submitData, setSubmitData] = useState([]);
  const [rData, setRData] = useState(totalRegData);
  const [cData, setCData] = useState(totalCompData);

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
          // setSubmitData(data);
          totalRegData = data.totalReg
          totalCompData = data.totalComp
          // setRData(data.totalReg);
          // setCData(data.totalComp);
          setRData(totalRegData);
          setCData(totalCompData);

          console.log('totalRegData, totalCompData', totalRegData, totalCompData)
        });
    } catch (error) {
      console.log('error', error)
    }
  };
  // console.log('submitData---', submitData)
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
        < StyledCard >
          <CardTitle>GK/ENGLISH</CardTitle>
          <Box sx={{ width: 300, height: 50, backgroundColor: "white" }}>
            <Box display="flex" border="1px solid white" justifyContent="space-evenly">
              <Box>
                <FormControl sx={{ width: 300, marginTop: 0, marginLeft: 0 }}>
                  <InputLabel sx={{ background: "white", px: 0.5 }}>Select Subject Code...</InputLabel>
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
        </StyledCard>

        {/* // FOR WEEKLY RECORD..................................................... */}
        <StyledCard>
          <CardTitle>WEEKLY</CardTitle>
          <Box sx={{ width: 300, height: 50, backgroundColor: "white" }}>
            <Box display="flex" border="1px solid white" justifyContent="space-evenly">
              <Box>
                <FormControl sx={{ width: 300, marginTop: 0, marginLeft: 0 }}>
                  <InputLabel sx={{ background: "white", px: 0.5 }}>Select Weekly Date...</InputLabel>
                  <Select value={weeklyDate} onChange={(e) => selectionChangeHandler(e)} >
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
        </StyledCard>

        {/* SUBMIT BUTTON ........................................................... */}
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: 100, height: 40 }}
          disabled={!subjectId || !weeklyDate}
          onClick={() => fetchSubmitData()}
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
            // onClick={() => navigate('/filter/TotalRegistrationDetails', { state: totalRegData })}
            // onClick={() => navigate('/filter/TotalRegistrationDetails', { state: rData })}
            onClick={() => { (rData.length > 0) ? navigate('/filter/TotalRegistrationDetails', { state: totalRegData }) : alert("No record for total Registration!") }}
          >
            {rData ? rData.length : '-'}
          </Button>
        </Box>

        <Box>
          Total Competition
          <br />
          <br />
          <Button variant="outlined" color="primary" sx={{ width: 150 }}
            // onClick={() => navigate('/filter/TotalCompetitionDetails', { state: totalCompData })}
            onClick={() => { totalCompData.length > 0 ? navigate('/filter/TotalCompetitionDetails', { state: cData }) : alert('No record for total Competition!') }}
          >
            {cData ? cData.length : '-'}
          </Button>
        </Box>
      </Box >
    </>
  );
}
