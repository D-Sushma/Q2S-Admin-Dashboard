import React from 'react';
import { styled, Button, Box, Fab, Icon, } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
// import RegistrationTable from './Shared/RegistrationTable';
import RegTableData from './Shared/RegTableData';
// ** FORM DIALOG
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddNewReg from './Shared/AddNewReg';

const MemberRegistration = () => {
  // ** FORM DIALOG
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // -------------FOR BACK BUTTON--------------------
  const navigate = useNavigate();

  // ...............FOR BREADCRUMB CONTAINER COMPONENT.........................
  const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
  }));

  return (
    <>
      <Fragment>
        <Container>
          <Box className="breadcrumb" display="flex" justifyContent="space-between">
            <Breadcrumb
              routeSegments={[{ name: 'Registration', path: '/registration/MemberRegistration' }, { name: 'Table' }]}
            />
            {/* // -------------FOR BACK BUTTON-------------------- */}
            <div>
              <Fab color="primary" aria-label="Add" className="button" sx={{ marginRight: 3 }} onClick={handleClickOpen}>
                <Icon>add</Icon>
              </Fab>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                  <AddNewReg />
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" color="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>

              <Button
                // fullWidth
                color="primary"
                variant="outlined"
                onClick={() => navigate(-1)}
              // sx={{ mt: 2, mb: 2, ml: 2 }}
              >
                Go Back
              </Button>
            </div>

          </Box>

          <RegTableData />

          {/* <Box sx={{ mt: 1 }}>
            <SimpleCard title="MEMBER REGISTRATION">
              <RegistrationTable />
            </SimpleCard>
          </Box> */}
        </Container>
      </Fragment >
    </>
  );
};
export default MemberRegistration;