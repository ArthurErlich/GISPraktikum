//namespace Aufgabe8{} <-- or in namespace to have one node_modulesFolder

import * as http from "http";
import * as mongo from "mongodb";

const hostname: string = "127.0.0.1"; // localhost
const port: number = 3500;

const pfad: string = "/concertEvents";
const pfadDelet: string = "/delet";

const mongoUrl: string = "mongodb://localhost:27017"; // locale MongoDB

const dbCollection: string = "eventNode";
const db: string = "Events"

let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl); //mongo Client 



const server: http.Server = http.createServer(
    async (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.statusCode = 200;
        response.setHeader("Access-Control-Allow-Origin", "*");

        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
        console.log("\x1b[33m", "the rquest path: " + url.pathname);
        switch (url.pathname) {
            case pfad: {
                // just pleas dont crash the server!
                try {
                    console.log("\x1b[33m", "conecting to DB...");
                    const client = await mongoClient.connect();
                    if (!client) {
                        console.log("\x1b[33m", "fetshing the Database...");
                        mongoClient.db(db);
                    }
                } catch (error) {
                    console.error("\x1b[31m", "connection time out wiht DB");
                    console.log("\x1b[0m");
                    response.statusCode = 404;
                    return;
                } finally {
                    mongoClient.close();
                }

                console.log("\x1b[32m", "this is the request: " + request.method);
                switch (request.method) {
                    case "GET":
                        try {
                            console.log("\x1b[33m", "fetshing the DatabaseCollection...");
                            await mongoClient.connect();
                            let text = await dbGet()
                            //response.setHeader("Content-Type", "text/plain");
                            response.setHeader("Content-Type", "application/json");
                            response.end(text);
                            console.log("\x1b[33m", "sending to client: " + text);

                        } catch (error) {
                            console.error("\x1b[31m", error);
                        } finally {
                            mongoClient.close();
                        }
                        break;

                    case "POST":
                        let input: string;
                        request.on("data", (data) => {
                            input += data;
                        })
                        try {
                            request.on("end", async () => {
                                input = input.replace("undefined", "");// the Stringfy has an undifnied in front?
                                console.log("\x1b[33m", "Data: " + input);
                                console.log("\x1b[33m", "sending Data...");
                                await mongoClient.connect();
                                await dbSet(input);

                            });

                        } catch (error) {
                            console.error("\x1b[31m", error);
                        } finally {
                            mongoClient.close();
                        }
                        break;
                }
                break;
            }
            case pfadDelet:
                let eventID: string = url.searchParams.get("EventID");
                console.log("\x1b[33m", "request to delet an elment ID: " + eventID);
                //TODOO: Add delet functionality
                try {
                    await mongoClient.connect();
                    await dbRemove(eventID);
                } catch (error) {
                    console.error("\x1b[31m", error);
                } finally {
                    mongoClient.close();
                }
                break;
            default:
                response.statusCode = 404;
                break;
        }


    });

//search for DB-Content
/*
async function dbFind(
    requestObject: any,
    response: http.ServerResponse
) {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find(requestObject)
        .toArray();
    // console.log(result, requestObject); // bei Fehlern zum Testen
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(result));
}
*/

async function dbGet(): Promise<string> {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find()
        .toArray();
    console.log("\x1b[32m", "got the data");
    console.log("\x1b[32m", result);
    return JSON.stringify(result);
}

async function dbSet(event: string): Promise<void> {
    console.log("\x1b[33m", "send Data:" + JSON.parse(event) + +" " + (JSON.parse(event).id));
    await mongoClient.db(db).collection(dbCollection).insertOne(JSON.parse(event));
    console.log("\x1b[32m", "Data recived");
}
async function dbRemove(eventID: string): Promise<void> {
    //There something wint BISON format--> I think it is tha Dataformat Number, if I save the _id as string, there wont be such an Error.
    console.log("\x1b[33m", "removing elment with ID: " + eventID);

    try {
        await mongoClient.db(db).collection(dbCollection).deleteOne({ _id: new mongo.ObjectId(eventID) });//new mongo.ObjectId(eventID) //TODO: evnetID to Number
        console.log("\x1b[32m", "Data removed");
    } catch (error) {
        console.log("\x1b[32m", error);
    }
}

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