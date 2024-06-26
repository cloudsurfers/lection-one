const fs = require('fs')
const readline = require('readline')
//import * as f from 'fs' ;
//import * as readline from 'readline';
/**/
let rl = readline.createInterface(
    process.stdin, process.stdout);

rl.setPrompt(`Gib die Datei an: `);
rl.prompt()
let filePath = "foo.txt"
rl.on('line', (path) => {
    console.log(`provide an absolut path 2 file: ${path}`);
    filePath = path;
    let buffer = fs.readFileSync(filePath,'utf8');
    console.log(buffer)
    rl.close();
});




