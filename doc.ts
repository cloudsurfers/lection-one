// import * as fs from 'fs'
// import * as path from 'path'


// /**
//  * erweitere das Programm um einen zweiten Parameter für den Ausgabetyp: text oder html
//  * - der Parameter text soll die CSV Datei als Text-Tabelle ausgeben (so wie es bereits umgesetzt ist)
//  * - der Paramter html soll die CSV Datei als HTML Tabelle ausgeben.
//  *
//  */ 
// // Путь к файлу
// function readParameters():string{
//     return process.argv.slice(2)[0]
// }

// // чаем файл
// function readCSVFile(filePath: string, callback: (data: string) => void): void {
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading CSV file:', err)
//       return
//     }
//     callback(data)
//   });
// }

// // Функция для обработки 
// function processCSVData(data: string): string[][] {
//   return data.split('\n').map(row => row.split(','))
// }

// function getMaxColumnWidths(rows: string[][]): number[] {
//   const columnWidths: number[] = [];
//   rows.forEach(row => {
//     row.forEach((cell, index) => {
//       columnWidths[index] = Math.max(columnWidths[index] || 0, cell.trim().length);
//     });
//   });
//   return columnWidths;
// }


// // Функция для форматирования строки для вывода
// function formatRow(rows: string[][], columnWidths: number[]): string[] {
//   return rows.map(row => {
//     return row.map((cell, index) => cell.trim().padEnd(columnWidths[index], ' ')).join(' | ')
//   })
// }

// function printLine(row:any){
// 	console.log(row)
// }

// // Функция для вывода строк CSV в консоль в виде таблицы
// function printTable(formattedRows: string[]): void {
//   formattedRows.forEach(row => printLine(row))
// }


// // Основной процесс
// readCSVFile(readParameters(), (data) => {
//   const rows = processCSVData(data)
//    const columnWidths = getMaxColumnWidths(rows)
//    const formattedRows = formatRow(rows, columnWidths)
//    printTable(formattedRows)
// } );

