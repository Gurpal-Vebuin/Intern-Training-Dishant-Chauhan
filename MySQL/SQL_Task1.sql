create database company;
use company;

-- Create the EMPLOYEES table
CREATE TABLE EMPLOYEES (
    emp_id INT PRIMARY KEY,                        
    emp_name VARCHAR(50) NOT NULL,                   
    job VARCHAR(50) NOT NULL,                        
    salary INT NOT NULL,                             
    commission INT NOT NULL,                         
    dept_id INT NOT NULL,                          
    hire_date DATE NOT NULL,                       
    address VARCHAR(100) NOT NULL,                 
    city VARCHAR(50) NOT NULL,                     
    company_id INT NOT NULL,                        
    FOREIGN KEY (dept_id) REFERENCES DEPARTMENTS(dept_id),  
    FOREIGN KEY (company_id) REFERENCES COMPANIES(company_id)  
);


-- Create the DEPARTMENTS table
CREATE TABLE DEPARTMENTS (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

-- Create the COMPANIES table
CREATE TABLE COMPANIES (
    company_id INT PRIMARY KEY,
    company_name VARCHAR(100) not null,
    address VARCHAR(255) not null,
    city VARCHAR(100) not null,
    country VARCHAR(100) not null
);

-- Insert data into EMPLOYEES table
drop table employees;
INSERT INTO EMPLOYEES (emp_id, emp_name, job, salary, commission, dept_id, hire_date, address, city, company_id) VALUES
(1, 'John Smith', 'Manager', 12000, 500, 30, '2001-06-12', '123 Elm St', 'New York', 1),
(2, 'Alice Brown', 'Clerk', 6000, 0, 30, '2002-07-24', '456 Oak St', 'Boston', 1),
(3, 'Bob White', 'Salesman', 7000, 8000, 20, '2003-08-15', '789 Pine St', 'Chicago', 1),
(4, 'Mary Green', 'Analyst', 8000, 2000, 10, '2003-02-10', '101 Maple Ave', 'Dallas', 1),
(5, 'David Blue', 'Clerk', 5500, 0, 20, '2004-09-01', '202 Cedar Rd', 'Houston', 2),
(6, 'James Black', 'Manager', 10000, 2500, 30, '2002-12-03', '303 Birch Blvd', 'Phoenix', 2),
(7, 'Sarah Gray', 'Salesman', 8000, 10000, 10, '2001-01-20', '404 Birch St', 'Denver', 2),
(8, 'Steve White', 'President', 15000, 3000, 40, '2000-05-12', '505 Ash St', 'Atlanta', 3),
(9, 'Lisa Brown', 'Clerk', 5000, 0, 30, '2005-11-20', '606 Pine Rd', 'Miami', 3),
(10, 'Mark Red', 'Clerk', 4800, 0, 10, '2004-06-01', '707 Oak Dr', 'Tampa', 3),
(11, 'Samuel Turner', 'Manager', 13000, 5000, 30, '2002-06-14', '123 Maple Blvd', 'San Francisco', 1),
(12, 'Jessica King', 'Clerk', 7000, 0, 30, '2005-03-20', '456 Pine Ave', 'San Diego', 1),
(13, 'Michael Harris', 'Salesman', 12000, 7000, 20, '2003-09-25', '789 Oak St', 'Chicago', 2),
(14, 'Patricia Lee', 'Analyst', 11000, 3000, 10, '2004-05-18', '101 Birch Rd', 'Houston', 2),
(15, 'William Clark', 'Clerk', 5000, 0, 20, '2006-08-30', '202 Cedar Dr', 'Dallas', 2),
(16, 'Elizabeth Hall', 'Manager', 15000, 3500, 30, '2001-11-11', '303 Maple Dr', 'Miami', 3),
(17, 'John Taylor', 'Salesman', 13000, 12000, 20, '2002-02-02', '404 Oak Blvd', 'Seattle', 3),
(18, 'Daniel Walker', 'Clerk', 6000, 0, 10, '2006-06-10', '505 Cedar Blvd', 'Phoenix', 1),
(19, 'Sophia Anderson', 'President', 18000, 4000, 40, '2000-10-01', '606 Pine Blvd', 'Atlanta', 3),
(20, 'James Robinson', 'Manager', 12000, 3500, 30, '2003-04-12', '707 Maple St', 'San Francisco', 1),
(21, 'Linda Wright', 'Salesman', 9000, 8000, 20, '2004-07-20', '808 Oak St', 'Los Angeles', 1),
(22, 'David Adams', 'Clerk', 5500, 0, 20, '2006-02-15', '909 Birch Ave', 'Houston', 2),
(23, 'Olivia Martinez', 'Salesman', 10000, 7000, 30, '2001-09-17', '101 Pine Rd', 'Chicago', 3),
(24, 'Ryan Lewis', 'Manager', 15000, 4000, 30, '2001-02-28', '202 Cedar Ave', 'Dallas', 3),
(25, 'Megan Young', 'Analyst', 12000, 3000, 10, '2005-05-05', '303 Oak Blvd', 'Miami', 2),
(26, 'Benjamin Scott', 'Clerk', 6000, 0, 10, '2006-12-20', '404 Maple Blvd', 'Houston', 1),
(27, 'Avery Walker', 'Salesman', 15000, 8000, 20, '2003-01-19', '505 Birch Rd', 'San Diego', 1),
(28, 'Emma Nelson', 'President', 20000, 8000, 40, '2000-07-30', '606 Cedar Dr', 'Atlanta', 2),
(29, 'Jacob Harris', 'Manager', 20000, 10000, 30, '2004-09-09', '707 Pine St', 'San Francisco', 2),
(30, 'Grace Mitchell', 'Salesman', 12000, 3000, 20, '2005-11-13', '808 Cedar Rd', 'Chicago', 3),
(31, 'Ethan Carter', 'Manager', 13000, 2000, 30, '2001-03-04', '909 Oak Ave', 'Miami', 1),
(32, 'Charlotte Perez', 'Clerk', 7000, 0, 30, '2006-04-01', '123 Pine Rd', 'San Diego', 2),
(33, 'Lucas White', 'Salesman', 9000, 10000, 20, '2002-08-29', '234 Oak Blvd', 'Phoenix', 3),
(34, 'Amelia King', 'Clerk', 6000, 0, 10, '2004-12-11', '345 Cedar Ave', 'Dallas', 1),
(35, 'James Wright', 'Manager', 15000, 4000, 30, '2003-05-19', '456 Maple Blvd', 'Chicago', 1),
(36, 'Lily Martinez', 'Salesman', 12000, 5000, 20, '2004-06-15', '567 Pine Ave', 'Seattle', 2),
(37, 'Mason Davis', 'Clerk', 6000, 0, 20, '2005-07-12', '678 Oak Rd', 'Miami', 2),
(38, 'Benjamin Johnson', 'Salesman', 15000, 18000, 20, '2001-12-22', '789 Cedar Blvd', 'San Francisco', 3),
(39, 'Charlotte Carter', 'Manager', 18000, 4000, 30, '2002-11-15', '890 Maple Ave', 'Los Angeles', 1),
(40, 'Oliver Brown', 'Clerk', 6000, 0, 10, '2006-09-18', '123 Oak St', 'Phoenix', 2),
(41, 'Emily Green', 'Salesman', 15000, 8000, 20, '2003-10-10', '234 Birch Rd', 'Dallas', 3),
(42, 'Jack Hall', 'Manager', 18000, 5000, 30, '2004-04-13', '345 Maple Ave', 'Houston', 3),
(43, 'Isabella Lee', 'Clerk', 7000, 0, 20, '2006-11-23', '456 Oak Blvd', 'San Diego', 2),
(44, 'Harper King', 'President', 20000, 10000, 40, '2000-01-18', '567 Cedar Rd', 'Atlanta', 1),
(45, 'Sebastian Allen', 'Salesman', 13000, 8000, 20, '2002-03-21', '678 Birch Blvd', 'Chicago', 2),
(46, 'Henry Evans', 'Clerk', 5500, 0, 10, '2005-10-05', '789 Oak Ave', 'San Francisco', 1),
(47, 'Ava Turner', 'Manager', 18000, 3500, 30, '2003-12-02', '890 Birch Rd', 'Miami', 3),
(48, 'Carter Scott', 'Salesman', 12000, 15000, 20, '2001-05-27', '101 Maple Rd', 'Los Angeles', 2),
(49, 'Amos Young', 'Clerk', 6000, 0, 10, '2005-09-18', '202 Cedar Blvd', 'Phoenix', 1),
(50, 'Zoe Mitchell', 'Manager', 15000, 6000, 30, '2004-03-07', '303 Birch Rd', 'Chicago', 2),
(51, 'Mohak Mangalam', 'Ownee', 80000, 35000, 30, '2001-08-21', 'California', 'Sant-Lewis', 3);

update employees
set dept_id=10
where job = 'Manager';

-- Insert data into Departments table
INSERT INTO DEPARTMENTS (dept_id, dept_name) VALUES
(10, 'HR'),
(20, 'Sales'),
(30, 'IT'),
(40, 'Executive');

drop table employees;

-- Insert data into COMPANIES table
INSERT INTO COMPANIES (company_id, company_name, address, city, country) VALUES
(1, 'First Bank Corporation', '123 Banking St', 'New York', 'USA'),
(2, 'Tech Solutions Ltd', '456 Tech Park', 'San Francisco', 'USA'),
(3, 'Global Enterprises', '789 Industrial Blvd', 'Los Angeles', 'USA'),
(4, 'Green Innovations Inc.', '234 Green Rd', 'Chicago', 'USA'),
(5, 'Luxury Homes Realty', '101 Estate Ave', 'Miami', 'USA'),
(6, 'Blue Water Shipping', '555 Harbor St', 'Seattle', 'USA'),
(7, 'CyberTech Solutions', '888 Silicon Valley', 'San Jose', 'USA'),
(8, 'Mighty Builders Group', '777 Construction Rd', 'Houston', 'USA'),
(9, 'Healthcare Providers Co.', '432 Medical St', 'Dallas', 'USA'),
(10, 'Smart Solutions LLC', '159 Innovation Dr', 'Boston', 'USA'),
(11, 'Creative Design Studio', '100 Art St', 'Austin', 'USA'),
(12, 'Future Tech Enterprises', '987 Future Ave', 'San Francisco', 'USA'),
(13, 'Solar Power Industries', '321 Sun Blvd', 'Phoenix', 'USA'),
(14, 'Quantum Technologies', '456 Tech Park', 'Los Angeles', 'USA'),
(15, 'Digital Media Group', '123 Digital St', 'New York', 'USA'),
(16, 'Real Estate Holdings', '432 Property Rd', 'Orlando', 'USA'),
(17, 'Precision Manufacturing', '876 Factory St', 'Detroit', 'USA'),
(18, 'Eco Solutions International', '555 Greenway Blvd', 'Portland', 'USA'),
(19, 'Tech Innovations Co.', '321 High Tech Rd', 'San Jose', 'USA'),
(20, 'Elite Construction Ltd.', '678 Building Ave', 'Chicago', 'USA'),
(21, 'Food & Beverage Inc.', '909 Culinary St', 'Miami', 'USA'),
(22, 'Auto Parts Suppliers', '234 Car St', 'Detroit', 'USA'),
(23, 'Luxury Travel Agency', '111 Tour Blvd', 'Los Angeles', 'USA'),
(24, 'International Finance Group', '567 Finance St', 'New York', 'USA'),
(25, 'Smart Wearables Co.', '123 Gadget Rd', 'Austin', 'USA'),
(26, 'NextGen Robotics', '555 Machine Dr', 'Chicago', 'USA'),
(27, 'Cloud Solutions Providers', '888 Cloud Blvd', 'Seattle', 'USA'),
(28, 'Entertainment Studios', '444 Movie Rd', 'Los Angeles', 'USA'),
(29, 'Renewable Energy Solutions', '234 Solar Ave', 'Phoenix', 'USA'),
(30, 'Consulting Professionals Group', '123 Consulting St', 'Boston', 'USA');

select * from employees;
select * from departments;
select * from companies;

-- 1. Find the names, street address, and cities of residence for all employees who work for'First Bank Corporation' and earn more than $10,000.
select e.emp_name,e.address,e.city
from employees as e
JOIN 
companies as c
on e.company_id = c.company_id
where c.company_name = 'First Bank Corporation' and salary>10000;

-- 2. Select the employees in department 30
select e.emp_name,d.dept_name from
employees e
JOIN
departments d
on e.dept_id = d.dept_id;

-- 3. List the names, numbers and departments of all clerks. *
select e.emp_name,e.emp_id,d.dept_name 
from employees e
JOIN
departments d
on e.dept_id = d.dept_id
where e.job = 'Clerk';

-- 4. Find the department numbers and names of employees of all departments with deptno greater than 20. *
select e.emp_name,d.dept_id,d.dept_name
from employees e
JOIN
departments d
on e.dept_id = d.dept_id
where d.dept_id>20;

-- 5. Find employees whose commission is greater than their salaries. *
select e1.emp_name,e1.commission,e2.salary
from employees e1
JOIN 
employees e2
on e1.emp_id = e2.emp_id
where e1.commission < e2.salary;

-- 6. Find employees whose commission is greater than 60 % of their salaries.
select emp_name from employees 
where commission > (0.6) * salary;

-- 7. List name, job and salary of all employees in department 20 who earn more than 2000/-.
-- select e.emp_name,e.job,e.salary,e.dept_id
-- from employees as e
-- JOIN
-- departments as d
-- on e.dept_id = d.dept_id
-- where d.dept_id = 20 and e.salary>2000;
select emp_name,job,salary
from employees
where dept_id=20 and salary>2000;

-- 8. Find all salesmen in department 30 whose salary is greater than 1500/-
select * from employees;
select emp_name 
from employees
where department;

-- 9. Find all employees whose designation is either manager or president.
select *
from employees
where job='manager' or job='president';

-- 10. Find all managers who are not in department 30.
select * 
from employees
where job='manager' and dept_id <>  30;

-- 11. Find all the details of managers and clerks in dept 10.
select * from employees
where dept_id=10;
select * 
from employees
where dept_id=10 and (job='manager' or job='clerk');

-- 12.Find the details of all the managers (in any dept) and clerks in dept 20.
select *
from employees
where job='manager' or (job='clerk' and dept_id=20)
order by job;

-- 13.Find the details of all the managers in dept. 10 and all clerks in dept 20 and all employees 
-- who are neither managers nor clerks but whose salary is more than or equal to 2000/-.
select *
from employees
where (job='manager' and dept_id=10) or (job='clerk' and dept_id=20) or (job <> 'manager' and job <> 'clerk' and salary>= 2000)
order by job;

-- 14. Find the names of anyone in dept. 20 who is neither manager nor clerk.
select *
from employees
where dept_id=20 and (job <> 'manager' and job <> 'clerk')
order by job;

-- 15. Find the names of employees who earn between 1200/- and 1400/-.
select *
from employees
where salary>1200 and salary<1400;

-- 16. Find the employees who are clerks, analysts or salesmen.
select *
from employees
where job='clerk' or job='analyst' or job='salesman'
order by job;

-- 17. Find the employees who are not clerks, analysts or salesmen.
select *
from employees
where job <> 'clerk' or job <> 'analyst' or job <> 'salesman'
order by job;

-- 18. Find the employees who do not receive commission.
select *
from employees
where commission = 0;

-- 19. Find the different jobs of employees receiving commission.
select *
from employees where commission>0
or emp_name;

-- 20. Find the employees who do not receive commission or whose commission is less than 100/-.
select *
from employees
where commission=0 or commission<180;

-- 21. If all the employees not receiving commission is entitles to a bonus of Rs. 250/- show the net earnings of all the employees. *
SELECT emp_name,job,salary,commission, 
       IF(commission = 0, salary + 250, salary) AS `Net-Salary`
FROM employees;

-- 22. Find all the employees whose total earning is greater than 2000/- .
SELECT emp_name,job,salary,commission, 
       IF(commission = 0, salary + 250, salary) AS `Net-Salary`
FROM employees
where salary > 2000;

-- 23. Find all the employees whose name begins or ends with ‘M’
select emp_name 
from employees
where emp_name regexp '^m.*m$';

select emp_name
from employees
where emp_name like 'm%m' or 'M%M';

-- 24. Find all the employees whose names contain the letter ‘M’ in any case.
select *
from employees
where emp_name regexp '[m]';

-- 25. Find all the employees whose names are up to 15 character long and have letter ‘R’ as 3rd character of their names.
select *
from employees
where CHAR_LENGTH(emp_name)<=15 and emp_name regexp '^..[Rr].*';

-- 26. Find all the employees who were hired in the month of February (of any year).
select *
from employees
where monthname(hire_date) = 'february';

-- 27. Find all the employees who were hired on last day of the month.
INSERT INTO EMPLOYEES (emp_id, emp_name, job, salary, commission, dept_id, hire_date, address, city, company_id) VALUES
(53, 'Roman Regiens', 'Analyst', 15000, 25000, 30, '2024-01-31', 'Lol-Ranks', 'Canteen', 3);

select *
from employees
where Day(Last_Day(hire_date)) = Date_Format(hire_date,'%d');

-- or
select*
from employees
where
  (
    DATE_FORMAT(hire_date, '%b') IN ('Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec') 
    and DATE_FORMAT(hire_date, '%d') = '31'
  )
  or
  (
    DATE_FORMAT(hire_date, '%b') IN ('Apr', 'Jun', 'Sep', 'Nov') 
    and DATE_FORMAT(hire_date, '%d') = '30'
  )
  or
  (
	DATE_FORMAT(hire_date, '%b') = 'Feb' 
	AND (
    (DATE_FORMAT(hire_date, '%Y') % 4 = 0 AND DATE_FORMAT(hire_date, '%d') = '29') 
    OR 
    (DATE_FORMAT(hire_date, '%Y') % 4 != 0 AND DATE_FORMAT(hire_date, '%d') = '28') 
	)
  )
order by hire_date;

-- 28. Find all the employees who were hired more than 2 years ago.
select *
from employees
where (Date_Format(current_date(),'%Y') - Date_Format(hire_date,'%Y')>2) ;

-- 29. Find the managers hired in the year 2003.
select *
from employees
where date_format(hire_date,'%Y') = 2003 and job='manager';

-- 30. Display the names and jobs of all the employees separated by a space.
select concat(emp_name,' ',job)
from employees;

-- 31. Display the names of all the employees right aligning them to 15 characters.
SELECT LPAD(emp_name, 15, ' ') AS 'Right-Aligned-Name'
FROM employees;

-- 32. Display the names of all the employees padding them to the right up to 15 characters with ‘*’.
SELECT LPAD(emp_name, 15, '*') AS 'Right-Aligned-Name'
FROM employees;

-- 33. Display the names of all the employees without any leading ‘A’.
select emp_name
from employees
where emp_name not regexp '^[aA]';

-- 34. Display the names of all the employees without any trailing ‘R’.
select emp_name
from employees
where emp_name not regexp '[rR]$'; 

-- 35. Show the first 3 and last 3 characters of the names of all the employees.
select substring(emp_name,1,3) as first_name, right(emp_name,3) as last_name
from employees;

-- 36. Display the names of all the employees replacing ‘A’ with ‘a’.
select replace(emp_name,'A','a') as Emp_Name
from employees;

-- 37. Display the names of all the employees and position where the string ‘AR’ occurs in the name.
select emp_name,job,locate('AR',emp_name) as Position
from employees 
where emp_name like '%AR%' or emp_name like '%ar%';

-- 38. Show the salary of all the employees , rounding it to the nearest Rs. 1000/-.
select round(salary/1000) * 1000 as Salary	
from employees
order by salary;

-- 39. Display the names, jobs and salaries of employees, sorting on job and salary.
select emp_name,job,salary
from employees
order by job,salary;

-- 40. Display the names, jobs and salaries of employees, sorting on descending order of job and within job sorted on salary.
select emp_name,job,salary
from employees
order by job desc, salary asc;

-- 41. List the employee names, department names and salary for those employees who have completed 1 year of service.
INSERT INTO EMPLOYEES (emp_id, emp_name, job, salary, commission, dept_id, hire_date, address, city, company_id) VALUES
(52, 'Dwayne Smith', 'Manager', 12000, 500, 30, '2024-06-12', '123 Elm St', 'New York', 1);

select * 
from employees as e
join departments as d
on e.dept_id = d.dept_id
where (Date_Format(current_date(),'%Y') - Date_Format(hire_date,'%Y') = 1) ;

-- 42. List the employee names, department names and hiredate for those employees who have joined in 2003 . Sort your output in the order of joining date.
select * 
from employees as e
join departments as d
on e.dept_id = d.dept_id
where (Date_Format(e.hire_date,'%Y')) = 2003
order by hire_date;
