//Import express framework
const express = require("express")
//Initialize server object
const app = express()
const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./db/chinook.db');
 
let sql = `SELECT name FROM tracks WHERE milliseconds < ?`;
let time = 3 * 60 * 1000

db.all(sql, [time], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});
 
// close the database connection


let items = []
items[0] = {
    id: 1,
    name: "Programming T-Shirt",
    price: 10.99
}

items[1] = {
    id: 2,
    name: "Chess Club T-Shirt",
    price: 14.99
}

//Parse request data coming in
app.use(express.json())
//Serve ‘public’ folder as static website
app.use( express.static('public') )

app.get("/items", (req, res) => {
    res.send(items)
})

app.get("/songs", (req, res) => {
    let sql = `SELECT name FROM tracks WHERE milliseconds < ?`;
let time = 3 * 60 * 1000

db.all(sql, [time], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log("songs sent to user");
  });
    res.send(rows.slice());
});
    
    db.close();
})

app.post("/order", (req, res) => {
    //req.body is the data user sends
    console.log(req.body)
})

//Listens for web requests
app.listen(80, () => console.log("Server started") )
