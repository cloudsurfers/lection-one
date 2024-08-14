import {*} as http from 'http'
const http =  require('http')
import * from "./Auto.ts"

const requestListener = function (req:any, res:any) {
    res.writeHead(200);
    res.end("My first server, 2!");
};


const server = http.createServer(requestListener)
server.listen(4000, "localhost", () => {
    console.log(`Server is running on http://localhost:4000`);
});
