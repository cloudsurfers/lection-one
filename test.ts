const fs = require('fs')
const readline = require('readline')
//import * as f from 'fs' ;
//import * as readline from 'readline';
/**/
let rl = readline.createInterface(
    process.stdin, process.stdout);

rl.setPrompt(`Gib die Datei an: `);
rl.prompt()
let filePath = ""
rl.on('line', (path) => {
    console.log(`Age received by the user: ${path}`);
    filePath = path;
    rl.close();
});
let buffer = fs.readFileSync('foo.txt','utf8');

console.log(buffer)

