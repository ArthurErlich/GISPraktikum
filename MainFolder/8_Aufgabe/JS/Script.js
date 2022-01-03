"use strict";
var Aufgabe8;
(function (Aufgabe8) {
    const pfad = "/concertEvents";
    const url = "http://localhost:3500";
    const deletPfad = "/delet";
    let idList = new Set();
    //load end check if something is in the database
    load();
    let testF = document.getElementById("TEST");
    testF.addEventListener("click", test);
    let todoFrom = (document.getElementById("eventsFrom"));
    todoFrom.addEventListener("submit", onSubmint);
    async function onSubmint(buttonEvent) {
        buttonEvent.preventDefault();
        let _id;
        let formData = new FormData(buttonEvent.currentTarget);
        //console.log(buttonEvent.currentTarget);
        let interpret = formData.get("interpret_input");
        let price = parseInt((formData.get("price_input")));
        let date = new Date(formData.get("datetime_local_input"));
        if (interpret === "") {
            console.error("interpret  is empty");
            //set inteperet red
            return;
        }
        if (isNaN(price) || price === null) {
            console.error("price is empty");
            //set inteperet red
            return;
        }
        if (isNaN(Date.parse(date.toString()))) {
            console.error("date is empty");
            //set inteperet red
            return;
        }
        _id = creatID(); //chekc wiht databes if _id is used?
        let event = {
            _id,
            interpret,
            price,
            date
        };
        postForm(event);
        createElement(event);
    }
    function creatID() {
        let _id; //-> chek if _id is there   
        _id = Math.floor((Math.random() * 1000));
        while (idList.has(_id)) {
            _id = Math.floor((Math.random() * 1000));
        }
        return _id;
    }
    //fetsh post and get -> create new if _id is empty if not edit current
    async function postForm(event) {
        console.log(JSON.stringify(event));
        await fetch(url + pfad, {
            method: "post",
            body: JSON.stringify(event),
        });
    }
    async function getForm() {
        console.log("getting the Response for get Form");
        let events;
        try {
            let response = await fetch(url + pfad, { method: "get" });
            let text = await response.text();
            events = JSON.parse(text);
        }
        catch (error) {
            console.error("server Offline");
            console.log(error);
            throw new Error(error);
        }
        return events;
    }
    async function deletGet(_id) {
        let searchPara = "?EventID=" + _id;
        await fetch(url + deletPfad + searchPara, {
            method: "get",
        });
    }
    function createElement(event) {
        let tableWrapper = document.getElementById("toDoOUT");
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let row = addRow();
        let cell = addCell(event);
        table.className = "toDoElement";
        table.dataset._id = event._id + "";
        cell.forEach(element => {
            row.appendChild(element);
        });
        tbody.append(row);
        table.append(tbody);
        tableWrapper.append(table);
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
        cell[0].textContent = event._id + "";
        cell[1].textContent = event.interpret + "";
        cell[2].textContent = event.price + "";
        cell[3].textContent = dateConverter(new Date(event.date));
        cell[4].append(addDeletButton(event._id));
        return cell;
    }
    function addDeletButton(_id) {
        let delet = document.createElement("button");
        delet.dataset._id = _id + "";
        delet.textContent = "X";
        delet.className = "deletButton";
        delet.setAttribute("type", "button");
        delet.addEventListener("click", function deletElement() {
            //add functionality
            console.log("DeletTableEvent: [" + _id + "]");
            removeEventElement(_id);
            idList.delete(_id);
            deletGet(_id);
        });
        return delet;
    }
    function dateConverter(date) {
        return date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }
    async function load() {
        let events = new Array();
        try {
            events = await getForm();
            console.log("events found: " + events);
        }
        catch (error) {
            console.log("no events found");
            return;
        }
        // ony create new events in HTML if ther is something in the DB
        events.forEach(event => {
            createElement(event);
            idList.add(event._id);
        });
        console.log("loading finished");
    }
    function removeEventElement(_id) {
        let todoElements = document.getElementsByClassName("toDoElement");
        for (let element of todoElements) {
            let elemntData = (element.dataset._id) + "";
            if (elemntData === "" + _id) {
                element.remove();
                console.log("removed Event " + _id + " wiht dataset of" + elemntData);
            }
        }
    }
    function test() {
        idList.add(creatID());
        idList.add(creatID());
        idList.add(creatID());
        idList.add(creatID());
        console.log(idList);
    }
    ;
    document.getElementById("TESTDIV").hidden = true;
})(Aufgabe8 || (Aufgabe8 = {}));
//# sourceMappingURL=Script.js.map