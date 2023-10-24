const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const sleep = ms => new Promise(r => setTimeout(r, ms));

app.use(express.static(path.resolve('application', 'build')));
app.get("/", (req,res) => {
    res.sendFile(path.resolve('application', 'build', 'index.html'));
});

app.post("/validateLogin", async (req, res) => {
    console.log(req.body);
    await sleep(2000);
    var voter = {
        success: true,
        details: {
            status: true, 
            user: 'member',
            type: 'voter',
        },
        user: {
            id: 123456789,
            first_name: 'Vivek',
            last_name: 'Y V',
            age: '22',
            gender: 'Male',
            caste: 'Hindu',
            consti: 'Bengaluru North',
            state: 'Karnataka',
        },
        party: null
    }
    var candidate = {
        success: true,
        details: {
            status: true, 
            user: 'member',
            type: 'candidate',
        },
        user: {
            id: 1234567,
            first_name: 'Vivek',
            last_name: 'Y V',
            age: '22',
            gender: 'Male',
            caste: 'Hindu',
            consti: 'Bengaluru North',
            state: 'Karnataka',
            party: 'Jana Sena',
            ruling: 'Kakinada',
        },
    }
    var party = {
        success: true,
        details: {
            status: true, 
            user: 'party',
            type: 'party',
        },
        party: {
            id: 12345,
            name: 'BJP',
            location: 'Gujarat',
            leader: 'J P Nadda',
            alliance: ['chutiya', 'samja', 'kya'],
        }
    }
    if (req.body.id === 'voter') 
        res.status(200).json(voter);
    else if (req.body.id === 'candidate')
        res.status(200).json(candidate);
    else if (req.body.id === 'party') 
        res.status(200).json(party);
    else
        res.status(401).json({success: false});
});

app.post("/getPartyMembers", (req, res) => {
    console.log(req.body);
    var members = [
		{ id: '10', name: 'Narendra Modi', consti: 'Ahmedabad Main', state: 'Karnataka', ruling: true },
		{ id: '11', name: 'Amit Shah', consti: 'UP ka Raja', state: 'Uttar Pradesh', ruling: false }
	];
    res.status(200).json({members: members});
});

app.post('/getAnnouncements', (req, res) => {
    var announcements = [
        'Upcoming elections will be conducted in the month of January, 2024.',
        'Please check your respective polling booth atleast a week before election day, once they are released.',
        'Please check your Voter eligibilty and Biometric\'s verification before Dec, 2023.',
    ];
    res.status(200).json({announcements: announcements});
});

app.listen(4000, () => {
    console.log('Server started running on port 4000');
});