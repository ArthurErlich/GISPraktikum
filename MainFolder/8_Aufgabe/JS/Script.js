"use strict";
var Aufgabe8;
(function (Aufgabe8) {
    const pfad = "/concertEvents";
    const url = "http://localhost:3500";
    let idList = new Set();
    //load end check if something is in the database
    load();
    let testF = document.getElementById("TEST");
    testF.addEventListener("click", test);
    let todoFrom = (document.getElementById("eventsFrom"));
    todoFrom.addEventListener("submit", onSubmint);
    async function onSubmint(buttonEvent) {
        buttonEvent.preventDefault();
        let id;
        let formData = new FormData(buttonEvent.currentTarget);
        console.log(buttonEvent.currentTarget);
        let interpret = formData.get("interpret_input");
        let price = parseInt((formData.get("price_input")));
        let date = new Date(formData.get("datetime_local_input"));
        if (interpret === "") {
            console.error("interpret  is empty");
            //set inteperet red
            return;
        }
        if (price === NaN) {
            console.error("price  is empty");
            //set inteperet red
            return;
        }
        if (!date) {
            console.error("price  is empty");
            //set inteperet red
            return;
        }
        id = creatID(); //chekc wiht databes if id is used?
        let event = {
            id,
            interpret,
            price,
            date
        };
        postForm(event);
    }
    function creatID() {
        let id; //-> chek if id is there   
        id = Math.floor((Math.random() * 1000));
        while (idList.has(id)) {
            id = Math.floor((Math.random() * 1000));
        }
        return id;
    }
    //fetsh post and get -> create new if id is empty if not edit current
    async function postForm(event) {
        let post = await fetch(url + pfad, {
            method: "post",
            body: JSON.stringify(event),
        });
        //when server is offline post.ok wont happpend
        if (!post.ok) {
            console.error("Faild to connect");
        }
        else {
            createElement(event);
        }
    }
    async function getForm() {
        let event;
        let response;
        response = await fetch(url + pfad, {
            method: "get",
        });
        if (!response.ok) {
            console.error("Faild to connect");
        }
        else {
        }
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
        row.className = "EventElement";
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
        cell[0].textContent = event.id + "";
        cell[1].textContent = event.interpret + "";
        cell[2].textContent = event.price + "";
        cell[3].textContent = dateConverter(event.date);
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
    function dateConverter(date) {
        return date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }
    async function load() {
        let events = new Array();
        events = await getForm();
        // ony create new events in HTML if ther is something in the DB
        events.forEach(event => {
            createElement(event);
            idList.add(event.id);
        });
    }
    function test() {
        idList.add(creatID());
        idList.add(creatID());
        idList.add(creatID());
        idList.add(creatID());
        console.log(idList);
    }
    ;
})(Aufgabe8 || (Aufgabe8 = {}));
//# sourceMappingURL=Script.js.map