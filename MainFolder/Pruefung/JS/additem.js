"use strict";
/*
import { GefrieGut } from "./files";
import { Tags } from "./files";
*/
var Pruefung;
(function (Pruefung) {
    class Tags {
        tags = ["Chicken",
            "Pig",
            "Beef",
            "Veal",
            "Lamb",
            "Venison"];
        getLength() {
            return this.tags.length;
        }
        getTag(id) {
            return this.tags[id];
        }
    }
    const tags = new Tags();
    const form = document.getElementById("importForm");
    const pfadEdit = "/edit";
    const pfadAdd = "/add";
    const url = "http://localhost:3500";
    const searchURI = new URLSearchParams(window.location.search);
    loadItems();
    form.addEventListener("submit", addItem);
    //loads all the stuff
    function loadItems() {
        creatSelectionList();
        if (searchURI.get("id") !== "") {
            console.log("FILLING PAGE!");
        }
    }
    async function addItem(eventButton) {
        eventButton.preventDefault();
        let formData = new FormData(eventButton.currentTarget);
        let product = formData.get("product");
        let selection = (formData.get("selection"));
        let note = (formData.get("note"));
        let spoildate = new Date(formData.get("spoildate"));
        let formElements = form.elements;
        console.log("cheking input");
        if (product === "") {
            console.error("product  is empty");
            formElements.namedItem("product").className = "wrongInput";
            return;
        }
        if (selection === "") {
            console.error("selection is empty");
            formElements.namedItem("selection").className = "wrongInput";
            return;
        }
        if (isNaN(Date.parse(spoildate.toString()))) {
            console.error("spoildate is empty");
            formElements.namedItem("spoildate").className = "wrongInput";
            return;
        }
        let addDate = new Date();
        let item = {
            name: product,
            spoilDate: spoildate,
            addDate: addDate,
            note: note,
            tag: selection,
        };
        try {
            console.log("sending Item to Server");
            await postItem(item);
        }
        catch (error) {
            alert(error + "\nServer ist offline!");
        }
        console.log("items send");
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
    async function postItem(item) {
        console.log(JSON.stringify(item));
        await fetch(url + pfadAdd, {
            method: "post",
            body: JSON.stringify(item),
        });
    }
})(Pruefung || (Pruefung = {}));
//# sourceMappingURL=additem.js.map