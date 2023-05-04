import React from 'react';
import MUIDataTable from 'mui-datatables';
import { useLocation } from 'react-router-dom';

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
        label: "PLAYER1(p1)",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "subject",
        label: "PLAYER2(p2)",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p1_name",
        label: "POINT P1",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "p2_name",
        label: "POINT P2",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "test_date",
        label: "P1 TIME",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "subscription",
        label: "P2 TIME",
        option: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "subscription",
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
        name: "slot_end",
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
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    jumpToPage: true,
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
    // // ** -------------By useLocation we get  prop from totalRecord
    // const { state } = useLocation();
    // console.log('state total Comp', state)
    // console.log('hello C-----------')
    return (
        <>
            <div className="App wrapper">
                <MUIDataTable
                    title={"TOTAL COMPETITION"}
                    columns={columns}
                    // data={state}
                    options={Options}
                />
            </div>
        </>
    )
}
