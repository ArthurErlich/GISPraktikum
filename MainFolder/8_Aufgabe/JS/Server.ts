//namespace Aufgabe8{} <-- nor in namespace to have one node_modulesFolder

import * as http from "http";
import * as mongo from "mongodb";


const hostname: string = "127.0.0.1"; // localhost
const port: number = 3500;

const pfad: string = "/concertEvents";


const mongoUrl: string = "mongodb://localhost:27017"; // locale MongoDB
let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl); //mognoClinent

const server: http.Server = http.createServer(
    async (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.statusCode = 200;
        response.setHeader("Access-Control-Allow-Origin", "*");

        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
        console.log(url.pathname);
        switch (url.pathname) {
            case pfad: {
                // await mongoClient.connect();
                console.log("this is the request: " + request.method);

                switch (request.method) {
                    case "GET":
                        console.log("TODO-GET");
                        //gett the 
                        break;
                    case "POST":
                        console.log("TODO-POST");
                        break;
                }
            }
            default:
                response.statusCode = 404;
        }
        // mongoClient.close();

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
    console.log(`Server running at http://${hostname}:${port}/`);
});