namespace Aufgabe6 {

    const answer: HTMLElement = document.getElementById("answer");
    const sendRequest: HTMLElement = document.getElementById("sendRequest");
    const postDateElement: HTMLElement = document.getElementById("postDate");
    const getDateElemnt: HTMLElement = document.getElementById("getDate");
    const dateElment: HTMLInputElement = <HTMLInputElement>document.getElementById("date_local_input");

    const url: string = "http://localhost:3050/";
    const urlPost: string = "convertDate/post"
    const urlGet: string = "convertDate/get"


    sendRequest.addEventListener("click", getStatus);
    getDateElemnt.addEventListener("click", getDate);
    postDateElement.addEventListener("click", postDate);

    async function request(url: RequestInfo): Promise<string> {
        let response: Response = await fetch(url);
        let text: string = await response.text();
        return text;
    }

    //GET METHODE
    async function requestPost(url: RequestInfo, data: Date): Promise<string> {
        let response: Response = await fetch(url,
            {
                method: "post",
                body: JSON.stringify(data),
            });
        let text: string = await response.text();
        return text;
    }

    //POST METHODE
    async function requestGet(url: RequestInfo, data: Date): Promise<string> {
        let response: Response = await fetch(url + "?a=" + JSON.stringify(data),
            {
                method: "get",
            });
        let text: string = await response.text();

        return text;
    }

    async function getStatus(): Promise<void> {
        answer.textContent = await request(url);
    }

    //Post
    async function postDate(): Promise<void> {
        let text: string = await requestPost(url + urlPost, new Date(dateElment.value));
        answer.textContent = text;
        console.log(text);
    }
    async function getDate(): Promise<void> {
        let text: string = await requestGet(url + urlGet, new Date(dateElment.value));
        answer.textContent = text;
        console.log(text);
    }

}


