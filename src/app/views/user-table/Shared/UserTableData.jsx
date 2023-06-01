import React from "react"
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
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
                    // textAlign: "center",
                    '&:n-th-child(2)': {
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
        name: "full_name",
        label: "NAME",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "mobile",
        label: "MOBILE",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "emailid",
        label: "EMAIL ID",
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
        name: "created_at",
        label: "CREATED AT",
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
    selectableRows: "none",
    // ** Other Some Options...
    // filterType: "checkbox, textField, dropdown",
    // filter: true,
    // responsive: 'stacked',
    // page: 2,
};
export default function Tables() {
    // ----------DB FETCH------------------------------
    const [users, setUsers] = useState([]);
    const fetchData = () => {
        fetch('http://localhost:4000/usertabledetails')
            .then((response) => {
                // console.log('response');
                return response.json();
            })
            .then((data) => {
                console.log("inside data", data);
                setUsers(data.response.items);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    // ----------DB FETCH END-------------------------
    return (
        <>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"USERS"}
                    data={users}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </>
    );
}
