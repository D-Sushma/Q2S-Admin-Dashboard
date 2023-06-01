import * as React from 'react';
import {
  Box, Button, Grid, Icon,
  styled, Autocomplete, TextField,
  InputLabel, MenuItem, FormControl, Select
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useEffect } from 'react';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 250,
  marginBottom: '16px',
}));

const nameOption = [
  { label: 'Afghanistan', value: 103 },
  { label: 'Aland Islands', value: 104 },
  { label: 'Albania', value: 105 },
  { label: 'Algeria', value: 106 },
  { label: 'American Samoa', value: 107 },
  { label: 'Andorra', value: 108 },
  { label: 'Angola', value: 109 },
];
const subjectOption = [
  { label: '' },
  { label: 'GK', value: 13 },
  { label: 'English', value: 6 },
];

const subscriptionOption = [
  { label: 'Weekly', value: 1 },
];

const TextBox = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const AddNewReg = () => {
  const [state, setState] = useState({});
  const [userSubject, setUserSubject] = React.useState('');
  // ----------DB FETCH------------------------------
  let userOption = [];
  let userData = [];
  const fetchData = () => {
    fetch('http://localhost:4000/usertabledetails')
      .then((response) => {
        // console.log('response');
        return response.json();
      })
      .then((data) => {
        console.log("users data", data);
        userData = data.response.results;
        // console.log('userData', userData);
        for (let i = 0; i < userData.length; i++) {
          const userId = userData[i].id;
          const name = userData[i].name;
          const lname = userData[i].lname;
          const userName = name + " " + lname;
          // console.log('userId,userName', userId, userName)
          userOption.push({
            label: userName,
            value: userId,
          })
        }
        // console.log('userOption', userOption)
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // ----------DB FETCH END-------------------------

  const fetchSubmitData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // console.log('userName', userName)
    // console.log('userSubject', userSubject)
    // console.log('userSubscription', userSubscription)
    var raw = JSON.stringify({
      "userid": userName,
      "subject": userSubject,
      "subscription": userSubscription,
      // "userid": 103,
      // "subject": 13,
      // "subscription": 1,
      "status": 0,
      "updated_at": "2023/05/11",
      "created_at": "2023/05/11",
      "expiry_date": "2023/05/11"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch("http://localhost:4000/insert/registration", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log('data', data))
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    // fetchSubmitData();
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submitted");
    console.log("userName", userName);
    // console.log(subject);
    console.log("userSubscription", userSubscription);
    console.log("userSubject", userSubject)
    // console.log(event);
  };

  const handleUserSubject = (event) => {
    setUserSubject(event.target.value);
    // console.log('userSubject', userSubject)
  };

  // const handleChange = (event) => {
  //   event.persist();
  //   setState({ ...state, [event.target.name]: event.target.value });
  // };

  const {
    // firstName,
    userName,
    // subject,
    userSubscription
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6} sx={{ mt: -10 }}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            {/* <TextBox
              type="text"
              name="firstName"
              label="First Name"
              onChange={handleChange}
              value={firstName || ""}
              validators={["required"]}
              errorMessages={["First name is required"]}
            /> */}

            <AutoComplete
              onChange={(event, value) => {
                setState({ ...state, userName: value.value });
              }}
              options={userOption}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Name" variant="outlined" fullWidth />
              )}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userSubject}
                label="Subject"
                onChange={handleUserSubject}
              >
                {subjectOption.map((ele, i) => (
                  <MenuItem key={i} value={ele.value} >{ele.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}

            {/* <AutoComplete
              onChange={(event, value) => {
                setState({ ...state, subject: value.label });
              }}
              options={subjectOption}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Subject" variant="outlined" fullWidth />
              )}
            /> */}
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <AutoComplete
              onChange={(event, value) => {
                setState({ ...state, userSubscription: value.value });
              }}
              options={subscriptionOption}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Subscription" variant="outlined" fullWidth />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{
          width: "100%", display: "flex", justifyContent
            : "flex-end", alignItems: "center"
        }}>
          <Button color="primary" variant="contained" type="submit" >
            <Icon>send</Icon>
            {/* <Span sx={{ pl: 1, textTransform: "capitalize" }} onClick={handleSubmit}>Submit</Span> */}
            <Span sx={{ pl: 1, textTransform: "capitalize" }} onClick={fetchSubmitData}>Submit</Span>
          </Button>
        </Box>
      </ValidatorForm>
    </div >
  );
};

export default AddNewReg;
