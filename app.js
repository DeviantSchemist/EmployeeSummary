const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const emailValidator = require('email-validator')

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// employee array that holds each employee
const employees =  []

// put inquirer prompt in a function in order to call it later
const createEmployees = () => {
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter name: '
    },
    {
      type: 'number',
      name: 'id',
      message: 'Enter ID: '
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter email: ',
      validate: input => emailValidator.validate(input)
    },
    {
      type: 'rawlist',
      name: 'occupation',
      message: 'Which occupation?',
      choices: ['Engineer', 'Intern', 'Manager']
    }
  ])
  .then(answers => {
    switch(answers.occupation) {
      case 'Engineer':
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'github',
              message: 'Enter github username: '
            }
          ])
          .then(answer => {
            employees.push(new Engineer(answers.name, answers.id, answers.email, answer.github))
            inquirer.prompt({
              type: 'confirm',
              name: 'cont',
              message: 'Continue?'
            })
            .then(({cont}) => {
              if (cont) {
                createEmployees()
              }
              else {
                if (!fs.existsSync(OUTPUT_DIR)) {
                  fs.mkdirSync(OUTPUT_DIR)
                  console.log('Output directory did not exist, just created.')
                }
                fs.writeFile(outputPath, render(employees), err => {
                  if (err) { console.log(err) }
                  console.log('File successfully created!')
                })
              }
            })
          })
          .catch (err => console.log(err))
        break
      case 'Intern':
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'school',
              message: 'Enter name of school: '
            }
          ])
          .then(answer => {
            employees.push(new Intern(answers.name, answers.id, answers.email, answer.school))
            inquirer.prompt({
              type: 'confirm',
              name: 'cont',
              message: 'Continue?'
            })
              .then(({ cont }) => {
                if (cont) {
                  createEmployees()
                }
                else {
                  if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR)
                    console.log('Output directory did not exist, just created.')
                  }
                  fs.writeFile(outputPath, render(employees), err => {
                    if (err) { console.log(err) }
                    console.log('File successfully created!')
                  })
                }
              })
          })
          .catch(err => console.log(err))
        break
      case 'Manager':
        inquirer
          .prompt([
            {
              type: 'number',
              name: 'office',
              message: 'Enter office number: '
            }
          ])
          .then(answer => {
            employees.push(new Manager(answers.name, answers.id, answers.email, answer.office))
            inquirer.prompt({
              type: 'confirm',
              name: 'cont',
              message: 'Continue?'
            })
              .then(({ cont }) => {
                if (cont) {
                  createEmployees()
                }
                else {
                  if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR)
                    console.log('Output directory did not exist, just created.')
                  }
                  fs.writeFile(outputPath, render(employees), err => {
                    if (err) { console.log(err) }
                    console.log('File successfully created!')
                  })
                }
              })
          })
          .catch(err => console.log(err))
        break
    }
  })
  .catch(err => console.log(err))
}

// calls the inquirer function to start the program
createEmployees()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// const HTML = render(employees)

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
