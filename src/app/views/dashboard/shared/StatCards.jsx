import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { useNavigate } from 'react-router-dom';

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
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const cardList = [
    { name: 'New Leads', amount: 3050, icon: 'group' },
    { name: 'This week Sales', amount: '$80,500', icon: 'attach_money' },
    { name: 'Inventory Status', amount: '8.5% Stock Surplus', icon: 'store' },
    { name: 'Orders to deliver', amount: '305 Orders', icon: 'shopping_cart' },
  ];

  const navigate = useNavigate();
  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {/* {cardList.map((item, index) => ( */}
      <Grid item xs={12} md={6} >
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">group</Icon>
            <Box ml="12px">
              <Small>Registration</Small>
              <Heading>80</Heading>
            </Box>
          </ContentBox>

          <Tooltip title="View Details" placement="top">
            <IconButton onClick={() => navigate('/registration/MemberRegistration')}>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6} >
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">contacts</Icon>
            <Box ml="12px">
              <Small>Competition</Small>
              <Heading>75</Heading>
            </Box>
          </ContentBox>

          <Tooltip title="View Details" placement="top">
            <IconButton onClick={() => navigate('/competition-list/CompetitionList')}>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip>
        </StyledCard>
      </Grid>
      {/* ))} */}
    </Grid >
  );
};

export default StatCards;
