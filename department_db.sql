DROP DATABASE IF EXISTS department_databaseDB;

CREATE DATABASE department_databaseDB;

USE department_databaseDB;

CREATE TABLE deparment (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE deparment_role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);
