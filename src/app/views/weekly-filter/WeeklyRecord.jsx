import React from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { styled, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubjectAndDateRecord from './Shared/SubjectAndDateRecord';
import TotalCompTableData from './Shared/TotalCompTableData';
import TotalRegTableData from './Shared/TotalRegTableData';

export default function FilterRecord() {

  // -------------FOR BACK BUTTON--------------------
  const navigate = useNavigate();

  // ...............FOR BREADCRUMB CONTAINER COMPONENT.........................
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
            routeSegments={[{ name: 'Filter Record', path: '/weekly-filter/WeeklyRecord' }, { name: 'Table' }]}
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
        <TotalCompTableData />
        <TotalRegTableData />
        <SimpleCard>
          <SubjectAndDateRecord />
        </SimpleCard>

      </Container>
    </>
  );
}
