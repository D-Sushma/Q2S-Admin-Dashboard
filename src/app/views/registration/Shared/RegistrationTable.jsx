
import moment from 'moment';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const PaginationTable = () => {
  console.log('inside pagination table');
  // ----------DB FETCH------------------------------
  // const [users, setUsers] = useState([]);
  // const fetchData = () => {
  //   fetch('http://localhost:4000/memberregistration')
  //     .then((response) => {
  //       console.log('response');
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('inside data', data);
  //       setUsers(data.response);
  //     });
  // };
  // console.log('after pagination table');
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [join, setJoin] = useState([]);
  const fetchJoinData = () => {
    fetch('http://localhost:4000/join')
      .then((response) => {
        console.log(' JOIN response');
        return response.json();
      })
      .then((data) => {
        console.log('inside JOIN data', data);
        setJoin(data.response);
      });
  };
  useEffect(() => {
    fetchJoinData();
  }, []);
  // ----------DB FETCH END-------------------------

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
    <Box width="100%" overflow="auto">
      <StyledTable sx={{ tableLayout: 'auto' }} bgcolor="#fafafa">
        <TableHead bgcolor="#e0f7fa">
          <TableRow>
            <TableCell align="center">SNO</TableCell>
            <TableCell align="center">USER ID</TableCell>
            <TableCell align="center">SUBJECT</TableCell>
            <TableCell align="center">SUBSCRIPTION</TableCell>
            <TableCell align="center">STATUS</TableCell>
            <TableCell align="center">UPDATED</TableCell>
            <TableCell align="center">CREATED</TableCell>
            <TableCell align="center">EXPIRY DATE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {join.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((joinUser, index) => {
              return (

                <TableRow key={index}>
                  <TableCell align="center">{joinUser.id}</TableCell>
                  <TableCell align="center">{joinUser.name + " " + joinUser.lname}</TableCell>

                  {(joinUser.subject) === 6 ? <TableCell align="center">English</TableCell>
                    : (joinUser.subject) === 13 ? <TableCell align="center">GK</TableCell>
                      : <TableCell align="center">----</TableCell>}

                  {(joinUser.subscription) === 1 ? <TableCell align="center">Weekly</TableCell>
                    : <TableCell align="center">{joinUser.subscription}</TableCell>}

                  {(joinUser.status) === 1 ? <TableCell align="center">Active</TableCell>
                    : (joinUser.status) === 0 ? <TableCell align="center">Deactive</TableCell>
                      : <TableCell align="center">----</TableCell>}

                  <TableCell align="center">{moment(joinUser.updated_at).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="center">{moment(joinUser.created_at).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="center">{moment(joinUser.expiry_date).format('DD/MM/YYYY')}</TableCell>
                </TableRow>)
            })}
        </TableBody>
      </StyledTable>

      <TablePagination
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={join.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ 'aria-label': 'Next Page' }}
        backIconButtonProps={{ 'aria-label': 'Previous Page' }}
      />
    </Box>
  );
};

export default PaginationTable;
