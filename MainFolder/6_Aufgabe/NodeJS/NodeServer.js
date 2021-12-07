"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*"); // CORS Fehler
    response.setHeader("Content-Type", "application/json");
    let url = new URL(request.url || "", `http://${request.headers.host}`); //<-- Wichtig!!
    if (url.pathname === "/") {
        response.write("Server erreichbar");
    }
    else if (url.pathname === "/convertDate") {
        let input = "";
        request.on("data", (data) => {
            input += data;
        });
        request.on("end", () => {
            console.log(JSON.parse(input));
        });
        let output = new Date().getDay().toString();
        response.write("bm ,nbm" + output);
    }
    else {
        response.statusCode = 404;
    }
    response.end();
});
server.listen(port, hostname);
() => {
    console.log('Server running at http://${hostnem}:${port}/');
};
//# sourceMappingURL=NodeServer.js.map