"use strict";
/*
import { GefrieGut } from "./files";
import { Tags } from "./files";
*/
var Pruefung;
(function (Pruefung) {
    class Tags {
        tags = ["Huenchen", "Schwein", "Kuh", "Schaf", "Wildschein"];
        pics = [128020, 128022, 128004, 128017, 128023];
        getLength() {
            return this.tags.length;
        }
        getTag(id) {
            return this.tags[id];
        }
        getPic(id) {
            return this.pics[id];
        }
    }
    const tags = new Tags(); //normalerweis würde ich das Static in dem File.ts machen.
    const form = document.getElementById("importForm");
    const pfadEdit = "/edit";
    const pfadAdd = "/add";
    const pfadView = "/view";
    const url = "http://localhost:3500";
    const searchURI = new URLSearchParams(window.location.search);
    console.log(searchURI.get("id"));
    loadItems();
    form.addEventListener("submit", addItem);
    //loads all the stuff
    function loadItems() {
        creatSelectionList();
        //load the Edit Page
        if (searchURI.get("id") !== null) {
            console.log("FILLING PAGE!");
            let sendButton = document.getElementById("formButtonAdd");
            sendButton.textContent = "EDIT";
            //fills in the From with the Data to edit
            fillFrom();
        }
    }
    async function fillFrom() {
        let formElements = form.elements;
        let itemList = await getItem(searchURI);
        let item = itemList[0]; // just the first item is needed!
        // fillin in the HTMLInputElemnts -> this  wil be sned to the server if nothin is changed
        formElements.namedItem("product").value = item.name;
        formElements.namedItem("selection").value = item.tag;
        formElements.namedItem("spoildate").value = dateConverter(new Date(item.spoilDate));
        formElements.namedItem("note").value = item.note;
    }
    async function addItem(eventButton) {
        eventButton.preventDefault();
        let formData = new FormData(eventButton.currentTarget);
        let product = formData.get("product");
        let selection = (formData.get("selection"));
        let note = (formData.get("note"));
        let spoildate = new Date(formData.get("spoildate"));
        let formElements = form.elements;
        let item;
        console.log("cheking input");
        if (product === "") {
            console.log("product  is empty");
            formElements.namedItem("product").className = "wrongInput";
            return;
        }
        if (selection === "") {
            console.log("selection is empty");
            formElements.namedItem("selection").className = "wrongInput";
            return;
        }
        if (isNaN(Date.parse(spoildate.toString()))) {
            console.log("spoildate is empty");
            formElements.namedItem("spoildate").className = "wrongInput";
            return;
        }
        let addDate = new Date();
        item = {
            name: product,
            spoilDate: spoildate,
            addDate: addDate,
            note: note,
            tag: selection,
        };
        try {
            console.log("sending Item to Server");
            if (searchURI.get("id") !== null) {
                console.log("EDIT ITEM");
                console.log(item);
                await editItem(searchURI, item);
            }
            else {
                console.log("POST ITEM");
                await postItem(item);
            }
        }
        catch (error) {
            console.error(error + "\nServer ist offline!");
        }
        console.log("items send");
    }
    function dateConverter(date) {
        //W3Scool Array https://www.w3schools.com/jsref/jsref_getmonth.asp
        const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        //inline If
        let day = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
        return date.getFullYear() + "-" + month[date.getMonth()] + "-" + day;
    }
    function creatSelectionList() {
        let selectList = document.getElementById("selection");
        let selectElement = new Array(tags.getLength());
        for (let i = 0; i < tags.getLength(); i++) {
            selectElement[i] = document.createElement("option");
            selectElement[i].textContent = String.fromCodePoint(tags.getPic(i)) + " " + tags.getTag(i);
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
    async function editItem(search, item) {
        console.log(JSON.stringify(item));
        await fetch(url + pfadEdit + "?" + search + "=", {
            method: "post",
            body: JSON.stringify(item),
        });
    }
    async function getItem(search) {
        let items;
        let response = await fetch(url + pfadView + "?" + search + "=", {
            method: "get"
        });
        let text = await response.text();
        items = JSON.parse(text);
        console.log(items);
        return items;
    }
})(Pruefung || (Pruefung = {}));
//# sourceMappingURL=additem.js.map