CREATE DATABASE IF NOT EXISTS election;
USE election;

CREATE TABLE IF NOT EXISTS login_db (
    user_type ENUM('party', 'candidate', 'voter'),
    user_id INT,
    user_name VARCHAR(50),  
    user_pass VARCHAR(50),
    CONSTRAINT login_pk PRIMARY KEY(user_type, user_id)
);

CREATE TABLE IF NOT EXISTS consti (
    consti_id INT PRIMARY KEY,
    consti_name VARCHAR(50),
    consti_state VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS diversity (
    consti_id INT PRIMARY KEY,
    total INT,
    men INT,
    women INT,
    oc INT,
    bc INT,
    scst INT,
    CONSTRAINT diversity_fk FOREIGN KEY (consti_id) REFERENCES consti(consti_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS voter (
    id INT PRIMARY KEY,
    f_name VARCHAR(50),
    l_name VARCHAR(50),
    age INT,
    gender ENUM('Male', 'Female'),
    caste ENUM('OC', 'BC', 'SC-ST'),
    consti_id INT,
    CONSTRAINT voter_fk FOREIGN KEY (consti_id) REFERENCES consti(consti_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS party (
    id INT PRIMARY KEY,
    p_name VARCHAR(50),
    p_location VARCHAR(50),
    leader VARCHAR(50),
    alliance VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS candidate (
    id INT PRIMARY KEY,
    f_name VARCHAR(50),
    l_name VARCHAR(50),
    age INT,
    gender ENUM('Male', 'Female'),
    caste ENUM('OC', 'BC', 'SC-ST'),
    consti_id INT,
    ruling ENUM('Yes', 'No'),
    party_id INT,
    CONSTRAINT candidate_fk1 FOREIGN KEY (consti_id) REFERENCES consti(consti_id) ON DELETE SET NULL,
    CONSTRAINT candidate_fk2 FOREIGN KEY (party_id) REFERENCES party(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS results (
    r_year INT PRIMARY KEY,
    released ENUM('Yes', 'No')
);

INSERT INTO consti (consti_id, consti_name, consti_state) VALUES
(1000, 'Constituency 1', 'State A'),
(1001, 'Constituency 2', 'State B'),
(1002, 'Constituency 3', 'State C'),
(1003, 'Constituency 4', 'State D'),
(1004, 'Constituency 5', 'State E');

INSERT INTO party (id, p_name, p_location, leader, alliance) VALUES
(100, 'Party A', 'Location 1', 'Leader A', 'Alliance A, Alliance B'),
(101, 'Party B', 'Location 2', 'Leader B', 'Alliance C'),
(102, 'Party C', 'Location 3', 'Leader C', 'Alliance D, Alliance E');

INSERT INTO voter (id, f_name, l_name, age, gender, caste, consti_id) VALUES
(100000, 'John', 'Doe', 35, 'Male', 'BC', 1000),
(100001, 'Jane', 'Smith', 28, 'Female', 'SC-ST', 1000),
(100002, 'Michael', 'Johnson', 40, 'Male', 'OC', 1000),
(100003, 'William', 'Jones', 32, 'Female', 'BC', 1000),
(100004, 'Emily', 'Brown', 29, 'Male', 'SC-ST', 1000),
(100005, 'Emma', 'Lee', 30, 'Female', 'OC', 1001),
(100006, 'James', 'Davis', 38, 'Male', 'BC', 1001),
(100007, 'Daniel', 'Miller', 41, 'Female', 'SC-ST', 1001),
(100008, 'Olivia', 'Wilson', 37, 'Male', 'OC', 1001),
(100009, 'Benjamin', 'Moore', 33, 'Female', 'BC', 1001),
(100010, 'Ethan', 'Taylor', 31, 'Male', 'SC-ST', 1002),
(100011, 'Mia', 'Anderson', 34, 'Female', 'OC', 1002),
(100012, 'Isabella', 'Thomas', 36, 'Male', 'BC', 1002),
(100013, 'Aiden', 'Jackson', 39, 'Female', 'SC-ST', 1002),
(100014, 'Sophia', 'White', 27, 'Male', 'OC', 1002),
(100015, 'Jacob', 'Harris', 39, 'Female', 'BC', 1003),
(100016, 'Alexander', 'Martin', 37, 'Male', 'SC-ST', 1003),
(100017, 'Harper', 'Thompson', 28, 'Female', 'OC', 1003),
(100018, 'Evelyn', 'Garcia', 30, 'Male', 'BC', 1003),
(100019, 'Michael', 'Martinez', 32, 'Female', 'SC-ST', 1003),
(100020, 'Abigail', 'Robinson', 35, 'Male', 'OC', 1004),
(100021, 'Noah', 'Clark', 31, 'Female', 'BC', 1004),
(100022, 'Mason', 'Rodriguez', 34, 'Male', 'SC-ST', 1004),
(100023, 'Amelia', 'Lewis', 27, 'Female', 'OC', 1004),
(100024, 'Charlotte', 'Lee', 29, 'Male', 'BC', 1004);

INSERT INTO diversity (consti_id, total, men, women, oc, bc, scst) VALUES
(1000, 5, 3, 2, 1, 2, 2),
(1001, 5, 2, 3, 2, 1, 2),
(1002, 5, 3, 2, 1, 2, 2),
(1003, 5, 2, 3, 2, 1, 2),
(1004, 5, 3, 2, 1, 2, 2);

INSERT INTO candidate (id, f_name, l_name, age, gender, caste, consti_id, ruling, party_id) VALUES
(10000, 'Alex', 'Brown', 45, 'Male', 'OC', 1000, 'Yes', 100),
(10001, 'Emma', 'Lee', 30, 'Female', 'BC', 1000, 'No', 101),
(10002, 'Olivia', 'Garcia', 35, 'Female', 'SC-ST', 1000, 'No', 102),
(10003, 'William', 'Martinez', 41, 'Male', 'OC', 1001, 'Yes', 100),
(10004, 'Sophia', 'Robinson', 39, 'Female', 'BC', 1001, 'No', 101),
(10005, 'Ethan', 'Clark', 37, 'Male', 'SC-ST', 1001, 'No', 102),
(10006, 'Jacob', 'Harris', 39, 'Male', 'OC', 1002, 'Yes', 100),
(10007, 'Alexander', 'Martin', 37, 'Male', 'BC', 1002, 'No', 101),
(10008, 'Harper', 'Thompson', 28, 'Female', 'SC-ST', 1002, 'No', 102),
(10009, 'Evelyn', 'Johnson', 34, 'Male', 'OC', 1003, 'Yes', 100),
(10010, 'Mia', 'Anderson', 30, 'Female', 'BC', 1003, 'No', 101),
(10011, 'Aiden', 'Jackson', 31, 'Male', 'SC-ST', 1003, 'No', 102),
(10012, 'Mason', 'Harris', 33, 'Male', 'OC', 1004, 'Yes', 100),
(10013, 'Amelia', 'Martin', 29, 'Female', 'BC', 1004, 'No', 101),
(10014, 'Charlotte', 'Thompson', 32, 'Female', 'SC-ST', 1004, 'No', 102);

INSERT INTO login_db (user_type, user_id, user_name, user_pass) VALUES
('voter', 100000, 'voter1', 'password1'),
('voter', 100001, 'voter2', 'password2'),
('voter', 100002, 'voter3', 'password3'),
('voter', 100003, 'voter4', 'password4'),
('voter', 100004, 'voter5', 'password5'),
('voter', 100005, 'voter6', 'password6'),
('voter', 100006, 'voter7', 'password7'),
('voter', 100007, 'voter8', 'password8'),
('voter', 100008, 'voter9', 'password9'),
('voter', 100009, 'voter10', 'password10'),
('voter', 100010, 'voter11', 'password11'),
('voter', 100011, 'voter12', 'password12'),
('voter', 100012, 'voter13', 'password13'),
('voter', 100013, 'voter14', 'password14'),
('voter', 100014, 'voter15', 'password15'),
('voter', 100015, 'voter16', 'password16'),
('voter', 100016, 'voter17', 'password17'),
('voter', 100017, 'voter18', 'password18'),
('voter', 100018, 'voter19', 'password19'),
('voter', 100019, 'voter20', 'password20'),
('voter', 100020, 'voter21', 'password21'),
('voter', 100021, 'voter22', 'password22'),
('voter', 100022, 'voter23', 'password23'),
('voter', 100023, 'voter24', 'password24'),
('voter', 100024, 'voter25', 'password25'),
('candidate', 10000, 'candidate1', 'password1'),
('candidate', 10001, 'candidate2', 'password2'),
('candidate', 10002, 'candidate3', 'password3'),
('candidate', 10003, 'candidate4', 'password4'),
('candidate', 10004, 'candidate5', 'password5'),
('candidate', 10005, 'candidate6', 'password6'),
('candidate', 10006, 'candidate7', 'password7'),
('candidate', 10007, 'candidate8', 'password8'),
('candidate', 10008, 'candidate9', 'password9'),
('candidate', 10009, 'candidate10', 'password10'),
('candidate', 10010, 'candidate11', 'password11'),
('candidate', 10011, 'candidate12', 'password12'),
('candidate', 10012, 'candidate13', 'password13'),
('candidate', 10013, 'candidate14', 'password14'),
('candidate', 10014, 'candidate15', 'password15'),
('party', 100, 'party1', 'password1'),
('party', 101, 'party2', 'password2'),
('party', 102, 'party3', 'password3');

INSERT INTO results
VALUES
    (2022, 'Yes'),
    (2023, 'No');

CREATE TABLE IF NOT EXISTS r_2022 (
    candidate_id INT PRIMARY KEY,
    consti_id INT,
    vote_share INT,
    FOREIGN KEY (candidate_id) REFERENCES candidate(id),
    FOREIGN KEY (consti_id) REFERENCES consti(consti_id)
);

INSERT INTO r_2022 (candidate_id, consti_id, vote_share) VALUES
(10000, 1000, 35),
(10001, 1000, 28),
(10002, 1000, 20),
(10003, 1001, 40),
(10004, 1001, 32),
(10005, 1001, 25),
(10006, 1002, 38),
(10007, 1002, 31),
(10008, 1002, 22),
(10009, 1003, 45),
(10010, 1003, 30),
(10011, 1003, 25),
(10012, 1004, 42),
(10013, 1004, 29),
(10014, 1004, 24);

CREATE TABLE IF NOT EXISTS r_2023 (
    candidate_id INT PRIMARY KEY,
    consti_id INT,
    vote_share INT,
    FOREIGN KEY (candidate_id) REFERENCES candidate(id),
    FOREIGN KEY (consti_id) REFERENCES consti(consti_id)
);

INSERT INTO r_2023
SELECT id, consti_id, '0' FROM candidate;

