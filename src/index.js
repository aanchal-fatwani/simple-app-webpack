const cart = [];

function log(msg) {
    console.log(msg);
}

function addToCart(item) {
    cart.push(item);
    log("Added: " + item);
}

function removeFromCart(id) {
    cart.splice(id);
    log("Removed: " + id);
}

addToCart("Boots");