"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const hostname = 'localhost';
const port = 3050;
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*"); // CORS Fehler
    response.setHeader("Content-Type", "application/json");
    let url = new URL(request.url || "", `http://${request.headers.host}`); //<-- Wichtig!!
    if (url.pathname === "/") {
        response.write("Server erreichbar");
    }
    else if (request.method === "POST") {
        let input = "";
        let date;
        let output = "";
        request.on("data", (data) => {
            input += data;
        });
        request.on("end", () => {
            date = new Date(JSON.parse(input));
            console.log(date);
            output = "Day: " + date.getDay() + ",";
            output += "Month: " + date.getMonth() + ",";
            output += "Year: " + date.getFullYear();
            console.log(output);
        });
        //TODO: make it WOKR! -->is faster then reqest.on("end")
        console.log("TEST");
        response.write(output);
    }
    else if (request.method === "GET") {
        let output = await convertDate(JSON.parse(url.searchParams.get("a")));
        console.log(output);
        response.write(output);
    }
    else {
        response.statusCode = 404;
    }
    response.end();
});
async function convertDate(dateS) {
    let date = new Date(dateS);
    let output = "";
    output += "Day: " + date.getDay() + ",";
    output += "Month: " + date.getMonth() + ",";
    output += "Year: " + date.getFullYear();
    return output;
}
//Fixed-->
server.listen(port, hostname, () => {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});
//# sourceMappingURL=NodeServer.js.map