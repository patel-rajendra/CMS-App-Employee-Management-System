module.exports = {
    // Asking choice of questions
    mainChoices : [
        {
            type : 'rawlist',
            name : 'menuAction',
            message: 'What would you like to do?',
            choices :[
                'View all employees',
                'View all employees by department',
                'View all employees by manager',
                'View all roles',
                'View all departments',               
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update employee role',
                'Update employee manager',
                'Remove Employee',
                'Exit'
            ]
        }
    ],

    // Questions for add department
    addDepartment : [
        {
            type : 'input',
            name : 'deptName',
            message : 'Which department would you like to add?'
        }
    ]
};