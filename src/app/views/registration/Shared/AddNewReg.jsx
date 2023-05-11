import * as React from 'react';
import {
  Box, Button, Grid, Icon,
  styled, Autocomplete, TextField,
  InputLabel, MenuItem, FormControl, Select
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const AutoComplete = styled(Autocomplete)(() => ({
  width: 250,
  marginBottom: '16px',
}));

const nameOption = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
];
const subjectOption = [
  { label: '' },
  { label: 'GK' },
  { label: 'English' },
];

const subscriptionOption = [
  { label: 'Weekly' },
];

const TextBox = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const [state, setState] = useState({});
  const [userSubject, setUserSubject] = React.useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    console.log(userName);
    // console.log(subject);
    console.log(userSubscription);
    console.log(userSubject)
    // console.log(event);
  };

  const handleUserSubject = (event) => {
    setUserSubject(event.target.value);
    console.log('userSubject', userSubject)
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
                setState({ ...state, userName: value.label });
              }}
              options={nameOption}
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
                {subjectOption.map((ele) => (
                  <MenuItem value={ele.label} >{ele.label}</MenuItem>
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
                setState({ ...state, userSubscription: value.label });
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
            <Span sx={{ pl: 1, textTransform: "capitalize" }} onClick={handleSubmit}>Submit</Span>
          </Button>
        </Box>
      </ValidatorForm>
    </div >
  );
};

export default SimpleForm;
