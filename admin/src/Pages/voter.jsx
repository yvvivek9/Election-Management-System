import { useEffect, useState } from "react";
import axios from "axios";

import "../Styling/default.css";

export default function Party({ setLoading }) {
    useEffect(() => {
        fetchVoter();
    }, []);

    const [voter, setVoter] = useState([]);
    const [consti, setConsti] = useState([]);
    const [search, setSearch] = useState("");
    const [login, setLogin] = useState([]);

    const fetchVoter = async () => {
        try {
            var reply0 = await axios.post("/admin/getLogins", { user_type: "voter" });
            setLogin(reply0.data.data);
            var reply = await axios.post('/admin/getVoter');
            setVoter(reply.data.data);
            var reply2 = await axios.post('/admin/getConsti');
            setConsti(reply2.data.data);
            setLoading(false);
        } catch (error) {
            console.log("Error in fetchings voter \n" + error);
        }
    }

    const addVoter = async () => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/addVoter', {
                id: document.getElementById("new-voter-id").value,
                fname: document.getElementById("new-voter-fname").value,
                lname: document.getElementById("new-voter-lname").value,
                age: document.getElementById("new-voter-age").value,
                gender: document.getElementById("new-voter-gender").value,
                caste: document.getElementById("new-voter-caste").value,
                consti: document.getElementById("new-voter-consti").value,
            });
            await axios.post('/admin/addLogins', {
                user_type: "voter",
                user_id: document.getElementById('new-voter-id').value,
                user_name: document.getElementById('new-voter-username').value,
                user_pass: document.getElementById('new-voter-password').value,
            });
            fetchVoter();
        } catch (error) {
            console.log("Error in adding voter \n" + error);
        }
    }

    const deleteVoter = async (index) => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/deleteVoter', {
                id: document.getElementsByClassName("voter-id")[index].value
            });
            await axios.post('/admin/deleteLogins', {
                user_type: "voter",
                user_id: document.getElementsByClassName('voter-id')[index].value
            });
            fetchVoter();
        } catch (error) {
            console.log("Error in deleting voter \n" + error);
        }
    }

    const editVoter = async (index) => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/editVoter', {
                id: document.getElementsByClassName("voter-id")[index].value,
                fname: document.getElementsByClassName("voter-fname")[index].value,
                lname: document.getElementsByClassName("voter-lname")[index].value,
                age: document.getElementsByClassName("voter-age")[index].value,
                gender: document.getElementsByClassName("voter-gender")[index].value,
                caste: document.getElementsByClassName("voter-caste")[index].value,
                consti: document.getElementsByClassName("voter-consti")[index].value,
            });
            fetchVoter();
        } catch (error) {
            console.log("Error in adding voter \n" + error);
        }
    }

    const editLogin = async (index) => {
        try {
            setLoading(true);
            await axios.post('/admin/setLogins', {
                user_type: "voter",
                user_id: document.getElementsByClassName('voter-id')[index].value,
                user_name: document.getElementsByClassName('voter-username')[index].value,
                user_pass: document.getElementsByClassName('voter-password')[index].value
            });
            fetchVoter();
        } catch (error) {
            console.log("Error in changning login \n" + error);
        }
    }

    return <div className="page-screen">
        <div style={{ height: '2vh' }} />
        <marquee>/* This website is designed for a college project and has no link with the election commission */</marquee>
        <h2 style={{ marginLeft: "5vw" }}>Add a Voter :</h2>
        <div className="page-box">
            <div className="box-row">
                <div className="box-content">
                    <div>
                        Voter ID<br />
                        <input type="text" className="input-field" id="new-voter-id" defaultValue={voter.length !== 0 ? voter[voter.length - 1].id + 1 : ""} readOnly />
                    </div>
                    <div>
                        First Name<br />
                        <input type="text" className="input-field" id="new-voter-fname" />
                    </div>
                    <div>
                        Last Name<br />
                        <input type="text" className="input-field" id="new-voter-lname" />
                    </div>
                    <div>
                        Age<br />
                        <input type="text" className="input-field" id="new-voter-age" />
                    </div>
                    <div>
                        Gender<br />
                        <select className="input-field" id="new-voter-gender" defaultValue={"none"} >
                            <option value={"none"} disabled hidden>--</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>
                    </div>
                    <div>
                        Caste<br />
                        <select className="input-field" id="new-voter-caste" defaultValue={"none"} >
                            <option value={"none"} disabled hidden>--</option>
                            <option value={"OC"}>OC</option>
                            <option value={"BC"}>BC</option>
                            <option value={"SC-ST"}>SC-ST</option>
                        </select>
                    </div>
                    <div>
                        Constituency<br />
                        <select className="input-field" id="new-voter-consti" defaultValue={"none"} >
                            <option value={"none"} disabled hidden>--</option>
                            {consti.map((value, index) => {
                                return <option key={index} value={value.consti_id}>{value.consti_name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="action-buttons">
                    <div>
                        Login Username<br />
                        <input type="text" className="input-field" id="new-voter-username" />
                    </div>
                    <div>
                        Login Password<br />
                        <input type="text" className="input-field" id="new-voter-password" />
                    </div>
                </div>
                <div style={{ height: '4vh' }}></div>
                <div className="action-buttons">
                    <button className="input-button input-button-green" onClick={addVoter} >ADD</button>
                </div>
            </div>
        </div>
        <h2 style={{ marginLeft: "5vw" }}>List of Voters :</h2>
        <div style={{textAlign: "center"}}>
            <input className="search-field" placeholder="Enter name to search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
        </div>
        <div className="page-box">
            {voter.map((value, index) => {
                var hidden = false;
                if (search.length !== 0) {
                    hidden = true;
                    if (value.f_name.toLowerCase().match(search.toLowerCase()) || value.l_name.toLowerCase().match(search.toLowerCase()))
                        hidden = false;
                }
                return<div className="box-row" key={value.id} hidden={hidden} >
                    <div className="box-content">
                        <div>
                            Voter ID<br />
                            <input type="text" className="input-field voter-id" defaultValue={value.id} readOnly />
                        </div>
                        <div>
                            First Name<br />
                            <input type="text" className="input-field voter-fname" defaultValue={value.f_name} />
                        </div>
                        <div>
                            Last Name<br />
                            <input type="text" className="input-field voter-lname" defaultValue={value.l_name} />
                        </div>
                        <div>
                            Age<br />
                            <input type="text" className="input-field voter-age" defaultValue={value.age} />
                        </div>
                        <div>
                            Gender<br />
                            <select className="input-field voter-gender" defaultValue={value.gender} >
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </select>
                        </div>
                        <div>
                            Caste<br />
                            <select className="input-field voter-caste" defaultValue={value.caste} >
                                <option value={"OC"}>OC</option>
                                <option value={"BC"}>BC</option>
                                <option value={"SC-ST"}>SC-ST</option>
                            </select>
                        </div>
                        <div>
                            Constituency<br />
                            <select className="input-field voter-consti" >
                                {consti.map((value2, index2) => {
                                    if (value2.consti_id === value.consti_id)
                                        return <option key={index2} value={value2.consti_id} selected >{value2.consti_name}</option>
                                    else
                                        return <option key={index2} value={value2.consti_id}>{value2.consti_name}</option>
                                })}
                            </select>
                        </div> 
                    </div>
                    {login[index] && <div className="action-buttons">
                        <div>
                            Login Username<br />
                            <input type="text" className="input-field voter-username" defaultValue={login[index].user_name} />
                        </div>
                        <div>
                            Login Password<br />
                            <input type="text" className="input-field voter-password" defaultValue={login[index].user_pass} />
                        </div>
                        <button className="input-button" onClick={() => {editLogin(index)}} style={{top: "3vh"}} >Modify Login</button>
                    </div>}
                    <div style={{ height: '4vh' }}></div>
                    <div className="action-buttons">
                        <button className="input-button input-button-red" onClick={() => {deleteVoter(index)}} >Delete</button>
                        <button className="input-button input-button-green" onClick={() => {editVoter(index)}} >Change</button>
                    </div>
                    <hr />
                </div>
            })}
        </div>
    </div>
}