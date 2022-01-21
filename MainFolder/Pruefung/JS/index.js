"use strict";
/*
just dont want to work? js error on Webpage
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
    const itemsElement = document.getElementById("items");
    const form = document.getElementById("filter");
    const tags = new Tags();
    const pfad = "/items";
    const url = "http://localhost:3500";
    //load time
    loadSite();
    function loadSite() {
        creatSelectionList();
        loadItems();
        form.addEventListener("submit", submitSort);
    }
    //TODO: localStorage Hinzufügen um die Kategoriy zu suchen/bzw den Namen zu suchen
    async function loadItems() {
        const form = document.getElementById("filter");
        let formContorl = form.elements;
        let formSetting;
        if (localStorage.getItem("filterSetting")) {
            formSetting = JSON.parse(localStorage.getItem("filterSetting"));
            if (formSetting[0] !== null) {
                formContorl.namedItem("abgelaufen").checked = true;
            }
            if (formSetting[1] !== null) {
                formContorl.namedItem("baldabgelaufen").checked = true;
            }
            if (formSetting[2] !== '') {
                formContorl.namedItem("suche").value = formSetting[2];
            }
            if (formSetting[3] !== "null") {
                formContorl.namedItem("kategorie").value = formSetting[3];
            }
        }
        removeNodes();
        let itmes = await getItems();
        itmes.forEach(element => {
            if (formSetting[0] !== null) {
                if (!isSpoiled(new Date(element.spoilDate))) {
                    return;
                }
            }
            if (formSetting[1] !== null) {
                if (!isNearlySpoiled(new Date(element.spoilDate))) {
                    return;
                }
            }
            if (formSetting[2] !== "") {
                if (!element.name.toLowerCase().includes(formSetting[2].toLowerCase())) {
                    return;
                }
            }
            if (formSetting[3] !== "null") {
                if (element.tag !== formSetting[3])
                    return;
            }
            createItem(element);
        });
    }
    function removeNodes() {
        //löscht das FirstChild solange es eins gibt
        console.log("Reseting itemlist...");
        while (itemsElement.firstChild) {
            itemsElement.removeChild(itemsElement.firstChild);
        }
    }
    async function submitSort(eventButton) {
        eventButton.preventDefault();
        let formData = new FormData(eventButton.currentTarget);
        //check if null
        let spoiled = formData.get("abgelaufen");
        let nearlySpoiled = formData.get("baldabgelaufen");
        //check if ""
        let nameSort = formData.get("suche");
        let typeSort = formData.get("kategorie");
        let formSetting = [spoiled, nearlySpoiled, nameSort, typeSort];
        localStorage.removeItem("filterSetting");
        localStorage.setItem("filterSetting", JSON.stringify(formSetting));
        removeNodes();
        let itmes = await getItems();
        itmes.forEach(element => {
            if (spoiled !== null) {
                if (!isSpoiled(new Date(element.spoilDate))) {
                    return;
                }
            }
            if (nearlySpoiled !== null) {
                if (!isNearlySpoiled(new Date(element.spoilDate))) {
                    return;
                }
            }
            if (nameSort !== "") {
                if (!element.name.toLowerCase().includes(nameSort.toLowerCase())) {
                    return;
                }
            }
            if (typeSort !== "null") {
                if (element.tag !== typeSort)
                    return;
            }
            createItem(element);
        });
    }
    function createItem(gefrieGut) {
        //server anfragen und liste der Items holen
        itemsElement.appendChild(createBox(gefrieGut)); //GefrieGut interface übergeben
    }
    function createBox(gefrieGut) {
        const itemBox = document.createElement("div");
        itemBox.className = "item flexChild";
        if (isSpoiled(new Date(gefrieGut.spoilDate))) {
            itemBox.className += " redOutline";
        }
        else if (isNearlySpoiled(new Date(gefrieGut.spoilDate))) {
            itemBox.className += " jellowOutline";
        }
        itemBox.dataset.id = gefrieGut._id;
        itemBox.appendChild(creatLink(gefrieGut));
        return itemBox;
    }
    function creatLink(gefrieGut) {
        const link = document.createElement("a");
        link.className = "itemLink";
        link.setAttribute("href", "../HTML/details.html?id=" + gefrieGut._id);
        let itemInner = createItemAtributes(gefrieGut);
        itemInner.forEach(element => {
            link.appendChild(element);
        });
        if (isSpoiled(new Date(gefrieGut.spoilDate))) {
            let achtung = document.createElement("div");
            achtung.textContent = "Mindesthaltbarkeit überschritten";
            link.appendChild(achtung);
        }
        else if (isNearlySpoiled(new Date(gefrieGut.spoilDate))) {
            let achtung = document.createElement("div");
            achtung.textContent = "Mindesthaltbarkeit bald überschritten";
            link.appendChild(achtung);
        }
        return link;
    }
    function createItemAtributes(gefrieGut) {
        let item_atirbutes = new Array(3);
        for (let i = 0; i < item_atirbutes.length; i++) {
            item_atirbutes[i] = document.createElement("div");
        }
        item_atirbutes[0].className = "item_pic";
        item_atirbutes[1].className = "item_name";
        item_atirbutes[2].className = "item_spoilDate";
        item_atirbutes[0].textContent = String.fromCodePoint(tags.getPic(parseInt(gefrieGut.tag)));
        item_atirbutes[1].textContent = gefrieGut.name;
        item_atirbutes[2].textContent = "Haltbar bis: " + dateConverter(new Date(gefrieGut.spoilDate));
        return item_atirbutes;
    }
    function creatSelectionList() {
        let selectChecker = ["Abgelaufen", "Bald abgelaufen"];
        let selectSearch = ["Suche"];
        let selectKategory = "Kategorie";
        let selectList = document.getElementById("sort_Kategory");
        let sortCheker = createSortChecker(selectChecker);
        let sortSearch = createSortSearch(selectSearch);
        sortCheker.forEach(checker => {
            selectList.appendChild(checker);
        });
        sortSearch.forEach(search => {
            selectList.appendChild(search);
        });
        selectList.appendChild(createSortKategorie(selectKategory));
    }
    function createSortChecker(selectNames) {
        let divWrapper = new Array(selectNames.length);
        let selectLabel = new Array(selectNames.length);
        let selectChecker = new Array(selectNames.length);
        for (let i = 0; i < selectNames.length; i++) {
            selectLabel[i] = document.createElement("label");
            selectLabel[i].setAttribute("for", stringTypeFromater(selectNames[i]));
            selectLabel[i].textContent = selectNames[i];
            selectChecker[i] = document.createElement("input");
            selectChecker[i].setAttribute("type", "checkbox");
            selectChecker[i].setAttribute("value", stringTypeFromater(selectNames[i]));
            selectChecker[i].setAttribute("name", stringTypeFromater(selectNames[i]));
            divWrapper[i] = document.createElement("div");
            divWrapper[i].className = "searchCheck";
            divWrapper[i].appendChild(selectLabel[i]);
            divWrapper[i].appendChild(selectChecker[i]);
        }
        return divWrapper;
    }
    function createSortSearch(selectNames) {
        let divWrapper = new Array(selectNames.length);
        let selectLabel = new Array(selectNames.length);
        let selectSearch = new Array(selectNames.length);
        for (let i = 0; i < selectNames.length; i++) {
            selectLabel[i] = document.createElement("label");
            selectLabel[i].setAttribute("for", stringTypeFromater(selectNames[i]));
            selectLabel[i].textContent = selectNames[i];
            selectSearch[i] = document.createElement("input");
            selectSearch[i].setAttribute("type", "text");
            selectSearch[i].setAttribute("name", stringTypeFromater(selectNames[i]));
            divWrapper[i] = document.createElement("div");
            divWrapper[i].className = "searchSearch";
            divWrapper[i].appendChild(selectLabel[i]);
            divWrapper[i].appendChild(selectSearch[i]);
        }
        return divWrapper;
    }
    function createSortKategorie(selectNames) {
        let divWrapper;
        let selectLabel;
        let selectSearch;
        selectLabel = document.createElement("label");
        selectLabel.setAttribute("for", stringTypeFromater(selectNames));
        selectLabel.textContent = selectNames;
        selectSearch = document.createElement("select");
        selectSearch.setAttribute("name", stringTypeFromater(selectNames));
        let selectElement = new Array(tags.getLength());
        let selectEmpty = document.createElement("option");
        selectEmpty.textContent = "";
        selectEmpty.setAttribute("value", "null");
        selectSearch.appendChild(selectEmpty);
        for (let i = 0; i < tags.getLength(); i++) {
            selectElement[i] = document.createElement("option");
            selectElement[i].textContent = String.fromCodePoint(tags.getPic(i)) + " " + tags.getTag(i);
            selectElement[i].setAttribute("value", i + "");
            selectSearch.appendChild(selectElement[i]);
        }
        divWrapper = document.createElement("div");
        divWrapper.className = "searchSearch";
        divWrapper.appendChild(selectLabel);
        divWrapper.appendChild(selectSearch);
        return divWrapper;
    }
    function stringTypeFromater(s) {
        s = s.toLowerCase();
        s = s.replaceAll(" ", "");
        return s;
    }
    function dateConverter(date) {
        //W3Scool Array https://www.w3schools.com/jsref/jsref_getmonth.asp
        const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let day = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
        return day + "." + month[date.getUTCMonth()] + "." + date.getFullYear();
    }
    function isSpoiled(spoilDate) {
        let spoil = spoilDate.valueOf();
        let nowDate = new Date();
        let now = nowDate.valueOf();
        return spoil <= now ? true : false;
    }
    function isNearlySpoiled(spoilDate) {
        let spoil = spoilDate.valueOf();
        let nowDate = new Date();
        let threDays = 259200000; //3 days in milliseconds
        let now = nowDate.valueOf();
        return spoil - threDays <= now ? true : false;
    }
    async function getItems() {
        let items;
        console.log("connecting to HTTP server");
        try {
            let response = await fetch(url + pfad, {
                method: "get"
            });
            let text = await response.text();
            items = JSON.parse(text);
            console.log("fetch finished");
        }
        catch (error) {
            console.error("server is Offline");
            console.log(error);
        }
        return items;
    }
})(Pruefung || (Pruefung = {}));
//#region old Stuff
/*
//const pfadSort: string = "/sort";
async function getItemsSort(sort: string): Promise<GefrieGut[]> {
    let items: GefrieGut[];
    console.log("connecting to HTTP server");
    try {
        let response: Response = await fetch(url + pfadSort + "?sortBy=" + sort, {
            method: "get"
        });
        let text = await response.text()
        items = JSON.parse(text);
        console.log("fetch finished");
    } catch (error) {
        console.error("server is Offline");
        console.log(error);
    }
    return items;
}
    //alte Sortierufunkiton in der MongoDB

    async function sortBy(sort: string): Promise<void> {
        removeNodes();
        let itmes: GefrieGut[] = await getItemsSort(sort);
        itmes.forEach(element => {
            createItem(element);
        });
    }
    */
//#endregion
//# sourceMappingURL=index.js.map