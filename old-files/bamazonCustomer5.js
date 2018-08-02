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
                    name: "productQuantity",
                    type: "input",
                    message: "Please enter how many of this item you would like to purchase."

                }
            ])


            .then(function (answer) {
                console.log("This is the answer: ");
                console.log(answer);
                console.log("");

                console.log("Product Quantity: ");
                console.log(answer.productQuantity);
                var finalStock =answer.productQuantity;
                console.log("");

                console.log("Final Stock:")
                console.log(finalStock);
                console.log("");

                
                console.log("Product ID Number: ");
                var i = answer.productChoice -1;
                console.log(res[i].ID);
                console.log("");


                console.log("Stock Quantity")
                var finalQuant =res[i].stock_quantity;
                console.log("");

                
                console.log("Final Quant");
                console.log(finalQuant);
                console.log("");


               
                if(finalQuant >=  finalStock ) {
                    console.log("Congratulations!  Your purchase has been processed successfully!");
                }

                else  {
                    console.log("We're sorry, but we do not currently have in our stock enough of that item for your order.  If you would like to order that item in a smaller quantity, please try again.");
                }
               // connection.query(
                 //   "INSERT INTO auctions SET ?",
                   // {
             //           ID: answer.ID,
               //         Quantity: answer.stock_quantity

                 //   },
                 //   function (err) {
                   //     if (err) throw err;
                     //   console.log("Congratulations on your purchase!");
                        // re-prompt the user for if they want to bid or post
          //              start();
            //        }
          //      );

            }
            )

        connection.end();
    })
}


//function quantity() {

//  .prompt({
//    name: "productQuantity",
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



