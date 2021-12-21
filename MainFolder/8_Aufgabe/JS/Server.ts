namespace Aufgabe8 {
    import * as mongo from "mongodb";

    let url: string = "mongodb://localhost:27017" // localer MongoDB Server!
    let options: string;

    let mongoClient: mongo.MongoClient = new mongo.MongoClient(url, options);

    async function connectDB() {
        await mongoClient.connect();
    }
    async function disconnecttDB() {
        await mongoClient.close();
    }
}
