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


// Add employee function
async function addEmployee() {

	// Get all role details from role table
	const rolesResult = await db.getRoles();

	// filter only role names from role details
	let roleNames = [];
	for (let i = 0; i < rolesResult.length; i++) {
		roleNames.push(rolesResult[i].title);
	}

	// Get all employees from employee table
	const employeeResult = await db.getEmployees();

	// Filter only employee names by concatenating first name and last name
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(
			employeeResult[i].first_name + " " + employeeResult[i].last_name
		);
	}

	// Dynamically push role names in inquirer prompt array 'addEmployee'
	choices.addEmployee.push({
		type: "list",
		name: "roleName",
		message: "What is role ?",
		choices: roleNames,
	});

	// Dynamically push employee names in inquirer prompt array 'addEmployee' for getting manager name 
	choices.addEmployee.push({
		type: "list",
		name: "managerName",
		message: "What is manager name ?",
		choices: employeeNames,
	});

	// Prompt user for add employee details
	const {	firstName, lastName, roleName, managerName } = await inquirer.prompt(choices.addEmployee);

	// Split manager name 
	const managerFirstName = managerName.split(" ")[0];
	const managerLastName = managerName.split(" ")[1];

	// Filter selected rolename to get role id of that role
	const roleId = rolesResult.filter((role) => role.title === roleName)[0].id;
	
	// Filter selected manager name to get manager id 
	const managerId = employeeResult.filter(
		(employee) =>
			employee.first_name === managerFirstName &&
			employee.last_name === managerLastName
	)[0].id;

	// called function to execute query by passing employee details
	const addEmployeeResult = await db.addEmployee( firstName, lastName, roleId, managerId );

	viewAllEmployees();
}

// Add Role
async function addRole() {

	// Get department details from department table
	const departmentsResult = await db.getDepartments();

	// Fetch department name from details
	let departments = [];
	for (let i = 0; i < departmentsResult.length; i++) {
		departments.push(departmentsResult[i].name);
	}

	// Dynamically push department name
	choices.addRole.push({
		type: "list",
		name: "departmentName",
		message: "What is role's department Name ?",
		choices: departments,
	});

	// Prompt user for add role details
	const { roleTitle, roleSalary, departmentName } = await inquirer.prompt(choices.addRole);

	// filter and fetch department id from department name
	const departmentId = departmentsResult.filter((res) => res.name === departmentName)[0].id;
	
	// called function to execute query by passing role details
	const addRoleResult = await db.addRole( roleTitle, roleSalary, departmentId);

	viewAllRoles();
}

// Update employee role
async function updateEmployeeRole() {

	// Get all roles from role table
	const rolesResult = await db.getRoles();

	// Fetch role names from roles details
	let roleNames = [];
	for (let i = 0; i < rolesResult.length; i++) {
		roleNames.push(rolesResult[i].title);
	}

	// Get employee details from databse
	const employeeResult = await db.getEmployees();

	// fetch employee names from employee details
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(
			employeeResult[i].first_name + " " + employeeResult[i].last_name
		);
	}

	let updateEmpRole = [];

	// Dynamically push employee names for getting employee name whose role to update
	updateEmpRole.push({
		type: "list",
		name: "empName",
		message: "Which employee's role to update?",
		choices: employeeNames,
	});

	// Dynamically push role names for getting updated role name
	updateEmpRole.push({
		type: "list",
		name: "roleName",
		message: "Which role to update for current employee?",
		choices: roleNames,
	});

	// Prompt user for update employee role
	const { empName, roleName } = await inquirer.prompt(updateEmpRole);

	// Split employee name
	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	// Filter and fetch employee id
	const empId = employeeResult.filter(
		(employee) =>
			employee.first_name === empFirstName &&
			employee.last_name === empLastName
	)[0].id;

	// Filter and fetch role id
	const roleId = rolesResult.filter((role) => role.title === roleName)[0].id;

	// called function to execute query by passing role details
	const updateRoleResult = await db.updateEmployeeRole(empId, roleId);

	viewAllEmployees();
}

// Update employee manager
async function updateEmployeeManager() {
	
	// Get all details from employee table
	const employeeResult = await db.getEmployees();

	// Get only employee names from all details
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(
			employeeResult[i].first_name + " " + employeeResult[i].last_name
		);
	}

	// array for inquirer prompt
	let updateEmpManager = [];

	// Get employee name whose manager to update from inquirer prompt
	updateEmpManager.push({
		type: "list",
		name: "empName",
		message: "Which employee's manager to update?",
		choices: employeeNames,
	});

	// Prompt user for employee name whose manager to update
	const { empName } = await inquirer.prompt(updateEmpManager);

	// filter other employee names ,except whose manager to update
	const empNames = employeeNames.filter((employee) => employee !== empName);

	// insert filtered employee's in array of inquirer prompt
	updateEmpManager.push({
		type: "list",
		name: "managerName",
		message: "Who is employee's new manager?",
		choices: empNames,
	});

	// Prompt user for new manager
	const { managerName } = await inquirer.prompt(updateEmpManager[1]);

	// Split Employee's name whose manager to update
	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	// split manager's Name
	const managerFirstName = managerName.split(" ")[0];
	const managerLastName = managerName.split(" ")[1];

	// Get employee Id from employee name
	const empId = employeeResult.filter(
		(employee) =>
			employee.first_name === empFirstName &&
			employee.last_name === empLastName
	)[0].id;

	// Get manager Id from employee names
	const managerId = employeeResult.filter(
		(employee) =>
			employee.first_name === managerFirstName &&
			employee.last_name === managerLastName
	)[0].id;

	// update databse for managerId of employee in employee table
	const updatemanagerResult = await db.updateEmployeeManager(
		empId,
		managerId
	);

	viewAllEmployees();
}

// Remove employee
async function removeEmployee() {
	
	// Get all details from employee table
	const employeeResult = await db.getEmployees();
	
	let employeeNames = [];
	for (let i = 0; i < employeeResult.length; i++) {
		employeeNames.push(
			employeeResult[i].first_name + " " + employeeResult[i].last_name
		);
	}

	// array for inquirer prompt
	let removeEmpPrompt = [];

	// Get employee name to remove
	removeEmpPrompt.push({
		type: "list",
		name: "empName",
		message: "Which employee to remove?",
		choices: employeeNames,
	});

	// Prompt user for employee name to remove
	const { empName } = await inquirer.prompt(removeEmpPrompt);

	// Split Employee's name
	const empFirstName = empName.split(" ")[0];
	const empLastName = empName.split(" ")[1];

	// Get employee Id from employee name
	const empId = employeeResult.filter(
		(employee) =>
			employee.first_name === empFirstName &&
			employee.last_name === empLastName
	)[0].id;

	// update database
	const removeEmployeeResult = await db.removeEmployee(empId);

	viewAllEmployees();
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
        
        case "Add Employee":
            addEmployee();
            break;

        case "Add Department":
            addDepartment();
            break;

        case "Add Role":
            addRole();
            break;

        case "Update employee role":
            updateEmployeeRole();
            break;

        case "Update employee manager":
            updateEmployeeManager();
            break;

        case "Remove Employee":
            removeEmployee();
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