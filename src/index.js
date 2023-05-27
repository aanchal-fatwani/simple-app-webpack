const util = require('./utils');

const cart = [];

// function log(msg) {
//     console.log(msg);
// }

function addToCart(item) {
    cart.push(item);
    util.log("Added item: " + item);
}

function removeFromCart(id) {
    cart.splice(id);
    util.log("Removed: " + id);
}

addToCart("Boots");
addToCart("Bags");