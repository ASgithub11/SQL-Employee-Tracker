"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewDepartmentBudget = exports.deleteRole = exports.addRole = exports.viewAllRoles = exports.deleteEmployee = exports.viewEmployeesByDepartment = exports.viewEmployeesByManager = exports.updateEmployeeManager = exports.updateEmployeeRole = exports.addEmployee = exports.viewAllEmployees = exports.deleteDepartment = exports.addDepartment = exports.viewAllDepartments = void 0;
const connection_1 = require("./connection");
// Department queries
const viewAllDepartments = async () => {
    const result = await connection_1.pool.query(`
    SELECT 
        id AS "Department ID",
        name AS "Department Name" 
    FROM 
        department
    `);
    return result.rows;
};
exports.viewAllDepartments = viewAllDepartments;
const addDepartment = async (name) => {
    const result = await connection_1.pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
};
exports.addDepartment = addDepartment;
const deleteDepartment = async (id) => {
    const result = await connection_1.pool.query('DELETE FROM department WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};
exports.deleteDepartment = deleteDepartment;
// Employee queries
const viewAllEmployees = async () => {
    const result = await connection_1.pool.query(`
    SELECT 
        employee.id AS "Employee ID",
        employee.first_name AS "First Name",
        employee.last_name AS "Last Name",
        role.title AS "Title",
        role.salary AS "Salary",
        department.name AS "Department",
        CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
    FROM
        employee
    JOIN
        role ON employee.role_id = role.id
    JOIN
        department ON role.department_id = department.id
    LEFT JOIN
        employee manager ON employee.manager_id = manager.id
    `);
    return result.rows;
};
exports.viewAllEmployees = viewAllEmployees;
const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const result = await connection_1.pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
    return result.rows[0];
};
exports.addEmployee = addEmployee;
const updateEmployeeRole = async (id, role_id) => {
    const result = await connection_1.pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [role_id, id]);
    return result.rows[0];
};
exports.updateEmployeeRole = updateEmployeeRole;
const updateEmployeeManager = async (id, manager_id) => {
    const result = await connection_1.pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *', [manager_id, id]);
    return result.rows[0];
};
exports.updateEmployeeManager = updateEmployeeManager;
const viewEmployeesByManager = async (managerId) => {
    const result = await connection_1.pool.query(`SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name AS "Last Name" FROM employee WHERE manager_id = $1`, [managerId]);
    return result.rows;
};
exports.viewEmployeesByManager = viewEmployeesByManager;
const viewEmployeesByDepartment = async (departmentName) => {
    const result = await connection_1.pool.query(`
    SELECT 
        employee.id AS "Employee ID", 
        employee.first_name AS "First Name", 
        employee.last_name AS "Last Name",
        role.title AS "Role Title",
        role.salary AS "Role Salary",
        department.name AS "Department Name",
        CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager Name" 
    FROM 
        employee 
    JOIN 
        role ON employee.role_id = role.id 
    JOIN
        department ON role.department_id = department.id
    LEFT JOIN
        employee manager ON employee.manager_id = manager.id
    WHERE 
        department.name = $1`, [departmentName]);
    return result.rows;
};
exports.viewEmployeesByDepartment = viewEmployeesByDepartment;
const deleteEmployee = async (id) => {
    const result = await connection_1.pool.query('DELETE FROM employee WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};
exports.deleteEmployee = deleteEmployee;
// Role queries
const viewAllRoles = async () => {
    const result = await connection_1.pool.query(`
    SELECT 
        role.id AS "Role ID",
        role.title AS "Title",
        role.salary AS "Salary",
        department.name AS "Department"
    FROM 
        role
    JOIN
        department ON role.department_id = department.id
    `);
    return result.rows;
};
exports.viewAllRoles = viewAllRoles;
const addRole = async (title, salary, department_id) => {
    const result = await connection_1.pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    return result.rows[0];
};
exports.addRole = addRole;
const deleteRole = async (id) => {
    const result = await connection_1.pool.query('DELETE FROM role WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};
exports.deleteRole = deleteRole;
// Budget queries
const viewDepartmentBudget = async () => {
    const result = await connection_1.pool.query(`
    SELECT
        department.name AS "Department Name",
        SUM(role.salary) AS "Total Utilized Budget"
    FROM 
        employee
    JOIN
        role ON employee.role_id = role.id
    JOIN
        department ON role.department_id = department.id
    GROUP BY
        department.name
    `);
    return result.rows[0];
};
exports.viewDepartmentBudget = viewDepartmentBudget;
