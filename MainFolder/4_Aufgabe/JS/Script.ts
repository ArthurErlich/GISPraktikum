namespace Aufgabe4 {

    class ToDoElement {
        interpret: string;
        price: number;
        date: Date;

        constructor(interpret: string, price: number, date: Date) {
            this.interpret = interpret;
            this.price = price;
            this.date = date;
        }

    }

    class ToDoElements {
        elements: ToDoElement[] = [];
        addElement(element: ToDoElement, index: number) {
            console.log(this.elements);
            this.elements[index] = element;
        }
        readElement(index: number): ToDoElement {
            return this.elements[index];
        }
    }

    //create html element --> creat a buldung stone (gif it an id // or save it on a array/list?) --Using timeAndDate for data-ToDoID
    //then apand it 
    //by clicking a button removing the appendet element --> by getting the : article.dataset.NAME --> data-NAME addEventListener use bubling
    //dont user innerhtml!!!
    let addButton: HTMLElement = document.getElementById("Button-Add");
    let elementID: number = 0;
    addButton.addEventListener("click", addElement);
    let toDoElements = new ToDoElements();

    function removeElement(event: Event) {
        let eventID: string = (<HTMLElement>event.target).dataset.elementid;
        let dataEvent: string = '[data-todu-elementid]';
        let toDoElement = document.querySelectorAll(dataEvent);


        //iterates thorug all elements end check to what needs to be removed
        toDoElement.forEach(element => {
            if (element.getAttribute("data-todu-elementid") == eventID) {
                console.log(element + " with Tag: data-todu-elementid= " + eventID + " will be removed");
                element.remove()

                toDoElements.readElement(parseInt(eventID)) == null;
            }
        });
    }


    function addElement() {

        try {
            readForm();
        } catch (error) {
            alert(error);
            return;
        }
        createElement();
        fillFrom();
        elementID++;


    }
    function fillFrom() {
        //get elemnt byID in this TAG
        let toDoElement: HTMLElement = document.getElementById(elementID.toString());

        let interpret_out = toDoElement.getElementsByClassName("interpret_out");
        let price_out = toDoElement.getElementsByClassName("price_out");
        let datetime_out = toDoElement.getElementsByClassName("datetime_out");

        console.log(interpret_out.item(0));

        //Not a god way -> is ther a nother way?
        interpret_out.item(0).textContent = toDoElements.readElement(elementID).interpret;
        price_out.item(0).textContent = (toDoElements.readElement(elementID).price).toString();
        datetime_out.item(0).textContent = (toDoElements.readElement(elementID).date).toTimeString();


    }

    function readForm() {

        let interpret: string = null;
        let price: number = null;
        let date: Date = null;

        try {
            interpret = (<HTMLInputElement>document.getElementById("interpret_input")).value;
            if (interpret === "") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Interpret is empty!");
        }

        try {
            price = parseInt((<HTMLInputElement>document.getElementById("price_input")).value);
            if (price.toString() === "NaN") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Price is empty!");
        }

        try {
            date = new Date((<HTMLInputElement>document.getElementById("datetime_local_input")).value);
            if (date.toString() === "Invalid Date") {
                date = new Date();
            }
        } catch (error) {
            throw new Error("Date is empty!");
        }


        console.log(interpret);
        console.log(price);
        console.log(date);

        let toDoElement: ToDoElement = new ToDoElement(interpret, price, date);
        toDoElements.addElement(toDoElement, elementID);

        console.log("Add to list " + toDoElements.readElement(elementID));

    }
    function createElement() {
        let table: HTMLElement = document.createElement("table");
        let tbody: HTMLElement = document.createElement("tbody");
        let toDoElement: HTMLElement = document.createElement("tr");
        let interpret_out: HTMLElement = document.createElement("td");
        let price_out: HTMLElement = document.createElement("td");
        let datetime_out: HTMLElement = document.createElement("td");
        let delet: HTMLElement = document.createElement("td");
        let deletButton: HTMLElement = document.createElement("button");

        toDoElement.classList.add("toDoElement");
        interpret_out.classList.add("interpret_out");
        price_out.classList.add("price_out");
        datetime_out.classList.add("datetime_out");
        delet.classList.add("delet");
        deletButton.classList.add("deletButton");
        deletButton.innerText = "X";
        deletButton.setAttribute("type", "button");
        deletButton.addEventListener("click", removeElement, false)

        toDoElement.appendChild(interpret_out);
        toDoElement.appendChild(price_out);
        toDoElement.appendChild(datetime_out);

        delet.appendChild(deletButton);
        toDoElement.appendChild(delet);

        tbody.appendChild(toDoElement);
        table.appendChild(tbody);

        let toDoOUT = document.getElementById("toDoOUT").appendChild(table);
        console.log("createt ToDo elemtn wit the ID: " + elementID);

        toDoOUT.setAttribute("data-todu-elementid", elementID + "");
        deletButton.setAttribute("data-elementid", elementID + "");
        toDoOUT.id = elementID.toString();

    }


}