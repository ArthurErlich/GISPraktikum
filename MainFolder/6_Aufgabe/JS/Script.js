"use strict";
var Aufgabe6;
(function (Aufgabe6) {
    const answer = document.getElementById("answer");
    const sendRequest = document.getElementById("sendRequest");
    const postDateElement = document.getElementById("postDate");
    const getDateElemnt = document.getElementById("getDate");
    const dateElment = document.getElementById("date_local_input");
    const url = "http://localhost:3050/";
    const urlPost = "convertDate/post";
    const urlGet = "convertDate/get";
    sendRequest.addEventListener("click", getStatus);
    getDateElemnt.addEventListener("click", getDate);
    postDateElement.addEventListener("click", postDate);
    async function request(url) {
        let response = await fetch(url);
        let text = await response.text();
        return text;
    }
    //GET METHODE
    async function requestPost(url, data) {
        let response = await fetch(url, {
            method: "post",
            body: JSON.stringify(data),
        });
        let text = await response.text();
        return text;
    }
    //POST METHODE
    async function requestGet(url, data) {
        let response = await fetch(url + "?a=" + JSON.stringify(data), {
            method: "get",
        });
        let text = await response.text();
        return text;
    }
    async function getStatus() {
        answer.textContent = await request(url);
    }
    //Post
    async function postDate() {
        let text = await requestPost(url + urlPost, new Date(dateElment.value));
        answer.textContent = text;
        console.log(text);
    }
    async function getDate() {
        let text = await requestGet(url + urlGet, new Date(dateElment.value));
        answer.textContent = text;
        console.log(text);
    }
})(Aufgabe6 || (Aufgabe6 = {}));
//# sourceMappingURL=Script.js.map