import { log } from './utils';
import "./css/main.scss";

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