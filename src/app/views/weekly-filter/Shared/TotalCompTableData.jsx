import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Breadcrumb } from 'app/components';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const getMuiTheme = () => createTheme({
    components: {
        MUIDataTableBodyCell: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f4f4f4",
                    // innerHeight: "20px",
                    margin: 0,
                    padding: 5,
                    textAlign: "center",
                    '&:nth-child(2)': {
                        // width: 30,
                        height: "auto",
                    }
                }
            }
        },
    },
})

const columns = [
    {
        name: "id",
        label: "SNO",
        option: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "p1_name",
        label: "PLAYER1(p1)",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p2_name",
        label: "PLAYER2(p2)",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p1_correct_count",
        label: "POINT P1",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p2_correct_count",
        label: "POINT P2",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p1_time_taken",
        label: "P1 TIME",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p1_time_taken",
        label: "P2 TIME",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "winner_id",
        label: "WINNER",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "slot_start",
        label: "SLOT START",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "slot_end",
        label: "SLOT END",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "is_walk_over",
        label: "WALK OVER",
        option: {
            filter: true,
            sort: false,
        }
    },
]
// const data = [{ sno: 1, competition_group_id: 20.00, slot_end: 20.00 }]
const Options = {
    filterType: "multiselect",
    rowsPerPage: [5],
    rowsPerPageOptions: [10, 20, 50, 100],
    jumpToPage: true,
    selectableRows: false,
    // textLabels: {
    //     pagination: {
    //         next: "Next >",
    //         previous: "< Previous",
    //         rowsPerPage: "Total items Per Page",
    //         displayRows: "OF"
    //     }
    // },
    // onChangePage(currentPage) {
    //     console.log({ currentPage });
    // },
    // onChangeRowsPerPage(numberOfRows) {
    //     console.log({ numberOfRows });
    // }
}
export default function CompListTableData() {
    // ** -------------By useLocation we get  prop from totalRecord
    const { state } = useLocation();
    console.log('state total Comp', state)

    // -------------FOR BACK BUTTON--------------------
    const navigate = useNavigate();
    // ...............FOR BREADCRUMB CONTAINER COMPONENT.........................
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
                        routeSegments={[{ name: 'Total Competition', path: '/weekly-filter' }, { name: 'Table' }]}
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
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"TOTAL COMPETITION"}
                    columns={columns}
                    data={state}
                    options={Options}
                />
            </ThemeProvider>
        </>
    )
}
