DROP DATABASE if exists bamazon;

CREATE DATABASE bamazon;

USE bamazon;

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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Slinky', 'Toys', 8, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sega Saturn', 'Electronics', 200, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mr. Nobody-Blue Ray', 'Films', 6, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dental Floss', 'Oral Health', 8, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Kitchen Table', 'Furniture', 200, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Sectional Sofa', 'Furniture', 350, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Plasma TV', 'Electronics', 8000, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('iPhone 6s', 'Electronics', 400, 38);