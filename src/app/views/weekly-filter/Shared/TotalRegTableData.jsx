import React from "react"
import MUIDataTable from "mui-datatables";
import { useLocation } from 'react-router-dom';

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
        name: "updated",
        label: "UPDATED",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "created",
        label: "CREATED",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "expiryDate",
        label: "EXPIRY DATE",
        options: {
            filter: true,
            sort: false,
        }
    },
];

const options = {
    filterType: "multiselect",
    // ** Other Some Options...
    // filterType: "checkbox, textField, dropdown",
    // filter: true,
    // responsive: 'stacked',
    // page: 2,
};
export default function Tables() {
    // // ** -------------By useLocation we get  prop from totalRecord
    // const { state } = useLocation();
    // console.log('state total Reg', state)
    // console.log('hello R-----------')
    return (
        <>
            <MUIDataTable
                title={"MEMBER REGISTRATION"}
                // data={state}
                columns={columns}
                options={options}
            />
        </>
    );
}
