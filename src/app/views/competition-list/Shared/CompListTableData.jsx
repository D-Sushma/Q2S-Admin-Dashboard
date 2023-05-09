import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
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
        name: "sno",
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
        name: "subject",
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
    {
        name: "subscription",
        label: "SUBSCRIPTION",
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
export default function CompListTableData() {
    // ----------DB FETCH------------------------------
    let [users, setUsers] = useState([]);
    let fetchData = () => {
        fetch('http://localhost:4000/competitionlistdetails')
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log('data', data);
                setUsers(data.response.items);
            })
    };
    useEffect(() => {
        fetchData();
    }, [])
    // ----------DB FETCH END------------------------------
    return (
        <>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"COMPETITION - LIST"}
                    columns={columns}
                    data={users}
                    options={Options}
                />
            </ThemeProvider>
        </>
    )
}
