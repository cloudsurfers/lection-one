const http = require("http")
const fs = require('fs')

http.createServer(function(request, response) {
    response.setHeader("Content-Type", "image/jpeg", "text/html")

     try {
        const data = fs.readFileSync('C:\\Users\\ilyad\\Documents\\Projects\\Server-node.js'+request.url)
        response.write(data)
     } catch (i) {
        response.statusCode = 500
        console.log(i)
     }
    response.end()}
).listen(3000, function() {
    console.log("Сервер запущен по адресу http://localhost:3000")
})

// function readCSVFile(filePath: string, callback: (data: string) => void): void {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading CSV file:', err)
//         return
//       }
//       callback(data)
//     });
//   }