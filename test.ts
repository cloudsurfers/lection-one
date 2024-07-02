const fs = require('fs')
const readline = require('readline')
//import * as f from 'fs' ;
//import * as readline from 'readline';
/**/


// function 1: einlesen der daten 
function readData(filePath:string):string[]{
    let buffer = fs.readFileSync(filePath,'utf8');
    return csv.parse(buffer, ",")
}

//function 2: darstellen der daten

function showData(lines:string[]){
    lines.forEach(line=>{
        let dataSet = line.split(',')
        dataSet.forEach(col=>{
            print(col + "|")
        })
        println('')
    })
}

function showDataAsHtml(lines:string[]){
    println('<table>')
    lines.forEach(line=>{
        println('<tr>')
        let dataSet = line.split(',')
        dataSet.forEach(col=>{
            print('<td>'+ col + '</d>')
        })
        println('</tr>')
    })
    println('</table>')
}

// function 3: verbinde beide funtionen mit einander

function main(args[]){
    let list = readData(args[0])
    if (args[2]=='html'){
        showDataAsHtml(list)
    }else{
        showData(list)
    }
}


main()
