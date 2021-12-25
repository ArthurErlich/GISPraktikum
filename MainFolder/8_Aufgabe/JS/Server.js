"use strict";
//namespace Aufgabe8{} <-- nor in namespace to have one node_modulesFolder
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongo = require("mongodb");
const hostname = "127.0.0.1"; // localhost
const port = 3500;
const mongoUrl = "mongodb://localhost:27017"; // locale MongoDB
let mongoClient = new mongo.MongoClient(mongoUrl); //mognoClinent
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*");
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
        case "/todo": {
            await mongoClient.connect();
            switch (request.method) {
                case "GET":
                    console.log("TODO-GET");
                    break;
                case "POST":
                    console.log("TODO-POST");
                    break;
            }
        }
        case "/todoS": {
            await mongoClient.connect();
            switch (request.method) {
                case "GET":
                    console.log("TodoS-GET");
                    break;
            }
        }
        default:
            response.statusCode = 404;
    }
});
//search for DB-Content
async function dbFind(db, collection, requestObject, response) {
    let result = await mongoClient
        .db(db)
        .collection(collection)
        .find(requestObject)
        .toArray();
    // console.log(result, requestObject); // bei Fehlern zum Testen
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(result));
}
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=Server.js.map