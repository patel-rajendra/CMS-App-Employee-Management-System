const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const choices = require("./choices");
const db = require("./db");
require("console.table");

//View all employees
async function viewAllEmployees(){
    //Get result from database
    const emp = await db.viewAllEmployees();
    //Show result on console
    console.table(emp);
    //Called choice function
    mainChoices();
}

//View all employees by department
async function viewAllEmployeeByDepartments(){
    //Get result from database
    const empDepartments = await db.viewAllEmployeeByDepartments();
    //Show result on console
    console.table(empDepartments);
    //Called choice function
    mainChoices();
}

//View all employees by manager
async function viewAllEmployeesByManager(){
    //Get result from database
    const empManager = await db.viewAllEmployeesByManager();
    //Show result on console
    console.table(empManager);
    //Called choice function
    mainChoices();
}

//View all roles
async function viewAllRoles(){
    //Get result from database
    const empRoles = await db.viewAllRoles();
    //Show result on console
    console.table(empRoles);
    //Called choice function
    mainChoices();
}

//View all departments
async function viewAllDepartments(){
    //Get result from database
    const empDepartments = await db.viewAllDepartments();
    //Show result on console
    console.table(empDepartments);
    //Called choice function
    mainChoices();
}

// Add department
async function addDepartment() {

	// Asking user for department details
	const { deptName } = await inquirer.prompt(choices.addDepartment);

	// called function to execute query by passing department details
	const result = await db.addDepartment(deptName);

	viewAllDepartments();
}

// Main choice for user to choose action
async function mainChoices() {
	
	// User for main choice
	const { menuAction } = await inquirer.prompt(choices.mainChoices);
	
	switch (menuAction) {
		
		case "View all employees":
			viewAllEmployees();
			break;

		case "View all employees by department":
			viewAllEmployeeByDepartments();
			break;

		case "View all employees by manager":
			viewAllEmployeesByManager();
			break;

		case "View all roles":
			viewAllRoles();
			break;

		case "View all departments":
			viewAllDepartments();
			break;
        
        case "Add Department":
            addDepartment();
            break;

		case "Exit":
			db.closeConnection();
			console.log("Connection closed!");
			break;
	}
}


function init(){
    console.log(
        logo({
            name: 'Employee Management System',
            font: 'Speed',
            lineChars: 10,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'bold-green',
            textColor: 'green',
        })
        .emptyLine()
        .right('version 3.7.123')
        .emptyLine()
        .render()
    );

    //Called choices
    mainChoices();
}

init();