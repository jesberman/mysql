DROP DATABASE if exists bamazon;

CREATE DATABASE bamazon;

CREATE TABLE products (

ID INT NOT NULL AUTO_INCREMENT,

product_name VARCHAR(100) NOT NULL,

department_name VARCHAR(100) NOT NULL,

price DECIMAL(5,2),

stock_quantity INT NOT NULL,

PRIMARY KEY (ID)


);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Chevy Silverado','Auto',900.00,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Gatorade','Beverages', 5, 30);