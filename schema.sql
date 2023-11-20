DROP DATABASE election;
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

CREATE TABLE IF NOT EXISTS show_results (
    r_year INT PRIMARY KEY,
    released ENUM('Yes', 'No')
);

CREATE TABLE IF NOT EXISTS results (
    r_year INT,
    candidate_id INT,
    consti_id INT,
    party_id INT,
    vote_share INT,
    PRIMARY KEY (r_year, candidate_id),
    FOREIGN KEY (party_id) REFERENCES party(id) ON DELETE SET NULL,
    FOREIGN KEY (candidate_id) REFERENCES candidate(id) ON DELETE CASCADE,
    FOREIGN KEY (consti_id) REFERENCES consti(consti_id) ON DELETE CASCADE,
    FOREIGN KEY (r_year) REFERENCES show_results(r_year) ON DELETE CASCADE
);

DELIMITER //

CREATE TRIGGER after_voter_insert
AFTER INSERT ON voter
FOR EACH ROW
BEGIN
    IF (NEW.caste = 'OC') THEN
        UPDATE diversity SET oc = oc + 1 WHERE consti_id = NEW.consti_id;
    ELSEIF (NEW.caste = 'BC') THEN
        UPDATE diversity SET bc = bc + 1 WHERE consti_id = NEW.consti_id;
    ELSE
        UPDATE diversity SET scst = scst + 1 WHERE consti_id = NEW.consti_id;
    END IF;

    IF (NEW.gender = 'Male') THEN
        UPDATE diversity SET men = men + 1 WHERE consti_id = NEW.consti_id;
    ELSE
        UPDATE diversity SET women = women + 1 WHERE consti_id = NEW.consti_id;
    END IF;
END//

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_voter_update
AFTER UPDATE ON voter
FOR EACH ROW
BEGIN
    IF OLD.caste = 'OC' THEN
        UPDATE diversity SET oc = oc - 1 WHERE consti_id = OLD.consti_id;
    ELSEIF OLD.caste = 'BC' THEN
        UPDATE diversity SET bc = bc - 1 WHERE consti_id = OLD.consti_id;
    ELSE
        UPDATE diversity SET scst = scst - 1 WHERE consti_id = OLD.consti_id;
    END IF;

    IF NEW.caste = 'OC' THEN
        UPDATE diversity SET oc = oc + 1 WHERE consti_id = NEW.consti_id;
    ELSEIF NEW.caste = 'BC' THEN
        UPDATE diversity SET bc = bc + 1 WHERE consti_id = NEW.consti_id;
    ELSE
        UPDATE diversity SET scst = scst + 1 WHERE consti_id = NEW.consti_id;
    END IF;

    IF OLD.gender = 'Male' THEN
        UPDATE diversity SET men = men - 1 WHERE consti_id = OLD.consti_id;
    ELSE
        UPDATE diversity SET women = women - 1 WHERE consti_id = OLD.consti_id;
    END IF;

    IF NEW.gender = 'Male' THEN
        UPDATE diversity SET men = men + 1 WHERE consti_id = NEW.consti_id;
    ELSE
        UPDATE diversity SET women = women + 1 WHERE consti_id = NEW.consti_id;
    END IF;
END//

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_voter_delete
AFTER DELETE ON voter
FOR EACH ROW
BEGIN
    IF OLD.caste = 'OC' THEN
        UPDATE diversity SET oc = oc - 1 WHERE consti_id = OLD.consti_id;
    ELSEIF OLD.caste = 'BC' THEN
        UPDATE diversity SET bc = bc - 1 WHERE consti_id = OLD.consti_id;
    ELSE
        UPDATE diversity SET scst = scst - 1 WHERE consti_id = OLD.consti_id;
    END IF;

    IF OLD.gender = 'Male' THEN
        UPDATE diversity SET men = men - 1 WHERE consti_id = OLD.consti_id;
    ELSE
        UPDATE diversity SET women = women - 1 WHERE consti_id = OLD.consti_id;
    END IF;
