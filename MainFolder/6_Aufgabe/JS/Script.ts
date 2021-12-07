namespace Aufgabe6 {
    async function request(url: RequestInfo): Promise<string> {
        let response: Response = await fetch(url);
        let text: string = await response.text();
        return text;
    }
    async function requestPost(url: RequestInfo, data: string): Promise<string> {
        let response: Response = await fetch(url,
            {
                method: "post",
                body: JSON.stringify(data),
            });
        let text: string = await response.json();

        return text;
    }

    let answer: HTMLElement = document.getElementById("answer");
    let sendRequest: HTMLElement = document.getElementById("sendRequest");
    let sendDate: HTMLElement = document.getElementById("sendDate");

    sendRequest.addEventListener("click", getText);
    sendDate.addEventListener("click", getDate);

    async function getText(event: Event): Promise<void> {
        console.log(event + " Request sent!");
        let text: HTMLElement = document.createElement("p");

        text.textContent = await request("http://localhost:3000/");
        answer.appendChild(text);
    }
    async function getDate(event: Event): Promise<void> {
        console.log(event + " Request sent!");
        let text: HTMLElement = document.createElement("p");

        let sendText: string = "dies ist ein DATE";
        text.textContent = await requestPost("http://localhost:3000/convertDate", sendText);
        console.log("request received");
        answer.appendChild(text);
    }
}


