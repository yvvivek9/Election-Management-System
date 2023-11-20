import { useEffect, useState } from "react";
import axios from "axios";

import '../Styling/voter.css';

import defaultDP from '../Media/default-dp.jpg';

export default function Voter({ user, setLoading }) {
    useEffect(() => {
        fetchAnnouncements();
        setLoading(false);
    }, []);

    const [announcements, setAnnouncements] = useState([]);

    const fetchAnnouncements = async () => {
        try {
            var response = await axios.post('/getAnnouncements');
            if(response.status === 200) {
                setAnnouncements(response.data.announcements);
            }
        } catch (error) {
            console.log('Error in fetching announcements' + error);
        }
    }

    return <div className="voter-screen">
        <div style={{ height: '2vh' }} />
        <marquee>/* This website is designed for a college project and has no link with the election commission */</marquee>
        <div className="voter-details">
            <div className="vd-column-1">
                <div className="vd-row">
                    <div>Voter ID</div>
                    <div>: &nbsp;&nbsp;&nbsp;{user.id}</div>
                </div>
                <div className="vd-row">
                    <div>Name</div>
                    <div>: &nbsp;&nbsp;&nbsp;{user.f_name + ' ' + user.l_name}</div>
                </div>
                <div className="vd-row">
                    <div>Age</div>
                    <div>: &nbsp;&nbsp;&nbsp;{user.age}</div>
                </div>
                <div className="vd-row">
                    <div>Gender</div>
                    <div>: &nbsp;&nbsp;&nbsp;{user.gender}</div>
                </div>
                <div className="vd-row">
                    <div>Caste</div>
                    <div>: &nbsp;&nbsp;&nbsp;{user.caste}</div>
                </div>
                <div className="vd-row">
                    <div>Constituency</div>
                    <div>: &nbsp;&nbsp;&nbsp;{user.consti_name}</div>
                </div>
                <div className="vd-row">
                    <div>State</div>
                    <div>: &nbsp;&nbsp;&nbsp;{user.consti_state}</div>
                </div>
                {/* <div className="vd-row">
                    <div></div>
                    <div>: {}</div>
                </div> */}
            </div>
            <div className="vd-column-2">
                <figure>
                    <img src={defaultDP} alt="bull shit" />
                    <figcaption>&#x2705; Eligible to vote <br />&#x2705; Biometrics verified</figcaption>
                </figure>
            </div>
        </div>
        <div className="voter-details voter-details-block">
            <div style={{ fontSize: '2.6vh', fontWeight: 'bold' }}>Announcements 📢</div>
            <ul>
                {announcements.map((value, index) => {
                    return <li key={index}>{value}</li>
                })}
            </ul>
        </div>
    </div>
}