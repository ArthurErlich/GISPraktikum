/*
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

    const tags: Tags = new Tags();
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("importForm");

    const pfadEdit: string = "/edit";
    const pfadAdd: string = "/add";
    const pfadView: string = "/view";
    const url: string = "http://localhost:3500"

    const searchURI: URLSearchParams = new URLSearchParams(window.location.search);
    console.log(searchURI.get("id"));


    loadItems();
    form.addEventListener("submit", addItem,);

    //loads all the stuff
    function loadItems() {
        creatSelectionList();
        //load the Edit Page
        if (searchURI.get("id") !== null) {
            console.log("FILLING PAGE!");
            let sendButton: HTMLElement = document.getElementById("formButtonAdd");
            sendButton.textContent = "EDIT"
            //fills in the From with the Data to edit
            fillFrom();
        }
    }
    async function fillFrom() {
        let formElements: HTMLFormControlsCollection = form.elements;
        let itemList: GefrieGut[] = await getItem(searchURI);
        let item: GefrieGut = itemList[0]; // just the first item is needed!

        // fillin in the HTMLInputElemnts -> this  wil be sned to the server if nothin is changed
        (<HTMLInputElement>formElements.namedItem("product")).value = item.name;
        (<HTMLInputElement>formElements.namedItem("selection")).value = item.tag;
        (<HTMLInputElement>formElements.namedItem("spoildate")).value = dateConverter(new Date(item.spoilDate));
        (<HTMLInputElement>formElements.namedItem("note")).value = item.note;

    }

    async function addItem(eventButton: Event) {
        eventButton.preventDefault();

        let formData: FormData = new FormData(<HTMLFormElement>eventButton.currentTarget);

        let product: string = <string>formData.get("product");
        let selection: string = <string>(formData.get("selection"));
        let note: string = <string>(formData.get("note"));
        let spoildate: Date = new Date(<string>formData.get("spoildate"));

        let formElements: HTMLFormControlsCollection = form.elements;
        let item: GefrieGut;


        console.log("cheking input");

        if (product === "") {
            console.error("product  is empty");
            (<HTMLElement>formElements.namedItem("product")).className = "wrongInput";
            return;
        }

        if (selection === "") {
            console.error("selection is empty");
            (<HTMLElement>formElements.namedItem("selection")).className = "wrongInput";
            return;
        }

        if (isNaN(Date.parse(spoildate.toString()))) {
            console.error("spoildate is empty");
            (<HTMLElement>formElements.namedItem("spoildate")).className = "wrongInput";
            return;
        }

        let addDate: Date = new Date();

        item = {
            name: product,
            spoilDate: spoildate,
            addDate: addDate,
            note: note,
            tag: selection,
        }

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
            console.error(error + "\nServer ist offline!")
        }
        console.log("items send");
    }
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
        //inline If
        let day: string = (date.getUTCDate() < 10 ? "0" : "") + date.getUTCDate();
        console.log(day);
        return date.getFullYear() + "-" + month[date.getMonth()] + "-" + day;
    }

    function creatSelectionList() {
        let selectList: HTMLElement = document.getElementById("selection");
        let selectElement: HTMLElement[] = new Array(tags.getLength());

        for (let i: number = 0; i < tags.getLength(); i++) {
            selectElement[i] = document.createElement("option");
            selectElement[i].textContent = String.fromCodePoint(tags.getPic(i)) + " " + tags.getTag(i);
            selectElement[i].setAttribute("value", i + "");
            selectList.appendChild(selectElement[i]);
        }
    }

    async function postItem(item: GefrieGut) {
        console.log(JSON.stringify(item));
        await fetch(url + pfadAdd, {
            method: "post",
            body: JSON.stringify(item),
        });
    }
    async function editItem(search: URLSearchParams, item: GefrieGut) {
        console.log(JSON.stringify(item));
        await fetch(url + pfadEdit + "?" + search + "=", {
            method: "post",
            body: JSON.stringify(item),
        });
    }
    async function getItem(search: URLSearchParams): Promise<GefrieGut[]> {
        let items: GefrieGut[];
        let response: Response = await fetch(url + pfadView + "?" + search + "=", {
            method: "get"
        });
        let text = await response.text()
        items = JSON.parse(text);
        console.log(items);
        return items;
    }
}