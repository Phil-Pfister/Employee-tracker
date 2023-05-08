SELECT SUM(salary) 
FROM roles
INNER JOIN departments on roles.department_id = departments.id
WHERE departments.id = ?;