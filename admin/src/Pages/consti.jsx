import { useEffect, useState } from "react";
import axios from "axios";

import "../Styling/default.css";


export default function Consti({ setLoading }) {
    useEffect(() => {
        fetchConsti();
    }, []);

    const [consti, setConsti] = useState([]);

    const fetchConsti = async () => {
        try {
            var reply = await axios.post('/admin/getConsti');
            setConsti(reply.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetching consti" + error);
        }
    }

    const addConsti = async () => {
        try {
            var reply = await axios.post('/admin/addConsti', {
                id: document.getElementById('new-consti-id').value,
                name: document.getElementById('new-consti-name').value,
                state: document.getElementById('new-consti-state').value
            });
            fetchConsti();
        } catch (error) {
            console.log("Error in adding consti \n" + error);
        }
    }

    const deleteConsti = async (index) => {
        try {
            var reply = await axios.post('/admin/deleteConsti', {
                id: document.getElementsByClassName('consti-id')[index].value
            });
            fetchConsti();
        } catch (error) {
            console.log("Error in deleting consti \n" + error);
        }
    }

    const changeConsti = async (index) => {
        try {
            var reply = await axios.post('/admin/editConsti', {
                id: document.getElementsByClassName('consti-id')[index].value,
                name: document.getElementsByClassName('consti-name')[index].value,
                state: document.getElementsByClassName('consti-state')[index].value,
            });
            fetchConsti();
        } catch (error) {
            console.log("Error in changing consti \n" + error);
        }
    }

    return <div className="page-screen">
        <div style={{ height: '2vh' }} />
        <marquee>/* This website is designed for a college project and has no link with the election commission */</marquee>
        <h2 style={{ marginLeft: "5vw" }}>Add a Constituencies :</h2>
        <div className="page-box">
            <div className="box-row">
                <div className="box-content">
                    <div>
                        Constituency ID <br />
                        <input type="text" className="input-field" id="new-consti-id" defaultValue={consti.length !== 0 ? consti[consti.length - 1].consti_id + 1 : ""} />
                    </div>
                    <div>
                        Constituency Name <br />
                        <input type="text" className="input-field" id="new-consti-name" />
                    </div>
                    <div>
                        Constituency State <br />
                        <input type="text" className="input-field" id="new-consti-state" />
                    </div>
                </div>
                <div style={{ height: '4vh' }} />
                <div className="action-buttons">
                    <button className="input-button input-button-green" onClick={addConsti}>ADD</button>
                </div>
            </div>
        </div>
        <h2 style={{ marginLeft: "5vw" }}>List of Constituencies :</h2>
        <div className="page-box">
            {consti.map((value, index) => {
                return <div className="box-row" key={value.consti_id}>
                    <div className="box-content">
                        <div>
                            Constituency ID <br />
                            <input type="text" className="input-field consti-id" defaultValue={value.consti_id} readOnly />
                        </div>
                        <div>
                            Constituency Name <br />
                            <input type="text" className="input-field consti-name" defaultValue={value.consti_name} />
                        </div>
                        <div>
                            Constituency State <br />
                            <input type="text" className="input-field consti-state" defaultValue={value.consti_state} />
                        </div>
                    </div>
                    <div style={{ height: '4vh' }} />
                    <div className="action-buttons">
                        <button className="input-button input-button-red" onClick={() => {deleteConsti(index)}} >Delete</button>
                        <button className="input-button input-button-green" onClick={() => {changeConsti(index)}} >Change</button>
                    </div>
                    <hr />
                </div>
            })}
        </div>
    </div>
}