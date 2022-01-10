"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form = document.getElementById("importForm");
let idList = new Set();
//copy from Aufgabe8
function creatID() {
    let _id; //-> chek if _id is there   
    _id = Math.floor((Math.random() * 1000));
    while (idList.has(_id)) {
        _id = Math.floor((Math.random() * 1000));
    }
    return _id;
}
//# sourceMappingURL=additem.js.map