import * as http from "http";
import * as mongo from "mongodb";

const BSON = require('bson');

const hostname: string = "127.0.0.1"; // localhost
const port: number = 3500;

const pfad: string = "/items";
const pfadDelet: string = "/remove";
const pfadAdd: string = "/add"
const pfadEdit: string = "/edit";
const pfadView: string = "/view";
const pfadSort: string = "/sort";


const mongoUrl: string = "mongodb://localhost:27017"; // locale MongoDB

// ony using this const variable becouse i dont need dynamic DB-Access
const dbCollection: string = "foodList";
const db: string = "food"

let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl); //mongo Client 

const server: http.Server = http.createServer(
    async (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.statusCode = 200;
        response.setHeader("Access-Control-Allow-Origin", "*");

        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
        console.log("\x1b[33m", "the rquest path: " + url.pathname);

        switch (url.pathname) {
            case pfad:
                switch (request.method) {
                    case "GET":
                        response.setHeader("Content-Type", "application/json");
                        try {
                            await mongoClient.connect();
                            console.log("\x1b[33m", "conecting to DB...");
                            let dbResponse: string = await dbGetAll();
                            response.end(dbResponse);
                        } catch (error) {
                            console.error("\x1b[31m", "connection time out wiht DB");
                            console.log("\x1b[0m");
                            response.statusCode = 404;
                        }
                        break;
                    case "POST":

                        break;
                }
                break;
            case pfadAdd:
                switch (request.method) {
                    case "POST":
                        console.log("reciving Item");
                        let input: string;
                        request.on("data", (data) => {
                            input += data;
                        });
                        request.on("end", async () => {
                            input = input.replace("undefined", "");// the Stringfy has an undifnied in front?
                            console.log("\x1b[33m", "got the Data from client: " + input);
                            try {
                                console.log("\x1b[33m", "conecting to DB...");
                                await mongoClient.connect();
                                await dbSet(input);

                            } catch (error) {
                                console.error("\x1b[31m", "connection time out wiht DB");
                                console.log("\x1b[0m");
                                response.statusCode = 404;
                                return;
                            } finally {
                                mongoClient.close();
                                response.end();
                            }
                        });
                        break;
                    default:
                        break;
                }
                break;
            case pfadView:
                try {
                    let id: string = url.searchParams.get("id");
                    id = id.slice(0, -1); // get rid of "0" on end of the id string

                    console.log("\x1b[33m", "conecting to DB...");
                    console.log("\x1b[33m", "searching itme with ID: " + id);
                    await mongoClient.connect();
                    let dbRsponse: string = await dbGetID(id)
                    //console.log(dbRsponse);
                    response.end(dbRsponse);

                } catch (error) {
                    console.error("\x1b[31m", error);
                    console.log("\x1b[0m");
                    response.statusCode = 404;
                    return;
                } finally {
                    mongoClient.close();
                    response.end();//let the client know that the response is done
                }
                break;
            case pfadEdit:
                console.log("reciving Item");
                let input: string;
                request.on("data", (data) => {
                    input += data;
                });
                request.on("end", async () => {
                    input = input.replace("undefined", "");
                    console.log("\x1b[33m", "got the Data from client: " + input);
                    try {
                        let id: string = url.searchParams.get("id");
                        id = id.slice(0, -1); // get rid of "0" on end of the id string

                        console.log("\x1b[33m", "conecting to DB...");
                        await mongoClient.connect();
                        await dbEdit(id, input);

                    } catch (error) {
                        console.error("\x1b[31m", "connection time out wiht DB" + error);
                        console.log("\x1b[0m");
                        response.statusCode = 404;
                        return;
                    } finally {
                        mongoClient.close();
                        response.end();
                    }
                });
                break;
            case pfadDelet:
                try {
                    let id: string = url.searchParams.get("id");
                    id = id.slice(0, -1); // get rid of "0" on end of the id string

                    console.log("\x1b[33m", "conecting to DB...");
                    await mongoClient.connect();
                    await dbRemove(id);
                } catch (error) {
                    console.error("\x1b[31m", "connection time out wiht DB" + error);
                    console.log("\x1b[0m");
                    response.statusCode = 404;
                    return;
                } finally {
                    mongoClient.close();
                    response.end();
                }
                break;
            case pfadSort:
            /*
            try {
                await mongoClient.connect();
                let searchParas: string = url.searchParams.get("sortBy");
                console.log("\x1b[33m", "conecting to DB...");
                console.log("\x1b[33m", "sorting by: " + searchParas);
                let dbRsponse: string = await dbGetSort(searchParas);
                response.end(dbRsponse);

            } catch (error) {
                console.error("\x1b[31m", "connection time out wiht DB" + error);
                console.log("\x1b[0m");
                response.statusCode = 404;
            } finally {
                mongoClient.close();
                response.end();
            }
            break;
            */
            default:
                response.statusCode = 404;
                break;
        }
    });

