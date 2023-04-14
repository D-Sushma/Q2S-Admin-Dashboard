import { Button, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import CompetitionListTable from './Shared/CompetitionListTable';
import SubjectAndDateRecord from '../filter/Shared/SubjectAndDateRecord';

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
              { name: 'Competition-List', path: '/competition-list' },
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
        <SubjectAndDateRecord />
        <Box sx={{ mt: 1 }}>
          <SimpleCard title="COMPETITION - LIST">
            <CompetitionListTable />
          </SimpleCard>
        </Box>
      </Container>
    </>
  );
};
export default CompetitionList;