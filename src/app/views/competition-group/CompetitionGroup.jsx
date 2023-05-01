import React from 'react';
import { styled, Button, Box } from '@mui/material';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import CompetitionGroupTable from './Shared/CompetitionGroupTable';

const CompetitionList = () => {
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
      <Container>
        <Box className="breadcrumb" display="flex" justifyContent="space-between">
          <Breadcrumb
            routeSegments={[
              { name: 'Competition-Group', path: '/Competition-Group' },
              { name: 'Table' },
            ]}
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
        <Box sx={{ mt: 1 }}>
          <SimpleCard title="COMPETITION - GROUP">
            <CompetitionGroupTable />
          </SimpleCard>
        </Box>
      </Container>
    </>
  );
};
export default CompetitionList;