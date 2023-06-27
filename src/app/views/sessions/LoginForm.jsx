import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Card,
    Grid,
} from '@mui/material';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const Root = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',

}));

const FormContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // marginTop: theme.spacing(8),
}));

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Root>
            <Card className='card'>
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                            <img src="/assets/images/q2s_image/q2s-logo.jpg" width="100%" alt="" />
                        </JustifyBox>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <FormContainer maxWidth="xs">
                                <Typography variant="h5" component="h1">
                                    Login
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        // size='small'
                                        type='email'
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        // size='small'
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Sign In
                                    </Button>
                                </form>
                            </FormContainer>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </Root>
    );
};

export default LoginForm;
