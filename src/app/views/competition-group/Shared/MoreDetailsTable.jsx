import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useNavigate } from 'react-router-dom';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const MoreDetailsTable = () => {
  // ===============Get id 
  const params = useParams();
  // console.log("params",params);
  // --------------------FETCH DATA--------------------------
  let [users, setUsers] = useState([]);
  let fetchData = () => {
    fetch(`http://localhost:4000/moredetailstable/${params.cgId}`)
      .then((response) => {
        console.log('response');
        return response.json();
      })
      .then((data) => {
        console.log('inside data of more details', data);
        setUsers(data.response);
      });
  };
  console.log('after pagination table');
  useEffect(() => {
    fetchData();
  }, []);
  // --------------------END FETCH DATA--------------------------
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

  // ** pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Container>
        <Box className="breadcrumb" display="flex" justifyContent="space-between">
          <Breadcrumb
            routeSegments={[
              { name: 'More Details Table', path: '/Cpmpetition-Group' },
              { name: 'Table' },
            ]}
          />
          <Box display="flex">
            {/* // -------------FOR BACK BUTTON-------------------- */}
            <Button
              color="primary"
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{ mr: 2 }}
            >
              Go Back
            </Button>
          </Box>
        </Box>

        <SimpleCard title="More Details Table">
          <Box width="100%" overflow="auto">
            <StyledTable sx={{ tableLayout: 'auto' }} bgcolor="#fafafa">
              <TableHead bgcolor="#e0f7fa">
                <TableRow>
                  <TableCell align="center">SNO</TableCell>
                  <TableCell align="center">PLAYER1(P1)</TableCell>
                  <TableCell align="center">PLAYER2(P2)</TableCell>
                  <TableCell align="center">POINT P1</TableCell>
                  <TableCell align="center">POINT P2</TableCell>
                  <TableCell align="center">P1 TIME</TableCell>
                  <TableCell align="center">P2 TIME</TableCell>
                  <TableCell align="center">WINNER</TableCell>
                  <TableCell align="center">SLOT START</TableCell>
                  <TableCell align="center">SLOT END </TableCell>
                  <TableCell align="center">WALK OVER</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{user.id}</TableCell>
                        <TableCell align="center">{user.p1_name}</TableCell>
                        <TableCell align="center">{user.p2_name}</TableCell>
                        <TableCell align="center">{user.p1_correct_count}</TableCell>
                        <TableCell align="center">{user.p2_correct_count}</TableCell>
                        <TableCell align="center">{user.p1_time_taken}</TableCell>
                        <TableCell align="center">{user.p2_time_taken}</TableCell>
                        {/* <TableCell align="center">{user.winner_id}</TableCell> */}
                        {(user.winner_id === user.p1)
                          ? <TableCell align="center">{user.p1_name}</TableCell>
                          : (user.winner_id === user.p2)
                            ? <TableCell align="center">{user.p2_name}</TableCell>
                            : <TableCell align="center">0</TableCell>
                        }
                        <TableCell align="center">{user.slot_start}</TableCell>
                        <TableCell align="center">{user.slot_end}</TableCell>
                        <TableCell align="center">{user.is_walk_over}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </StyledTable>

            <TablePagination
              text-44
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={users.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
            />
          </Box>
        </SimpleCard>
      </Container>
    </>
  );
};

export default MoreDetailsTable;