const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");

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
        if (err) reject(err);
        else {
            con.query(statement, params, (err, result) => {
                if (err) reject(err);
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

app.use("/owner/", express.static(path.resolve('admin', 'build')));
app.get("/owner/", (req, res) => {
    res.sendFile(path.resolve('admin', 'build', 'index.html'));
});

app.use("/", express.static(path.resolve('application', 'build')));
app.get("/", (req, res) => {
    res.sendFile(path.resolve('application', 'build', 'index.html'));
});

app.post("/admin/getLogins", async (req, res) => {
    try {
        var query = "SELECT * FROM login_db WHERE user_type = ? ORDER BY user_id";
        var reply = await sqlQuery(query, [req.body.user_type]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/addLogins", async (req, res) => {
    try {
        var query = "INSERT INTO login_db VALUES (?, ?, ?, ?)";
        await sqlQuery(query, [req.body.user_type, req.body.user_id, req.body.user_name, req.body.user_pass]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/deleteLogins", async (req, res) => {
    try {
        // var query = "DELETE FROM login_db WHERE user_type=? AND user_id=?";
        // await sqlQuery(query, [req.body.user_type, req.body.user_id]);
        var query = "DELETE FROM login_db WHERE user_id=?";
        await sqlQuery(query, [req.body.user_id]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
})

app.post("/admin/setLogins", async (req, res) => {
    try {
        var query = "UPDATE login_db SET user_name=?, user_pass=? WHERE user_type=? AND user_id=?";
        await sqlQuery(query, [req.body.user_name, req.body.user_pass, req.body.user_type, req.body.user_id])
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/getConsti", async (req, res) => {
    try {
        var query = "SELECT * FROM consti ORDER BY consti_id";
        var reply = await sqlQuery(query);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/addConsti", async (req, res) => {
    try {
        var query = "INSERT INTO consti VALUES (?, ?, ?)";
        var reply = await sqlQuery(query, [req.body.id, req.body.name, req.body.state]);
        var query3 = "INSERT INTO diversity VALUES (?, 0, 0, 0, 0, 0, 0)";
        var reply3 = await sqlQuery(query3, [req.body.id]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/deleteConsti", async (req, res) => {
    try {
        var query = "DELETE FROM consti WHERE consti_id = ?";
        var reply = await sqlQuery(query, [req.body.id]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/editConsti", async (req, res) => {
    try {
        var query = "UPDATE consti SET consti_name = ?, consti_state = ? WHERE consti_id = ?";
        var reply = await sqlQuery(query, [req.body.name, req.body.state, req.body.id]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/getParty", async (req, res) => {
    try {
        var query = "SELECT * FROM party ORDER BY id";
        var reply = await sqlQuery(query);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
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
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/deleteParty", async (req, res) => {
    try {
        var query = "DELETE FROM party WHERE id = ?";
        var reply = await sqlQuery(query, [req.body.id]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
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
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/getCandi", async (req, res) => {
    try {
        var query = "SELECT * FROM candidate ORDER BY id";
        var reply = await sqlQuery(query);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/addCandi", async (req, res) => {
    try {
        var query = "INSERT INTO candidate VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var reply = await sqlQuery(query, [
            req.body.id, req.body.fname, req.body.lname,
            req.body.age, req.body.gender, req.body.caste,
            req.body.consti, req.body.ruling, req.body.party
        ]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/deleteCandi", async (req, res) => {
    try {
        var query = "DELETE FROM candidate WHERE id = ?";
        var reply = await sqlQuery(query, [req.body.id]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/editCandi", async (req, res) => {
    try {
        var query = "UPDATE candidate SET f_name=?,  l_name=?, age=?, gender=?, caste=?, consti_id=?, ruling=?, party_id=? WHERE id = ?";
        var reply = await sqlQuery(query, [
            req.body.fname, req.body.lname,
            req.body.age, req.body.gender, req.body.caste,
            req.body.consti, req.body.ruling, req.body.party, req.body.id
        ]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/getVoter", async (req, res) => {
    try {
        var query = "SELECT * FROM voter ORDER BY id";
        var reply = await sqlQuery(query);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/addVoter", async (req, res) => {
    try {
        var query = "INSERT INTO voter VALUES (?, ?, ?, ?, ?, ?, ?)";
        var reply = await sqlQuery(query, [
            req.body.id, req.body.fname, req.body.lname,
            req.body.age, req.body.gender, req.body.caste,
            req.body.consti
        ]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/deleteVoter", async (req, res) => {
    try {
        var query = "DELETE FROM voter WHERE id = ?";
        var reply = await sqlQuery(query, [req.body.id]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/editVoter", async (req, res) => {
    try {
        var query = "UPDATE voter SET f_name=?,  l_name=?, age=?, gender=?, caste=?, consti_id=? WHERE id = ?";
        var reply = await sqlQuery(query, [
            req.body.fname, req.body.lname,
            req.body.age, req.body.gender, req.body.caste,
            req.body.consti, req.body.id
        ]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/getAllAvailableResults", async (req, res) => {
    try {
        var query = "SELECT * FROM show_results";
        var reply = await sqlQuery(query);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/addYearResult", async (req, res) => {
    try {
        var query2 = "INSERT INTO show_results VALUES (?, ?)";
        await sqlQuery(query2, [req.body.year, "No"]);
        var query3 = "INSERT INTO results " +
            "SELECT ?, id, consti_id, party_id, 0 FROM candidate";
        await sqlQuery(query3, [req.body.year]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/getResultsOfYear", async (req, res) => {
    try {
        var query = "SELECT results.*, candidate.f_name, candidate.l_name, consti.consti_name, party.p_name " +
            "FROM (((results INNER JOIN candidate ON results.candidate_id = candidate.id) " +
            "INNER JOIN consti ON results.consti_id = consti.consti_id) " +
            "INNER JOIN party ON results.party_id = party.id) " +
            "WHERE results.r_year = ? " +
            "ORDER BY consti_id";
        var reply = await sqlQuery(query, [req.body.year]);
        res.status(200).json({ success: true, data: reply });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/setResultsOfYear", async (req, res) => {
    try {
        /** @type {Array} data */
        var data = req.body.data;
        for (var i = 0; i < data.length; i++) {
            var query = "UPDATE results SET vote_share = ? WHERE candidate_id = ? AND r_year = ?";
            await sqlQuery(query, [data[i].vote_share, data[i].candidate_id, req.body.year]);
        }
        // var query2 = "CALL ??";
        // var reply2 = await sqlQuery(query2, ['set_ruling_' + req.body.table]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/admin/releaseResultsOfYear", async (req, res) => {
    try {
        var query = "UPDATE show_results SET released = 'Yes' WHERE r_year = ?";
        await sqlQuery(query, [req.body.year]);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
})

app.post("/validateLogin", async (req, res) => {
    try {
        var query = "SELECT * FROM login_db WHERE user_name=? AND user_pass=?";
        var reply = await sqlQuery(query, [req.body.user_name, req.body.user_pass]);
        if (reply.length !== 0) {
            if (reply[0].user_type === "party") {
                var query2 = "SELECT * FROM party WHERE id=?";
                var reply2 = await sqlQuery(query2, [reply[0].user_id]);
                var query3 = "SELECT COUNT(*) FROM candidate WHERE ruling='Yes' AND party_id = ?";
                var reply3 = await sqlQuery(query3, [reply[0].user_id]);
                res.status(200).json({
                    success: true,
                    details: {
                        status: true,
                        user: 'party',
                        type: 'party',
                    },
                    party: {
                        ...reply2[0],
                        count: reply3[0]["COUNT(*)"]
                    }
                });
            }
            else if (reply[0].user_type === "voter") {
                var query2 =
                    "SELECT voter.*, consti.consti_name, consti.consti_state FROM voter " +
                    "INNER JOIN consti ON voter.consti_id = consti.consti_id " +
                    "WHERE id = ?";
                var reply2 = await sqlQuery(query2, [reply[0].user_id]);
                
                res.status(200).json({
                    success: true,
                    details: {
                        status: true,
                        user: 'member',
                        type: 'voter',
                    },
                    user: reply2[0]
                });
            }
            else if (reply[0].user_type === "candidate") {
                var query2 =
                    "SELECT candidate.*, consti.consti_name, consti.consti_state, party.p_name FROM ((candidate " +
                    "INNER JOIN consti ON candidate.consti_id = consti.consti_id) " +
                    "INNER JOIN party ON candidate.party_id = party.id) " +
                    "WHERE candidate.id = ?";
                var reply2 = await sqlQuery(query2, [reply[0].user_id]);
                res.status(200).json({
                    success: true,
                    details: {
                        status: true,
                        user: 'member',
                        type: 'voter',
                    },
                    user: reply2[0]
                });
            }
        }
        else res.status(200).json({ success: false });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/getPartyMembers", async (req, res) => {
    try {
        var query = 
        "SELECT candidate.id, candidate.f_name, candidate.l_name, candidate.ruling, consti.consti_name, consti.consti_state " +
        "FROM candidate INNER JOIN consti ON candidate.consti_id = consti.consti_id " +
        "WHERE candidate.party_id=? ORDER BY ??";
        var reply = await sqlQuery(query, [req.body.party_id, req.body.filter]);
        res.status(200).json({ success: true, data: reply })
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
});

app.post("/getStats", async (req, res) => {
    try {
        var query = "SELECT * FROM diversity WHERE consti_id = ?";
        var reply = await sqlQuery(query, [req.body.consti_id]);
        res.status(200).json({ success: true, data: reply[0] });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false });
    }
})

app.post('/getAnnouncements', (req, res) => {
    res.status(200).json({ success: true, announcements: announcements });
});

app.post('/setAnnouncements', (req, res) => {
    announcements = req.body.data;
    res.status(200).json({ success: true, announcements: announcements });
});

app.listen(4000, () => {
    console.log('Server started running on port 4000');
});
