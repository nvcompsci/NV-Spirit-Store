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