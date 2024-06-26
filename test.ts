const fs = require('fs')
const readline = require('readline')
//import * as f from 'fs' ;
//import * as readline from 'readline';
/**/
let rl = readline.createInterface(
    process.stdin, process.stdout);

let filePath = "foo.txt"
rl.question('Gib die Datei an: ', function(path:string) {
    console.log(`provide an absolut path 2 file: ${path}`);
    filePath = path;
    let buffer = fs.readFileSync(filePath,'utf8');
    console.log(buffer)
    rl.close();
});


