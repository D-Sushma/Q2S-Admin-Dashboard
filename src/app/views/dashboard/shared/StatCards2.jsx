import { Card, Fab, Grid, Icon, lighten, styled, useTheme, Tooltip, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px',
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));

const StatCards2 = () => {
  const { palette } = useTheme();
  const textError = palette.warning.main;
  const bgError = lighten(palette.warning.main, 0.85);
  const bgErrorLight = lighten(palette.warning.light, 0.93);
  const textInfo = palette.info.main;
  const bgInfo = lighten(palette.info.main, 0.85);
  const bgInfoLight = lighten(palette.info.light, 0.93);
  // const textPrimary = palette.primary.main;
  // const bgPrimary = lighten(palette.primary.main, 0.85);
  const navigate = useNavigate();
  // ----------DB FETCH------------------------------
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentReg, setCurrentReg] = useState([]);
  const [currentComp, setCurrentComp] = useState([]);
  const fetchActiveUsers = () => {
    fetch('http://localhost:4000/current-week-active-user')
      .then((response) => {
        // console.log(' JOIN response');
        return response.json();
      })
      .then((data) => {
        // console.log('Active users', data);
        setActiveUsers(data.response.items);

      });
  };
  const fetchCurrentRegistration = () => {
    fetch('http://localhost:4000/current-week-registration')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log('Current Registration', data);
        setCurrentReg(data.response.items);

      });
  };
  let fetchCurrentCompetition = () => {
    fetch('http://localhost:4000/current-week-competetion')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log('Current Competition', data);
        setCurrentComp(data.response.items);
      })
  };
  useEffect(() => {
    fetchActiveUsers();
    fetchCurrentRegistration();
    fetchCurrentCompetition();
  }, []);
  // ----------DB FETCH END-------------------------

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ p: 2 }}>
            <ContentBox>
              <FabIcon size="medium" sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
                <Icon sx={{ color: '#08ad6c' }}>trending_up</Icon>
              </FabIcon>
              <H3 textcolor={'#08ad6c'}>Active Users</H3>
            </ContentBox>

            <ContentBox sx={{ pt: 2 }}>
              <H1>{activeUsers.length}</H1>
              <Tooltip title="View Details" placement="top">
                <IconButton onClick={() => navigate('/dashboard/navigation-page/ActiveUsers')}>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </ContentBox>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ p: 2 }}>
            <ContentBox>
              <FabIcon size="medium" sx={{ background: bgError, overflow: 'hidden' }}>
                <Icon sx={{ color: textError }}>recent_actors_outlined</Icon>
              </FabIcon>
              <H3 textcolor={textError}>Current Registration</H3>
            </ContentBox>
            <ContentBox sx={{ pt: 2 }}>
              <H1>{currentReg.length}</H1>
              <Tooltip title="View Details" placement="top">
                <IconButton onClick={() => navigate('/dashboard/navigation-page/CurrentRegistration')}>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </ContentBox>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ p: 2 }}>
            <ContentBox>
              <FabIcon size="medium" sx={{ background: bgInfo }}>
                <Icon sx={{ color: textInfo }}>star_outline</Icon>
              </FabIcon>
              <H3 textcolor={textInfo}>Current Competition</H3>
            </ContentBox>

            <ContentBox sx={{ pt: 2 }}>
              <H1>{currentComp.length}</H1>
              <Tooltip title="View Details" placement="top">
                <IconButton onClick={() => navigate('/dashboard/navigation-page/CurrentCompetition')}>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </ContentBox>
          </Card>
        </Grid>

        {/* <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: bgError, overflow: 'hidden' }}>
              <Icon sx={{ color: textError }}>star_outline</Icon>
            </FabIcon>
            <H3 textcolor={textError}>Transactions</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>$2.8M</H1>
            <IconBox sx={{ background: bgError }}>
              <Icon className="icon">expand_less</Icon>
            </IconBox>
            <Span textcolor={textError}>(+21%)</Span>
          </ContentBox>
        </Card>
      </Grid> */}
      </Grid>
    </>
  );
};

export default StatCards2;
