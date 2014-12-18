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
    `status`						VARCHAR(50) NOT NULL,
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