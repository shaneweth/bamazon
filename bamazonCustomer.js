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
});

function displayAll() {
    con.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(
            res.item_id +
            res.product_name +
            res.department_name +
            res.price +
            res.stock_qty
        )
    });
    buy();
}

function buy() {
    inquirer
        .prompt({
            name: "buy_item",
            type: "input",
            message: "What would you like to buy today, consumer?"
        })
        .then(function (answer) {
            console.log(answer.buy_item);
            con.query("SELECT * FROM products WHERE ?", { item_id: answer.buy_item }, function (err, res) {
                console.log(
                "Item Number: " +   res[0].item_id         + "\n" +
                "Product: "     +   res[0].product_name    + "\n" +
                "Department: "  +   res[0].department_name + "\n" +
                "Price: "       +   res[0].price           + "\n" +
                "Current QTY: " +   res[0].stock_qty       + "\n" 
                );
                con.end();
            })
        })
}





