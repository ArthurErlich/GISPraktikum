/*
just dont want to work? js error on Webpage
import { GefrieGut } from "./files";
import { Tags } from "./files";
*/
namespace Pruefung {
    interface GefrieGut {
        _id?: string,
        name: string,
        spoilDate: Date,
        addDate: Date,
        note: string,
        tag: string // used for pic
    }
    class Tags {
        tags: string[] = ["Huenchen", "Schwein", "Kuh", "Schaf", "Wildschein"];
        pics: number[] = [128020, 128022, 128004, 128017, 128023];

        getLength(): number {
            return this.tags.length;
        }
        getTag(id: number) {
            return this.tags[id];
        }
        getPic(id: number) {
            return this.pics[id];
        }
    }

    const itemsElement: HTMLElement = document.getElementById("items");
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("filter");

    const tags: Tags = new Tags();
    const pfad: string = "/items";
    const url: string = "http://localhost:3500"

    //load time
    loadSite();


    function loadSite(): void {
        creatSelectionList();
        loadItems();
        form.addEventListener("submit", submitSort,);

    }


    async function loadItems(): Promise<void> {
        const form: HTMLFormElement = <HTMLFormElement>document.getElementById("filter");
        let formContorl: HTMLFormControlsCollection = form.elements;
        let formSetting: string[];

        let items: GefrieGut[];

        try {
            items = await getItems()
        } catch (error) {
            console.error("server offline?");
            items = null;
        }

        if (localStorage.getItem("filterSetting")) {
            formSetting = JSON.parse(localStorage.getItem("filterSetting"));
            if (formSetting[0] !== null) {
                (<HTMLInputElement>formContorl.namedItem("abgelaufen")).checked = true;
            }
            if (formSetting[1] !== null) {
                (<HTMLInputElement>formContorl.namedItem("baldabgelaufen")).checked = true;
            }
            if (formSetting[2] !== '') {
                (<HTMLInputElement>formContorl.namedItem("suche")).value = formSetting[2];
            }
            if (formSetting[3] !== "null") {
                (<HTMLInputElement>formContorl.namedItem("kategorie")).value = formSetting[3];
            }
        }
        removeNodes();

        if (items !== null) {
            items.forEach(element => {
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
    }

    function removeNodes(): void {
        //löscht das FirstChild solange es eins gibt
        console.log("Reseting itemlist...");
        while (itemsElement.firstChild) {
            itemsElement.removeChild(itemsElement.firstChild);
        }
    }

    async function submitSort(eventButton: Event): Promise<void> {
        eventButton.preventDefault();
        let formData: FormData = new FormData(<HTMLFormElement>eventButton.currentTarget);

        //check if null
        let spoiled: string = <string>formData.get("abgelaufen");
        let nearlySpoiled: string = <string>formData.get("baldabgelaufen");

        //check if ""
        let nameSort: string = <string>formData.get("suche");
        let typeSort: string = <string>formData.get("kategorie");

        let formSetting: string[] = [spoiled, nearlySpoiled, nameSort, typeSort];

        localStorage.removeItem("filterSetting");
        localStorage.setItem("filterSetting", JSON.stringify(formSetting));

        removeNodes();

        let itmes: GefrieGut[] = await getItems();
        itmes.forEach(element => {
            if (spoiled !== null) {
                if (!isSpoiled(new Date(element.spoilDate))) {
                    //springt raus sobald beides erfüllt ist.
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
            //erst hier wird das Element erstellt
            createItem(element);
        });


    }

    function createItem(gefrieGut: GefrieGut): void {
        //server anfragen und liste der Items holen
        itemsElement.appendChild(createBox(gefrieGut)); //GefrieGut interface übergeben
    }

    function createBox(gefrieGut: GefrieGut): HTMLElement {
        const itemBox: HTMLElement = document.createElement("div");

        //hier wird der Rahemn für MHD eingefügt
        itemBox.className = "item flexChild";
        if (isSpoiled(new Date(gefrieGut.spoilDate))) {
            itemBox.className += " redOutline";
        } else if (isNearlySpoiled(new Date(gefrieGut.spoilDate))) {
            itemBox.className += " jellowOutline";
        }

        //das dataset wird nicht benutzt, ist für die Zukunft vorhanden und mann kan die Ids mit der DB verlgiechen
        itemBox.dataset.id = gefrieGut._id;
        itemBox.appendChild(creatLink(gefrieGut));
        return itemBox;
    }

    function creatLink(gefrieGut: GefrieGut): HTMLElement {
        const link: HTMLElement = document.createElement("a");

        link.className = "itemLink";
        link.setAttribute("href", "details.html?id=" + gefrieGut._id);
        let itemInner: HTMLElement[] = createItemAtributes(gefrieGut);

        // ich liebe dieses forEach!
        itemInner.forEach(element => {
            link.appendChild(element);
        });

        if (isSpoiled(new Date(gefrieGut.spoilDate))) {
            let achtung: HTMLElement = document.createElement("div");
            achtung.textContent = "Mindesthaltbarkeit überschritten"
            link.appendChild(achtung);
        }
        else if (isNearlySpoiled(new Date(gefrieGut.spoilDate))) {
            let achtung: HTMLElement = document.createElement("div");
            achtung.textContent = "Mindesthaltbarkeit bald überschritten"
            link.appendChild(achtung);
        }
        return link;
    }
    //Her werden die Element in der Übersicht mit allen Daten gefüllt.
    function createItemAtributes(gefrieGut: GefrieGut): HTMLElement[] {
        let item_atirbutes: HTMLElement[] = new Array(3);

        for (let i: number = 0; i < item_atirbutes.length; i++) {
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
    //Erstellung der Filterauswahl
    function creatSelectionList(): void {
        let selectChecker: string[] = ["Abgelaufen", "Bald abgelaufen"];
        let selectSearch: string[] = ["Suche"];
        let selectKategory: string = "Kategorie";

        let selectList: HTMLElement = document.getElementById("sort_Kategory");

        //Funktionen für die Erstllung der Chekcboxen und dem Suchfeld
        let sortCheker: HTMLElement[] = createSortChecker(selectChecker);
        let sortSearch: HTMLElement[] = createSortSearch(selectSearch);

        sortCheker.forEach(checker => {
            selectList.appendChild(checker);
        });
        sortSearch.forEach(search => {
            selectList.appendChild(search);
        });

        selectList.appendChild(createSortKategorie(selectKategory));

    }
    function createSortChecker(selectNames: string[]): HTMLElement[] {
        let divWrapper: HTMLElement[] = new Array(selectNames.length);
        let selectLabel: HTMLElement[] = new Array(selectNames.length);
        let selectChecker: HTMLElement[] = new Array(selectNames.length);

        for (let i: number = 0; i < selectNames.length; i++) {
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

    function createSortSearch(selectNames: string[]): HTMLElement[] {
        let divWrapper: HTMLElement[] = new Array(selectNames.length);
        let selectLabel: HTMLElement[] = new Array(selectNames.length);
        let selectSearch: HTMLElement[] = new Array(selectNames.length);

        for (let i: number = 0; i < selectNames.length; i++) {
            selectLabel[i] = document.createElement("label");
            selectLabel[i].setAttribute("for", stringTypeFromater(selectNames[i])); //entfernt die leerzeichen im string
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

    function createSortKategorie(selectNames: string): HTMLElement {
        let divWrapper: HTMLElement;
        let selectLabel: HTMLElement;
        let selectSearch: HTMLElement;

        selectLabel = document.createElement("label");
        selectLabel.setAttribute("for", stringTypeFromater(selectNames));//einzige möglichkeit im js die Emojis sichtabr zu machen
        selectLabel.textContent = selectNames;

        selectSearch = document.createElement("select");
        selectSearch.setAttribute("name", stringTypeFromater(selectNames));

        let selectElement: HTMLElement[] = new Array(tags.getLength());

        let selectEmpty: HTMLElement = document.createElement("option");
        selectEmpty.textContent = "";
        selectEmpty.setAttribute("value", "null");
        selectSearch.appendChild(selectEmpty);

        for (let i: number = 0; i < tags.getLength(); i++) {
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
    function stringTypeFromater(s: string): string {
        s = s.toLowerCase();
        s = s.replaceAll(" ", "");
        return s;
    }

    function dateConverter(date: Date): string {
        //W3Scool Array https://www.w3schools.com/jsref/jsref_getmonth.asp
        const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let day: string = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
        return day + "." + month[date.getUTCMonth()] + "." + date.getFullYear();
    }
    //einfacher Verlgeich um zu schauen ob ein Datum überschritten wird valueOf: milliseconds since midnight, January 1, 1970 UTC.
    function isSpoiled(spoilDate: Date): boolean {
        let spoil: number = spoilDate.valueOf();
        let nowDate: Date = new Date();
        let now: number = nowDate.valueOf();

        return spoil <= now ? true : false;
    }

    function isNearlySpoiled(spoilDate: Date): boolean {
        let spoil: number = spoilDate.valueOf();
        let nowDate: Date = new Date();

        let threDays: number = 259200000; //3 days in milliseconds
        let now: number = nowDate.valueOf();

        return spoil - threDays <= now ? true : false;
    }

    async function getItems(): Promise<GefrieGut[]> {
        let items: GefrieGut[];
        console.log("connecting to HTTP server");
        try {
            let response: Response = await fetch(url + pfad, {
                method: "get"
            });
            let text = await response.text();
            items = JSON.parse(text);
            console.log("fetch finished");
        } catch (error) {
            console.error("server is Offline");
            console.log(error);
            throw new Error("server offline!");
        }
        return items;
    }
}

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