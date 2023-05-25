import React from "react"
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { Box, Button, styled } from "@mui/material";

const getMuiTheme = () => createTheme({
    components: {
        MUIDataTableBodyCell: {
            styleOverrides: {
                root: {
                    // border: 'solid 1px #000',
                    backgroundColor: "#f4f4f4",
                    // innerHeight: "20px",
                    margin: 0,
                    padding: 5,
                    // textAlign: "center",
                    '&:nth-child(8)': {
                        // width: 30,
                        height: "auto",
                        // backgroundColor: 'red',
                        // textAlign: 'center',
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
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "full_name",
        label: "USER ID",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "subject",
        label: "SUBJECT",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "subscription",
    //     label: "SUBSCRIPTION",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "status",
        label: "STATUS",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "created_at",
    //     // name: "created",
    //     label: "CREATED",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "expiry_date",
        // name: "expiryDate",
        label: "EXPIRY DATE",
        options: {
            filter: true,
            sort: true,
        }
    },
];

const options = {
    filterType: "multiselect",
    rowsPerPage: [5],
    rowsPerPageOptions: [10, 25, 50, 100],
    jumpToPage: true,
    selectableRows: false,
    // ** Other Some Options...
    // filterType: "checkbox, textField, dropdown",
    // filter: true,
    // responsive: 'stacked',
    // page: 2,
};
export default function ActiveUsers() {
    // ----------DB FETCH------------------------------
    const [currentReg, setCurrentReg] = useState([]);
    const fetchCurrentRegistration = () => {
        fetch('http://localhost:4000/current-week-registration')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('Current Registration', data);
                setCurrentReg(data.response.items);

            });
    };
    useEffect(() => {
        fetchCurrentRegistration();
    }, []);
    // ----------DB FETCH END-------------------------
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
                            { name: 'Current Registration', path: '' },
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
                        title={" ACTIVE USERS"}
                        data={currentReg}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
            </Container>
        </>
    );
}
