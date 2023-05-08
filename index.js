// const express = require('espress');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'R00$ter45',
  database: 'staff_db'
});

const init = () => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('@                                  @')
  console.log('@                                  @')
  console.log('@     --   STAFF DATABASE   --     @')
  console.log('@                                  @')
  console.log('@                                  @')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  initPrompt();
};

const initPrompt = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'selection',
      message: 'What would you like to do?',
      choices: ['View All Departments', 'Add Department', 'View All Employees', 'Add Employee',
        'Update Employee Role', 'View All Roles', 'Add Role', 'View Employees by Manager', 'Quit'],
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
      } else if (data.selection === 'Update Employee Role') {
        updateRole();
      } else if (data.selection === 'View All Roles') {
        showRoles();
      } else if (data.selection === 'Add Role') {
        addRole();
      } else if (data.selection === 'View Employees by Manager') {
        employeesByManager();
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

// query to show all departments
const showDepartments = () => {
  db.promise().query(
    `SELECT * FROM departments`)
    .then(([rows]) => {
      console.log('\nViewing All Departments...\n');
      console.table(rows);
      initPrompt();
    });

}


// query to show all employees
const showEmployees = () => {
  db.promise().query(
    `SELECT employees.last_name, employees.first_name, roles.title, departments.name AS departments, roles.salary, CONCAT (manager.last_name, ", ", manager.first_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id;`)
    .then(([rows]) => {
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
    .then(([rows]) => {
      console.log('Viewing All Roles...');
      console.table(rows);
      initPrompt();
    })
    .catch((error) => {
      console.log(error);
    })
};




// function to add role

const addRole = () => {
  db.query('SELECT * FROM departments', function (err, results) {
    let department = results.map((dept =>
    ({
      name: dept.name,
      value: dept.id
    })

    ));
    // managers.push('none');


    inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: `What is the name of the role?`
      },
      {
        type: 'input',
        name: 'salary',
        message: `What is the salary of the role?`
      },
      {
        type: 'list',
        name: 'department',
        message: 'What department does the role belong to?',
        choices: department
      }
    ])
      .then((data) => {
        db.promise().query(
          ` INSERT INTO roles (id, title, salary, department_id) SELECT MAX(id)+1, ?, ?, ? from roles`, ([data.role, data.salary, data.department])
          
        )
          .then(() => {
            console.log(`New role added successfully`)

          })
          .then(() => {
            initPrompt();
          })
      })
      .catch((err) => {
        console.log(err);
      })
  });


}

// query to add department

const addDepartment = () => {

  inquirer.prompt([
    {
      type: 'input',
      name: 'newDept',
      message: 'What is the name of the department'
    }
  ])
    .then((data) => {

      db.promise().query(
        ` INSERT INTO departments (id, name)
        SELECT MAX(id)+1, '${data.newDept}' FROM departments;`
      )
        .then(() => {

          dept.push(data.newDept);
          console.log(dept);
          console.log(`Department ${data.newDept} added successfully`)

        })
        .then(() => {

          initPrompt();
        })
    })
    .catch((err) => {
      console.log(err);
    })
};

// query to add employee
const addEmployee = () => {

  db.query('SELECT * FROM roles', function (err, data) {
    let role = data.map((roles =>
    ({
      name: roles.title,
      value: roles.id
    })
    ));

    db.query('SELECT * FROM employees', function (err, results) {
      let managers = results.map((manager =>
      ({
        name: manager.first_name + ' ' + manager.last_name,
        value: manager.id
      })

      ));
      // managers.push('none');


      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the first name of the Employee'
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the last name of the Employee'
        },
        {
          type: 'list',
          name: 'role',
          message: 'What is the role of the Employee',
          choices: role
        },
        {
          type: 'list',
          name: 'mgrName',
          message: 'Who will be this employee\'s manager',
          choices: managers
        }
      ])
        .then((data) => {
          db.promise().query(
            ` INSERT INTO employees set ?`,
            {
              first_name: data.firstName,
              last_name: data.lastName,
              role_id: data.role,
              manager_id: data.mgrName
            }
          )
            .then(() => {
              console.log(`Employee ${data.firstName} ${data.lastName} added successfully`)

            })
            .then(() => {
              initPrompt();
            })
        })
        .catch((err) => {
          console.log(err);
        })
    });
  });
};

  // update employee role
const updateRole = () => {
  db.query('SELECT * FROM roles', function (err, data) {
    let role = data.map((roles =>
    ({
      name: roles.title,
      value: roles.id
    })
    ));
    console.log(role);
    db.query('SELECT * FROM employees', function (err, results) {
      let employees = results.map((employee =>
      ({
        name: employee.first_name + ' ' + employee.last_name,
        value: employee.id
      })

      ));
      // managers.push('none');


      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Which employee would you like to update',
          choices: employees
        },
        {
          type: 'list',
          name: 'role',
          message: `What will be this employee's new role`,
          choices: role
        }
      ])
        .then((data) => {
          db.promise().query(
            ` UPDATE employees
            SET ?
            where ?`, [{role_id: data.role}, {id: data.employee}]
             
          )
            .then(() => {
              console.log({id: data.employee});
              console.log(`Updated employee's role`)

            })
            .then(() => {
              initPrompt();
            })
        })
        .catch((err) => {
          console.log(err);
        })
    });
  });
};

// show employees by manager

const employeesByManager = () => {

  db.query('SELECT * FROM employees', function (err, results) {
    let managers = results.map((manager =>
    ({
      name: manager.first_name + ' ' + manager.last_name,
      value: manager.id
    })

    ));
    inquirer.prompt([
      {
        type: 'list',
        name: 'manager',
        message: 'For which manager would you like to view a lsit of employees?',
        choices: managers
      }
    ])
    .then((data) => {
      db.promise().query(`SELECT employees.first_name, employees.last_name, roles.title 
      FROM employees
      LEFT JOIN roles ON employees.role_id = roles.id
      WHERE manager_id = ?;`, data.manager)
      .then(([rows]) => {
        console.log('Here is a list of their employees');
        console.table(rows);
        initPrompt();
      })
    })
    
    
  })
}
init();

