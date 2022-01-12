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

        tags: string[] = ["Chicken",
            "Pig",
            "Beef",
            "Veal",
            "Lamb",
            "Venison"]

        getLength(): number {
            return this.tags.length;
        }

        getTag(id: number) {
            return this.tags[id];
        }
    }

    const tags: Tags = new Tags();
    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("importForm");

    const pfadEdit: string = "/edit";
    const pfadAdd: string = "/add";
    const url: string = "http://localhost:3500"

    const searchURI: URLSearchParams = new URLSearchParams(window.location.search);


    loadItems();
    form.addEventListener("submit", addItem,);

    //loads all the stuff
    function loadItems() {
        creatSelectionList();
        if (searchURI.get("id") !== "") {
            console.log("FILLING PAGE!");
        }
    }

    async function addItem(eventButton: Event) {
        eventButton.preventDefault();

        let formData: FormData = new FormData(<HTMLFormElement>eventButton.currentTarget);

        let product: string = <string>formData.get("product");
        let selection: string = <string>(formData.get("selection"));
        let note: string = <string>(formData.get("note"));
        let spoildate: Date = new Date(<string>formData.get("spoildate"));

        let formElements: HTMLFormControlsCollection = form.elements;


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

        let item: GefrieGut = {
            name: product,
            spoilDate: spoildate,
            addDate: addDate,
            note: note,
            tag: selection,
        }

        try {
            console.log("sending Item to Server");
            await postItem(item);
        }
        catch (error) {
            alert(error + "\nServer ist offline!")
        }
        console.log("items send");
    }

    function creatSelectionList() {
        const selectList: HTMLElement = document.getElementById("selection");
        let selectElement: HTMLElement[] = new Array(tags.getLength());

        for (let i: number = 0; i < tags.getLength(); i++) {
            selectElement[i] = document.createElement("option");
            selectElement[i].textContent = tags.getTag(i);
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
}