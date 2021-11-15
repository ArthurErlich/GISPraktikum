"use strict";
var Aufgabe4;
(function (Aufgabe4) {
    //create html element --> creat a buldung stone (gif it an id // or save it on a array/list?) --Using timeAndDate for data-ToDoID
    //then apand it 
    //by clicking a button removing the appendet element --> by getting the : article.dataset.NAME --> data-NAME addEventListener use bubling
    //dont user innerhtml!!!
    let addButton = document.getElementById("Button-Add");
    let interpret = null;
    let price = null;
    let date = null;
    addButton.addEventListener("click", addElement);
    function removeElement(event) {
        let target = event.currentTarget;
        target.parentElement.parentElement.parentElement.parentElement.remove();
    }
    function addElement() {
        console.log(new Date(document.getElementById("datetime-local_input").value));
        try {
            interpret = document.getElementById("interpret_input").value;
            price = parseInt(document.getElementById("price_input").value);
            date = new Date(document.getElementById("datetime-local_input").value);
            let table = document.createElement("table");
            let tbody = document.createElement("tbody");
            let toDoElment = document.createElement("tr");
            let interpret_out = document.createElement("td");
            let price_out = document.createElement("td");
            let datetime_out = document.createElement("td");
            let delet = document.createElement("td");
            let deletButton = document.createElement("button");
            toDoElment.classList.add("toDoElement");
            interpret_out.classList.add("tnterpret_out");
            interpret_out.innerText = interpret;
            price_out.classList.add("price_out");
            price_out.innerText = String(price);
            datetime_out.classList.add("datetime_out");
            datetime_out.innerText = date.getDay + "." + date.getMonth + "." + date.getFullYear + "." + date.getHours + date.getSeconds;
            delet.classList.add("delet");
            deletButton.classList.add("deletButton");
            deletButton.setAttribute("type", "button");
            deletButton.innerText = "X";
            deletButton.addEventListener("click", removeElement, false);
            toDoElment.appendChild(interpret_out);
            toDoElment.appendChild(price_out);
            toDoElment.appendChild(datetime_out);
            delet.appendChild(deletButton);
            toDoElment.appendChild(delet);
            tbody.appendChild(toDoElment);
            table.appendChild(tbody);
            document.getElementById("toDoOUT").appendChild(table);
        }
        catch (error) {
            alert("Fehler bei der eingabe");
        }
    }
})(Aufgabe4 || (Aufgabe4 = {}));
//# sourceMappingURL=Script.js.map