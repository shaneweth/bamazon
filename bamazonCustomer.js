const mysql = require("mysql");
const inquirer = require("inquirer");

var con = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",

    database: "bamazon"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("connected as " + con.threadId);
    displayAll();
});

function displayAll() {
    con.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        con.end();
    });
}

