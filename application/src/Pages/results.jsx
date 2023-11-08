import { useState, useEffect } from "react";
import axios from "axios";

import "../Styling/page2.css";

export default function Statistics({ setLoading }) {
    useEffect(() => {
        fetchResults();
    }, []);

    const [availableResults, setavailableResults] = useState([]);
    const [selectedYear, setSelectedYear] = useState(0);
    const [data, setData] = useState();

    const fetchData = async () => {
        try {
            var reply = await axios.post("/admin/getResultsOfYear", {
                year: selectedYear
            });
            setData(reply.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetching consti \n" + error);
        }
    }

    useEffect(() => {
        if (selectedYear !== 0) {
            setLoading(true);
            fetchData();
        }
    }, [selectedYear]);

    const fetchResults = async () => {
        try {
            var reply = await axios.post('/admin/getAllAvailableResults');
            setavailableResults(reply.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetching consti \n" + error);
        }
    }

    return <div className="page-screen">
        <div className="page-box">
            <div className="action-buttons">
                <select className="search-field" value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value) }} >
                    <option value={"0"} disabled hidden>-- Select Year --</option>
                    {availableResults.map((value) => {
                        if (value.released === "Yes")
                            return <option key={value.r_year} value={value.r_year}>{value.r_year}</option>
                    })}
                </select>
            </div>
        </div>
        {data && <div className="page-box">
            <h2>Results of year {selectedYear}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Candidate ID</th>
                        <th>Candidate Name</th>
                        <th>Candidate Party</th>
                        <th>Constituency Name</th>
                        <th>Vote Share</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value) => {
                        return <tr key={value.candidate_id}>
                            <td>{value.candidate_id}</td>
                            <td>{value.f_name + value.l_name}</td>
                            <td>{value.p_name}</td>
                            <td>{value.consti_name}</td>
                            <td>{value.vote_share}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>}
    </div>
}