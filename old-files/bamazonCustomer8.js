var inquirer = require("inquirer");

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Bloodraven36",
    database: "bamazon"
})

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        var items = [];
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            items.push(res[i])
            console.log(res[i].product_name);
            console.log(("Product ID #: ") + res[i].ID);
            console.log(("Price: $") + res[i].price);
            console.log("Number of items in stock: " + res[i].stock_quantity)
            var initialStock = res[i].stock_quantity;
            console.log(" ");


            // var quant = items[4];
            //console.log("quant" + quant);

            //console.log(" ");

        }
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
                console.log("This is the answer: ");
                console.log(answer);
                console.log("");

                console.log("Product ID Number: ");
                var i = answer.productChoice - 1;
                console.log(res[i].ID);
                console.log("");
                var userID = res[i].ID;

                console.log("Price per unit:");
                var pricePerUnit = res[i].price;
                console.log(("$")+pricePerUnit);
                console.log("");


                console.log("Number of this Item Initially in Stock")
                var quantityOfItemInStock = res[i].stock_quantity;
                console.log(quantityOfItemInStock);
                console.log("");

                console.log("Quantity of Item that the Customer is Requesting: ");
                //console.log(answer.quantityCustomerRequesting);
                var customerAskQuantity = answer.quantityCustomerRequesting;
                // console.log("");
                //console.log("Quantity the Customer is Requesting:")
                console.log(customerAskQuantity);
                console.log("");

                var stockStillRemaining = quantityOfItemInStock - customerAskQuantity;


                if (quantityOfItemInStock >= customerAskQuantity) {

                    console.log("Number of This Item Now Remaining in Stock");
                    console.log(stockStillRemaining);
                    console.log("");
                    





                    function updateProduct() {
                        var whatever ="UPDATE products SET stock_quantity =" + stockStillRemaining+" Where ID =" +userID;
                        console.log(whatever);
                        connection.query(whatever,
                            
                        //    "UPDATE products SET stock_quantity = ? WHERE ID= ?",
                        
                          //  [
                            //    {
                            //        stock_quantity: stockStillRemaining
                            //    },
                            //    {
                           //         ID: userID
                           //     }
                        //    ],
                            function (err, results) {
                                console.log('hello')
                                if (err) throw err;
                                console.log("Congratulations!  Your purchase has been processed successfully!");
                                console.log("");
            
                                console.log("Total Cost:");
                                console.log(("$")+(customerAskQuantity)*(pricePerUnit));                            }
                        );
                    }
                    updateProduct();
                }

                else {
                    console.log("We're sorry, but we do not currently have in our stock enough of that item for your order.  If you would like to order that item in a smaller quantity, please try again.");
                }
         connection.end();

            }
            )

        // connection.end();
    })
}


//function quantity() {

//  .prompt({
//    name: "quantityCustomerRequesting",
//  type: "input",
//        message: "Please enter how much of this item you would like to purchase."
//    })
//   .then(function (answer) {
//     console.log(answer);
// }
//  )


//}

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});



