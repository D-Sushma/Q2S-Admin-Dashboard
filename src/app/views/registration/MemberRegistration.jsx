import React from 'react';
import { styled, Button, Box } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
// import RegistrationTable from './Shared/RegistrationTable';
import RegTableData from './Shared/RegTableData';
import FormDialog from './Shared/FormDialog';

const MemberRegistration = () => {

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
            <Box sx={{ display: "flex" }}>
              <FormDialog />
              {/* // -------------FOR BACK BUTTON-------------------- */}
              <Button
                // fullWidth
                color="primary"
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{ width: "auto", height: "35px" }}
              >
                Go Back
              </Button>
            </Box>

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