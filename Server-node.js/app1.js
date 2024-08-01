const http = require("http");

http.createServer(function(_, response) {
    response.setHeader("Content-Type", "text/html; charset=utf-8;");

    response.write('<h2 style="text-align: center;">Привет мир, Ich habe meinen ersten Server gestartet</h2>'); // стиль = «выравнивание текста: центр»
    response.write('<hr size="4" noshade color="gray" />');

    response.write('<h3> Was ich gemacht habe? </h3>')

    response.write('<li> Ich habe den Artikel darüber gelesen, wie man einen Server startet </li>');
    response.write('<li> Hab Gestartet </li>');
    response.write('<li> Hab HTML genutzt </li>');
    response.write('<hr size="4" noshade color="gray" />')
    response.write('<h2 style="text-align: center;"> Wenn Sie alles gelesen haben, klicken Sie auf die Schaltfläche:</h2>')
    response.write('<h2> Hallo </h2>')
    response.write('<h2> Hallo </h2>')


    response.end();
}).listen(3000, function() {
    console.log("Сервер запущен по адресу http://localhost:3000");
});
