import { useEffect, useState } from "react";
import axios from "axios";

import "../Styling/default.css";

export default function Party({ setLoading }) {
    useEffect(() => {
        fetchParties();
    });

    const [parties, setParties] = useState([]);

    const fetchParties = async () => {
        try {
            var reply = await axios.post('/admin/getParty');
            setParties(reply.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetching parties \n" + error);
        }
    }

    const addParties = async () => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/addParty', {
                id: document.getElementById('new-party-id').value,
                name: document.getElementById('new-party-name').value,
                location: document.getElementById('new-party-location').value,
                leader: document.getElementById('new-party-leader').value,
                alliance: document.getElementById('new-party-alliance').value
            });
            fetchParties();
        } catch (error) {
            console.log("Error in adding party \n" + error);
        }
    }

    const deleteParties = async (index) => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/deleteParty', {
                id: document.getElementsByClassName('party-id')[index].value
            });
            fetchParties();
        } catch (error) {
            console.log("Error in deleting party \n" + error);
        }
    }

    const editParty = async (index) => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/editParty', {
                id: document.getElementsByClassName('party-id')[index].value,
                name: document.getElementsByClassName('party-name')[index].value,
                location: document.getElementsByClassName('party-location')[index].value,
                leader: document.getElementsByClassName('party-leader')[index].value,
                alliance: document.getElementsByClassName('party-alliance')[index].value
            });
            fetchParties();
        } catch (error) {
            console.log("Error in editing party\n" + error);
        }
    }

    return <div className="page-screen">
        <div style={{ height: '2vh' }} />
        <marquee>/* This website is designed for a college project and has no link with the election commission */</marquee>
        <h2 style={{ marginLeft: "5vw" }}>Add a Party :</h2>
        <div className="page-box">
            <div className="box-row">
                <div className="box-content">
                    <div>
                        Party ID<br />
                        <input type="text" className="input-field" id="new-party-id" defaultValue={parties.length !== 0 ? parties[parties.length - 1].id + 1 : ""} readOnly />
                    </div>
                    <div>
                        Party Name<br />
                        <input type="text" className="input-field" id="new-party-name" />
                    </div>
                    <div>
                        Party Location<br />
                        <input type="text" className="input-field" id="new-party-location" />
                    </div>
                    <div>
                        Party Leader<br />
                        <input type="text" className="input-field" id="new-party-leader" />
                    </div>
                    <div>
                        Party Alliance's<br />
                        <input type="text" className="input-field" id="new-party-alliance" style={{ width: "40vw" }} />
                    </div>
                </div>
                <div style={{ height: '4vh' }} />
                <div className="action-buttons">
                    <button className="input-button input-button-green" onClick={addParties}>ADD</button>
                </div>
            </div>
        </div>
        <h2 style={{ marginLeft: "5vw" }}>List of Parties :</h2>
        <div className="page-box">
            {parties.map((value, index) => {
                return <div className="box-row" key={value.id}>
                    <div className="box-content">
                        <div>
                            Party ID<br />
                            <input type="text" className="input-field party-id" defaultValue={value.id} readOnly />
                        </div>
                        <div>
                            Party Name<br />
                            <input type="text" className="input-field party-name" defaultValue={value.p_name} />
                        </div>
                        <div>
                            Party Location<br />
                            <input type="text" className="input-field party-location" defaultValue={value.p_location} />
                        </div>
                        <div>
                            Party Leader<br />
                            <input type="text" className="input-field party-leader" defaultValue={value.leader} />
                        </div>
                        <div>
                            Party Alliance's<br />
                            <input type="text" className="input-field party-alliance" defaultValue={value.alliance} style={{ width: "40vw" }} />
                        </div>
                    </div>
                    <div style={{ height: '4vh' }} />
                    <div className="action-buttons">
                        <button className="input-button input-button-red" onClick={() => {deleteParties(index)}} >Delete</button>
                        <button className="input-button input-button-green" onClick={() => {editParty(index)}} >Change</button>
                    </div>
                    <hr />
                </div>
            })}
        </div>
    </div>
}