USE employees_db;

INSERT INTO department(name) VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO role(title,salary,department_id) 
    VALUES 
        ("Sales Lead",91000,1),
        ("Salesperson",50000,1),
        ("Software Engineer",95000,2),
        ("Web Developer",85000,2),
        ("Accountant",70000,3),
        ("Account Manger",90000,3),
        ("Legal Team Lead",98000,4),
        ("Lawyer",80000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ("Kelly","Knight",3,NULL),
        ("Harry","Doe",1,1),
        ("Joe","smith",2,1),
        ("Will","smith",3,NULL),
        ("Anne","vo",4,2);
        