SELECT employees.first_name, employees.last_name, roles.title 
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
WHERE manager_id = 3;