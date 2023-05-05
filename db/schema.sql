DROP DATABASE IF EXISTS staff_db;

CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE departments (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INT,
    INDEX manager_ind (manager_id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);


