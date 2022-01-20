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
    const tags: Tags = new Tags();
    const pfad: string = "/items";
    const url: string = "http://localhost:3500"

    loadIndex();
    //filtersystem!

    async function loadIndex(): Promise<void> {
        removeNodes();
        let itmes: GefrieGut[] = await getItems();
        itmes.forEach(element => {
            createItem(element);
        });
    }

    async function sortByDate(): Promise<void> {
        removeNodes();
        let itmesUnsortet: GefrieGut[] = await getItems();
    }

    async function sortBySpoilDate(): Promise<void> {
        removeNodes();
        let itmesUnsortet: GefrieGut[] = await getItems();
    }
    function removeNodes(): void {
        //löscht das FirstChild solange es eins gibt
        console.log("Reseting itemlist...");
        while (itemsElement.firstChild) {
            itemsElement.removeChild(itemsElement.firstChild);
        }
    }

    function createItem(gefrieGut: GefrieGut): void {


        //server anfragen und liste der Items holen
        itemsElement.appendChild(createBox(gefrieGut)); //GefrieGut interface übergeben
    }

    function createBox(gefrieGut: GefrieGut): HTMLElement {
        const itemBox: HTMLElement = document.createElement("div");
        itemBox.className = "item flexChild";
        itemBox.dataset.id = gefrieGut._id;
        itemBox.appendChild(creatLink(gefrieGut));
        return itemBox;
    }

    function creatLink(gefrieGut: GefrieGut): HTMLElement {
        const link: HTMLElement = document.createElement("a");
        link.className = "itemLink";
        link.setAttribute("href", "../HTML/details.html?id=" + gefrieGut._id);
        let itemInner: HTMLElement[] = createItemAtributes(gefrieGut);

        itemInner.forEach(element => {
            link.appendChild(element);
        });
        return link;
    }

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
        item_atirbutes[2].textContent = "Haltbar bis: " + dateConverter(new Date());

        return item_atirbutes;
    }

    //From aufgabe8
    function dateConverter(date: Date): string {
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

    async function getItems(): Promise<GefrieGut[]> {
        let items: GefrieGut[];
        console.log("connecting to HTTP server");
        try {
            let response: Response = await fetch(url + pfad, {
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
}