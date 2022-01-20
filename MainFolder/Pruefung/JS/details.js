"use strict";
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
    const url = "http://localhost:3500";
    const pfadView = "/view";
    const pfadDelet = "/remove";
    const tags = new Tags();
    //NICE
    const searchURI = new URLSearchParams(window.location.search);
    console.log("The Search URI: " + searchURI.get("id"));
    loadIndex();
    async function loadIndex() {
        try {
            let itmes = await getItem(searchURI);
            itmes.forEach(element => {
                createItemInput(element);
                setHeroText(element.name);
            });
        }
        catch (error) {
            console.error(error);
            //alert(error);
        }
    }
    function setHeroText(name) {
        const heroText = document.getElementById("itemCatogory");
        heroText.textContent = name;
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
        let item_atirbutes = new Array(7);
        for (let i = 0; i < item_atirbutes.length; i++) {
            item_atirbutes[i] = document.createElement("div");
        }
        item_atirbutes[0].className = "item_pic";
        item_atirbutes[1].className = "item_name";
        item_atirbutes[2].className = "item_addDate";
        item_atirbutes[3].className = "item_spoilDate";
        item_atirbutes[4].className = "item_note";
        item_atirbutes[5].appendChild(createTextArea(gefrieGut.note));
        item_atirbutes[6].className = "item_editRemouve";
        item_atirbutes[0].textContent = String.fromCodePoint(tags.getPic(parseInt(gefrieGut.tag)));
        item_atirbutes[1].textContent = "Name: " + gefrieGut.name;
        item_atirbutes[2].textContent = "Hinzugefügt am: " + dateConverter(new Date(gefrieGut.addDate));
        item_atirbutes[3].textContent = "Haltbar bis: " + dateConverter(new Date(gefrieGut.spoilDate));
        item_atirbutes[4].textContent = "Notizen:";
        let editRemove = createEditRemove(gefrieGut._id);
        editRemove.forEach(element => {
            item_atirbutes[6].appendChild(element);
        });
        return item_atirbutes;
    }
    function createTextArea(note) {
        let textArea = document.createElement("div");
        textArea.className = "textArea_Details";
        textArea.textContent = note;
        return textArea;
    }
    function createEditRemove(_id) {
        let editFunction = new Array(2);
        editFunction[0] = creatLinkEdit(_id);
        editFunction[1] = document.createElement("button");
        editFunction[1].id = "item_remove";
        editFunction[1].dataset.id = _id;
        editFunction[1].textContent = "Löschen";
        editFunction[1].addEventListener("click", function deletElement(event) {
            event.preventDefault();
            removeItem(searchURI);
        });
        return editFunction;
    }
    function creatLinkEdit(_id) {
        const link = document.createElement("a");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Bearbeiten";
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
        let day = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
        return day + "." + month[date.getUTCMonth()] + "." + date.getFullYear();
    }
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
    async function removeItem(search) {
        console.log("remuving item");
        try {
            await fetch(url + pfadDelet + "?" + search + "=", {
                method: "get"
            });
            //open homepage
            window.open("../HTML/index.html", "_parent");
        }
        catch (error) {
            console.error("Fehler beim Löschen");
        }
    }
})(Pruefung || (Pruefung = {}));
//# sourceMappingURL=details.js.map