namespace Aufgabe4 {

    //create html element --> creat a buldung stone (gif it an id // or save it on a array/list?) --Using timeAndDate for data-ToDoID
    //then apand it 
    //by clicking a button removing the appendet element --> by getting the : article.dataset.NAME --> data-NAME addEventListener use bubling
    //dont user innerhtml!!!
    let addButton: HTMLElement = document.getElementById("Button-Add");

    //als Interface anlegen
    let interpret: string;
    let price: number;
    let date: Date;

    addButton.addEventListener("click", addElement);



    // muss anderst gelöst werden

    function removeElement(event: Event) {
        let target = <HTMLElement>event.currentTarget;
        target.parentElement.parentElement.parentElement.parentElement.remove();

    }


    function addElement() {
        try {

            //Gibt es eine Möglichkeit dies als funktion zu erstellen(Kliener zu machen)
            interpret = (<HTMLInputElement>document.getElementById("interpret_input")).value;
            price = parseInt((<HTMLInputElement>document.getElementById("price_input")).value);
            date = new Date((<HTMLInputElement>document.getElementById("datetime-local_input")).value);


            let table: HTMLElement = document.createElement("table");
            let tbody: HTMLElement = document.createElement("tbody");
            let toDoElment: HTMLElement = document.createElement("tr");
            let interpret_out: HTMLElement = document.createElement("td");
            let price_out: HTMLElement = document.createElement("td");
            let datetime_out: HTMLElement = document.createElement("td");
            let delet: HTMLElement = document.createElement("td");
            let deletButton: HTMLElement = document.createElement("button");

            toDoElment.classList.add("toDoElement");

            interpret_out.classList.add("tnterpret_out");
            interpret_out.innerText = interpret;

            price_out.classList.add("price_out");
            price_out.innerText = String(price);

            datetime_out.classList.add("datetime_out");
            datetime_out.innerText = date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + "." + date.getHours() + date.getSeconds();
            delet.classList.add("delet");

            deletButton.classList.add("deletButton");
            deletButton.setAttribute("type", "button");
            deletButton.innerText = "X";
            deletButton.addEventListener("click", removeElement, false)

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

}