import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Grid,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import { H3 } from 'app/components/Typography';
import MemberRegistration from '../../registration/Shared/RegistrationTable'

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
  color: 'green'
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12} xs={12} md={6} >
          <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <H3 sx={{ ml: 3 }}>Weekly Report</H3>
            <CardHeader>
              <Title color='error'>GK</Title>

              <Box sx={{ ml: 3 }}>
                <Select size="small" defaultValue="this_month">
                  <MenuItem value="this_month">Registration This Week</MenuItem>
                  <MenuItem value="last_month">Registration Last Week</MenuItem>
                  {/* <MenuItem value="this_month">Competition This Week</MenuItem>
                  <MenuItem value="last_month">Competition Last Week</MenuItem> */}
                </Select>
              </Box>
            </CardHeader>
            <MemberRegistration />
            {/* <Box overflow="auto">
              <ProductTable>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ px: 3 }} colSpan={4}>
                      Name
                    </TableCell>
                    <TableCell sx={{ px: 0 }} colSpan={2}>
                      Revenue
                    </TableCell>
                    <TableCell sx={{ px: 0 }} colSpan={2}>
                      Stock Status
                    </TableCell>
                    <TableCell sx={{ px: 0 }} colSpan={1}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {productList.map((product, index) => (
                    <TableRow key={index} hover>
                      <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                        <Box display="flex" alignItems="center">
                          <Avatar src={product.imgUrl} />
                          <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                        </Box>
                      </TableCell>

                      <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                        ${product.price > 999 ? (product.price / 1000).toFixed(1) + 'k' : product.price}
                      </TableCell>

                      <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                        {product.available ? (
                          product.available < 20 ? (
                            <Small bgcolor={bgSecondary}>{product.available} available</Small>
                          ) : (
                            <Small bgcolor={bgPrimary}>in stock</Small>
                          )
                        ) : (
                          <Small bgcolor={bgError}>out of stock</Small>
                        )}
                      </TableCell>

                      <TableCell sx={{ px: 0 }} colSpan={1}>
                        <IconButton>
                          <Icon color="primary">edit</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ProductTable>
            </Box> */}
          </Card>
        </Grid>
        <Grid item lg={12} xs={12} md={6} >
          <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <H3 sx={{ ml: 3 }}>Weekly Report</H3>
            <CardHeader>
              <Title color='error'>English</Title>

              <Box sx={{ ml: 3 }}>
                {/* <Select size="small" defaultValue="this_month" sx={{ mr: 1 }}>
                  <MenuItem value="this_month">In Registration</MenuItem>
                  <MenuItem value="last_month">In Competition</MenuItem>
                </Select> */}
                <Select size="small" defaultValue="this_month">
                  <MenuItem value="this_month">Registration This Week</MenuItem>
                  <MenuItem value="last_month">Registration Last Month</MenuItem>
                </Select>
              </Box>
            </CardHeader>
            <MemberRegistration />
            {/* <Box overflow="auto">
              <ProductTable>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ px: 3 }} colSpan={4}>
                      Name
                    </TableCell>
                    <TableCell sx={{ px: 0 }} colSpan={2}>
                      Revenue
                    </TableCell>
                    <TableCell sx={{ px: 0 }} colSpan={2}>
                      Stock Status
                    </TableCell>
                    <TableCell sx={{ px: 0 }} colSpan={1}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {productList.map((product, index) => (
                    <TableRow key={index} hover>
                      <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                        <Box display="flex" alignItems="center">
                          <Avatar src={product.imgUrl} />
                          <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                        </Box>
                      </TableCell>

                      <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                        ${product.price > 999 ? (product.price / 1000).toFixed(1) + 'k' : product.price}
                      </TableCell>

                      <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                        {product.available ? (
                          product.available < 20 ? (
                            <Small bgcolor={bgSecondary}>{product.available} available</Small>
                          ) : (
                            <Small bgcolor={bgPrimary}>in stock</Small>
                          )
                        ) : (
                          <Small bgcolor={bgError}>out of stock</Small>
                        )}
                      </TableCell>

                      <TableCell sx={{ px: 0 }} colSpan={1}>
                        <IconButton>
                          <Icon color="primary">edit</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ProductTable>
            </Box> */}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/products/headphone-2.jpg',
    name: 'earphone',
    price: 100,
    available: 15,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'earphone',
    price: 1500,
    available: 30,
  },
  {
    imgUrl: '/assets/images/products/iphone-2.jpg',
    name: 'iPhone x',
    price: 1900,
    available: 35,
  },
  {
    imgUrl: '/assets/images/products/iphone-1.jpg',
    name: 'iPhone x',
    price: 100,
    available: 0,
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'Head phone',
    price: 1190,
    available: 5,
  },
];

export default TopSellingTable;
