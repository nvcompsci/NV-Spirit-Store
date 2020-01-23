//Import express framework
const express = require("express")
//Initialize server object
const app = express()

let items = []

//Parse request data coming in
app.use(express.json())
//Serve ‘public’ folder as static website
app.use( express.static('public') )

app.get("/items", (req, res) => {
    res.send(items)
})

app.post("/order", (req, res) => {
    
})

//Listens for web requests
app.listen(80, () => console.log("Server started") )
