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
    const [search, setSearch] = useState("");
    const [login, setLogin] = useState([]);

    const fetchCandi = async () => {
        try {
            var reply0 = await axios.post("/admin/getLogins", { user_type: "candidate" });
            setLogin(reply0.data.data);
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

    const addCandi = async () => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/addCandi', {
                id: document.getElementById("new-candidate-id").value,
                fname: document.getElementById("new-candidate-fname").value,
                lname: document.getElementById("new-candidate-lname").value,
                age: document.getElementById("new-candidate-age").value,
                gender: document.getElementById("new-candidate-gender").value,
                caste: document.getElementById("new-candidate-caste").value,
                consti: document.getElementById("new-candidate-consti").value,
                ruling: document.getElementById("new-candidate-ruling").value,
                party: document.getElementById("new-candidate-party").value,
            });
            await axios.post('/admin/addLogins', {
                user_type: "candidate",
                user_id: document.getElementById('new-candidate-id').value,
                user_name: document.getElementById('new-candidate-username').value,
                user_pass: document.getElementById('new-candidate-password').value,
            });
            fetchCandi();
        } catch (error) {
            console.log("Error in adding candi \n" + error);
        }
    }

    const deleteCandi = async (index) => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/deleteCandi', {
                id: document.getElementsByClassName("candidate-id")[index].value
            });
            await axios.post('/admin/deleteLogins', {
                user_type: "candidate",
                user_id: document.getElementsByClassName('candidate-id')[index].value
            });
            fetchCandi();
        } catch (error) {
            console.log("Error in deleting candi \n" + error);
        }
    }

    const editCandi = async (index) => {
        try {
            setLoading(true);
            var reply = await axios.post('/admin/editCandi', {
                id: document.getElementsByClassName("candidate-id")[index].value,
                fname: document.getElementsByClassName("candidate-fname")[index].value,
                lname: document.getElementsByClassName("candidate-lname")[index].value,
                age: document.getElementsByClassName("candidate-age")[index].value,
                gender: document.getElementsByClassName("candidate-gender")[index].value,
                caste: document.getElementsByClassName("candidate-caste")[index].value,
                consti: document.getElementsByClassName("candidate-consti")[index].value,
                ruling: document.getElementsByClassName("candidate-ruling")[index].value,
                party: document.getElementsByClassName("candidate-party")[index].value,
            });
            fetchCandi();
        } catch (error) {
            console.log("Error in adding candi \n" + error);
        }
    }

    const editLogin = async (index) => {
        try {
            setLoading(true);
            await axios.post('/admin/setLogins', {
                user_type: "candidate",
                user_id: document.getElementsByClassName('candidate-id')[index].value,
                user_name: document.getElementsByClassName('candidate-username')[index].value,
                user_pass: document.getElementsByClassName('candidate-password')[index].value
            });
            fetchCandi();
        } catch (error) {
            console.log("Error in changning login \n" + error);
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
                        <input type="text" className="input-field" id="new-candidate-id" defaultValue={candi.length !== 0 ? candi[candi.length - 1].id + 1 : ""} readOnly />
                    </div>
                    <div>
                        First Name<br />
                        <input type="text" className="input-field" id="new-candidate-fname" />
                    </div>
                    <div>
                        Last Name<br />
                        <input type="text" className="input-field" id="new-candidate-lname" />
                    </div>
                    <div>
                        Age<br />
                        <input type="text" className="input-field" id="new-candidate-age" />
                    </div>
                    <div>
                        Gender<br />
                        <select className="input-field" id="new-candidate-gender" defaultValue={"none"} >
                            <option value={"none"} disabled hidden>--</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>
                    </div>
                    <div>
                        Caste<br />
                        <select className="input-field" id="new-candidate-caste" defaultValue={"none"} >
                            <option value={"none"} disabled hidden>--</option>
                            <option value={"OC"}>OC</option>
                            <option value={"BC"}>BC</option>
                            <option value={"SC-ST"}>SC-ST</option>
                        </select>
                    </div>
                    <div>
                        Constituency<br />
                        <select className="input-field" id="new-candidate-consti" defaultValue={"none"} >
                            <option value={"none"} disabled hidden>--</option>
                            {consti.map((value, index) => {
                                return <option key={index} value={value.consti_id}>{value.consti_name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        Ruling<br />
                        <select className="input-field" id="new-candidate-ruling" defaultValue={"none"} >
                            <option value={"none"} disabled hidden>--</option>
                            <option value={"Yes"}>Yes</option>
                            <option value={"No"}>No</option>
                        </select>
                    </div>
                    <div>
                        Party<br />
                        <select className="input-field" id="new-candidate-party" defaultValue={"none"} >
                            <option value={"none"} disabled hidden>--</option>
                            {party.map((value, index) => {
                                return <option key={index} value={value.id}>{value.p_name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="action-buttons">
                    <div>
                        Login Username<br />
                        <input type="text" className="input-field" id="new-candidate-username" />
                    </div>
                    <div>
                        Login Password<br />
                        <input type="text" className="input-field" id="new-candidate-password" />
                    </div>
                </div>
                <div style={{ height: '4vh' }}></div>
                <div className="action-buttons">
                    <button className="input-button input-button-green" onClick={addCandi} >ADD</button>
                </div>
            </div>
        </div>
        <h2 style={{ marginLeft: "5vw" }}>List of Candidates :</h2>
        <div style={{textAlign: "center"}}>
            <input className="search-field" placeholder="Enter name to search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
        </div>
        <div className="page-box">
            {candi.map((value, index) => {
                var hidden = false;
                if (search.length !== 0) {
                    hidden = true;
                    if (value.f_name.toLowerCase().match(search.toLowerCase()) || value.l_name.toLowerCase().match(search.toLowerCase()))
                        hidden = false;
                }
                return<div className="box-row" key={value.id} hidden={hidden} >
                    <div className="box-content">
                        <div>
                            Candidate ID<br />
                            <input type="text" className="input-field candidate-id" defaultValue={value.id} readOnly />
                        </div>
                        <div>
                            First Name<br />
                            <input type="text" className="input-field candidate-fname" defaultValue={value.f_name} />
                        </div>
                        <div>
                            Last Name<br />
                            <input type="text" className="input-field candidate-lname" defaultValue={value.l_name} />
                        </div>
                        <div>
                            Age<br />
                            <input type="text" className="input-field candidate-age" defaultValue={value.age} />
                        </div>
                        <div>
                            Gender<br />
                            <select className="input-field candidate-gender" defaultValue={value.gender} >
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                            </select>
                        </div>
                        <div>
                            Caste<br />
                            <select className="input-field candidate-caste" defaultValue={value.caste} >
                                <option value={"OC"}>OC</option>
                                <option value={"BC"}>BC</option>
                                <option value={"SC-ST"}>SC-ST</option>
                            </select>
                        </div>
                        <div>
                            Constituency<br />
                            <select className="input-field candidate-consti" >
                                {consti.map((value2, index2) => {
                                    if (value2.consti_id === value.consti_id)
                                        return <option key={index2} value={value2.consti_id} selected >{value2.consti_name}</option>
                                    else
                                        return <option key={index2} value={value2.consti_id}>{value2.consti_name}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            Ruling<br />
                            <select className="input-field candidate-ruling" defaultValue={value.ruling} >
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div>
                            Party<br />
                            <select className="input-field candidate-party" >
                                {party.map((value3, index3) => {
                                    if (value3.id === value.party_id)
                                        return <option key={index3} value={value3.id} selected >{value3.p_name}</option>
                                    else
                                        return <option key={index3} value={value3.id}>{value3.p_name}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    {login[index] && <div className="action-buttons">
                        <div>
                            Login Username<br />
                            <input type="text" className="input-field candidate-username" defaultValue={login[index].user_name} />
                        </div>
                        <div>
                            Login Password<br />
                            <input type="text" className="input-field candidate-password" defaultValue={login[index].user_pass} />
                        </div>
                        <button className="input-button" onClick={() => {editLogin(index)}} style={{top: "3vh"}} >Modify Login</button>
                    </div>}
                    <div style={{ height: '4vh' }}></div>
                    <div className="action-buttons">
                        <button className="input-button input-button-red" onClick={() => {deleteCandi(index)}} >Delete</button>
                        <button className="input-button input-button-green" onClick={() => {editCandi(index)}} >Change</button>
                    </div>
                    <hr />
                </div>
            })}
        </div>
    </div>
}