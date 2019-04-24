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
    startPrompt();
});

function displayAll() {
    con.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
    });


}

function startPrompt() {
    inquirer
        .prompt({
            name: "buy",
            type: "list",
            message: "Which Item would you like to purchase?",
            choices: function (err, res) {
                if (err) throw err;
                var productArr = [];
                for (var i = 0; i < res.length; i++) {
                    productArr.push(res[0].product_name);
                }
                return productArr;
            }
        })
}