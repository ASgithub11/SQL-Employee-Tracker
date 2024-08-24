"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const queries_1 = require("./queries");
const mainMenu = async () => {
    let exit = false;
    // Loop through the main menu until the user chooses to exit
    while (!exit) {
        // Prompt the user for what they would like to do
        const { choice } = await inquirer_1.default.prompt({
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View Employees By Manager',
                'View Employees By Department',
                'Delete Employee',
                'View All Roles',
                'Add Role',
                'Delete Role',
                'View All Departments',
                'Add Department',
                'Delete Department',
                'View Department Budget',
                'Exit'
            ]
        });
        // Switch statement to handle the user's choice. The `choice` variable holds the user's selection from a menu of options
        switch (choice) {
            // View all employees
            case 'View All Employees':
                // Call the viewAllEmployees function from the queries file
                const employees = await (0, queries_1.viewAllEmployees)();
                console.table(employees);
                break;
            // Add an employee
            case 'Add Employee':
                // Get all roles and employees to use in the inquirer prompt
                const rolesForEmployee = await (0, queries_1.viewAllRoles)();
                const roleChoices = rolesForEmployee.map(role => ({
                    value: role["Role ID"],
                    name: role["Title"]
                }));
                // Get all employees to use in the inquirer prompt
                const employeeForManager = await (0, queries_1.viewAllEmployees)();
                const managerChoices = employeeForManager.filter(employee => employee.manager_id !== null).map(employee => ({
                    value: employee["Employee ID"],
                    name: `${employee["First Name"]} ${employee["Last Name"]}`
                }));
                // Prompt the user for the new employee's information
                const { first_name, last_name, role_id, manager_id } = await inquirer_1.default.prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'What is the employee\'s first name?'
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'What is the employee\'s last name?'
                    },
                    {
                        name: 'role_id',
                        type: 'list',
                        message: 'What is the employee\'s role?',
                        choices: roleChoices
                    },
                    {
                        name: 'manager_id',
                        type: 'list',
                        message: 'Who is the employee\'s manager?',
                        choices: [
                            { value: null, name: 'None' },
                            ...managerChoices
                        ]
                    }
                ]);
                // Add the new employee to the database
                await (0, queries_1.addEmployee)(first_name, last_name, parseInt(role_id), manager_id ? parseInt(manager_id) : null);
                console.log(`Added ${first_name} ${last_name} to the database`);
                break;
            // Update an employee's role
            case 'Update Employee Role':
                const employeeToUpdate = await (0, queries_1.viewAllEmployees)();
                const employeeRoleChoices = employeeToUpdate.map(employee => ({
                    value: employee["Employee ID"],
                    name: `${employee["First Name"]} ${employee["Last Name"]}`
                }));
                // Get all roles to use in the inquirer prompt
                const roleToUpdate = await (0, queries_1.viewAllRoles)();
                const roleChoicesToUpdate = roleToUpdate.map(role => ({
                    value: role["Role ID"],
                    name: role["Title"]
                }));
                // Prompt the user for the employee and role to update
                const { updateRoleEmp, newRoleEmp } = await inquirer_1.default.prompt([
                    {
                        name: 'updateRoleEmp',
                        type: 'list',
                        message: 'Which employee\'s role do you want to update?',
                        choices: employeeRoleChoices
                    },
                    {
                        name: 'newRoleEmp',
                        type: 'list',
                        message: 'Which role do you want to assign the selected employee?',
                        choices: roleChoicesToUpdate
                    }
                ]);
                // Update the employee's role
                await (0, queries_1.updateEmployeeRole)(parseInt(updateRoleEmp), parseInt(newRoleEmp));
                console.log('Updated employee\'s role');
                break;
            // Update an employee's manager
            case 'Update Employee Manager':
                const { updateEmpId, newManagerId } = await inquirer_1.default.prompt([
                    {
                        name: 'updateEmpId',
                        type: 'input',
                        message: 'Enter the ID of the employee to update:'
                    },
                    {
                        name: 'newManagerId',
                        type: 'input',
                        message: 'Enter the new manager ID for the employee:',
                    }
                ]);
                await (0, queries_1.updateEmployeeManager)(parseInt(updateEmpId), newManagerId ? parseInt(newManagerId) : null);
                console.log('Employee manager updated');
                break;
            // View employees by manager
            case 'View Employees By Manager':
                const { managerIdToView } = await inquirer_1.default.prompt({
                    name: 'managerIdToView',
                    type: 'input',
                    message: 'What is the ID of the manager to view employees for:'
                });
                const employeesByManager = await (0, queries_1.viewEmployeesByManager)(parseInt(managerIdToView));
                console.table(employeesByManager);
                break;
            // View employees by department
            case 'View Employees By Department':
                const { departmentNameToView } = await inquirer_1.default.prompt({
                    name: 'departmentNameToView',
                    type: 'input',
                    message: 'What is the name of the department?'
                });
                const employeesByDepartment = await (0, queries_1.viewEmployeesByDepartment)(departmentNameToView);
                console.table(employeesByDepartment);
                break;
            // Delete an employee
            case 'Delete Employee':
                const { deleteEmpId } = await inquirer_1.default.prompt({
                    type: 'input',
                    name: 'deleteEmpId',
                    message: 'Enter the ID of the employee to delete:'
                });
                await (0, queries_1.deleteEmployee)(parseInt(deleteEmpId));
                console.log('Employee deleted');
                break;
            // View all roles
            case 'View All Roles':
                const roles = await (0, queries_1.viewAllRoles)();
                console.table(roles);
                break;
            // Add a role
            case 'Add Role':
                const departmentsForRole = await (0, queries_1.viewAllDepartments)();
                const departmentChoices = departmentsForRole.map(department => ({
                    value: department["Department ID"],
                    name: department["Department Name"]
                }));
                const { title, salary, department_id } = await inquirer_1.default.prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'What is the name of the role?'
                    },
                    {
                        name: 'salary',
                        type: 'number',
                        message: 'What is the salary of the role?',
                        validate: value => !isNaN(value) ? true : 'Please enter a number'
                    },
                    {
                        name: 'department_id',
                        type: 'list',
                        message: 'Which department does the role belong to?',
                        choices: departmentChoices
                    }
                ]);
                await (0, queries_1.addRole)(title, parseFloat(salary), (department_id));
                console.log(`Added ${title} to the database`);
                break;
            // Delete a role
            case 'Delete Role':
                const roleToDelete = await (0, queries_1.viewAllRoles)();
                const roleChoicesToDelete = roleToDelete.map(role => ({
                    value: role["Role ID"],
                    name: role["Title"]
                }));
                const { role } = await inquirer_1.default.prompt({
                    name: 'role',
                    type: 'list',
                    message: 'Which role would you like to delete?',
                    choices: roleChoicesToDelete
                });
                await (0, queries_1.deleteRole)(role);
                console.log('Deleted role');
                break;
            // View all departments
            case 'View All Departments':
                const departments = await (0, queries_1.viewAllDepartments)();
                console.table(departments);
                break;
            // Add a department
            case 'Add Department':
                const { departmentName } = await inquirer_1.default.prompt({
                    name: 'departmentName',
                    type: 'input',
                    message: 'What is the name of the department?',
                });
                await (0, queries_1.addDepartment)(departmentName);
                console.log(`Added ${departmentName} to the database.`);
                break;
            // Delete a department
            case 'Delete Department':
                const { departmentId } = await inquirer_1.default.prompt({
                    name: 'departmentId',
                    type: 'input',
                    message: 'Enter the ID of the department to delete:'
                });
                await (0, queries_1.deleteDepartment)(parseInt(departmentId));
                console.log('Department deleted');
                break;
            // View department budget
            case 'View Department Budget':
                const sumOfSalaries = await (0, queries_1.viewDepartmentBudget)();
                console.table(sumOfSalaries);
                break;
            // Exit the application
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
                break;
            // Handle invalid choices
            default:
                console.log('Invalid choice');
                break;
        }
    }
};
// Call the main menu function
mainMenu();
