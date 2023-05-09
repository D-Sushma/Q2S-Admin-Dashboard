import React from 'react'
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';

export default function NewRegistration() {
    return (
        <>
            <FormControl>
                <TextField
                    type="text"
                    name="firstName"
                    label="First Name"
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                />
                <FormLabel>Enter Name</FormLabel>
                <TextField></TextField>
                <Button>Submit</Button>
            </FormControl>
        </>
    );
}
