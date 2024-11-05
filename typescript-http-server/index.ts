import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const  server = http.createServer((req, res) =>{
	if (req.method == "GET" && req.url === "/autos"){
		handleGetCars(req, res)
	}
	if (req.method == "POST" && req.url == "/auto"){
		handleAddCar(req, res)
	}
	//if (req.method)
	//res.write('hallo ts welt '+req.url)
	//res.end()
	fs.readFile('index.html', (err, data) => { 
		if (err) {
		  res.writeHead(500);
		  res.end("Fehler mit index.html");
		  return
		}
		res.writeHead(200, {'Content-Type': 'text/html'}); 
		res.end(data) 
})})

server.listen(4200, ()=>{
	console.log("server started")
});

function handleAddCar(req:http.IncomingMessage, res:http.ServerResponse){
	let data = ""
	req.on("data", (x)=>{
		console.log("x="+x)
		data = x
		res.end()
	})
}

function handleGetCars(req:http.IncomingMessage, res:http.ServerResponse){
	res.setHeader("Content-Type", "application/json")
	loadCarList(res)
}

function loadCarList(res:http.ServerResponse){
	let p = path.join(__dirname, "test.json")
	fs.readFile(p,null, (er, data)=>{
		if (er!=null){
			console.log("failed to read from file system: "+p+" with error "+er)
			res.setHeader("Status", 500)
			res.end(er)
			return
		}
		console.log("data from filesystem : "+data)
		res.end(data)
	})
	
}

//server.close()

// Quelle wo ich information gefunden habe: https://sky.pro/wiki/html/zagruzka-i-otobrazhenie-html-faylov-v-node-js-bez-koda-html/