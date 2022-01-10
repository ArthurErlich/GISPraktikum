"use strict";
/*
import { GefrieGut } from "./files";
import { Tags } from "./files";
*/
var Pruefung;
(function (Pruefung) {
    class Tags {
        tags = ["chicken",
            "pig",
            "beef",
            "veal",
            "lamb",
            "venison"];
        getLength() {
            return this.tags.length;
        }
        getTag(id) {
            return this.tags[id];
        }
    }
    const tags = new Tags();
    const form = document.getElementById("importForm");
    const addButton = document.getElementById("formButtonAdd");
    loadItems();
    addButton.addEventListener("click", addItem);
    //loads all the stuff
    function loadItems() {
        creatSelectionList();
    }
    function addItem(event) {
        event.preventDefault();
    }
    function creatSelectionList() {
        const selectList = document.getElementById("selection");
        let selectElement = new Array(tags.getLength());
        for (let i = 0; i < tags.getLength(); i++) {
            selectElement[i] = document.createElement("option");
            selectElement[i].textContent = tags.getTag(i);
            selectElement[i].setAttribute("value", i + "");
            selectList.appendChild(selectElement[i]);
        }
    }
})(Pruefung || (Pruefung = {}));
//# sourceMappingURL=additem.js.map