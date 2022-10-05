const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const cors=require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : '104.197.175.232',
    user     : 'root',
    password : '1234',
    database : 'marketplace1', 
    multipleStatement: true
});

app.post("/api/insert", (req, res) => {

    const sqlInsert = "INSERT INTO Customer(ID, first_name, last_name, Password) VALUES (?, ?, ?, ?)";
    
    connection.query(sqlInsert, [req.body.customerId, req.body.firstName, req.body.lastName,req.body.password],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });

    res.json({ message: "Success!" });
});

app.post("/api/insertSeller", (req, res) => {

    const sqlInsertSeller = "INSERT INTO Seller(ID, First_name, Last_name, Location) VALUES (?, ?, ?, ?)";
    
    connection.query(sqlInsertSeller, [req.body.sellerId, req.body.sellerFirstName, req.body.sellerLastName,req.body.sellerLocation],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });
    res.json({ message: "Success!" });
});

app.post("/api/addToInv", (req, res) => {

    const sqlAddProd = "INSERT INTO Sells(sellerId, productId) VALUES (?, ?)";
    
    connection.query(sqlAddProd, [req.body.oldSellerId, req.body.addProduct],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });
    res.json({ message: "Success!" });
});


app.post("/api/delete", (req, res) => {
    
    const sqlDel = "DELETE FROM Customer WHERE ID = ? ";
    connection.query(sqlDel, [req.body.del_id],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });

    

    res.json({ message: "Success!" });
});

app.post("/api/update", (req, res) => {

    const sqlUpdate = "UPDATE Customer SET first_name = ?, last_name = ? WHERE ID = ? ";
    connection.query(sqlUpdate, [req.body.update_firstName, req.body.update_lastName, req.body.update_id],
        function (error, results, fields){
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });

    

    res.json({ message: "Success!" });
});


app.get("/api/productList", (req, res)  => {
    
    const sqlSearch = "SELECT * FROM Product";
    connection.query(sqlSearch, (error, results) => {
        if (error){
            console.log(error);
        }
        else {
            res.send(results);
        }});

});

app.post("/api/createOrder", (req, res) => {
    
    const sqlOrder = "INSERT INTO Orders (Address, delLocation) VALUES (?, ?)";
    
    connection.query(sqlOrder, [req.body.orderAddress, req.body.city],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });

    const sqlInclude = "INSERT INTO Includes SELECT MAX(ID), ?, ? from Orders";
    connection.query(sqlInclude, [req.body.newProductId, req.body.quantity],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });

    const sqlTotal = "UPDATE Orders SET totalAmount = (SELECT sum(i.quantity*p.Price) FROM Includes i join Product p on i.productId = p.ID WHERE p.ID = ? and i.quantity = ? and i.orderId = (SELECT MAX(orderId) FROM Includes)) WHERE ID = (SELECT MAX(orderId) FROM Includes)";
    
    connection.query(sqlTotal, [req.body.newProductId, req.body.quantity],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });
    
    const sqlPlace = "INSERT INTO Places (custId, orderId) SELECT ?, (SELECT MAX(ID) FROM Orders) FROM dual WHERE EXISTS (SELECT * FROM Customer WHERE ID = ? and Password = ?)";
    connection.query(sqlPlace, [req.body.custId, req.body.custId, req.body.custPassword],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;

        }
    });
    
    res.json({ message: "Success!" });
});


app.post("/api/update_customer_last_name", (req, res) => {
    
    const sqlUpdateLast = "UPDATE Customer SET last_name = ? WHERE ID IN (select temp.custId from (select custId, count(custId) from Places group by custId having count(custId) > ? order by count(custId) limit 1) as temp)";
    connection.query(sqlUpdateLast, [req.body.cust_new_last_name, req.body.order_count],
        function (error, results, fields) {
        if (error) {
            res.json({message: "Failed due to " + error.message})
            throw error;
        }
    });
});

app.post("/api/checkout", (req, res) => {

    const sqlUpdateLast = "CALL updateProducts(?)";
    connection.query(sqlUpdateLast, [req.body.order_id],
        function (error, results, fields) {
            if (error) {
                res.json({message: "Failed due to " + error.message})
                throw error;
            }
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});