const http = require("http")
const fs = require('fs')
const path = require("path")

const possibleExtensions = ['.jpg', '.jpeg', '.html'] // все форматы которые могут быть

http.createServer(function(request, response) {
    const basePath = 'C:\\Users\\ilyad\\Documents\\Projects\\Server-node.js' // базовый пусть, где у меня сервер и где лежат файлы 
    const requestPath = path.join(basePath, request.url) // тут я объединяю запрос на сервере с путем к файлам

    const foundExtension = possibleExtensions.find(ext => fs.existsSync(requestPath + ext)) // cопоставляет название файда и формат// fs.existsSync проверяет есть ли этот файл
    let filePath = null // чтобы было куда складывать путь
    if (foundExtension) {
        filePath = requestPath + foundExtension // если файл найден то мы скращиваем его и путь к ннему
    }

    if (!filePath) { // Проверяет найден ли файл. Если filePath = null, это означает не найден
        response.statusCode = 404 // если не найдет то получаем ошибку
        response.write("File not found")
        response.end()
        return // возвращает запрос, останавливает
    }

    const ext = path.extname(filePath).toLowerCase() // здесь у меня было много ошибок, как оказалось нужно перевести формат файла в нижний регистр и тогда все будет работать.

    switch (ext) {
        case '.jpg':
        case '.jpeg':
            response.setHeader("Content-Type", "image/jpeg")
            break
        case '.html':
            response.setHeader("Content-Type", "text/html")
            break
        default:
            response.setHeader("Content-Type", "application/octet-stream") 
    }
// тут мы просто прописываем форматы
    try {
        const data = fs.readFileSync(filePath)
        response.write(data)
    } catch (i) {
        response.statusCode = 500
        response.write("Internal Server Error")
        console.log(i)
    }
    response.end()
}).listen(3000, function() {
    console.log("Сервер запущен по адресу http://localhost:3000")
})

// тут все как было, так и осталось
// фух, наконец-то вышло