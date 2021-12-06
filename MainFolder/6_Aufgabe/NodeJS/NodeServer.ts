import * as http from "http";

const hostname: string = 'localhost';
const port: number = 3000;

const server: http.Server = http.createServer(
    (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.statusCode = 200;

        let url: URL = new URL(request.url);
        switch (url.pathname) {
            case "/":
                response.write("HelloWorld");
                break;
            case "/convertDate":
                response.write("ConvertDate");
            default:
                response.statusCode = 404;
        }
        response.end();
    }
);

server.listen(port, hostname); () => {
    console.log('Server running at http://${hostnem}:${port}/');
};