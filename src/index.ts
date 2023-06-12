import { log } from './utils';
import "./css/main.css";

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