import { GefrieGut } from "./files";
import { Tags } from "./files";

const form: HTMLFormElement = <HTMLFormElement>document.getElementById("importForm");

let idList = new Set();

//copy from Aufgabe8
function creatID(): number {
    let _id: number; //-> chek if _id is there   
    _id = Math.floor((Math.random() * 1000));

    while (idList.has(_id)) {
        _id = Math.floor((Math.random() * 1000));
    }
    return _id;
}
