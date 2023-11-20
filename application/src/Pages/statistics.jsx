import { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";

import "../Styling/page2.css";

export default function Statistics({ setLoading }) {
    useEffect(() => {
        fetchConsti();
    }, []);

    const [consti, setConsti] = useState([]);
    const [selectedID, setSelectedID] = useState(0);
    const [data, setData] = useState();

    const fetchStats = async () => {
        try {
            var reply = await axios.post("/getStats", {
                consti_id: selectedID
            });
            setData(reply.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetching consti \n" + error);
        }
    }

    useEffect(() => {
        if (selectedID !== 0) {
            setLoading(true);
            fetchStats();
        }
    }, [selectedID]);

    const fetchConsti = async () => {
        try {
            var reply = await axios.post('/admin/getConsti');
            setConsti(reply.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetching consti \n" + error);
        }
    }

    return <div className="page-screen">
        <div className="page-box">
            <div className="action-buttons">
                <select className="search-field" value={selectedID} onChange={(e) => { setSelectedID(e.target.value) }} >
                    <option value={"0"} disabled hidden>-- Select Constituency --</option>
                    {consti.map((value) => {
                        return <option key={value.consti_id} value={value.consti_id}>{value.consti_name}</option>
                    })}
                </select>
            </div>
        </div>
        {data && <div className="page-box page-box-flex">
            <div className="box">
                <div style={{height: "15vh"}} ></div>
                <div style={{ fontSize: "5vh", lineHeight: "6vh" }}>Total</div>
                <div style={{ fontSize: "5vh", lineHeight: "6vh" }}>{data.men + data.women}</div>
                <div style={{ fontSize: "3vh", lineHeight: "4vh" }}>members</div>
                <div style={{height: "15vh"}} ></div>
            </div>
            <div className="box">
                <h3>Gender</h3>
                <div className="pi-box">
                    <PieChart series={[
                        {
                            data: [
                                { id: 0, label: "Male", value: data.men, color: "#0039e6" },
                                { id: 1, label: "Female", value: data.women, color: "#1a53ff" },
                            ]
                        }
                    ]} />
                </div>
                <div style={{height: "5vh"}} ></div>
            </div>
            <div className="box">
                <h3>Caste</h3>
                <div className="pi-box">
                    <PieChart series={[
                        {
                            data: [
                                { id: 0, label: "OC", value: data.oc, color: "#0039e6" },
                                { id: 1, label: "BC", value: data.bc, color: "#1a53ff" },
                                { id: 2, label: "SC/ST", value: data.scst, color: "#809fff" },
                            ]
                        }
                    ]} />
                </div>
                <div style={{height: "5vh"}} ></div>
            </div>
        </div>}
    </div>
}
