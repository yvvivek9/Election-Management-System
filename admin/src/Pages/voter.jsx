import { useEffect, useState } from "react";
import axios from "axios";

import "../Styling/default.css";

export default function Party({ setLoading }) {
    useEffect(() => {
        setLoading(false);
    });

    return <div className="page-screen">
        <div style={{ height: '2vh' }} />
        <marquee>/* This website is designed for a college project and has no link with the election commission */</marquee>
        <h2 style={{ marginLeft: "5vw" }}>Add a Voter :</h2>
        <div className="page-box">

        </div>
        <h2 style={{ marginLeft: "5vw" }}>List of Voters :</h2>
        <div className="page-box">

        </div>
    </div>
}