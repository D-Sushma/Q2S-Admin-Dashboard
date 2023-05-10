import { Autocomplete, styled, TextField } from '@mui/material';
import React, { Fragment } from 'react';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 250,
  marginBottom: '16px',
}));

const suggestions = [
  { label: 'Weekly' },
];

const SubscriptionInForm = () => {
  return (
    <Fragment>
      <AutoComplete
        options={suggestions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Subscription" variant="outlined" fullWidth />
        )}
      />
    </Fragment>
  );
};
export default SubscriptionInForm;