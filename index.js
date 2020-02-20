//Import express framework
const express = require("express")
//Initialize server object
const app = express()
const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./db/store.db');
 
//Parse request data coming in
app.use(express.json())
//Serve ‘public’ folder as static website
app.use( express.static('public') )

app.get("/items", (req, res) => {
    let sql = `SELECT * FROM items`;

    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        rows.forEach((row) => {
          //nothing for each row
        });
        console.log("items sent to user");
        res.send(rows);
    });
})

app.post("/order", (req, res) => {
    //req.body is the data user sends
    console.log(req.body)
    const customer = req.body.user
    const sql = `INSERT INTO customers 
(firstname, lastname, address, email) 
VALUES (?, ?, ?, ?)`
    const values = [customer.first, customer.last, customer.address, customer.email]
    db.run(sql, values, (err) => {
        console.log(err)
    })
    
    //create new invoice
    const sql2 = `INSERT INTO invoices (customerid, total, orderdate) VALUES (?, ?, ?, ?)`
    const values2 = [1,req.body.total, req.body.orderDate]
    db.run(sql2, values2, (err) => {
        console.log(err)
    })
    //is there inventory left for this item?
    const sql3 = `SELECT inventory FROM items WHERE itemid = ?`
    
    //associate items with invoice
    const sql4 = `INSERT INTO invoice_item (invoiceid, itemid) values (?, ?)`
    const values4 = [1, req.body.items[0].itemid]
    db.run(sql4, values4, (err) => {
        console.log(err)
    })
})

//Listens for web requests
app.listen(80, () => console.log("Server started") )
