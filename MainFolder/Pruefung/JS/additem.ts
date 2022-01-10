import { GefrieGut } from "./files";
import { Tags } from "./files";




const form: HTMLFormElement = <HTMLFormElement>document.getElementById("importForm");
const addButton: HTMLElement = document.getElementById("formButton");
let idList = new Set();

load();
addButton.addEventListener("click", addItem);


function addItem(event: Event) {
    event.preventDefault();

}
function load() {
    creatSelectionList();
}
//copy from Aufgabe8
function creatID(): number {
    let _id: number; //-> chek if _id is there   
    _id = Math.floor((Math.random() * 1000));

    while (idList.has(_id)) {
        _id = Math.floor((Math.random() * 1000));
    }
    return _id;
}
function creatSelectionList() {
    const selectList: HTMLElement = document.getElementById("selection");
    let selectElement: HTMLElement[] = new Array(2);

    selectElement[0] = document.createElement("select");
    selectElement[0].textContent = "TEST2";

    selectList.appendChild(selectElement[0]);
}

function tagsLeangth(): number {
    let size: number = 0;
    for (let element in Tags) {
        if (isNaN(Number(element))) {
            size++;
        }
    }
    return size
}