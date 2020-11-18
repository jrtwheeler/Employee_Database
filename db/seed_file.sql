INSERT INTO department (department_name, manager_name) VALUES ('sales', 'Dave Manser');
INSERT INTO department (department_name, manager_name) VALUES ('accounting', 'Dee Addington');
INSERT INTO department_role (title, salary, department_id) VALUES ('front-end', 75000, 1);
INSERT INTO department_role (title, salary, department_id) VALUES ('back-end', 70000, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Maddy', "Wheeler", 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('James', 'Liem', 2, 2);