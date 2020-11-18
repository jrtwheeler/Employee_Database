DROP DATABASE IF EXISTS department_schema_db;

CREATE DATABASE department_schema_db;

USE department_schema_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  manager_name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department_role (
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
