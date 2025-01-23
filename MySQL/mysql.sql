-- Auto commit and updae is made disabled
create database company;

use company;

create table employee(
	id varchar(20) Unique NOT NULL,
    name VARCHAR(50) NOT NULL,
    city int,
    experience INT NOT NULL,
    primary key(id)
);

drop table employee;
select * from employee where id=NULL;

insert into employee
(id,name,experience)
value
(8,'Anurag' ,22);

desc employee;

insert into employee
(id,name,city,experience) 
values 
('0356','Anurag Dalsaniya',1,8),
('0357','Jaivin Savaliya', 2,12),
('0358','Mann Mendapara', 3,3),
('0359','Keyur Pansuriya', 4,8);

drop table employee;

select * from employee;
drop table student;
-- delete from employee where id='0356';

create table student(
	id INT unique NOT NULL,
    name VARCHAR(50) not null,
    age INT NOT NULL check(age>=18),
    gender VARCHAR(10) NOT NULL,
    phone VARCHAR(10) NOT NULL unique,
    city VARCHAR(20) NOT NULL default 'Ahmedabad'
);

select * from student;
	
INSERT INTO student (id, name, age, gender, phone, city)
VALUES
(6, 'Dishant Chauhan', 22, 'Male', '7041652332', 'Ahmedabad'),
(7, 'Anurage Dalsaniya', 21, 'Male', '7398352332', 'Delhi'),
(8, 'Dishant Chauhan', 22, 'Male', '9724224222', 'Mumbai'),
(9, 'Parth Chauhan', 22, 'Male', '7042252332', 'Ahmedabad'),
(10, 'Priya Patel', 23, 'Female', '9988776655', 'Bangalore'),
(11, 'Vikas Sharma', 20, 'Male', '9321546789', 'Pune'),
(12, 'Nisha Gupta', 24, 'Female', '9876543210', 'Chennai'),
(13, 'Raj Singh', 22, 'Male', '9003456789', 'Kolkata'),
(14, 'Sanya Verma', 25, 'Female', '9966554433', 'Hyderabad'),
(15, 'Kunal Mehta', 21, 'Male', '9567894321', 'Jaipur'),
(16, 'Aarti Kumari', 22, 'Female', '9301234567', 'Surat'),
(17, 'Manoj Kumar', 23, 'Male', '9675321012', 'Lucknow'),
(18, 'Simran Kaur', 22, 'Female', '9087561234','Meerut'),
(19, 'Ravi Ranjan', 20, 'Male', '9745643210','Anand'),
(20, 'Deepika Pandey', 21, 'Female', '9267351209','Amreli'),
(21, 'Arvind Yadav', 24, 'Male', '9812479531','Surat'),
(22, 'Meera Bhat', 23, 'Female', '9791209846', 'Indore'),
(23, 'Amit Jaiswal', 22, 'Male', '9310456789','Savarkundla'),
(24, 'Ruchi Sharma', 21, 'Female', '9825364109', 'Faridabad'),
(25, 'Vivek Reddy', 24, 'Male', '9678906543', 'Vijayawada');

Insert into student (id,name, age , gender, phone,city)
values
(10, 'Priya Patel', 23, 'Female', '9988776655', 'Bangalore');

-- Here , city column is not being added so it will automatically added by default due to constraints. 

drop table student;

select * from company.student;

select id as Identification, name as 'Student Name', age, gender from student;

-- Where condition in MySQL. 
select * from student 
where gender = 'Male' and age<22;
select * from student
where not (city = "Bhopal" or city= "Ahmedabad") and gender = "Male";
select id,name,city from student
where city <> 'Pune' and city <> 'Indore';
-- not equal to => <> or != 

-- In in MySql 
select * from student
where age in (18,21);
select * from student
where age in (18,22,25);
select * from student
where age not in (18,21,19);

-- Between and Not Between Operator
select * from student where
age between 18 and 21; 
select * from student where
name between "a" and "k";
select * from student where 
name between "Dishant" and "Pandey";
commit; 

-- Like and Wildcard Operator
select * from student where
name like "__s%" and name like "n_sha%"; 
select * from student where name like "a%" ;
select * from student where name like "s%" or name like "d%";
select * from student where name like "s%n";
select * from student where name like "di_h% ";
select phone from student where phone like "%71";

-- Regular Expressions 

-- 1. 'ra' means where name should contain 'ra' combinely.
select * from student
where name REGEXP 'ra';  

select * from student
where name REGEXP 'dis';

-- 2. '^ra' suggests where the name should starts with the ra.
select * from student 
where name REGEXP '^ra';

-- 3. 'an$' suggests that where the name ends with the 'an'.
select * from student
where name REGEXP 'an$';

