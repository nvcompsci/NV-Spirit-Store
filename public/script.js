const $cart = document.querySelector("section#cart ul")
const $itemsContainer = document.querySelector("section#items")
const inCart = []
let items = []
let total = 0

loadItems()

//let items = []
//items[0] = {
//    id: 1,
//    name: "Programming T-Shirt",
//    price: 10.99
//}
//
//items[1] = {
//    id: 2,
//    name: "Chess Club T-Shirt",
//    price: 14.99
//}

function loadItems() {
    fetch("/items")
        .then( response => response.json() )
        .then( response => {
        console.log(response)
            createItemCards(response) 
        })
        .catch(err => console.error(err))
}

function createItemCards(_items) {
    items = _items
    const itemsHTML = _items.map(item => 
        `<div class="item">
            <h3>Name: ${item.name}</h3>
            <h3>Price: $ ${item.price}</h3>
            <img src="${item.image}">
            <p>Description: ${item.description}</p>
            <select name="size">
                <option value="xs">X-Small</option>
                <option value="s">Small</option>
                <option value="m">Medium</option>
                <option value="l">Large</option>
                <option value="xl">X-Large</option>
                <option value="xxl">XX-Large</option>
            </select>
            <button onClick="addToCart(${item.itemid}, event)">Add to Cart</button>
        </div>`
    ).join('')
    $itemsContainer.innerHTML = itemsHTML    
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
    const $form = document.forms[0]
    const order = {
        user: {
            first: $form.first.value,
            last: $form.last.value,
            address: $form.address.value,
            email: $form.email.value
        },
        items: inCart,
        total: total,
        orderDate: new Date()
    }
    //POST order
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/order",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}

function addToCart(id, event) {
    const item = items.find(item => item.itemid == id)
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