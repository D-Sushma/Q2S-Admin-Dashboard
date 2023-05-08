import React from 'react';
import { styled, Button, Box } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
// import UserTableList from './Shared/UserTableList';
import UserTableData from './Shared/UserTableData';

const UserTable = () => {
  // -------------FOR BACK BUTTON--------------------
  const navigate = useNavigate();

  // ...............FOR BREADCRUMB CONNTAINER COMPONENT.........................
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
              routeSegments={[{ name: 'User Table', path: '/user-table' }, { name: 'Table' }]}
            />
            {/* // -------------FOR BACK BUTTON-------------------- */}
            <Button
              color="primary"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>

          <UserTableData />
          {/* <SimpleCard title="USER TABLE LIST">
            <UserTableList />
          </SimpleCard> */}
        </Container>
      </Fragment>
    </>
  );
};

export default UserTable;
