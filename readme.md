# Bamazon Store App
I a Node.js terminal app that connects to a Mysqlsql database named **BAMAZON** with one table named **Products** that contains ten records about a variaraty of products belongin to different departments of simulated online store. For a faster way on how the app works you can click on the image to see a Youtube video where the app is being use.

[![Bamazon Video](https://i9.ytimg.com/vi/onLi6L6d_vU/mq2.jpg?sqp=CIiXj-gF&rs=AOn4CLD4ot6EHt9Pfnqrt9IpYe47svwVAg)](https://youtu.be/onLi6L6d_vU)

### Steps how to use the Bamazon-Store-app
* Open the directory where the app is store.
* Run the app using the command `node bamazon-store`
* The app will display a list of all the products store on the table
* The app will ask for the id of the product to buy and the amount
* If the amount of the product is more than the stock in records, a message will be shown telling that there is no enough in stock
* If the amount in stock is enough a message with the total price and the order being place will be display
* If the User enters an Id that does not exist the app will show a message telling the user the product does not exist
* Finally after each complete operation the user is ask to continue shoping or exit the app!

## About the files In the directory
If a person wants to download the files in the container can settup the app following this steps:

1. Open Mysql and create the user _bamazon_ with password _bamazon_ or change the user name and password settup in bamazon-store.js to one existing.
1. Open the file products.sql and run it or copy and paste the sql code in it and run it in mysql.
1. Open the file products-data.sql and run it or copy and paste the sql code in it to create the data, in mysql.
1. run the command in the terminal `npm install` to install the packages mysql, inquirer and currency-formater use for the functionality of the app.
1. Open the file bamazon-store.js and read the code to undertand the flow of the code and the functions. Enjoy!
