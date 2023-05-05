INSERT INTO departments (id, name)
VALUES (001, 'Sales'),
       (002, 'Finance'),
       (003, 'Engineering'),
       (004, 'Legal');

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, 'Sales Lead', 100000, 001),
       (002, 'Salesperson', 80000, 001),
       (003, 'Lead Engineer', 150000, 003),
       (004, 'Software Engineer', 120000, 003),
       (005, 'Account Manager', 160000, 002),
       (006, 'Accountant', 125000, 002),
       (007, 'Legal Team Lead', 250000, 004),
       (008, 'Lawyer', 190000, 004);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 001, NULL),
       ('Jane', 'Roe', 003, NULL),
       ('Bob', 'Sims', 007, NULL),
       ('Leslie', 'Stahl', 005, NULL),
       ('Bill', 'Whitaker', 002, 001),
       ('Jill', 'Barnes', 004, 003),
       ('Larry', 'Schell', 006, 002),
       ('Hank', 'Bostwick', 004, 005);