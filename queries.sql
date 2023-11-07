USE election;
DELIMITER $$ 
CREATE PROCEDURE viewParty()
BEGIN
    SELECT * FROM party ORDER BY party_id;
END$$
DELIMITER ;

DELIMITER $$ 
CREATE PROCEDURE viewConsti()
BEGIN
    SELECT * FROM consti ORDER BY consti_id;
END$$
DELIMITER ;

DELIMITER $$ 
CREATE PROCEDURE viewPop()
BEGIN
    SELECT consti.consti_name, diversity.men, diversity.women, diversity.oc, diversity.bc, diversity.scst FROM diversity
    INNER JOIN consti ON diversity.consti_id = consti.consti_id
    ORDER BY diversity.consti_id;
END$$
DELIMITER ;

DELIMITER $$ 
CREATE PROCEDURE viewVoter()
BEGIN
    SELECT voter.*, consti.consti_name
    FROM voter
    INNER JOIN consti ON voter.consti_id = consti.consti_id
    ORDER BY voter.id;
END$$
DELIMITER ;

DELIMITER $$ 
CREATE PROCEDURE viewCandidate()
BEGIN
    SELECT candidate.id, candidate.f_name, candidate.l_name, candidate.age, candidate.gender, candidate.caste, consti.consti_name, candidate.ruling, party.id
    FROM ((candidate
    INNER JOIN consti ON candidate.consti_id = consti.consti_id)
    INNER JOIN party ON candidate.party_id = party.id)
    ORDER BY candidate.id;
END$$
DELIMITER ;