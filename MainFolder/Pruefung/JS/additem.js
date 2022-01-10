"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const files_1 = require("./files");
const form = document.getElementById("importForm");
const addButton = document.getElementById("formButton");
let idList = new Set();
load();
addButton.addEventListener("click", addItem);
function addItem(event) {
    event.preventDefault();
}
function load() {
    creatSelectionList();
}
//copy from Aufgabe8
function creatID() {
    let _id; //-> chek if _id is there   
    _id = Math.floor((Math.random() * 1000));
    while (idList.has(_id)) {
        _id = Math.floor((Math.random() * 1000));
    }
    return _id;
}
function creatSelectionList() {
    const selectList = document.getElementById("selection");
    let selectElement = new Array(2);
    selectElement[0] = document.createElement("select");
    selectElement[0].textContent = "TEST2";
    selectList.appendChild(selectElement[0]);
}
function tagsLeangth() {
    let size = 0;
    for (let element in files_1.Tags) {
        if (isNaN(Number(element))) {
            size++;
        }
    }
    return size;
}
//# sourceMappingURL=additem.js.map