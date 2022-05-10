// Database connection
const connection = require("./connection");

class Data {
    // constructor to initialise connection
	constructor(connection) {
		this.connection = connection;
	}
    
	// View all employees
	viewAllEmployees() {
		return this.connection.query(
			`
            SELECT
                emp1.id AS ID,
                emp1.first_name AS First_Name,
                emp1.last_name AS Last_Name,
                role.title AS Role,
                department.name AS Department,
                CONCAT(emp2.first_name, ' ', emp2.last_name) AS Manager,
                role.salary AS Salary
            FROM
                employee emp1
            LEFT JOIN
                role ON emp1.role_id = role.id
            LEFT JOIN
                employee emp2 ON emp1.manager_id = emp2.id
		    LEFT JOIN 
				department ON role.department_id = department.id
		    ORDER BY
                emp1.id;
        `
		);
    }

	// View all employees by department 
	viewAllEmployeeByDepartments() {
		return this.connection.query(
            `
            SELECT
                emp1.id AS ID,
                emp1.first_name AS First_Name,
                emp1.last_name AS Last_Name,
                role.title AS Role,
                department.name AS Department,
                CONCAT(emp2.first_name, ' ', emp2.last_name) AS Manager,
                role.salary AS Salary
            FROM
                employee emp1
            LEFT JOIN
                role ON emp1.role_id = role.id
            LEFT JOIN
                employee emp2 ON emp1.manager_id = emp2.id
            LEFT JOIN 
				department ON role.department_id = department.id
            ORDER BY
                department.name;
            ` 
		);
	}

	// View all employees by manager 
    viewAllEmployeesByManager(){
        return this.connection.query(
            `
            SELECT
                emp1.id AS ID,
                emp1.first_name AS First_Name,
                emp1.last_name AS Last_Name,
                role.title AS Role,
                department.name AS Department,
                CONCAT(emp2.first_name, ' ', emp2.last_name) AS Manager,
                role.salary AS Salary
            FROM
                employee emp1
            LEFT JOIN
                role ON emp1.role_id = role.id
            LEFT JOIN
                employee emp2 ON emp1.manager_id = emp2.id
		    LEFT JOIN 
				department ON role.department_id = department.id
		    ORDER BY
                emp1.manager_id;
            `
        );
    }

	// View all roles 
	viewAllRoles() {
		return this.connection.query(
			`
            SELECT 
                role.id,
                role.title AS Title,
                department.name AS Department
            FROM 
                role
            LEFT JOIN 
                department ON role.department_id = department.id
            ORDER BY
                role.id;
            `
		);
	}

	 // View all departments
	 viewAllDepartments() {
		return this.connection.query(
			`
        SELECT 
	        id,
	        name AS Departments 
        FROM department;
        `
		);
	}

    // Add department in department table
	addDepartment(deptName) {
			this.connection.query(
				"INSERT INTO department SET ?",
				{
					name: `${deptName}`,
				},
				function (err, res) {
					if (err) throw err;
					console.log("Successfully added department!!!");
					return res;
				}
			);
	}


	 // Close database connection
	 closeConnection() {
		try {
			this.connection.end();
		} catch (error) {
			console.log("Error closing connection : " + error);
		}
	}
}

module.exports = new Data(connection);