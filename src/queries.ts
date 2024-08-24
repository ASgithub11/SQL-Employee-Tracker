import { pool } from './connection';

// Department queries
export const viewAllDepartments = async () => {
    const result = await pool.query(`
    SELECT 
        id AS "Department ID",
        name AS "Department Name" 
    FROM 
        department
    `);
return result.rows;
};

export const addDepartment = async (name: string) => {
    const result = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
};

export const deleteDepartment = async (id: number) => {
    const result = await pool.query('DELETE FROM department WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Employee queries

export const viewAllEmployees = async () => {
  const result = await pool.query(`
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

export const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number) => {
  const result = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
  return result.rows[0];
};

export const updateEmployeeRole = async (id: number, role_id: number) => {
    const result = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [role_id, id]);
    return result.rows[0];
};

export const updateEmployeeManager = async (id: number, manager_id: number | null) => {
    const result = await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *', [manager_id, id]);
    return result.rows[0];
};

export const viewEmployeesByManager = async (managerId: number) => {
    const result = await pool.query(`SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employee.last_name AS "Last Name" FROM employee WHERE manager_id = $1`, [managerId]);
    return result.rows;
};

export const viewEmployeesByDepartment = async (departmentName: string) => {
    const result = await pool.query(`
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

export const deleteEmployee = async (id: number) => {
    const result = await pool.query('DELETE FROM employee WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Role queries
export const viewAllRoles = async () => {
    const result = await pool.query(`
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

export const addRole = async (title: string, salary: number, department_id: number) => {
    const result = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    return result.rows[0];
};

export const deleteRole = async (id: number) => {
    const result = await pool.query('DELETE FROM role WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// Budget queries
export const viewDepartmentBudget = async () => {
    const result = await pool.query(`
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

