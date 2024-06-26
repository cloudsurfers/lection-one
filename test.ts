const fs = require('fs')
const readline = require('readline')
//import * as f from 'fs' ;
//import * as readline from 'readline';
/**/
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log(rl)
let buffer = fs.readFileSync('foo.txt','utf8');

console.log(buffer)
