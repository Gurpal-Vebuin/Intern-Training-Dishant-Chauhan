INSERT INTO employee (id, name, city, experience)
VALUES
('0381', 'Jane Doe', 5, 6),
('0382', 'Mike Ross', 6, 4),
('0383', 'Rachel Zane', 6, 5),
('0384', 'Harvey Specter', 7, 2),
('0385', 'Donna Paulsen', 7, 3),
('0386', 'Louis Litt', 8, 8),
('0387', 'Katrina Bennett', 8, 7),
('0388', 'Jessica Pearson', 9, 10),
('0389', 'Gina Torres', 9, 4),
('0390', 'Chandler Bing', 10, 5),
('0391', 'Monica Geller', 10, 6),
('0392', 'Rachel Green', 11, 3),
('0393', 'Phoebe Buffay', 11, 6),
('0394', 'Ross Geller', 12, 5),
('0395', 'Joey Tribbiani', 12, 2),
('0396', 'Ben Wyatt', 13, 9),
('0397', 'Leslie Knope', 13, 7),
('0398', 'Ron Swanson', 14, 10),
('0399', 'April Ludgate', 14, 4),
('0400', 'Michael Scott', 15, 3),
('0401', 'Dwight Schrute', 15, 8),
('0402', 'Jim Halpert', 16, 5),
('0403', 'Pam Beesly', 16, 6),
('0404', 'Andy Bernard', 17, 7),
('0405', 'Angela Martin', 17, 4),
('0406', 'Stanley Hudson', 18, 9),
('0407', 'Phyllis Vance', 18, 3),
('0408', 'Oscar Martinez', 19, 6),
('0409', 'Creed Bratton', 19, 2),
('0410', 'Kevin Malone', 20, 8),
('0411', 'Toby Flenderson', 20, 4),
('0412', 'Ryan Howard', 21, 7),
('0413', 'Kelly Kapoor', 21, 5),
('0414', 'Jan Levinson', 22, 6),
('0415', 'Holly Flax', 22, 4),
('0416', 'Angela Martin', 23, 3),
('0417', 'Michael Scott', 23, 2),
('0418', 'Jan Levinson', 24, 5),
('0419', 'Pam Beesly', 24, 6),
('0420', 'Creed Bratton', 25, 4),
('0421', 'Ryan Howard', 25, 8),
('0422', 'Toby Flenderson', 26, 7),
('0423', 'Kevin Malone', 26, 3);

select * from employee;
commit;
select * from city;
commit;

-- -------------------------------------------------------------------------------------------------- 
select * from employee;

select * from city;

-- Joins
select e.city,f.name
from employee as e
Join
employee as f;
commit;

-- Inner Join
select c.cityname,e.name
from employee as e
Join
city as c
on e.city = c.cid;

-- Count total names in each city.
select city,count(name) as 'Total Employee'
from employee
group by city;

-- All the names in the particular city
select c.cityname,group_concat(e.name order by e.name) as Employees
from employee as e
JOIN
city as c on e.city = c.cid
group by c.cityname
having count(e.name)>2
order by c.cityname;


-- Union and Union ALL
-- Create the 'employees' table
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(100),
    city VARCHAR(100)
);

-- Create the 'contractors' table
CREATE TABLE contractors (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(100),
    city VARCHAR(100)
);

-- Insert data into the 'employees' table
INSERT INTO employees (id, name, position, city)
VALUES
(1, 'Alice Johnson', 'Software Engineer', 'New York'),
(2, 'Bob Smith', 'Project Manager', 'Los Angeles'),
(3, 'Charlie Brown', 'HR Specialist', 'Chicago');

-- Insert data into the 'contractors' table
INSERT INTO contractors (id, name, position, city)
VALUES
(4, 'David Wilson', 'Consultant', 'New York'),
(5, 'Eva Davis', 'Web Developer', 'Los Angeles'),
(6, 'Frank Clark', 'Marketing Specialist', 'Miami');

-- We are now taking their Union
select id,name,position,city
from employees
Union
select id,name,position,city
from contractors;

select id,name,position,city
from employees
Union all
select id,name,position,city
from contractors;

commit;