import React from "react"
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";

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
    // ----------DB FETCH------------------------------
    const [regMember, setRegMember] = useState([]);
    const fetchJoinData = () => {
        fetch('http://localhost:4000/join')
            .then((response) => {
                console.log(' JOIN response');
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
            <MUIDataTable
                title={"MEMBER REGISTRATION"}
                data={regMember}
                columns={columns}
                options={options}
            />
        </>
    );
}
