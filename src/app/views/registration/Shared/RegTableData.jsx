import React from "react"
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
                    // '&:nth-child(8)': {   //it give error
                    // ** solve by --> n-th-child(8) OR  nth-of-type(8)
                    '&:n-th-child(8)': {
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
    {
        name: "subscription",
        label: "SUBSCRIPTION",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "status",
        label: "STATUS",
        options: {
            filter: true,
            sort: true,
        }
    },
    // {
    //     name: "updated",
    //     label: "UPDATED",
    //     options: {
    //         filter: true,
    //         sort: true,
    //     }
    // },
    {
        name: "created",
        label: "CREATED",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "expiryDate",
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
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    jumpToPage: true,
    // selectableRows: false,  // give error 
    // solve by "single", "multiple", "none"
    selectableRows: "none",
    // ** Other Some Options...
    // filterType: "checkbox, textField, dropdown",
    // filter: true,
    // responsive: 'stacked',
    // page: 2,
};
export default function Tables() {
    // ----------DB FETCH------------------------------
    const [regMember, setRegMember] = useState([]);
    const fetchJoinData = () => {
        fetch('http://localhost:4000/join')
            .then((response) => {
                // console.log(' JOIN response');
                return response.json();
            })
            .then((data) => {
                console.log('inside JOIN data inside TableData', data);
                setRegMember(data.response.items);

            });
    };
    useEffect(() => {
        fetchJoinData();
    }, []);
    // ----------DB FETCH END-------------------------
    return (
        <>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"MEMBER REGISTRATION"}
                    data={regMember}
                    columns={columns}
                    options={options}
                />
            </ThemeProvider>
        </>
    );
}
