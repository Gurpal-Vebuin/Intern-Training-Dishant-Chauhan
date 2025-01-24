-- Create the 'customers' table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    city VARCHAR(100)
);

-- Create the 'accounts' table
CREATE TABLE accounts (
    account_id INT PRIMARY KEY,
    customer_id INT,
    balance DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Bulk insert into 'customers' table
INSERT INTO customers (customer_id, customer_name, city)
VALUES
(1, 'Alice Johnson', 'New York'),
(2, 'Bob Smith', 'Los Angeles'),
(3, 'Charlie Brown', 'Chicago'),
(4, 'David Wilson', 'Miami'),
(5, 'Eva Davis', 'Houston'),
(6, 'Frank Clark', 'Dallas'),
(7, 'George Allen', 'San Francisco'),
(8, 'Helen Adams', 'Seattle'),
(9, 'Ivy Thompson', 'Boston'),
(10, 'Jack Turner', 'Denver'),
(11, 'Kelly Harris', 'Phoenix'),
(12, 'Larry Scott', 'Austin'),
(13, 'Maria Martinez', 'San Diego'),
(14, 'Nancy Moore', 'Chicago'),
(15, 'Oscar Taylor', 'Los Angeles'),
(16, 'Paul Williams', 'Miami'),
(17, 'Quincy Lee', 'Houston'),
(18, 'Rachel Hall', 'Dallas'),
(19, 'Steve Perez', 'San Francisco'),
(20, 'Tracy Walker', 'Seattle');

-- Bulk insert into 'accounts' table for each customer (5 accounts per customer)
INSERT INTO accounts (account_id, customer_id, balance)
VALUES
(101, 1, 5000.00),
(102, 1, 3000.00),
(103, 1, 2500.00),
(104, 1, 10000.00),
(105, 1, 15000.00),
(106, 2, 8000.00),
(107, 2, 12000.00),
(108, 2, 5000.00),
(109, 2, 7000.00),
(110, 2, 10000.00),
(111, 3, 2000.00),
(112, 3, 3000.00),
(113, 3, 4000.00),
(114, 3, 15000.00),
(115, 3, 25000.00),
(116, 4, 6000.00),
(117, 4, 7000.00),
(118, 4, 8000.00),
(119, 4, 10000.00),
(120, 4, 12000.00);

select * from customers;

select * from accounts;

select avg(balance) from accounts;

-- Customers whose balance > avg. balance of customers
select account_id,balance, (select avg(balance) from accounts) 'Avg_Balance'
from accounts
group by account_id,balance
having balance > (select avg(balance) from accounts)
order by customer_id;	

-- For multi-result use IN operator
-- Showing the name of cutomers who have the account.

select customer_name,customer_id,city
from customers
where customer_id In (select customer_id from accounts);

select customer_name, customer_id q
from customers as c
where exists
(
	select customer_id,balance
    from accounts as a
    where c.customer_id = a.customer_id
    and balance > 1000
);

select * from customers;

select * from accounts;

-- Outer if optional to write so left outer join = left join and right outer join = right join
select * 
from customers as c
left outer join
accounts as a
on c.customer_id = a.customer_id;

-- IF-Else statements
select customer_id,balance,
IF(balance>5000,"Rich","Middle Class") as Status
from accounts;

-- Usig Case Statements
SELECT DISTINCT 
    c.customer_id AS customer_id,
    c.customer_name AS customer_name,
    CASE 
        WHEN a.balance > 5000 THEN 'Pass'
        WHEN a.balance > 5000 and a.balance < 10000 THEN 'Middle-Class'
        WHEN a.balance > 1000 and a.balance < 5000 THEN 'Lower Middle Class'
        ELSE 'Fail'
    END AS status
FROM customers AS c
JOIN accounts AS a
    ON c.customer_id = a.customer_id;

select * from accounts;

update accounts 
set balance = (
case 
	when 3000 then 30000
    when 8000 then 80000
    end)
where balance in (3000,8000);

select * from accounts;

select balance,count(account_id)
from accounts
group by balance
having balance>5000;

-- Creating an Index on Columns
create index Account_Index on accounts(account_id);

create unique index uid on accounts(account_id);

select * from accounts;

select * from accounts
where account_id = '101';
commit;

SHOW INDEX FROM accounts;

