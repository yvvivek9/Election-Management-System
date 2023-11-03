import { useEffect, useState } from 'react';
import axios from 'axios';

import '../Styling/default.css';

export default function Dashboard({ setLoading }) {
    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const [announcements, setAnnouncements] = useState([]);

    const fetchAnnouncements = async () => {
        try {
            var response = await axios.post('/getAnnouncements');
            if(response.status === 200) {
                setAnnouncements(response.data.announcements);
                setLoading(false);
            }
        } catch (error) {
            console.log('Error in fetching announcements' + error);
        }
    }

    const changeAnnouncements = async () => {
        var data = document.getElementsByClassName("announcement-input");
        var dataSorted = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].value !== "") {
                dataSorted.push(data[i].value);
            }
        }
        try {
            var response = await axios.post('/setAnnouncements', {data: dataSorted});
            if (response.status === 200) {
                setAnnouncements(response.data.announcements);
            }
        } catch (error) {
            console.log('Error in setting announcements' + error);
        }
    }

    const addAnnouncement = () => {
        setAnnouncements([...announcements, ""]);
    }

    return <div className='page-screen'>
        <div style={{height: '2vh'}} />
        <marquee>/* This website is designed for a college project and has no link with the election commission */</marquee>
        <div className='page-box'>
            <div style={{fontSize: '2.6vh', fontWeight: 'bold'}}>Announcements 📢</div>
            <div style={{height: '2vh'}} />
            {announcements.map((value, index) => {
                return <div key={index}>
                    {(index + 1) + " ) "}&nbsp;<input className='input-field announcement-input' type='text' defaultValue={announcements[index]} />
                    <div style={{height: '1vh'}} />
                </div>
            })}
            <div style={{height: '2vh'}} />
            <div className='action-buttons'>
                <button className='input-button' onClick={addAnnouncement}>Add Announcements</button>
                <button className='input-button' onClick={changeAnnouncements}>Submit</button>
            </div>
        </div>
    </div>
}