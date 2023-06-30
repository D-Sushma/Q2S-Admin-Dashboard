import React from "react"
import MUIDataTable from "mui-datatables";
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
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "userid_name",
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
            sort: false,
        }
    },
    {
        name: "subscription",
        label: "SUBSCRIPTION",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "status",
        label: "STATUS",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "updated_at",
        label: "UPDATED",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "created_at",
        label: "CREATED",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "expiry_date",
        label: "EXPIRY DATE",
        options: {
            filter: true,
            sort: false,
        }
    },
];

const options = {
    filterType: "multiselect",
    rowsPerPage: [5],
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    jumpToPage: true,
    selectableRows: false,
    // ** Other Some Options...
    // filterType: "checkbox, textField, dropdown",
    // filter: true,
    // responsive: 'stacked',
    // page: 2,
};
export default function Tables() {
    // ** -------------By useLocation we get  prop from totalRecord
    const { state } = useLocation();
    console.log('state total Reg', state)

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
                        routeSegments={[{ name: 'Total Registration', path: '/weekly-filter' }, { name: 'Table' }]}
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

                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={"TOTAL REGISTRATION"}
                        data={state}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
            </Container>
        </>
    );
}
