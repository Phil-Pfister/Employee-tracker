// const express = require('espress');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R00$ter45',
    database: 'staff_db'
  });

  const initPrompt = () => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'Add Department', 'View All Employees', 'Add Employee', 
        'Update Employee Role', 'View All Roles', 'Add Role', 'Quit'],
      }
    ])
    .then((data) => {
      if (data.selection === 'View All Departments') {
          showDepartments();
        } else if (data.selection === 'Add Department') {
          addDepartment();
        } else if (data.selection === 'View All Employees') {
          showEmployees();
        } else if (data.selection === 'Add Employee') {
          addEmployee();
        } else if (data .selection === 'Update Employee Role') {
          updateRole();
        } else if (data.selection === 'View All Roles') {
          showRoles();
        } else if (data.selection === 'Add Role') {
          addRole();
        } else if (data.selection === 'Quit') {
          console.log('Goodbye');
          process.exit();
        }
      
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  }
  
const showDepartments = () => {
  db.promise().query(
    `SELECT * FROM departments`)
    .then( ([rows]) => {
      console.log('\nViewing All Departments...\n');
      console.table(rows);
      initPrompt();
    });
  
}


  // simple query
  const showEmployees = () => {
    db.promise().query(
    `SELECT employees.last_name, employees.first_name, roles.title, departments.name AS departments, roles.salary, CONCAT (manager.last_name, ", ", manager.first_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id;`)
    .then( ([rows]) => {
      console.log('Viewing All Employees...');
      console.table(rows);
      initPrompt();
    })
  };

  const showRoles = () => {
    db.promise().query(
      `SELECT roles.id, roles.title, departments.name AS departments, roles.salary 
      FROM roles
      INNER JOIN departments ON roles.department_id = departments.id;`)
    .then( ([rows]) => {
      console.log('Viewing All Roles...');
      console.table(rows);
      initPrompt();
    })
    .catch((error) => {
      console.log(error);
    })
  }

// const exit = () => {
//     prompt.ui.close();
//   };
  

  initPrompt();
