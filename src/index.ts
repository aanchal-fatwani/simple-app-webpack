import { log } from './utils';

const cart:any = [];

// function log(msg) {
//     console.log(msg);
// }

function addToCart(item) {
    cart.push(item);
    log("Added item: " + item);
}

function removeFromCart(id) {
    cart.splice(id);
    log("Removed: " + id);
}

addToCart("Boots");
addToCart("Bags");