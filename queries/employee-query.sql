SELECT employees.last_name, employees.first_name, roles.title, departments.name AS departments, roles.salary, CONCAT (manager.last_name, ", ", manager.first_name) AS manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments on roles.department_id = departments.id
LEFT JOIN employees manager ON employees.manager_id = manager.id;