import { Box, Card, Grid, Icon, IconButton, styled, Tooltip, Select, MenuItem } from '@mui/material';
import { Small } from 'app/components/Typography';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({

  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  // color: theme.palette.primary.main
  '& .icon': { opacity: 0.6, fontSize: '24px', color: theme.palette.text.secondary, marginTop: -40 },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '25px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  // ----------DB FETCH------------------------------
  const [users, setUsers] = useState([]);
  let [compMember, setCompMember] = useState([]);
  const [regMember, setRegMember] = useState([]);
  const fetchRegData = () => {
    fetch('http://localhost:4000/join')
      .then((response) => {
        console.log(' JOIN response');
        return response.json();
      })
      .then((data) => {
        console.log('inside JOIN data inside TableData', data);
        setRegMember(data.response.items);

      });
  };

  let fetchCompData = () => {
    fetch('http://localhost:4000/competitionlistdetails')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        setCompMember(data.response.items);
      })
  };

  const fetchUserData = () => {
    fetch('http://localhost:4000/usertabledetails')
      .then((response) => {
        console.log('response');
        return response.json();
      })
      .then((data) => {
        console.log("inside data", data);
        setUsers(data.response.items);
      });
  };
  useEffect(() => {
    fetchRegData();
    fetchCompData();
    fetchUserData();
  }, []);
  // ----------DB FETCH END-------------------------

  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Overview</h3>
        <div>
          <Select size="small" defaultValue="this_week">
            <MenuItem value="this_week"> This Week</MenuItem>
            <MenuItem value="last_week"> Last Week</MenuItem>
          </Select>
        </div>
      </Box>
      <Grid container spacing={3} sx={{ mb: '24px' }}>
        <Grid item xs={12} md={3} >
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">person</Icon>
              <Box ml="12px">
                <Small sx={{ fontSize: 13 }}>Users</Small>
                <Heading>{users.length}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton onClick={() => navigate('/user-table/userTable')}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StyledCard elevation={6}>
            <ContentBox>
              {/* <Icon className="icon">group</Icon> */}
              <Icon className="icon">recent_actors</Icon>
              <Box ml="12px">
                <Small sx={{ fontSize: 13 }}>Registration</Small>
                <Heading>{regMember.length}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton onClick={() => navigate('/registration/MemberRegistration')}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3} >
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">contacts</Icon>
              <Box ml="12px">
                <Small sx={{ fontSize: 13 }}>Competition</Small>
                <Heading>{compMember.length}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton onClick={() => navigate('/competition-list/CompetitionList')}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3} >
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">contacts</Icon>
              <Box ml="12px">
                <Small sx={{ fontSize: 13 }}>Competition</Small>
                <Heading>{users.length}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton onClick={() => navigate('/competition-list/CompetitionList')}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      </Grid >
    </>
  );
};

export default StatCards;
