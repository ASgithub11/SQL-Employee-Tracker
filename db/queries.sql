-- View all departments
SELECT * FROM department;

-- View all roles
SELECT * FROM role;

-- View all employees
SELECT * FROM employee;

-- Add department
INSERT INTO department (name) VALUES ('');

-- Add role
INSERT INTO role (title, salary, department_id) VALUES ('', '', '');

-- Add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('', '', '', '');

-- Update employee's role
UPDATE employee
SET role_id = ''
WHERE id = '';

-- Update employee's manager
UPDATE employee
SET manager_id = ''
WHERE id = '';

-- View employees by manager
SELECT * FROM employee
WHERE manager_id = '';

-- View employees by department
SELECT * FROM employee
WHERE role_id = '';

-- Delete department
DELETE FROM department
WHERE id = '';

-- Delete role
DELETE FROM role
WHERE id = '';

-- Delete employee
DELETE FROM employee
WHERE id = '';

-- View total utilized budget of a department
SELECT department_id, SUM(salary) AS utilized_budget
FROM role
GROUP BY department_id;
