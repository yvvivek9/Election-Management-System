import { useEffect, useState } from "react";
import axios from "axios";

import "../Styling/default.css";

export default function Party({ setLoading }) {
    useEffect(() => {
        fetchCandi();
    }, []);

    const [candi, setCandi] = useState([]);
    const [consti, setConsti] = useState([]);
    const [party, setParty] = useState([]);

    const fetchCandi = async () => {
        try {
            var reply = await axios.post('/admin/getCandi');
            setCandi(reply.data.data);
            var reply2 = await axios.post('/admin/getConsti');
            setConsti(reply2.data.data);
            var reply3 = await axios.post('/admin/getParty');
            setParty(reply3.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetchings candis \n" + error);
        }
    }

    return <div className="page-screen">
        <div style={{ height: '2vh' }} />
        <marquee>/* This website is designed for a college project and has no link with the election commission */</marquee>
        <h2 style={{ marginLeft: "5vw" }}>Add a Candidate :</h2>
        <div className="page-box">
            <div className="box-row">
                <div className="box-content">
                    <div>
                        Candidate ID<br />
                        <input type="text" className="input-field" id="new-candidate-id" defaultValue={""} readOnly />
                    </div>
                </div>
                <div style={{ height: '5vh'}}></div>
                <div className="action-buttons">
                    <button className="input-button input-button-green">ADD</button>
                </div>
            </div>
        </div>
        <h2 style={{ marginLeft: "5vw" }}>List of Candidates :</h2>
        <div className="page-box">

        </div>
    </div>
}