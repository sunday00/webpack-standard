import consolelogger from "./consolelogger";

// import { echoring, sum } from "./consolelogger";

consolelogger.consolelogger("hello webpack");

consolelogger.echoring("hello echo");

consolelogger.sum(1 , 2);

// let bodycolored = require("./consolelogger");
// bodycolored("tomato");

require('./main.css');
// require('./main.scss');

class Form {
    constructor(){
        let numbers = [5,10,15].map(num => num * 2);
        console.log(numbers);
    }
}

new Form();

console.log("fkdhskfhsik");