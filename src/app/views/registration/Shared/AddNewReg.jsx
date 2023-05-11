import {
  Button,
  Grid,
  Icon,
  styled,
  Autocomplete,
  TextField
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const AutoComplete = styled(Autocomplete)(() => ({
  width: 250,
  marginBottom: '16px',
}));

const subjectOption = [
  { label: 'GK' },
  { label: 'English' },
];
const statusOption = [
  { label: 'Weekly' },
];
const subscriptionOption = [
  { label: 'Active' },
  { label: 'Inactive' },
];

const TextBox = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const [state, setState] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
    console.log(firstName);
    console.log(lastName);
    console.log(subject);
    console.log(userStatus);
    console.log(userSubscription);
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const {
    firstName,
    lastName,
    subject,
    userStatus,
    userSubscription
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6} sx={{ mt: -10 }}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextBox
              type="text"
              name="firstName"
              label="First Name"
              onChange={handleChange}
              value={firstName || ""}
              validators={["required"]}
              errorMessages={["First name is required"]}
            />
            <AutoComplete
              onChange={(event, value) => {
                setState({ ...state, subject: value.label });
              }}
              options={subjectOption}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Subject" variant="outlined" fullWidth />
              )}
            />
            <AutoComplete
              onChange={(event, value) => {
                setState({ ...state, userStatus: value.label });
              }}
              options={statusOption}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Status" variant="outlined" fullWidth />
              )}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextBox
              type="text"
              name="lastName"
              label="Last Name"
              onChange={handleChange}
              value={lastName || ""}
              validators={["required"]}
              errorMessages={["Last name is required"]}
            />
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

        <Button color="primary" variant="contained" type="submit" sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }} onClick={handleSubmit}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
