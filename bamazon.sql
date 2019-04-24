DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price decimal(20,2),
    stock_qty INT(10),
    PRIMARY KEY(item_id)
    );
    
    
INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Coffee Mugs", "Kitchen", 20.00, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Headphones", "Audio", 50.00, 20);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Chair", "Furniture", 40.00, 30);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Bicycle", "Outdoor", 200.00, 10);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Coffee", "Grocery", 10.00, 100);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Sofa", "Furniture", 120.00, 15);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Glass", "Kitchen", 5.00, 200);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Tent", "Outdoor", 50.00, 20);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Speaker", "Audio", 150.00, 50);

INSERT INTO products (product_name, department_name, price, stock_qty)
VALUES ("Pasta", "Grocery", 2.00, 1000);