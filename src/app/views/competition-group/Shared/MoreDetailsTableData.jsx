import React from "react"
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
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
                    padding: 0,
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

const options = {
    filterType: "multiselect",
    rowsPerPage: [5],
    rowsPerPageOptions: [5, 10, 25, 100],
    jumpToPage: true,
    // ** Other Some Options...
    // filterType: "checkbox, textField, dropdown",
    // filter: true,
    // responsive: 'stacked',
    // page: 2,
};
export default function Tables() {
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
                console.log('inside data of more details table data', data);
                setUsers(data.items);
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
            </Container>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"MORE-DETAILS"}
                    data={users}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </>
    );
}
