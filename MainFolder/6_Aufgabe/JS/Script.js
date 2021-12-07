"use strict";
var Aufgabe6;
(function (Aufgabe6) {
    let answer = document.getElementById("answer");
    let sendRequest = document.getElementById("sendRequest");
    let sendDate = document.getElementById("sendDate");
    let dateElment = document.getElementById("date_local_input");
    sendRequest.addEventListener("click", getStatus);
    sendDate.addEventListener("click", getDate);
    async function request(url) {
        let response = await fetch(url);
        let text = await response.text();
        return text;
    }
    async function requestPost(url, data) {
        let response = await fetch(url, {
            method: "post",
            body: JSON.stringify(data),
        });
        let text = await response.text();
        return text;
    }
    async function getStatus() {
        answer.textContent = await request("http://localhost:3000/");
    }
    async function getDate() {
        let text = await requestPost("http://localhost:3000/convertDate", new Date(dateElment.value));
        answer.textContent = text;
        console.log(text);
    }
})(Aufgabe6 || (Aufgabe6 = {}));
//# sourceMappingURL=Script.js.map