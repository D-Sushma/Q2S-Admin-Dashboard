import React, { useState } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { styled, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubjectAndDateRecord from './Shared/SubjectAndDateRecord';
// import TotalRecord from './Shared/TotalRecord';

// ** make prop --> for data passing into sibling......
export default function FilterRecord() {
  // const [regRecord, setRegRecord] = useState([]);
  const [regRecord, setRegRecord] = useState('');

  // -------------FOR BACK BUTTON--------------------
  const navigate = useNavigate();

  // ...............FOR BREADCRUMB CONNTAINER COMPONENT.........................
  const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    height: '50%',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
  }));

  return (
    <>
      <Container>
        <Box className="breadcrumb" display="flex" justifyContent="space-between">
          <Breadcrumb
            routeSegments={[{ name: 'Filter Record', path: '/filter' }, { name: 'filter' }]}
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

        <SimpleCard>
          <SubjectAndDateRecord setRegRecord={setRegRecord} />
        </SimpleCard>
        {/* <Box sx={{ mt: 1 }}>
          <SimpleCard>
            <TotalRecord regRecord={regRecord} />
          </SimpleCard>
        </Box> */}

      </Container>
    </>
  );
}
