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
    console.log("connected as " + con.threadId);
    displayAll();
    buy();
});

function displayAll() {
    con.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        
        console.log("Hello there, fine consumer! Here's a fine list of our fine products: ");

        for (var j = 0; j < res.length; j++) {
            console.log(
                "Item Number: " + res[j].item_id + "\n" +
                "Product: " + res[j].product_name + "\n" +
                "Department: " + res[j].department_name + "\n" +
                "Price: " + res[j].price + "\n" +
                "Current QTY: " + res[j].stock_qty + "\n"
            )
        }
    })
}

function buy() {
    inquirer
        .prompt({
            name: "buy_item",
            type: "input",
            message: "What would you like to buy today, consumer?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many of these fine items would you like?",
        })
        .then(function (answer) {

            let item = answer.buy_item;
            let qty = answer.stock_qty;
            let price = answer.price;

            // var queryStr = "SELECT * products WHERE ?";

            con.query( " SELECT * products WHERE ? ", {
                item_id: item
            }, function (err, res) {
                if (err) throw err;

                if (res.length === 0) {
                    console.log("ERROR: I'm afraid this doesn't make any sense. Pick something else, please.");
                    displayAll();

                } else {
                    const productObj = res[0];

                    if (qty <= productObj.stock_qty) {
                        console.log("Looks like you're in luck! We're placing this order right now...");

                        const updateQty = "UPDATE products SET stock_qty = " + (productObj.stock_qty - qty) + " WHERE item_id = " + item;

                        con.query(updateQty, function(err, res) {
                            if (err) throw err;

                            console.log("Your order has been placed... Your total is $" + price * qty);
                            con.end();
                        })

                    }

                    // for (var i = 0; i < res.length; i++) {
                    //     console.log(
                    //         "Item Number: " + res[i].item_id + "\n" +
                    //         "Product: " + res[i].product_name + "\n" +
                    //         "Department: " + res[i].department_name + "\n" +
                    //         "Price: " + res[i].price + "\n" +
                    //         "Current QTY: " + res[i].stock_qty + "\n"
                    //     )
                        // tell the database to reduce the res[i].stock_qty by a specific amount

                    };
                }
            )

        })
}