"use strict";
var Aufgabe6;
(function (Aufgabe6) {
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
        let text = await response.json();
        return text;
    }
    let answer = document.getElementById("answer");
    let sendRequest = document.getElementById("sendRequest");
    let sendDate = document.getElementById("sendDate");
    sendRequest.addEventListener("click", getText);
    sendDate.addEventListener("click", getDate);
    async function getText(event) {
        console.log(event + " Request sent!");
        let text = document.createElement("p");
        text.textContent = await request("http://localhost:3000/");
        answer.appendChild(text);
    }
    async function getDate(event) {
        console.log(event + " Request sent!");
        let text = document.createElement("p");
        let sendText = "dies ist ein DATE";
        text.textContent = await requestPost("http://localhost:3000/convertDate", sendText);
        console.log("request received");
        answer.appendChild(text);
    }
})(Aufgabe6 || (Aufgabe6 = {}));
//# sourceMappingURL=Script.js.map