import * as http from "http";
import * as mongo from "mongodb";

const hostname: string = "127.0.0.1"; // localhost
const port: number = 3500;

const pfad: string = "/items";
const pfadDelet: string = "/remove";
const pfadAdd: string = "/add"
const pfadEdit: string = "/edit";


const mongoUrl: string = "mongodb://localhost:27017"; // locale MongoDB

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
                switch (request.method) {
                    case "GET":
                        console.log(" GET");
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify("nice"));
                        break;
                    case "POST":
                        console.log(" POST");
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
                            console.log((input));
                        });
                        response.end();
                        break;
                    default:
                        break;
                }
                break;
            default:
                response.statusCode = 404;
                break;
        }

    });

server.listen(port, hostname, () => {
    console.clear();
    console.log("\x1b[32m", `Server running at http://${hostname}:${port}/`);
});

async function getItems(): Promise<string> {

    return;
}
/*
Coler code
"\x1b[31m" red
"\x1b[32m" green
"\x1b[33m" yellow

*/