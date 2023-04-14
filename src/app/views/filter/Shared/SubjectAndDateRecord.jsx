import React from 'react';
import moment from 'moment';
import { SimpleCard } from 'app/components';
// FOR SUBJECT RECORD.............................................
import { List, ListItem, ListItemText, Menu, MenuItem, Select, InputLabel, Input, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
// validation---------------BUTTON
import { Button, Icon, Box } from '@mui/material';
import { Span } from 'app/components/Typography';
import { useNavigate } from 'react-router-dom';
import ItemStore from '../../../utils/store';

// ------------------------------------
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


// style for mMenuRoot tag................................................
const MenuRoot = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
}));
export default function SubjectAndDateRecord({ setRegRecord }) {
  //step B----->
  const addExpiryDate = ItemStore((state) => state.addExpiryDate)
  // ----------DB FETCH-----------------------------
  // const [dropdownData, setdropdownData]= useState([]);
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
        // ====================<- OR ->=============================
        // const e_result = data.response.dates;
        // let expiry = [];
        // e_result.forEach((ele) => {
        //   expiry.push(ele.expiryDate);
        //   // console.log('expiry', expiry);
        // })
        // setdropdownData(expiry);
        // // dropdownData.push(expiry);
        // // console.log('dropdownData', dropdownData);
      });
  };
  // console.log('dropdownData', dropdownData);
  // console.log('expiryDate', expiryDate);
  useEffect(() => {
    fetchData1();
  }, []);

  //step D ----->
  const { expiryDate } = ItemStore();
  console.log('expiryDate========>>>', expiryDate);
  // .......................................................
  const [submitData, setSubmitData] = useState([]);
  const [regData, setRegData] = useState('')
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
          console.log('data', data)
          setRegData(data)
          // step5-->> set dynamic total record ... go totalRecord
          await setTotalReg(data.totalReg);
          await setTotalComp(data.totalComp);
          // await myItem2_r(data.totalReg)
          // await myItem2_c(data.totalComp)
        });
    } catch (error) {
      console.log('error', error)
    }

  };
  useEffect(() => {
    // fetchSubmitData();
  }, []);

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


  // --------------------for totalRecord. .......
  // const addItem1 = ItemStore((state) => state.addItem1)

  // const myItem2_r = async (data) => {
  //   addItem1({ 'reg_length': data })
  //   console.log('addItem1', { 'reg_length': data })

  //   await getData2_r();
  // }

  // const addItem2 = ItemStore((state) => state.addItem2)

  // const myItem2_c = async (data) => {
  //   addItem2({ 'comp_length': data })
  //   console.log('addItem2', { 'comp_length': data })

  //   await getData2_c();
  // }

  // const state1 = ItemStore()
  // console.log('state1', state1.length_r)
  // console.log('state1_c', state1.length_c)
  // const getData2_r = () => {
  //   var lData_r = state1.length_r;
  //   console.log('lData_r---->', lData_r)
  // }

  // const getData2_c = () => {
  //   var lData_c = state1.length_c;
  //   console.log('lData_c---->', lData_c)
  // }

  // FOR SUBJECT RECORD...................................................
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setAnchorEl(null);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  // FOR WEEKLY RECORD BASIS OF EXPIRY DATE...................................................
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [selectedIndex1, setSelectedIndex1] = React.useState(0);

  function handleClickListItem1(event) {
    setAnchorEl1(event.currentTarget);
  }
  function handleMenuItemClick1(event, index) {
    setSelectedIndex1(index);
    setAnchorEl1(null);
  }
  function handleClose1() {
    setAnchorEl1(null);
  }

  // -------------FOR BACK BUTTON--------------------
  const navigate = useNavigate();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

  // =====get details CLICK ON SUBMIT BUTTON (subject && weekly record)==========
  // let getDetails = () => {
  //   // setRegRecord({count : 0});
  //   setRegRecord('');
  //   console.log("###reached get details--->", expiryDate);
  //   console.log(subjectId, weeklyDate);
  //   expiryDate.forEach((data) => {
  //     // console.log(data.details.subjectId, data.details.date);
  //     if (data.details.subjectId === subjectId && data.details.date === weeklyDate) {
  //       setRegRecord(data.details);
  //       console.log('data.details', data)
  //     }
  //   })
  // }

  let getValues = () => {
    console.log(subjectId, weeklyDate);

    // submitData.forEach((data) => {
    //   console.log('data', data)
    //   setRegRecord(data);
    // })
  }
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

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="0px">

        {/* // FOR SUBJECT RECORD................................................... */}
        {/* <SimpleCard title="GK/ENGLISH">
          <MenuRoot sx={{ width: 300, height: 20 }}>
            <List component="nav" aria-label="Device settings">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="When device is locked"
                onClick={handleClickListItem}
                sx={{ width: 250, marginTop: [-3], padding: 0 }}
              >
                <ListItemText
                  primary="Record Basis of Subject"
                  secondary={options[selectedIndex]}
                />
              </ListItem>
            </List>

            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  key={option.value}
                  disabled={index === 0}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </MenuRoot>
        </SimpleCard> */}

        {/* <SimpleCard title="Weekly">
          <MenuRoot sx={{ width: 300, height: 20 }}>
            <List component="nav" aria-label="Device settings">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu1"
                aria-label="When device is locked"
                onClick={handleClickListItem1}
                sx={{ width: 250, marginTop: [-3], padding: 0 }}
              >
                <ListItemText
                  primary="Weekly Record Basis of Expiry Date"
                  secondary={dropdownData[selectedIndex1]}
                />
              </ListItem>
            </List>
            <Menu
              sx={{ height: 400 }}
              id="lock-menu1"
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={handleClose1}
            >
              {dropdownData.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === 0}
                  onClick={(event) => handleMenuItemClick1(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </MenuRoot>
        </SimpleCard> */}

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* // FOR SUBJECT RECORD................................................... */}
        <SimpleCard title="GK/ENGLISH" >
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
                    {/* {dropdownData.map((eDate, i) => (
                      <MenuItem key={eDate}>{eDate}</MenuItem>
                    ))} */}
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
          // onClick={() => getDetails()}
          // onClick={() => getValues()}
          onClick={() => fetchSubmitData()}
        >
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>

      </Box >
    </>
  );
}
