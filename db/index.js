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

    // Get all departments
	getDepartments() {
		try {
			return this.connection.query(
				`
                SELECT 
                    * 
                FROM department;
                `
			);
		} catch (err) {
			if (err) throw err;
		}
	}

    // Get all roles
	getRoles() {
		try {
			return this.connection.query(
				`
                SELECT 
                    * 
                FROM role;
                `
			);
		} catch (err) {
			if (err) throw err;
		}
	}

    // Get all employees
	getEmployees() {
		try {
			return this.connection.query(
				`
                SELECT 
                    * 
                FROM employee;
                `
			);
		} catch (err) {
			if (err) throw err;
		}
	}

    // Add Role in role table
	addRole(title, salary, departnemtId) {
		try {
			this.connection.query(
				"INSERT INTO role SET ?",
				{
					title: `${title}`,
					salary: `${salary}`,
					department_id: `${departnemtId}`,
				},
				function (err, res) {
					if (err) throw err;
					console.log(
						`\nSuccessfully added role with title:${title}, salary:${salary}, departmentId:${departnemtId}`
					);
					return res;
				}
			);
		} catch (err) {
			console.log("Error inserting role : " + err);
		}
	}

    // Add employee in employee table
	addEmployee(firstName, lastName, roleId, managerId) {
		try {
			this.connection.query(
				"INSERT INTO employee SET ?",
				{
					first_name: `${firstName}`,
					last_name: `${lastName}`,
					role_id: `${roleId}`,
					manager_id: `${managerId}`,
				},
				function (err, res) {
					if (err) throw err;
					console.log(
						`\nSuccessfully added employee with firstName:${firstName}, lastName:${lastName}, roleId:${roleId}, managerId:{managerId}`
					);
					return res;
				}
			);
		} catch (err) {
			console.log("Error inserting role : " + err);
		}
	}

    // Add department in department table
	addDepartment(deptName) {
		try {
			this.connection.query(
				"INSERT INTO department SET ?",
				{
					name: `${deptName}`,
				},
				function (err, res) {
					if (err) throw err;
					console.log(
						`\nSuccessfully added ${deptName} department!`
					);
					return res;
				}
			);
		} catch (err) {
			console.log("Error inserting department : " + err);
		}
	}

    // Update employee role
	updateEmployeeRole(empId, roleId) {
		try {
			// UPDATE employee SET role_id = 4 WHERE id = 4;
			this.connection.query(
				"UPDATE employee SET ? Where ?",
				[
					{
						role_id: roleId,
					},
					{
						id: empId,
					},
				],
				function (error) {
					if (error) throw err;
					console.log(`\nUpdated employee's role successfully!`);
				}
			);
		} catch (err) {
			if (err) throw err;
		}
	}

    // Update employee manager
	updateEmployeeManager(empId, managerId) {
		//UPDATE employee SET manager_id = 2 WHERE id = 3;
		try {
			this.connection.query(
				"UPDATE employee SET ? WHERE ?",
				[
					{
						manager_id: managerId,
					},
					{
						id: empId,
					},
				],
				function (error) {
					if (error) throw error;
					console.log(`\nUpdated employee's manager successfully!`);
				}
			);
		} catch (error) {
			if (error) throw error;
		}
    }

    // Remove employee
    removeEmployee(empId){
        // DELETE FROM employee WHERE id = 2;
        try {
			this.connection.query(
				"DELETE FROM employee WHERE ?",
				[
					{
						id: empId,
					}
				],
				function (error) {
					if (error) throw error;
					console.log(`\nRemoved employee with id : ${empId} successfully!`);
				}
			);
		} catch (error) {
			if (error) throw error;
		}
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