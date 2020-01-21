const $cart = document.querySelector("section#cart ul")

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

function addToCart(id) {
    const item = items.find(item => item.id == id)
    
    alert(item.name)
    const $newItem = document.createElement("li")
    $newItem.innerHTML = item.name
    $cart.append($newItem)
}