import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import moment from "moment";

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
            sort: false,
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
        // name: moment("updated_at").format('DD/MM/YYYY'),
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
    filterType: "checkbox",
};

// let arr1 = [];
// let arr2 = [];
export default function Tables() {
    // ----------DB FETCH------------------------------
    const [merged, setMerged] = useState([]);
    // const [regMember, setRegMember] = useState([]);
    // const [member, setMember] = useState([]);
    const fetchJoinData = () => {
        fetch('http://localhost:4000/join')
            .then((response) => {
                console.log(' JOIN response');
                return response.json();
            })
            .then((data) => {
                console.log('inside JOIN data inside TableData', data);
                // setRegMember(data.response.results);
                // setMember(data.response.items);
                var addArray = [];
                var arr1 = data.response.results;
                var arr2 = data.response.items;
                addArray = addArray.concat(arr1, arr2);
                // var storeObj = [];
                // addArray.forEach(element => {
                //     storeObj.push(element);
                // });
                // console.log('storeObj', storeObj)
                setMerged(addArray)
            });
    };
    // console.log('regMember', regMember)
    // console.log('member', member)
    console.log('merged', merged)
    useEffect(() => {
        fetchJoinData();
    }, []);
    // ----------DB FETCH END-------------------------
    return (
        <>
            <MUIDataTable
                title={"MEMBER REGISTRATION"}
                data={merged}
                columns={columns}
                options={options}
            />

        </>
    );
}
