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
    const addButton: HTMLElement = document.getElementById("formButtonAdd");

    const pfadEdit: string = "/edit";
    const url: string = "http://localhost:3500"


    loadItems();
    addButton.addEventListener("click", addItem);



    //loads all the stuff
    function loadItems() {
        creatSelectionList();
    }

    function addItem(event: Event) {
        event.preventDefault();
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
}