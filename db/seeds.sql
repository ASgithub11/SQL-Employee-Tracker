-- Insert data into the department table
INSERT INTO department (name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Sales');

-- Insert data into the role table
INSERT INTO role (title, salary, department_id) 
VALUES  ('Sales Lead', '100000', 1),
        ('Salesperson', '80000', 1),
        ('Lead Engineer', '150000', 2),
        ('Software Engineer', '120000', 2),
        ('Account Manager', '160000', 3),
        ('Accountant', '125000', 3),
        ('Legal Team Lead', '250000', 4),
        ('Lawyer', '190000', 4);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, NULL),                                    -- John Doe as Sales Lead
        ('Mike', 'Chan', 2, 1),                                      -- Mike Chan as Salesperson, reports to John Doe
        ('Ashley', 'Rodriguez', 3, NULL),                            -- Ashley Rodriguez as Lead Engineer
        ('Kevin', 'Tupik', 4, 3),                                    -- Kevin Tupik as Software Engineer, reports to Ashley Rodriguez
        ('Kunal', 'Singh', 5, NULL),                                 -- Kunal Singh as Account Manager
        ('Malia', 'Brown', 6, 5),                                    -- Malia Brown as Accountant, reports to Kunal Singh
        ('Sarah', 'Lourd', 7, NULL),                                 -- Sarah Lourd as Legal Team Lead
        ('Tom', 'Allen', 8, 7);                                      -- Tom Allen as Lawyer, reports to Sarah Lourd
