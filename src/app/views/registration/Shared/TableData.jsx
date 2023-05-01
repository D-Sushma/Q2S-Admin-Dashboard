import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";

const columns = ["SNO", "USER ID", "SUBJECT", "SUBSCRIPTION", "STATUS", "UPDATED", "CREATED", "EXPIRY DATE"];

const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
    filterType: "checkbox",
};

export default function Tables() {
    // ----------DB FETCH------------------------------
    const [join, setJoin] = useState([]);
    const fetchJoinData = () => {
        fetch('http://localhost:4000/join')
            .then((response) => {
                console.log(' JOIN response');
                return response.json();
            })
            .then((data) => {
                console.log('inside JOIN data inside TableData', data);
                setJoin(data.response);
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
                data={data}
                columns={columns}
                options={options}
            />

        </>
    );
}
