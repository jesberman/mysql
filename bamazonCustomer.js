//declares a variable related to the inquirer npm package
var inquirer = require("inquirer");

//declares a variable related to the mysql npm package
var mysql = require('mysql');

//declares a variable connected to the mySQL database that is being locally hoseted
var connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    //  username
    user: "root",

    //  password
    password: "Bloodraven36",
    database: "bamazon"
})

//function declaration that shows the user the items in a database, and then asks the user if they would like to purchase a specific number of that item
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        var items = [];
        if (err) throw err;
        //displays in the terminal the various products available for sale
        for (var i = 0; i < res.length; i++) {
            items.push(res[i])
            console.log(" ");
            console.log(" ");
            console.log(res[i].product_name);
            console.log(("Product ID #: ") + res[i].ID);
            console.log(("Price: $") + res[i].price);
            console.log("Number of items in stock: " + res[i].stock_quantity)
            var initialStock = res[i].stock_quantity;
            console.log(" ");
        }
        //allows the user to first select the product they would like to purchase, and then to select the quanity of that item they would like to purchase
        inquirer
            .prompt([
                {
                    name: "productChoice",
                    type: "input",
                    message: "Please type the Product ID # of the product you would like to purchase."
                },
                {
                    name: "quantityCustomerRequesting",
                    type: "input",
                    message: "Please enter how many of this item you would like to purchase."
                }
            ])
            .then(function (answer) {
                //defines a series of variables used to calculate how much of an item is still in stock and tell the user to total price of their purchase
                var i = answer.productChoice - 1;
                var userID = res[i].ID;
                var pricePerUnit = res[i].price;
                var quantityOfItemInStock = res[i].stock_quantity;
                var customerAskQuantity = answer.quantityCustomerRequesting;
                var stockStillRemaining = quantityOfItemInStock - customerAskQuantity;

                //If/else statement that processes a user's purchase if there is sufficient quantity, or displays an error message if there isn't 
                if (quantityOfItemInStock >= customerAskQuantity) {
                    function updateProduct() {
                        var whatever = "UPDATE products SET stock_quantity =" + stockStillRemaining + " Where ID =" + userID;
                        connection.query(whatever,
                            function (err, results) {
                                if (err) throw err;
                                console.log("");
                                console.log("");

                                console.log("Congratulations!  Your purchase has been processed successfully!");
                                console.log("");

                                console.log("Total Cost:");
                                console.log(("$") + (customerAskQuantity) * (pricePerUnit));
                            }
                        );
                    }
                    //runs the "updateProduct" function
                    updateProduct();
                }
                else {
                    console.log("");
                    console.log("");
                    console.log("We're sorry, but we do not currently have in our stock enough of that item for your order.  If you would like to order that item in a smaller quantity, please try again.");
                }
                //terminates the connection with the local host
                connection.end();
            }
            )
    })
}

connection.connect(function (err) {
    if (err) throw err;
    //runs the "afterConnection" function
    afterConnection();
});