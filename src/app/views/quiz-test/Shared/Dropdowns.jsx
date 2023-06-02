import React, { Fragment } from 'react';
import { Autocomplete, styled, TextField, Box } from '@mui/material';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];
const subjects = [
  { label: 'General Knowledge' },
  { label: 'English' },
];

const Dropdowns = () => {

  return (
    <Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1, fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center" }}>Subject</Box>
          <AutoComplete
            // id="disable-clearable"
            // disableClearable
            options={subjects}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Subject" variant="outlined" fullWidth />
            )}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1, fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center" }}>Topics</Box>
          <AutoComplete
            // id="disable-clearable"
            // disableClearable
            options={suggestions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Topics" variant="outlined" fullWidth />
            )}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1, fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center" }}>Sub Topics</Box>
          <AutoComplete
            // id="disable-clearable"
            // disableClearable
            options={suggestions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Sub Topics" variant="outlined" fullWidth />
            )}
          />
        </Box>

      </Box>
    </Fragment>
  );
};

export default Dropdowns;
