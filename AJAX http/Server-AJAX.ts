const http = require("http");

http.createServer(function(request, response){
    if (request.url === '/newpage') {
        
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(`
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #e0e0e0;
                            color: #333;
                            padding: 20px;
                        }
                        h1 {
                            color: #28a745;
                        }
                        p {
                            font-size: 18px;
                        }
                    </style>
                </head>
                <body>
                    <h1>Neue Webseite!</h1>
                    <p>Du hast mit Hilfe von AJAX Seite gewechselt!</p>
                </body>
            </html>
        `);
        response.end();
    } else {

        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(`
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            color: #333;
                            padding: 20px;
                        }
                        h1 {
                            color: #007BFF;
                        }
                        p {
                            font-size: 18px;
                        }
                        button {
                            padding: 10px 20px;
                            font-size: 16px;
                            background-color: #007BFF;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <h1>Welcome to My Server</h1>
                    <p>Click mal um Server zu wechseln (AJAX):</p>
                    <button onclick="loadNewPage()">Neue Webseite</button>

                    <script>
                        function loadNewPage() {
                            const ajax = new XMLHttpRequest();
                            ajax.open("GET", "/newpage", true);
                            ajax.onload = function() {
                                if (ajax.status === 200) {
                                    document.body.innerHTML = ajax.responseText;
                                }
                            };
                            ajax.send();
                        }
                    </script>
                </body>
            </html>
        `);
        response.end();
    }
}).listen(3000, function(){
    console.log("Сервер запущен по адресу http://localhost:3000");
});