DROP DATABASE IF EXISTS tests;
CREATE DATABASE tests;
USE tests;

CREATE TABLE tests(
    `id` 							INT UNIQUE NOT NULL AUTO_INCREMENT,
    `name`						    VARCHAR(50),
    `param`						    VARCHAR(50),
    `error`						    VARCHAR(500),
    `start`						    DATETIME,
    `end`						    DATETIME,
    `success`						VARCHAR(50) NOT NULL,
    `extra`						    VARCHAR(50),
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE notes(
    `id` 							INT UNIQUE NOT NULL AUTO_INCREMENT,
    `testId`						INT NOT NULL,
    `who`						    VARCHAR(50),
    `note`						    VARCHAR(500),
    PRIMARY KEY (id),
	FOREIGN KEY (testId) REFERENCES tests(id)
) ENGINE = InnoDB;

INSERT INTO tests (name,param,error,start,end,success,extra) VALUES
("Test 1","X = 2, Y = 2",null,NOW(),NOW(),"success","Test: X + Y = Y + X"),
("Test 2","null","null pointer" ,NOW(),NOW(),"danger",null),
("Test with longer name",null,null,NOW(),NOW(),"success",null);

INSERT INTO notes (testId,who,note) VALUES
(1,"Grant","Failed because ran on out dated build."),
(1, "Jake", "Okay, sounds good");