"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var path = require("path");
var server = http.createServer(function (req, res) {
    if (req.method == "GET" && req.url === "/autos") {
        handleGetCars(req, res);
    }
    if (req.method == "POST" && req.url == "/auto") {
        handleAddCar(req, res);
    }
    //if (req.method)
    //res.write('hallo ts welt '+req.url)
    //res.end()
});
server.listen(4200, function () {
    console.log("server started");
});
function handleAddCar(req, res) {
    var data = "";
    req.on("data", function (x) {
        console.log("x=" + x);
        data = x;
        res.end();
    });
}
function handleGetCars(req, res) {
    res.setHeader("Content-Type", "application/json");
    loadCarList(res);
}
function loadCarList(res) {
    var p = path.join(__dirname, "test.json");
    fs.readFile(p, null, function (er, data) {
        if (er != null) {
            console.log("failed to read from file system: " + p + " with error " + er);
            res.setHeader("Status", 500);
            res.end(er);
            return;
        }
        console.log("data from filesystem : " + data);
        res.end(data);
    });
}
//server.close()
