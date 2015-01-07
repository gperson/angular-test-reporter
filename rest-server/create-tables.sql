/**
 *	Default DB/table structure for TestReporter
 *
 * 	DON'T EDIT/DELETE
 */
DROP DATABASE IF EXISTS tests;
CREATE DATABASE tests;
USE tests;

CREATE TABLE tests_Default(
    `id` 							INT UNIQUE NOT NULL AUTO_INCREMENT,
    `name`						    VARCHAR(50),
    `param`						    VARCHAR(100),
    `error`						    VARCHAR(700),
    `start`						    DATETIME DEFAULT NULL,
    `end`						    DATETIME DEFAULT NULL,
    `status`						VARCHAR(50) NOT NULL,
    `extra`						    VARCHAR(100),
    `runInfo`						VARCHAR(100),
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE notes_Default(
    `id` 							INT UNIQUE NOT NULL AUTO_INCREMENT,
    `testId`						INT NOT NULL,
    `who`						    VARCHAR(50),
    `note`						    VARCHAR(500),
    PRIMARY KEY (id),
	FOREIGN KEY (testId) REFERENCES tests_Default(id)
) ENGINE = InnoDB;

/**
 * Example of a project specific table - names must start with 'tests_'
 * and 'notes_' and names must otherwise match.
 *
 * Can delete if not needed, change DB name, duplicates, etc.
 *
 * TODO Make SQL function to create project specific DBs
 */
CREATE TABLE tests_ExampleProject(
    `id` 							INT UNIQUE NOT NULL AUTO_INCREMENT,
    `name`						    VARCHAR(50),
    `param`						    VARCHAR(100),
    `error`						    VARCHAR(700),
    `start`						    DATETIME DEFAULT NULL,
    `end`						    DATETIME DEFAULT NULL,
    `status`						VARCHAR(50) NOT NULL,
    `extra`						    VARCHAR(100),
    `runInfo`						VARCHAR(100),
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE notes_ExampleProject(
    `id` 							INT UNIQUE NOT NULL AUTO_INCREMENT,
    `testId`						INT NOT NULL,
    `who`						    VARCHAR(50),
    `note`						    VARCHAR(500),
    PRIMARY KEY (id),
	FOREIGN KEY (testId) REFERENCES tests_ExampleProject(id)
) ENGINE = InnoDB;