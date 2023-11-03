const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const sqlQuery = (statement, params) => new Promise((resolve, reject) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Shadow@090703",
        database: "election",
    });
    
    con.connect((err) => {
        if(err) reject(err);
        else {
            con.query(statement, params, (err, result) => {
                if(err) reject(err);
                else {
                    con.end();
                    resolve(result);
                }
            });
        }
    });
});

var announcements = [
    'Upcoming elections will be conducted in the month of January, 2024.',
    'Please check your respective polling booth atleast a week before election day, once they are released.',
    'Please check your Voter eligibilty and Biometric\'s verification before Dec, 2023.',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

app.use(express.static(path.resolve('application', 'build')));
app.get("/", (req, res) => {
    res.sendFile(path.resolve('application', 'build', 'index.html'));
});

app.post("/admin/getConsti", async (req, res) => {
    try {
        var query = "SELECT * FROM consti ORDER BY consti_id";
        var reply = await sqlQuery(query);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/admin/addConsti", async (req, res) => {
    try {
        var query = "INSERT INTO consti VALUES (?, ?, ?)";
        var reply = await sqlQuery(query, [req.body.id, req.body.name, req.body.state]);
        var query3 = "INSERT INTO diversity VALUES (?, 0, 0, 0, 0, 0, 0)";
        var reply3 = await sqlQuery(query3, [req.body.id]);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/admin/deleteConsti", async (req, res) => {
    try {
        var query = "DELETE FROM consti WHERE consti_id = ?";
        var reply = await sqlQuery(query, [req.body.id]);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/admin/editConsti", async (req, res) => {
    try {
        var query = "UPDATE consti SET consti_name = ?, consti_state = ? WHERE consti_id = ?";
        var reply = await sqlQuery(query, [req.body.name, req.body.state, req.body.id]);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/admin/getParty", async (req, res) => {
    try {
        var query = "SELECT * FROM party ORDER BY id";
        var reply = await sqlQuery(query);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/admin/addParty", async (req, res) => {
    try {
        var query = "INSERT INTO party VALUES (?, ?, ?, ?, ?)";
        var reply = await sqlQuery(query, [
            req.body.id,
            req.body.name,
            req.body.location,
            req.body.leader,
            req.body.alliance
        ]);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/admin/deleteParty", async (req, res) => {
    try {
        var query = "DELETE FROM party WHERE id = ?";
        var reply = await sqlQuery(query, [req.body.id]);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/admin/editParty", async (req, res) => {
    try {
        var query = "UPDATE party SET p_name=?, p_location=?, leader=?, alliance=? WHERE id = ?";
        var reply = await sqlQuery(query, [
            req.body.name,
            req.body.location,
            req.body.leader,
            req.body.alliance,
            req.body.id
        ]);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/admin/getCandi", async (req, res) => {
    try {
        var query = 
        "SELECT candidate.*, consti.consti_name, party.p_name " +
        "FROM ((candidate " + 
        "INNER JOIN consti ON candidate.consti_id = consti.consti_id) " + 
        "INNER JOIN party ON candidate.party_id = party.id) " + 
        "ORDER BY id";
        var reply = await sqlQuery(query);
        res.status(200).json({success: true, data: reply});
    } catch (error) {
        console.log(error);
        res.status(401).json({success: false});
    }
});

app.post("/validateLogin", async (req, res) => {
    
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
        res.status(401).json({ success: false });
});

app.post("/getPartyMembers", (req, res) => {
    console.log(req.body);
    var members = [
        { id: '10', name: 'Narendra Modi', consti: 'Ahmedabad Main', state: 'Karnataka', ruling: true },
        { id: '11', name: 'Amit Shah', consti: 'UP ka Raja', state: 'Uttar Pradesh', ruling: false }
    ];
    res.status(200).json({ members: members });
});

app.post('/getAnnouncements', (req, res) => {
    res.status(200).json({success: true, announcements: announcements });
});

app.post('/setAnnouncements', (req, res) => {
    announcements = req.body.data;
    res.status(200).json({success: true, announcements: announcements });
});

app.listen(4000, () => {
    console.log('Server started running on port 4000');
});