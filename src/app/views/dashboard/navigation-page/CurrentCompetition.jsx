import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { Box, Button, styled } from "@mui/material";


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
        name: "competition_group_id",
        label: "COMPETITION GROUP NAME",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "subject_id",
        label: "SUBJECT",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p1_name",
        label: "PLAYER1",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p2_name",
        label: "PLAYER2",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "test_date",
        label: "TEST-DATE",
        option: {
            filter: true,
            sort: false,
        }
    },
    // {
    //     name: "subscription",
    //     label: "SUBSCRIPTION",
    //     option: {
    //         filter: true,
    //         sort: false,
    //     }
    // },
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
]

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
export default function CurrentCompetition() {
    // ----------DB FETCH------------------------------
    let [currentComp, setCurrentComp] = useState([]);
    let fetchCurrentCompetition = () => {
        fetch('http://localhost:4000/current-week-competetion')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('Current Competition', data);
                setCurrentComp(data.response.items);
            })
    };
    useEffect(() => {
        fetchCurrentCompetition();
    }, [])
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
    return (
        <>
            <Container>
                <Box className="breadcrumb" display="flex" justifyContent="space-between">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Current Competition', path: '' },
                            { name: 'Table' },
                        ]}
                    />
                    <Box display="flex">
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
                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={"CURRENT COMPETITION"}
                        columns={columns}
                        data={currentComp}
                        options={Options}
                    />
                </ThemeProvider>
            </Container>
        </>
    )
}
