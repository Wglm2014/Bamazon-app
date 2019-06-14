//requiere for access of files
const fs = require("fs");
//requiere for mysql DB actions 
const mysql = require("mysql");
//requiere to prompt questions to the user
const inquirer = require("inquirer");

const currencyFormatter = require('currency-formatter');

//Estabilishing first connection to th DB bamazon
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "bamazon",
    password: "bamazon"
});
connection.connect(err => {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId + "\n");

    //query and display all the records of the table products
    selectAll();
});

function selectAll() {
    const sql = "select item_id as Id, left(product_name,75) as product,department_name as department, concat('$',format(price,2)) as price from bamazon.products";
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        //promt user for id number of a product to buy and the amount
        shoppingMenu();
    });
}

function shoppingMenu() {
    inquirer.prompt([{
        type: "number",
        message: "Enter the Product Id you want to buy: ",
        name: "id"
    },
    {
        type: "number",
        message: "How many units would you like to buy: ",
        name: "amount"
    }]).then(resp => {
        //when the user enter the product id and the amount query the individual record
        selectOne(resp.id, resp.amount);
    });
}



function selectOne(id, amount) {
    const sql = "select stock_quantity, price from bamazon.products where item_id = ?";
    connection.query(sql, [id], (err, res) => {
        if (err) throw err;
        if (res.length == 0) {
            console.log("product not found...");
            shopMore();
        }
        console.log(res[0].stock_quantity);
        //compare the amount in stock and the amount the user wants to purchase
        if (amount <= res[0].stock_quantity) {
            const total = res[0].price * amount;
            const totalString = " " + currencyFormatter.format(total, { code: 'USD' })
            console.log(`Your order with total price%s is being place...`, totalString);
            updateProduct(id, (res[0].stock_quantity - amount));
        } else {
            console.log("Not enough in stock of that product");
            shopMore();
        }
    });
}

function updateProduct(id, amount) {
    const sql = "update bamazon.products set ? where ?";
    connection.query(sql, [{ stock_quantity: amount }, { item_id: id }], (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} rows updated`);
        shopMore();
    });

}

function shopMore() {

    inquirer.prompt([{
        type: "confirm",
        message: "continue shoping?",
        name: "shop"
    }]).then(resp => {
        if (resp.shop) {
            selectAll();
        } else {
            connection.end();
        }

    });

}