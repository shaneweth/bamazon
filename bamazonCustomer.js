const mysql = require("mysql");
const inquirer = require("inquirer");

var con = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected as " + con.threadId + "\n");
    displayAll();

});


function displayAll() {
    con.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(" ");
        console.log("Hello there, fine consumer! Here's a fine list of our fine products: \n");
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");

        for (var j = 0; j < res.length; j++) {
            console.table(
                "Item Number: " + res[j].item_id + "\n" +
                "Product: " + res[j].product_name + "\n" +
                "Department: " + res[j].department_name + "\n" +
                "Price: $" + res[j].price + "\n" +
                // "Current QTY: " + res[j].stock_qty + "\n" +
                "\n--$$$$$$$$$$$$$$$$$$$$$$$$$$$--\n"
            )
        }
        buy();
    })
}

function buy() {
    inquirer
        .prompt([
            {
                name: "buy_item",
                type: "input",
                message: "Which of these fine items would you like to buy today, fine consumer?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many of these fine items would you like?",
            }
        ])
        .then(function (res) {
            let item    = res.buy_item;
            let qty     = res.stock_qty;
            let price   = res.price;


            con.query(" SELECT * FROM products WHERE item_id = " + item,
                function (err, res) {
                    if (err) throw err;
                    // add sanitizer for input here...

                     else {
                        const productObj = res[0];
                        console.log(productObj.stock_qty);

                        if (qty <= productObj.stock_qty) {
                            console.log("Looks like you're in luck! We're placing this order right now...");

                            const updateQty = "UPDATE products SET stock_qty = " + (productObj.stock_qty - qty) + " WHERE item_id = " + item;

                            con.query(updateQty, function (err, res) {
                                if (err) throw err;

                                console.log("Your order has been placed... Your total is $" + price * qty);
                                con.end();
                            })

                        }
                    };
                })
        })
}