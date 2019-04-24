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
        for (var j = 0; j < res.length; j++) {
            console.log(
                "Item Number: " + res[j].item_id + "\n" +
                "Product: " + res[j].product_name + "\n" +
                "Department: " + res[j].department_name + "\n" +
                "Price: " + res[j].price + "\n" +
                "Current QTY: " + res[j].stock_qty + "\n"
            )}
    })
}

function buy() {
    inquirer
        .prompt({
            name: "buy_item",
            type: "input",
            message: "What would you like to buy today, consumer?"
        })
        .then(function (answer) {
            
            con.query("SELECT * FROM products WHERE ?", { item_id: answer.buy_item }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "Item Number: " + res[i].item_id + "\n" +
                        "Product: " + res[i].product_name + "\n" +
                        "Department: " + res[i].department_name + "\n" +
                        "Price: " + res[i].price + "\n" +
                        "Current QTY: " + res[i].stock_qty + "\n"
                    )
                };
            })
        })
}