server.listen(port, hostname, () => {
    console.clear();
    console.log("\x1b[32m", `Server running at http://${hostname}:${port}/`);
});

async function dbGetAll(): Promise<string> {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find()
        .toArray();
    console.log("\x1b[32m", "got the data");
    console.log("\x1b[32m", result);
    console.log("\x1b[33m", "sending datat to client");
    return JSON.stringify(result);
}
async function dbGetID(id: string): Promise<string> {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find({ _id: new mongo.ObjectId(id) })
        .toArray();
    console.log("\x1b[32m", "got the data");
    console.log("\x1b[32m", result);
    return JSON.stringify(result);
}
/*
async function dbGetSort(sort: string): Promise<string> {
    let sortFormat: [string, number][] = JSON.parse(sort);
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find()
        .sort() //works, even if there is an error here
        .toArray();
    console.log("\x1b[32m", "got the data");
    console.log("\x1b[32m", result);
    return JSON.stringify(result);
}
*/
async function dbSet(event: string): Promise<void> {
    console.log("\x1b[33m", "send Data:" + JSON.parse(event) + " " + (JSON.parse(event)._id));
    await mongoClient.db(db)
        .collection(dbCollection)
        .insertOne(JSON.parse(event));
    console.log("\x1b[32m", "Data recived in DB");
}
async function dbEdit(eventID: string, event: string): Promise<void> {
    console.log("\x1b[33m", "send Data:" + JSON.parse(event) + " " + eventID);
    await mongoClient.db(db)
        .collection(dbCollection)
        .replaceOne({ _id: new mongo.ObjectId(eventID) }, JSON.parse(event));
    console.log("\x1b[32m", "Data changed in DB");
}
async function dbRemove(eventID: string): Promise<void> {
    //There something wint BISON format--> I think it is tha Dataformat Number, if I save the _id as string, there wont be such an Error.
    console.log("\x1b[33m", "removing elment with ID: " + eventID);
    try {
        await mongoClient.db(db).collection(dbCollection).deleteOne({ _id: new mongo.ObjectId(eventID) });//new mongo.ObjectId(eventID) 
        console.log("\x1b[32m", "Data removed");
    } catch (error) {
        console.log("\x1b[32m", error);
    }
}
/*
Coler code
"\x1b[31m" red
"\x1b[32m" green
"\x1b[33m" yellow
*/


/* Some test functions
async function dbGetSortName(): Promise<string> {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find()
        .sort({ "name": 1 })
        .toArray();
    console.log("\x1b[32m", "got the data");
    console.log("\x1b[32m", result);
    return JSON.stringify(result);
}
async function dbGetSortDate(): Promise<string> {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find()
        .sort({ "spoilDate": 1 })
        .toArray();
    console.log("\x1b[32m", "got the data");
    console.log("\x1b[32m", result);
    return JSON.stringify(result);
}
async function dbGetSortTag(): Promise<string> {
    let result = await mongoClient
        .db(db)
        .collection(dbCollection)
        .find()
        .sort({ "tag": 1 })
        .toArray();
    console.log("\x1b[32m", "got the data");
    console.log("\x1b[32m", result);
    return JSON.stringify(result);
}
*/