-- 4. ' | ' suggests that the query will match all the words which are included.
select * from student 
where name REGEXP 'Mehta|Chauhan|ya|Gupta';

select * from student
where name REGEXP '^ram|poor|Chauhan$';

-- 4. '[is] checks i or s differently not combinely; 
select * from student
where name REGEXP '[rm]a'; -- checks name having (r or m) with a appended to either one of them.

-- 5. '^[ra] starts with either r or a and '[ra]$' ends with either r or a
select * from student
where name REGEXP '^[ra]';

select * from student
where name REGEXP '[ra]$'; 

select * from student
where name REGEXP '[a-j]r';

-- Sorting [order by] and [distinct]
select * from student
where city='Ahmedabad' 
order by name asc; 

select distinct age,city from student;

-- Is NULL and IS not NULL
select * from student where name is NOT NULL;
select * from student where age is NULL;

-- Limit Clause
select * from student 
where city='Ahmedabad'
limit 3;

select * from student
limit 6,3;

-- Aggregate Functions
select count(age) 
from student
where age>22;

select sum(name)
from student
where age>20;

select count(*) from student;
select count(DISTINCT city) as City from student;
select max(age) as Age from student;
select min(age) as Age from student;
select avg(age) as 'Average Age' from student;

select city,max(age) from student
group by city; 

select age
from student
group by age
order by age desc limit 3,1;

-- Group Concat 
select group_concat(id,name,age) from student;
commit;

-- Update
update student
set phone = "7041642232"
where id=6;

update student 
set age = 55
where id = 7;

select * from student;

update student 
set age = 22, name="Nishant"
where id in(12,14);

select * from student;
commit;

update student 
set age = 25
where id = 6;
rollback; -- due to rollback command, the student column of age will not be updated and the rollback will continue, until commit command is not found.

-- Delete
delete from student
where id=6;
commit;

delete from student
where id=10;

select * from student;
commit;

-- Altering in the Table for generating a primary key;
alter table student
add primary key(id);
commit;

create table city(
	cid int not null,
    cityname Varchar(20) not null,
    primary key(cid)
);
desc city;
desc employee;

insert into city(cid,cityname)
values
(1,"Ahmedabad"),
(2,"Delhi"),
(3, "Rajkot"),
(4,"Surat");

insert into city(cid,cityname)
values
(5,"Jaipur"),
(6,"Udaipur"),
(8,"Indore");

select * from city;
select * from employee;

-- Adding foreign key in employee table
alter table employee  -- employee child and city parent 
add foreign key(city)
references city(cid);
commit;

-- Inner Join = Join
select e.id,e.name,c.cityname,e.experience as experience 
from employee as e 
inner join city as c
on e.city = c .cid
where c.cityname = "Delhi"
order by e.name desc;
commit;

-- Left Join
select * from 
employee as e 
left join city as c
on e.city = c.cid; -- e.city = F.K and c.cid = P.K

-- Right Join
select * from
employee as e 
right join city as c
on e.city = c.cid; 

-- Cross Join
select *
from employee
cross join city;
commit;

-- Self Join
select e.id,e.name,f.city,f.experience
from employee e
join  
employee f
on e.id = f.id;

-- Arithmetic Functions
select 5+6 as Total;
select 12-6 as Sub;

select * from accounts;

select round(4.3);
select round(-6.2);
select round(4.8);
select ceil(2.2);
select pi();
select rand();
select round(rand()*100) as Random; -- random values between 50 and 100
select pow(4,3);
select round(sqrt(5));
select abs(4.65343345);
select abs(-56); -- 56
select abs(-36.53); -- 36.53
select abs(-56); -- 56
select abs(-56); -- 56

-- String Functions
select id,ucase(name) as UpperCase from student;
select id,lcase(name) as LowerCase from student;

select id,name,char_length(name) as characters from student;
select id,name,length(name) as characters from student; -- returns the result in bytes.

select CONCAT(name,' ',id) as Name from student;

select concat_ws('-','baba','youtube','channel') as name; -- concat_ws provides the option of '-' to write in it. 

select Ltrim("       dishant chauhan          ") as name; -- trims the spaces from left side.
select rtrim("     dishant chauhan         ") as name; -- trims the spaces from right side.

-- for searching the word in string
select position('d' in name) from student;
select instr(name,'h') from student;
select locate('h','yahoo baba baba',3); -- start to locate the h from 3

-- Substring
select substring('Yahoo Baba',3) as Name; -- 1 2 3 removed
select substring('Yahoo Baba',3,6) as Name;
select substring('Yahoo Baba',-6,3) as Name;

select substring q 