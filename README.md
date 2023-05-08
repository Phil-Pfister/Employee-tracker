# Employee-tracker
  -------------------
  ## Badges
  -------------------
  [![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)  
  ## Table of Contents  
  ----------------------
  - [Description](#description) 
  - [Usage](#usage)  
  - [Installation](#installation)   
  - [Contributing](#contributing)  
  - [Questions](#questions)
  - [License](#license)
    

  ## Description  
  -------------------
  This application uses Node js and mysql to generate and manipulate an employee database. Once you run the schema.sql and seeds.sql to create and define the staff database you can run node js to view the database tables . you can then add departments, employees and roles.   You can also view employees by manager or view the budget of a selected department. You can view a walkthrough video of how the application works here: 
  
  [walkthrough video](https://drive.google.com/file/d/1uulPtaWandElWeqFr1ifDxOURYdytF17/view?usp=sharing)

  ## Usage  
  ------------
  Run `node index.js` to run the program. you will be prompted with a list of options. You can view various tables such as Departments, Roles, and Employees. You can then change an employees role or create a new department, role or employee, etc. 
 
  ## Installation  
  -------------------
  Clone the repo to your machine and run `npm i` to load dependencies and then run `mysql -u root -p` to start mysql. Run `source schema` and `source seeds` to create and populate the staff database. Quit mysql (`quit`) and run `node index.js` to start the application.

  ## Credits 
  ------------------
  I recieved guidence from the Rice University Coding Bootcamp as well as help from [MDN Docs](https://developer.mozilla.org/en-US/), [W3 Schools](https://www.w3schools.com/) and [Stack Overflow](https://stackoverflow.com/). I also consulted [Tech on the Net](https://www.techonthenet.com/mysql/joins.php) for information on mysql 'joins' syntax as well as a tutoring session with Mila Hose through the Rice Bootcamp tutoring program.

  ## Contact Information
  -------------------------
  ### Github: [Phillip Pfister](https://github.com/phil-pfister)
  ### Email: salshouse@gmail.com

  
  ## License 
-------------- 
This application uses the The Unlicense license
  


