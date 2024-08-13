-- Insert data into the department table
INSERT INTO department (id, name)
VALUES  (1, 'Engineering'),
        (2, 'Finance'),
        (3, 'Legal'),
        (4, 'Sales');

-- Insert data into the role table
INSERT INTO role (id, title, salary, department_id) 
VALUES  (1, 'Sales Lead', '100000', 4),
        (2, 'Salesperson', '80000', 4),
        (3, 'Lead Engineer', '150000', 1);
        (4, 'Software Engineer', '120000', 1),
        (5, 'Account Manager', '160000', 2),
        (6, 'Accountant', '125000', 2),
        (7, 'Legal Team Lead', '250000', 3),
        (8, 'Lawyer', '190000', 3);

-- Insert data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'John', 'Doe', 4, NULL),                                    -- John Doe as Sales Lead
        (2, 'Mike', 'Chan', 2, 1),                                      -- Mike Chan as Salesperson, reports to John Doe
        (3, 'Ashley', 'Rodriguez', 3, NULL),                            -- Ashley Rodriguez as Lead Engineer
        (4, 'Kevin', 'Tupik', 4, 3),                                    -- Kevin Tupik as Software Engineer, reports to Ashley Rodriguez
        (5, 'Kunal', 'Singh', 5, NULL),                                 -- Kunal Singh as Account Manager
        (6, 'Malia', 'Brown', 6, 5),                                    -- Malia Brown as Accountant, reports to Kunal Singh
        (7, 'Sarah', 'Lourd', 7, NULL),                                 -- Sarah Lourd as Legal Team Lead
        (8, 'Tom', 'Allen', 8, 7);                                      -- Tom Allen as Lawyer, reports to Sarah Lourd
