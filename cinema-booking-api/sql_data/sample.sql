SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS chair;

CREATE TABLE client (
    clientId INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100),
    password VARCHAR(100),
    PRIMARY KEY(clientId)
);

CREATE TABLE chair (
    chairId INT NOT NULL AUTO_INCREMENT,
    status VARCHAR(100),
    clientId INT,
    PRIMARY KEY(chairId),
    FOREIGN KEY (clientId) REFERENCES client(clientId)
);



INSERT INTO chair (status, clientId)
VALUES
("PAID",1),
("PAID",1),
("PAID",1),
("PAID",1),
("FREE",NULL),
("FREE",NULL);
