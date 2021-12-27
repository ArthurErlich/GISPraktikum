"use strict";
var Aufgabe8;
(function (Aufgabe8) {
    const pfad = "/concertEvents";
    const url = "http://localhost:3500";
    //load end check if something is in the database
    let todoFrom = (document.getElementById("eventsFrom"));
    let lastID;
    todoFrom.addEventListener("submit", onSubmint);
    async function onSubmint(buttonEvent) {
        buttonEvent.preventDefault();
        let id;
        let formData = new FormData(buttonEvent.currentTarget);
        console.log(buttonEvent.currentTarget);
        let interpret = formData.get("interpret_input");
        let price = parseInt((formData.get("price_input")));
        let date = new Date(formData.get("datetime_local_input"));
        // id = parseFloat((<HTMLElement>buttonEvent.currentTarget).dataset.id);
        id = creatID(); //chekc wiht databes if id is used?
        let event = {
            id,
            interpret,
            price,
            date
        };
        createElement(event);
    }
    function creatID() {
        let id = Math.floor((Math.random() * 100)); //-> chek if id is there        
        return id;
    }
    function checkInput(formData, id) {
        return null;
    }
    //fetsh post and get -> create new if id is empty if not edit current
    async function postForm(event) {
        await fetch(url + pfad, {
            method: "post",
            body: JSON.stringify(event),
        });
    }
    async function getForm() {
        let event;
        let response;
        response = await fetch(url + pfad, {
            method: "get",
        });
        return event;
    }
    function createElement(event) {
        let tableWrapper = document.getElementById("toDoOUT");
        console.log("found tableWrapper" + tableWrapper);
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let row = addRow();
        let cell = addCell(event);
        table.dataset.id = event.id + "";
        cell.forEach(element => {
            row.appendChild(element);
        });
        tbody.append(row);
        table.append(tbody);
        tableWrapper.append(table);
        console.log("insertert row" + row);
        console.log("insertet cell" + cell);
    }
    function addRow() {
        let row = document.createElement("tr");
        row.className = "toDoElement";
        return row;
    }
    function addCell(event) {
        let cell = new Array(5);
        for (let i = 0; i < 5; i++) {
            cell[i] = document.createElement("td");
        }
        cell[0].className = "id_out";
        cell[1].className = "interpret_out";
        cell[2].className = "price_out";
        cell[3].className = "datetime_out";
        cell[4].className = "delet";
        cell[0].textContent = event.id + "TEST";
        cell[1].textContent = event.interpret + "TEST";
        cell[2].textContent = event.price + "TEST";
        cell[3].textContent = event.date + "TEST";
        cell[4].append(addDeletButton(event.id));
        return cell;
    }
    function addDeletButton(id) {
        let delet = document.createElement("button");
        delet.dataset.id = id + "";
        delet.textContent = "X";
        delet.className = "deletButton";
        delet.setAttribute("type", "button");
        delet.addEventListener("click", function deletElement() {
            console.log("DeletTableEvent: [" + id + "]");
        });
        return delet;
    }
})(Aufgabe8 || (Aufgabe8 = {}));
//# sourceMappingURL=Script.js.map