"use strict";
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
    const url = "http://localhost:3500";
    const pfadView = "/view";
    const tags = new Tags();
    //NICE
    const searchURI = new URLSearchParams(window.location.search);
    console.log(searchURI.get("id"));
    loadIndex();
    async function loadIndex() {
        try {
            let itmes = await getItem(searchURI);
            itmes.forEach(element => {
                createItemInput(element);
            });
        }
        catch (error) {
            console.error(error);
            //alert(error);
        }
    }
    function createItemInput(gefrieGut) {
        const flexBox = document.getElementById("itemDetails");
        //server anfragen und liste der Items holen
        flexBox.appendChild(createBox(gefrieGut)); //GefrieGut interface übergeben
    }
    function createBox(gefrieGut) {
        const itemBox = document.createElement("div");
        let atributes = createItemAtributes(gefrieGut);
        itemBox.className = "itemDetails flexChild";
        itemBox.dataset.id = gefrieGut._id;
        atributes.forEach(element => {
            itemBox.appendChild(element);
        });
        return itemBox;
    }
    function createItemAtributes(gefrieGut) {
        let item_atirbutes = new Array(6);
        for (let i = 0; i < item_atirbutes.length; i++) {
            item_atirbutes[i] = document.createElement("div");
        }
        item_atirbutes[0].className = "item_pic";
        item_atirbutes[1].className = "item_name";
        item_atirbutes[2].className = "item_addDate";
        item_atirbutes[3].className = "item_spoilDate";
        item_atirbutes[4].className = "item_note";
        item_atirbutes[5].className = "item_editRemouve";
        item_atirbutes[0].textContent = tags.getTag(parseInt(gefrieGut.tag));
        item_atirbutes[1].textContent = "Name: " + gefrieGut.name;
        item_atirbutes[2].textContent = "Hinzugefügt am: " + dateConverter(new Date(gefrieGut.addDate));
        item_atirbutes[3].textContent = "Haltbar bis: " + dateConverter(new Date(gefrieGut.spoilDate));
        item_atirbutes[4].textContent = "Notizen: " + gefrieGut.note;
        let editRemove = createEditRemove(gefrieGut._id);
        editRemove.forEach(element => {
            item_atirbutes[5].appendChild(element);
        });
        return item_atirbutes;
    }
    function createEditRemove(_id) {
        let editFunction = new Array(2);
        editFunction[0] = creatLinkRemove(_id);
        editFunction[1] = document.createElement("button");
        editFunction[1].id = "item_remove";
        editFunction[1].dataset.id = _id;
        editFunction[1].textContent = "REMOVE";
        return editFunction;
    }
    function creatLinkRemove(_id) {
        const link = document.createElement("a");
        const removeButton = document.createElement("button");
        removeButton.textContent = "EDIT";
        link.className = "itemLink";
        link.setAttribute("href", "../HTML/additem.html?id=" + _id);
        link.id = "item_remove";
        link.appendChild(removeButton);
        return link;
    }
    //From aufgabe8
    function dateConverter(date) {
        //W3Scool Array https://www.w3schools.com/jsref/jsref_getmonth.asp
        const month = ["01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12"];
        return date.getUTCDate() + "." + month[date.getMonth()] + "." + date.getFullYear();
    }
    function addPic(tag) {
        return new HTMLElement;
    }
    //möglichkeit mehrere items zu bekommen!
    async function getItem(search) {
        let items;
        console.log("connecting to HTTP server");
        try {
            let response = await fetch(url + pfadView + "?" + search + "=", {
                method: "get"
            });
            let text = await response.text();
            items = JSON.parse(text);
            console.log(items);
            return items;
        }
        catch (error) {
            console.error("server is Offline");
            throw new Error(error + "\nServer is Offline");
        }
    }
})(Pruefung || (Pruefung = {}));
//# sourceMappingURL=details.js.map