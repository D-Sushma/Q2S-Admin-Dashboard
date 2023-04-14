import { useParams } from 'react-router-dom';
import ItemStore from '../../../utils/store';
import useStore from 'app/utils/store';

import moment from 'moment';
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
import { useEffect, useState } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useNavigate, useLocation } from 'react-router-dom';


const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
    },
}));

const PaginationTable = (props) => {
    // ===============Get id 
    const params = useParams();

    // ----------DB FETCH END-------------------------
    let [totalRegistration, setTotalRegistration] = useState([]);
    let fetchRegRecord = () => {
        fetch('http://localhost:4000/registration')
            // fetch(`http://localhost:4000/totalRegistration/${params.sId}/${params.dateRecord}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('Total record inside data Total  Record Details', data);
                // var passData = data.response;
                setTotalRegistration(data.response);
            });
    };
    useEffect(() => {
        fetchRegRecord();
    }, []);
    // ----------DB FETCH END------------------------------

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

    //  ........................FOR PAGINATION......................................
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // ---------------------------------------------------------
    // useEffect(() => {
    //  list()
    // }, [])

    const list = ItemStore((state) => state.items)
    console.log('list', list)
    console.log('list.length', list.length)
    // -----------------------------
    // to use state , if need to bind with DOM element
    const getItems = useStore((state) => state.items);
    const addItems = useStore(state => state.addItems);
    const subtractItems = useStore(state => state.subtractItems);
    const addItemsBy = useStore(state => state.addItemsBy);
    const subtractItemsBy = useStore(state => state.subtractItemsBy);
    const reset = useStore((state) => state.reset);

    const { state } = useLocation();
    // const { subid, date } = state;
    console.log('state', state)
    // console.log('subid', subid)
    // console.log('date', date)

    return (
        <>
            <Container>
                <Box className="breadcrumb" display="flex" justifyContent="space-between">
                    <Breadcrumb
                        routeSegments={[{ name: 'Registration', path: '/registration' }, { name: 'Table' }]}
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
            </Container>

            <h1>{getItems} people have cast their votes</h1>
            <button onClick={addItems}> increase vote</button>
            <button onClick={subtractItems}> delete vote</button>
            <button onClick={() => addItemsBy(10)}> increase vote by 10 </button>
            <button onClick={() => subtractItemsBy(10)}> delete vote by 10</button>
            <button onClick={reset}> reset vote </button>

            {state.map((ele, i) => (<h1 key={i}>{ele.id}</h1>))}
            <Box sx={{ mt: 1 }}>
                <SimpleCard title="MEMBER REGISTRATION">

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

                                {totalRegistration.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((joinuser, index) => {
                                        return (

                                            <TableRow key={index}>
                                                <TableCell align="center">{joinuser.id}</TableCell>
                                                {/* <TableCell align="center">{joinuser.name + " " + joinuser.lname}</TableCell> */}
                                                <TableCell align="center">{joinuser.userid}</TableCell>

                                                {(joinuser.subject) === 6 ? <TableCell align="center">English</TableCell>
                                                    : (joinuser.subject) === 13 ? <TableCell align="center">GK</TableCell>
                                                        : <TableCell align="center">----</TableCell>}

                                                {(joinuser.subscription) === 1 ? <TableCell align="center">Weekly</TableCell>
                                                    : <TableCell align="center">{joinuser.subscription}</TableCell>}

                                                {(joinuser.status) === 1 ? <TableCell align="center">Active</TableCell>
                                                    : (joinuser.status) === 0 ? <TableCell align="center">Deactive</TableCell>
                                                        : <TableCell align="center">----</TableCell>}

                                                <TableCell align="center">{moment(joinuser.updated_at).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align="center">{moment(joinuser.created_at).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align="center">{moment(joinuser.expiry_date).format('DD/MM/YYYY')}</TableCell>
                                            </TableRow>)
                                    })}
                            </TableBody>
                        </StyledTable>

                        <TablePagination
                            page={page}
                            component="div"
                            rowsPerPage={rowsPerPage}
                            count={totalRegistration.length}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                        />
                    </Box>

                </SimpleCard>
            </Box>
        </>
    );
};

export default PaginationTable;
