import moment from 'moment';
import { Link } from 'react-router-dom';
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
import { useState, useEffect } from 'react';
// FOR BACK BUTTON...........................................
import { Button } from '@mui/material';

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

  // console.log('inside pagination table');
  // ----------DB FETCH------------------------------
  let [users, setUsers] = useState([]);
  let fetchData = () => {
    fetch('http://localhost:4000/competitiongroupdetails')
      .then((response) => {
        // console.log('response' );
        return response.json();
      })
      .then((data) => {
        console.log('inside data of competition group', data);
        setUsers(data.response.results);
      })
  };
  // console.log('after pagination table');
  useEffect(() => {
    fetchData();
  }, []);
  // ----------DB FETCH END------------------------------

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
      <StyledTable sx={{ tableLayout: 'auto', margin: 0, padding: 0 }} bgcolor="#f4f4f4">
        <TableHead bgcolor="#fafafa">
          <TableRow >
            <TableCell align="center">SNO</TableCell>
            <TableCell align="center">COMPETITION GROUP ID</TableCell>
            <TableCell align="center">TOTAL COMPETITION</TableCell>
            <TableCell align="center">COMPETITION-DATE</TableCell>
            <TableCell align="center">WINNER</TableCell>
            <TableCell align="center">MORE_DETAIL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.competition_group_id}</TableCell>
                  <TableCell align="center">{user.grp_cnt}</TableCell>
                  <TableCell align="center">{moment(user.test_date).format('DD/MM/YYYY')}</TableCell>
                  <TableCell align="center">{user.winner_name}</TableCell>
                  <TableCell align="center">

                    {/* <Link to={`/competition-group/MoreDetailsTable/${user.competition_group_id}`}> */}
                    <Link to={{
                      // pathname: `/competition-group/MoreDetailsTable/${user.competition_group_id}`,
                      pathname: `/competition-group/MoreDetailsTableData/${user.competition_group_id}`,
                    }}>
                      <Button
                        // onClick={() => navigate(`/ competition - group / MoreDetailsTable / ${user.competition_group_id}`)}
                        // onClick={() => navigate(`/competition-group/MoreDetailsTable`)}
                        color="primary"
                        variant="outlined"
                        sx={{ width: 100, padding: 0, margin: 0 }}
                      >
                        More-Details
                      </Button>
                    </Link>
                  </TableCell>

                </TableRow>
              )
            })}
        </TableBody>
      </StyledTable >

      <TablePagination
        // text-44 
        text-44="true"
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
    </Box >
  );
};

export default PaginationTable;