END//

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE set_ruling(IN input_year INT)
BEGIN
    
    DECLARE done INT DEFAULT FALSE;
    DECLARE consti_id_var INT;
    DECLARE candidate_id_var INT;
    DECLARE party_id_var INT;
    DECLARE vote_share_var INT;
    
    DECLARE cur CURSOR FOR 
        SELECT consti_id, candidate_id, party_id, vote_share 
        FROM results WHERE r_year = input_year;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO consti_id_var, candidate_id_var, party_id_var, vote_share_var;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        IF vote_share_var = (SELECT MAX(vote_share) FROM results WHERE consti_id = consti_id_var AND r_year = input_year) THEN
            UPDATE candidate SET ruling = 'Yes' WHERE id = candidate_id_var;
        ELSE
            UPDATE candidate SET ruling = 'No' WHERE id = candidate_id_var;
        END IF;
    END LOOP;
    
    CLOSE cur;
END$$
DELIMITER ;


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

INSERT INTO diversity (consti_id, men, women, oc, bc, scst) VALUES
(1000, 800, 200, 500, 300, 200),
(1001, 700, 500, 500, 500, 200),
(1002, 600, 500, 200, 400, 500),
(1003, 400, 600, 300, 500, 200),
(1004, 700, 800, 500, 800, 200);

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

INSERT INTO candidate (id, f_name, l_name, age, gender, caste, consti_id, ruling, party_id) VALUES
(10000, 'Alex', 'Brown', 45, 'Male', 'OC', 1000, 'No', 100),
(10001, 'Emma', 'Lee', 30, 'Female', 'BC', 1000, 'No', 101),
(10002, 'Olivia', 'Garcia', 35, 'Female', 'SC-ST', 1000, 'No', 102),
(10003, 'William', 'Martinez', 41, 'Male', 'OC', 1001, 'No', 100),
(10004, 'Sophia', 'Robinson', 39, 'Female', 'BC', 1001, 'No', 101),
(10005, 'Ethan', 'Clark', 37, 'Male', 'SC-ST', 1001, 'No', 102),
(10006, 'Jacob', 'Harris', 39, 'Male', 'OC', 1002, 'No', 100),
(10007, 'Alexander', 'Martin', 37, 'Male', 'BC', 1002, 'No', 101),
(10008, 'Harper', 'Thompson', 28, 'Female', 'SC-ST', 1002, 'No', 102),
(10009, 'Evelyn', 'Johnson', 34, 'Male', 'OC', 1003, 'No', 100),
(10010, 'Mia', 'Anderson', 30, 'Female', 'BC', 1003, 'No', 101),
(10011, 'Aiden', 'Jackson', 31, 'Male', 'SC-ST', 1003, 'No', 102),
(10012, 'Mason', 'Harris', 33, 'Male', 'OC', 1004, 'No', 100),
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

INSERT INTO show_results
VALUES
    (2022, 'Yes'),
    (2023, 'No');

INSERT INTO results (r_year, candidate_id, consti_id, party_id, vote_share) VALUES
(2022, 10000, 1000, 100, 35),
(2022, 10001, 1000, 101, 28),
(2022, 10002, 1000, 102, 20),
(2022, 10003, 1001, 100, 40),
(2022, 10004, 1001, 101, 32),
(2022, 10005, 1001, 102, 25),
(2022, 10006, 1002, 100, 31),
(2022, 10007, 1002, 101, 38),
(2022, 10008, 1002, 102, 22),
(2022, 10009, 1003, 100, 25),
(2022, 10010, 1003, 101, 30),
(2022, 10011, 1003, 102, 45),
(2022, 10012, 1004, 100, 42),
(2022, 10013, 1004, 101, 29),
(2022, 10014, 1004, 102, 24);

CALL set_ruling(2022);

INSERT INTO results
SELECT 2023, id, consti_id, party_id, '0' FROM candidate;

-- SELECT results.*, candidate.f_name, candidate.l_name, consti.consti_name, party.p_name
-- FROM (((results
-- INNER JOIN candidate ON results.candidate_id = candidate.id)
-- INNER JOIN consti ON results.consti_id = consti.consti_id)
-- INNER JOIN party ON results.party_id = party.id)
-- WHERE results.vote_share IN (SELECT MAX(vote_share) from results GROUP BY consti_id HAVING r_year = 2022)
-- AND r_year = 2022;