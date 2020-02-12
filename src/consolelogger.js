/*export*/ function consolelogger(msg){
    console.log(msg);
}

/*export*/ function echoring(msg){
    document.write(msg);
}

/*export*/ function sum(x, y){
    console.log(x + y);
}

// module.exports = function bodycolored (color){
//     document.body.style.backgroundColor = color;
// }

export default {
    consolelogger,
    echoring,
    sum
}