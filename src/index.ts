import { log } from './utils';
import "./css/main.scss";
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

function getData(){
    fetch('/api/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
}

addToCart("Boots");
addToCart("Bags");

getData();
