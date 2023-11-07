import { useEffect, useState } from "react";
import axios from "axios";

import "../Styling/default.css";

export default function Party({ setLoading }) {
    useEffect(() => {
        getAllResults();
    }, []);

    const [year, setYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState(0);
    const [results, setResults] = useState([]);
    const [reset, setReset] = useState(true);

    useEffect(() => {
        if (selectedYear !== 0) viewYearResults();
    }, [selectedYear]);

    const getAllResults = async () => {
        try {
            var reply = await axios.post('/admin/getAllResults');
            setYear(reply.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetching all results \n" + error);
        }
    }

    const addYearResults = async () => {
        try {
            var inputYear = document.getElementById("new-year").value;
            await axios.post('/admin/addYearResult', {
                table: "r_" + inputYear,
                year: year
            });
            getAllResults();
        } catch (error) {
            console.log("Error adding new year \n" + error);
        }
    }

    const viewYearResults = async () => {
        try {
            setReset(false);
            var reply = await axios.post('/admin/getResultsOfYear', {
                table: "r_" + selectedYear
            });
            setResults(reply.data.data);
            setReset(true);
        } catch (error) {
            console.log("Error in viewing results \n" + error);
        }
    }

    const setYearResults = async () => {
        try {
            setLoading(true);
            var data = [];
            var id = document.getElementsByClassName("result-id");
            var share = document.getElementsByClassName("result-share");
            for (var i = 0; i < id.length; i++) {
                data.push({
                    candidate_id: id[i].innerHTML,
                    vote_share: share[i].value
                });
            }
            await axios.post('/admin/setResultsOfYear', {
                table: "r_" + selectedYear,
                data: data
            });
            setLoading(false);
            viewYearResults();
        } catch (error) {
            console.log("Error in setting results \n" + error);
        }
    }

    const releaseYearResults = async (year) => {
        try {
            await axios.post('/admin/releaseResultsOfYear', {
                year: year
            });
            getAllResults();
        } catch (error) {
            console.log("Error in releasing results \n" + error);
        }
    }

    return <div className="page-screen">
        <table className="table">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Released</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {year.map((value) => {
                    return <tr key={value.r_year}>
                        <td>{value.r_year}</td>
                        <td>{value.released === "Yes" ? "Yes" : <button className="input-button" onClick={() => {releaseYearResults(value.r_year)}}>Release</button>}</td>
                        <td><button className="input-button" onClick={() => { setSelectedYear(value.r_year) }}>View</button></td>
                    </tr>
                })}
            </tbody>
        </table>
        <div className="outside-content">
            <input type="text" className="input-field input-field-default" id="new-year" placeholder="Enter year" />
            <div style={{ width: "5vw" }} ></div>
            <button className="input-button" onClick={addYearResults} >ADD</button>
        </div>
        {selectedYear !== 0 && reset && <div className="page-box">
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
                    {results.map((value) => {
                        return <tr key={value.candidate_id}>
                            <td className="result result-id">{value.candidate_id}</td>
                            <td>{value.f_name + value.l_name}</td>
                            <td>{value.p_name}</td>
                            <td>{value.consti_name}</td>
                            <td><input type="text" className="input-field result-share" defaultValue={value.vote_share} style={{textAlign: "center"}} /></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className="action-buttons">
                <button className="input-button input-button-green" onClick={setYearResults}>Submit</button>
            </div>
        </div>}
    </div>
}