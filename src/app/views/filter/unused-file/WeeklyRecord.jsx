import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Grid,styled } from "@mui/material";
// import { Grid,styled,Button,Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { Span } from "app/components/Typography";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const [state, setState] = useState({ date: new Date() });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    date,
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        {/* <Grid container spacing={6}> */}
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Date picker"
                    id="mui-pickers-date"
                    // sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
            <RadioGroup
              row
              name="gender"
              sx={{ mb: 2 }}
              value={gender || ""}
              onChange={handleChange}
            >
             
            </RadioGroup>

          </Grid> */}

        {/* </Grid> */}

        {/* <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button> */}
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
