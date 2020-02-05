const $cart = document.querySelector("section#cart ul")
const inCart = []
let total = 0

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

function checkOut() {
    document.querySelector("section#account")
        .classList.remove("hidden")
}

function submitOrder(event) {
    debugger;
    event.preventDefault()
    event.stopPropagation()
    //create order object
    const order = {
        user: document.forms[0],
        items: inCart
    }
    //POST order
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/login",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}

function addToCart(id, event) {
    const item = items.find(item => item.id == id)
    const size = event.target.parentNode
        .querySelector("select").value
    //alert(item.name)
    const $newItem = document.createElement("li")
    $newItem.innerHTML = 
        `${item.name} [ ${size} ] ( $ ${item.price} )`
    $cart.append($newItem)
    inCart.push(item)
    total += item.price
    document.querySelector("span#total").innerHTML = total.toFixed(2)
    document.querySelector("span#itemCount").innerHTML = inCart.length
}