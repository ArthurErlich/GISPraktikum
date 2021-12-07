import * as http from "http";

const hostname: string = 'localhost';
const port: number = 3000;

const server: http.Server = http.createServer(
    (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.statusCode = 200;

        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*"); // CORS Fehler

        let url: URL = new URL(request.url || "", `http://${request.headers.host}`); //<-- Wichtig!!

        if (url.pathname === "/") {
            response.write("Server erreichbar");

        } else if (request.method === "POST" && url.pathname === "/convertDate") {


            //TODO: HOW is the JSON handled here? I get a JSON then it is not really a JSON?
            let input: string = "";
            request.on("data", (data) => {
                input += data;
            })
            request.on("end", () => {
                console.log(input);
            })
            input = JSON.parse(input);

            //JSON ends unexpectet...
            response.write(JSON.stringify(input));
        } else {
            response.statusCode = 404;
        }
        response.end();
    }
);

server.listen(port, hostname); () => {
    console.log('Server running at http://${hostnem}:${port}/');
};