CREATE TABLE worker(
  worker_id int auto_increment primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  salary decimal(10,2) not null,
  joining_date date not null,
  department varchar(20) not null
);

CREATE TABLE title(
  worker_ref_id int not null,
  worker_title varchar(20) not null,
  affected_from date not null,
  foreign key(worker_ref_id) references worker(worker_id)
);

CREATE TABLE bonus(
  worker_ref_id int not null,
  bonus_date date not null,
  bonus_amount decimal(10,2) not null,
  foreign key(worker_ref_id) references worker(worker_id)
);

--  Inserting the data
insert into worker (worker_id, first_name, last_name, salary, joining_date, department)
values
(1, 'Monika', 'Patel', 100000, '2014-02-20', 'HR'),
(2, 'Niharika', 'Verma', 80000, '2014-06-11', 'Admin'),
(3, 'Vishal', 'Singhal', 300000, '2014-02-20', 'HR'),
(4, 'Amitabh', 'Singh', 500000, '2014-02-20', 'Admin'),
(5, 'Vivek', 'Bhatti', 500000, '2014-06-11', 'Admin'),
(6, 'Vipul', 'Diwan', 200000, '2014-06-11', 'Account'),
(7, 'Satish', 'Kumar', 75000, '2014-01-20', 'Account'),
(8, 'Geetika', 'Chauhan', 90000, '2014-04-11', 'Admin');

insert into title (worker_ref_id,worker_title , affected_fromw)
values
(1, 'Manager', '2016-02-20'),
(2, 'Executive', '2016-06-11'),
(8, 'Executive', '2016-06-11'),
(5, 'Manager', '2016-06-11'),
(4, 'Asst. Manager', '2016-06-11'),
(7, 'Executive', '2016-06-11'),
(6, 'Lead', '2016-06-11'),
(3, 'Lead', '2016-06-11');

insert into bonus (worker_ref_id, bonus_date, bonus_amount)
values
(1, '2016-02-20', 5000),
(2, '2016-06-11', 3000),
(3, '2016-02-20', 4000),
(1, '2016-02-20', 4500),
(2, '2016-06-11', 3500);

select * from worker;
select * from title;
select * from bonus;

-- Q-1. Write an SQL query to print the first three characters of  FIRST_NAME from Worker table.					
select Substring(first_name,1,3) as FIRST_NAME
from worker;
					
-- Q-2. Write an SQL query to show only odd rows from a table.					
with working_row as (
	select *,ROW_NUMBER() over() as row_num from worker
) select * from working_row where row_num%2 <> 0;
					
-- Q-3. Write an SQL query to print details of the Workers whose FIRST_NAME ends with ‘h’ and contains six alphabets.					
select *
from worker
where first_name like '%h' and length(first_name) = 6;
					
-- Q-4. Write an SQL query to fetch the count of employees working in the department ‘Admin’.					
select count(worker_id)
from worker
where department = 'Admin';
					
-- Q-5. Write an SQL query to print details of the Workers whose SALARY lies between 100000 and 500000.					
select *
from worker
where salary between 100000 and 500000;	

-- Q-6. Write an SQL query to print details of the Workers who have joined in Feb’2014.					
select *
from worker
where month(joining_date) = 2 and year(joining_date) = 2014;
				
-- Q-7. Write an SQL query to fetch “FIRST_NAME” from Worker table in upper case.					
select Ucase(first_name) as FIRST_NAME
from worker;
				
-- Q-8. Write an SQL query to fetch worker names with salaries >= 50000 and <= 100000.					
select concat(first_name,' ',last_name) as Full_Name
from worker
where salary between 50000 and 100000;
		
-- Q-9. Write an SQL query to print details of the Workers who are also Managers.					
select w.worker_id,w.first_name,w.last_name,w.salary,w.joining_date, t. worker_title,t.affected_from
from worker as w
JOIN
title as t
on w.worker_id = t.worker_ref_id
where t.worker_title = 'Manager';
 				
-- Q-10. Write an SQL query to fetch unique values of DEPARTMENT from Worker table.					
select distinct(department)
from worker;

-- Q-11. Write an SQL query to fetch the first 50% records from a table.					
with working as (
	select  * , ROW_NUMBER() over () as row_num from worker
) select * from working where row_num <= (select count(*) from worker) / 2;

-- Q-12. Write an SQL query to print the FIRST_NAME from Worker table after removing white spaces from the right side.					
select rtrim(first_name)
from worker;

-- Q-13. Write an SQL query to print the FIRST_NAME from Worker table after replacing ‘a’ with ‘A’.					
select replace(first_name,'a','A') as FIRST_NAME
from worker;

-- Q-14. Write an SQL query to print the FIRST_NAME and LAST_NAME from Worker table into a single column COMPLETE_NAME. 
-- A space char should separate them.					
select concat(first_name,' ',last_name) as COMPLETE_NAME
from worker;
 					
-- Q-15. Write an SQL query to print all Worker details from the Worker table order by FIRST_NAME Ascending and DEPARTMENT Descending.					
select *
from worker
order by first_name asc, department desc;
					
-- Q-16. Write an SQL query to print details of workers excluding first names, “Vipul” and “Satish” from Worker table.					
select *
from worker
where first_name not in ('Vipul','Satish');
		
-- Q-17. Write an SQL query to show the current date and time.					
select CURRENT_DATE() as 'Current_Date';
				
-- Q-18. Write an SQL query to show the second highest salary from a table.	
WITH second_salary AS (
    select *,
           DENSE_RANK() OVER (order by salary desc) as second_highest
    from worker
)
select * from second_salary
where second_highest = 2;
				
-- Q-19. Write an SQL query to show one row twice in results from a table.					
select *
from worker
Union all
select * 
from worker
order by worker_id;
 					
-- Q-20. Write an SQL query to fetch intersecting records of two tables.					
select *
from worker as w
JOIN 
title as t
on w.worker_id = t.worker_ref_id;

select *
from worker as w
JOIN 
bonus as b
on w.worker_id = b.worker_ref_id;