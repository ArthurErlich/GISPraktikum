"use strict";
//namespace Aufgabe8{} <-- nor in namespace to have one node_modulesFolder
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongo = require("mongodb");
const hostname = "127.0.0.1"; // localhost
const port = 3500;
const pfad = "/concertEvents";
const pfadDelet = pfad + "/delet";
const mongoUrl = "mongodb://localhost:27017"; // locale MongoDB
let mongoClient = new mongo.MongoClient(mongoUrl); //mongo Client 
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*");
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    console.log("\x1b[33m", "the rqeust path: " + url.pathname);
    console.log("\x1b[0m");
    switch (url.pathname) {
        case pfad: {
            // just pleas dont crash the server!
            try {
                await mongoClient.connect();
            }
            catch (error) {
                console.error("\x1b[31m", "connection time out wiht DB");
                console.log("\x1b[0m");
                return;
            }
            console.log("this is the request: " + request.method);
            switch (request.method) {
                case "GET":
                    break;
                case "POST":
                    break;
            }
            break;
        }
        case pfadDelet:
            console.log("\x1b[33m", "request to delet an elment ID:");
            console.log("\x1b[0m");
            break;
        default:
            response.statusCode = 404;
    }
    mongoClient.close();
});
//search for DB-Content
/*
async function dbFind(
    db: string,
    collection: string,
    requestObject: any,
    response: http.ServerResponse
) {
    let result = await mongoClient
        .db(db)
        .collection(collection)
        .find(requestObject)
        .toArray();
    // console.log(result, requestObject); // bei Fehlern zum Testen
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(result));
}
*/
server.listen(port, hostname, () => {
    console.clear();
    console.log("\x1b[32m", `Server running at http://${hostname}:${port}/`);
});
/*
Coler code
"\x1b[31m" red
"\x1b[32m" green
"\x1b[33m" yellow

*/ 
//# sourceMappingURL=Server.js.map