import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button, Link } from '@mui/material';

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
        name: "competition_group_name",
        label: "COMPETITION GROUP NAME",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "total_competition",
        label: "TOTAL COMPETITION",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "competition_date",
        label: "COMPETITION-DATE",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "winner_name",
        label: "WINNER",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "Link",
        label: "MORE DETAILS",
        options: {
            filter: false,
            sort: false,
            empty: false,
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <>
                        <Link to={{
                            pathname: `/competition-group/MoreDetailsTable`,
                        }}>
                            <Button
                                color="primary"
                                variant="outlined"
                                sx={{ width: 100, padding: 0, margin: 0 }}
                            >
                                More-Details
                            </Button>
                        </Link>
                    </>
                );
            }
        }
    },
    // {
    //     field: "Print",
    //     renderCell: (cellValues) => {
    //       return (
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           onClick={(event) => {
    //             handleClick(event, cellValues);
    //           }}
    //         >
    //           Print
    //         </Button>
    //       );
    //     }
    //   }
]

const options = {
    filterTypes: "multiselect",
}
export default function CompGroupTableData() {
    // --------------------FETCH DATA--------------------------
    let [users, setUsers] = useState([]);
    let fetchData = () => {
        fetch('http://localhost:4000/competitiongroupdetails')
            .then((response) => {
                console.log('response');
                return response.json();
            })
            .then((data) => {
                console.log('data', data);
                setUsers(data.response.items);
            })
    };
    console.log('after pagination table');
    useEffect(() => {
        fetchData();
    }, []);
    // --------------------END FETCH DATA--------------------------
    return (
        <>
            <MUIDataTable
                title={'COMPETITION - GROUP'}
                columns={columns}
                data={users}
                options={options}
            />

        </>
    )
}
