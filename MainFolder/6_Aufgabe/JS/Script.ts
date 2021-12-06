namespace Aufgabe6 {
    async function request(url: RequestInfo): Promise<string> {
        let response: Response = await fetch(url);
        let text: string = await response.text();
        return text;
    }
}

