INSERT INTO departments (id, name)
VALUES (001, 'Executive'),
       (002, 'Sales'),
       (003, 'Finance'),
       (004, 'Engineering'),
       (005, 'Legal');

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, 'President', 300000, 001),
       (002, 'Sales Lead', 100000, 002),
       (003, 'Salesperson', 80000, 002),
       (004, 'Lead Engineer', 150000, 004),
       (005, 'Software Engineer', 120000, 004),
       (006, 'Account Manager', 160000, 003),
       (007, 'Accountant', 125000, 003),
       (008, 'Legal Team Lead', 250000, 005),
       (009, 'Lawyer', 190000, 005);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Frank', 'Sinatra', 001, NULL),
       ('John', 'Doe', 002, 001),
       ('Patti', 'Smith', 004, 001),
       ('Leroy', 'Brown', 008, 001),
       ('Martha', 'Stewart', 006, 001),
       ('Bill', 'Murray', 003, 002),
       ('Candace', 'Kane', 005, 004),
       ('Lenny', 'Bruce', 007, 003),
       ('Hank', 'Rollins', 005, 006);