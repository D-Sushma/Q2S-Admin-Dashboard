import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import SubjectInForm from './SubjectInForm';
import SubscriptionInForm from './SubscriptionInForm';
import StatusInForm from './StatusInForm';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const [state, setState] = useState({ updateDate: new Date('mm/dd/yyyy') });

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (updateDate) => setState({ ...state, updateDate });
  const handleDateChange2 = (createDate) => setState({ ...state, createDate });
  const handleDateChange3 = (expiryDate) => setState({ ...state, expiryDate });

  const {
    firstName,
    lastName,
    subject,
    subscription,
    status,
    updateDate,
    createDate,
    expiryDate
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6} sx={{ mt: -10 }}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="firstName"
              label="First Name"
              onChange={handleChange}
              value={firstName || ""}
              validators={["required"]}
              errorMessages={["First name is required"]}
            />
            {/* <TextField
              type="text"
              name="subject"
              label="Subject"
              onChange={handleChange}
              value={subject || ""}
              validators={["required"]}
              errorMessages={["subject is required"]}
            /> */}
            <SubjectInForm />
            {/* <TextField
              type="text"
              name="subscription"
              label="Subscription"
              onChange={handleChange}
              value={subscription || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}

            {/* <TextField
              type="text"
              name="status"
              label="Status"
              onChange={handleChange}
              value={status || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> */}
            <StatusInForm />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="lastName"
              label="Last Name"
              onChange={handleChange}
              value={lastName || ""}
              validators={["required"]}
              errorMessages={["Last name is required"]}
            />
            <SubscriptionInForm />

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={updateDate}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Updated At"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider> */}
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled
                value={createDate}
                onChange={handleDateChange2}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    type="date"
                    label="Created At"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider> */}
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={expiryDate}
                onChange={handleDateChange3}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    type="date"
                    label="Expiry Date"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider> */}

          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit" sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
