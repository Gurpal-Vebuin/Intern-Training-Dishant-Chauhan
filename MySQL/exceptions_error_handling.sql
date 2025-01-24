select * from accounts;
select * from employee;
commit;
-- Database Transactions
update accounts
set balance=55000
where account_id = '101';
commit;
rollback;

select * from accounts;

-- Window Functions

-- 1. Aggragation Functions
select account_id,customer_id,balance,
SUM(balance) over (partition by customer_id order by customer_id) as "Total",
Avg(balance) over (partition by customer_id order by customer_id) as "Average",
Min(balance) over (partition by customer_id order by customer_id) as "Min",
Max(balance) over (partition by customer_id order by customer_id) as "Max"
from accounts;

select account_id,customer_id,balance,
SUM(balance) over (partition by customer_id
order by customer_id Rows between unbounded preceding and unbounded following) as "Total"
from accounts;
commit;

SELECT account_id, customer_id, balance,
       SUM(balance) OVER (
           PARTITION BY customer_id 
           ORDER BY account_id 
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS "RunningTotal"
FROM accounts; -- Using the current row will add the cummulative sum.

-- 2. Rank Functions
SELECT customer_id,
       row_number() over (order by customer_id) as "Row Number",
       Rank() over(order by customer_id) as "Rank",
       Dense_Rank() over (order by customer_id) as "Dense Rank",
       Percent_Rank() over (order by customer_id) as "Percent Rank",
       Lead(customer_id) over (order by customer_id) as "Lead",
       Lag(customer_id) over(order by customer_id) as "Lag"
FROM accounts;

-- Views in MySQL
select * from employee;
select * from city;

create view employee_view
as 
select *
from employee e
inner join city c
on e.city = c.cid;

select * from employee_view;

-- To change the view
alter view employee_view 
as 
select e.id,e.name,e.city,c.cityname
from employee e
JOIN city c
on e.city = c.cid;

select * from student;
select * from employee_view;
commit;

-- Create or replace view to change the view
alter view employee_view 
as 
select e.id,e.name,e.city,c.cityname
from employee e
JOIN city c
on e.city = c.cid;

rename table employee_view to emp_view; 

delete from employee 
where id='0360';

select * from emp_view;
commit;

-- Delete the view
drop view emp_view;	

-- Trigger Functions

-- Create trigger : syntax trigger:

-- create trigger before_inserting_user

-- on users for each row

-- Delete a trigger
drop trigger before_insert_user;

DELIMITER //

CREATE TRIGGER before_insert_user
BEFORE INSERT
ON employee
FOR EACH ROW
BEGIN
   -- Multiply the experience by 2 before inserting the new record
   SET NEW.experience = New.experience * 2;
END; //

DELIMITER ;

select * from employee;

delete from
employee where id='0425';

insert into employee
(id,name,city,experience)
values
('0426','anupama',12,5);

select * from employee;

-- Create Update Trigger
-- update experience based on the updation of the experience

delimiter //

create trigger before_update_employee
before update
on employee
FOR Each row
begin

set new.experience = new.experience * 2;
end ; //

DELIMITER ;

update employee
set experience = 20
where id = '0358';

select * from employee;

desc accounts;
select * from customers;
select * from accounts;

desc customers;

alter table customers
add column account_count int default 0;

-- Create delete trigger:

-- create trigger : to update account_count of users
delimiter //
create trigger before_open_account
before insert -- it means that this trigger will be invoked before insertion of the new account and will update the customers section.
on accounts 
for each row
begin

update customers
set account_count = account_count+1
where customer_id = new.customer_id;  -- new.customer_id means k accounts table ma jo new account open karso to new.customer_id che e match krse customer_id sathe;

end ; //	
DELIMITER ;

select * from customers;
insert into accounts
(account_id,customer_id,balance)
values
('122',3,121000);

-- create trigger : to close account triger

delimiter //

create trigger before_close_accoutn
before delete 
on accounts
for each row
begin

update customers set account_count = account_count-1 
where customer_id = old.customer_id;

end ;//
delimiter ;

delete from customers
where customer_id = '122';

select * from customers;

-- CTE
WITH my_cta AS (
    SELECT * FROM accounts
),
my_c AS (
    SELECT * FROM customers
)

select a.account_id,c.customer_name, c.customer_id,a.balance
from my_cta as a, my_c as c;

select * from customers;

with recursive my_cte as (
	select 1 as n	-- base query
    
    Union all
    
    select n+1 from my_cte -- recursive query
    where n<10 )				-- condition check

select * from my_cte;

-- Practical Approach
WITH RECURSIVE my_cte AS (
    -- Anchor Query
    SELECT account_id, customer_id, balance
    FROM accounts
    WHERE customer_id = 7
    
    UNION ALL
    
    -- Recursive Query
    SELECT ac.account_id, ac.customer_id, ac.balance
    FROM accounts ac
    JOIN my_cte ce ON ac.customer_id = ce.customer_id
    WHERE ce.account_id <> ac.account_id  -- Prevent infinite recursion by ensuring we don't reprocess the same account
)
-- Select data from the recursive CTE
select * from my_cte;

--  Store Procedures
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_student_info` (in age int) 
-- passed a paramter age and the data-tye of age is INT
BEGIN
    SELECT * FROM student where student.age>age; -- with student.age in this syntax only.
END //

DELIMITER ;

DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `return_student_info` (out records int) 
-- passed a paramter age and the data-tye of age is INT
BEGIN
    SELECT count(*) into records FROM student; 
END //

DELIMITER ;


-- Delete a procedure
drop procedure get_student_info;

Call get_student_info(27);
call return_student_info(@record); -- whatever result is gained, stores in the @records

select @record as totalrecords;

-- For passing the data is In, and for return the data from procedures is out.

-- For passing the two parameters

DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `student_info` (inout records int,in age int) 
-- passed a paramter age and the data-tye of age is INT
BEGIN
    SELECT count(*) into records FROM student where student.age>age; -- with student.age in this syntax only.
END //

DELIMITER ;

call student_info(@records,20);

select @records as totalrecords;

-- Records info
DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `student` ()
BEGIN
    -- First query: Select all students
    SELECT * FROM student;

    -- Second query: Select students with a specific condition
    SELECT * FROM student WHERE age > 18;

    -- Third query: Update a student's information
    UPDATE student SET name = 'John Doe' WHERE id = 1;

    -- Fourth query: Insert a new student
    INSERT INTO student (id, name, age,gender,phone,city) 
    VALUES (101, 'Jane Doe', 22,"Male",'934234342','Ahmedabad');
END //

DELIMITER ;

call student();

