const http = require("http")
const fs = require('fs')

http.createServer(function(request, response) {
    switch(request) {
    case "":
        {response.setHeader("Content-Type", "image/jpeg")
        break
    }
    case racponse2: 
    {response.setHeader("Content-Type", "text/html")
        break
    } 
    case racponse3: 
    {response.setHeader("Content-Type", "text/plain")
        break
    }
}
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