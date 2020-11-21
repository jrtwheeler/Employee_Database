DROP DATABASE IF EXISTS department_schema_db;

CREATE DATABASE department_schema_db;

USE department_schema_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL,
  department_id INT, -- derived from one row on department table
  PRIMARY KEY (id), -- must be unique && cannot be null
  FOREIGN KEY (department_id) REFERENCES department(id) -- must exist on base table
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) references role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT employee.id, FROM employee e LEFT JOIN department d ON department.id = employee.id