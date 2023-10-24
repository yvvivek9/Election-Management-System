import { useEffect, useState } from "react";
import axios from "axios";

import '../Styling/voter.css';

import defaultDP from '../Media/default-dp.jpg';

export default function Voter({ party, setLoading }) {
    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const [announcements, setAnnouncements] = useState([]);
    const fetchAnnouncements = async () => {
        try {
            var response = await axios.post('/getAnnouncements');
            if (response.status === 200) {
                setAnnouncements(response.data.announcements);
            }
        } catch (error) {
            console.log('Error in fetching announcements' + error);
        }
    }

    const [members, setMembers] = useState([]);
    const [filters, setFilters] = useState({ filter: 'id', ruling: false });

    useEffect(() => {
        fetchMembers();
    }, [filters]);

    const fetchMembers = async () => {
        try {
            var response = await axios.post('/getPartyMembers', filters);
            if (response.status === 200) {
                setMembers(response.data.members);
                setLoading(false);
            }
        } catch (error) {
            console.log('Error in fetching members: ' + error);
        }
    }

    const handleFilterChange = (value) => {
        var buttons = document.getElementsByClassName('pm-sort-button');
        buttons[0].classList.remove('pm-sort-button-selected');
        buttons[1].classList.remove('pm-sort-button-selected');
        buttons[2].classList.remove('pm-sort-button-selected');
        if (value === 'id') {
            buttons[0].classList.add('pm-sort-button-selected');
            setFilters({ ...filters, filter: value });
        }
        else if (value === 'name') {
            buttons[1].classList.add('pm-sort-button-selected');
            setFilters({ ...filters, filter: value });
        }
        else if (value === 'state') {
            buttons[2].classList.add('pm-sort-button-selected');
            setFilters({ ...filters, filter: value });
        }
    }

    return <div className="voter-screen">
        <div style={{ height: '2vh' }} />
        <marquee>/* This website is designed for a college project and has no link with the election commission */</marquee>
        <div className="voter-details">
            <div className="vd-column-1">
                <div className="vd-row">
                    <div>Party ID</div>
                    <div>: &nbsp;&nbsp;&nbsp;{party.id}</div>
                </div>
                <div className="vd-row">
                    <div>Party Name</div>
                    <div>: &nbsp;&nbsp;&nbsp;{party.name}</div>
                </div>
                <div className="vd-row">
                    <div>Location</div>
                    <div>: &nbsp;&nbsp;&nbsp;{party.location}</div>
                </div>
                <div className="vd-row">
                    <div>Leader</div>
                    <div>: &nbsp;&nbsp;&nbsp;{party.leader}</div>
                </div>
                <div className="vd-row">
                    <div>Alliance's</div>
                    <div>: &nbsp;&nbsp;&nbsp;{party.alliance.map((value) => {
                        return value + ', '
                    })}</div>
                </div>
            </div>
            <div className="vd-column-2">
                <figure>
                    <img src={defaultDP} alt="bull shit" />
                    <figcaption>&#x2705; Verified Party <br />&#x2705; Biometrics verified</figcaption>
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
        <div className="voter-details voter-details-block">
            <div className="pm-sort">
                <div><b>Sort by :</b></div>
                <div style={{ width: '2vw' }}></div>
                <div className="pm-sort-button pm-sort-button-selected" onClick={() => { handleFilterChange('id') }}>ID</div>
                <div className="pm-sort-button" onClick={() => { handleFilterChange('name') }}>Name</div>
                <div className="pm-sort-button" onClick={() => { handleFilterChange('state') }}>State</div>
                <div style={{ flexGrow: '1' }}></div>
                <div>
                    <label>
                        <input type="checkbox" id="ruling-check" onChange={() => {
                            setFilters({ ...filters, ruling: !filters.ruling });
                        }} />&nbsp;Show only ruling
                    </label>
                </div>
            </div>
            <div style={{ height: '3vh' }}></div>
            <table className="members-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Constituency</th>
                        <th>State</th>
                        <th>Ruling</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((value, index) => {
                        return <tr key={index}>
                            <td>{value.id}</td>
                            <td>{value.name}</td>
                            <td>{value.consti}</td>
                            <td>{value.state}</td>
                            <td>{value.ruling ? 'Yes' : 'No'}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
}