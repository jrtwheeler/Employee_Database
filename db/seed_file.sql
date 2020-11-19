INSERT INTO department (name) VALUES ('sales'), ('accounting');

INSERT INTO role (title, salary, department_id) VALUES ('front-end', 75000, 1), ('back-end', 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Maddy', "Wheeler", 1, null), ('James', 'Liem', 2, 1);