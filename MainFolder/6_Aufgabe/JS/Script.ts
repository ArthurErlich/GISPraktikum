namespace Aufgabe6 {

    let answer: HTMLElement = document.getElementById("answer");
    let sendRequest: HTMLElement = document.getElementById("sendRequest");
    let sendDate: HTMLElement = document.getElementById("sendDate");
    let dateElment: HTMLInputElement = <HTMLInputElement>document.getElementById("date_local_input");


    sendRequest.addEventListener("click", getStatus);
    sendDate.addEventListener("click", getDate);

    async function request(url: RequestInfo): Promise<string> {
        let response: Response = await fetch(url);
        let text: string = await response.text();
        return text;
    }
    async function requestPost(url: RequestInfo, data: Date): Promise<string> {
        let response: Response = await fetch(url,
            {
                method: "post",
                body: JSON.stringify(data),
            });
        let text: string = await response.text();

        return text;
    }

    async function getStatus(): Promise<void> {
        answer.textContent = await request("http://localhost:3000/");
    }
    async function getDate(): Promise<void> {
        let text: string = await requestPost("http://localhost:3000/convertDate", new Date(dateElment.value));
        answer.textContent = text;
        console.log(text);


    }

}


