namespace Aufgabe8 {

    interface TodoElement {
        id: number;
        interpret: string;
        price: number;
        date: Date;
    }

    const pfad: string = "/concertEvents";
    const url: string ="http://localhost:3500"

    //load end check if something is in the database

    let todoFrom: HTMLFormElement = <HTMLFormElement>(document.getElementById("eventsFrom"));
    todoFrom.addEventListener("submit", onSubmint);


    async function onSubmint(buttonEvent: Event) {
        buttonEvent.preventDefault();

        let id: number;
        let formData: FormData = new FormData(<HTMLFormElement>buttonEvent.currentTarget);

        console.log(buttonEvent.currentTarget);

        let interpret: string = <string>formData.get("interpret_input");
        let price: number = parseInt(<string>(formData.get("price_input")));
        let date: Date = new Date(<string>formData.get("datetime_local_input"));

        // id = parseFloat((<HTMLElement>buttonEvent.currentTarget).dataset.id);
        id = creatID(); //chekc wiht databes if id is used?

        let event: TodoElement = {
            id,
            interpret,
            price,
            date
        };

        createElement(event);
        

    }

    function creatID(): number {
        let id: number = Math.floor((Math.random() * 100)); //-> chek if id is there        
        return id;
    }

    function checkInput(formData: FormData, id: number): TodoElement {
        //chekcs if the input value is empty 
        return null;
    }
    //fetsh post and get -> create new if id is empty if not edit current

    async function postForm(event: TodoElement) {
        await fetch(url+pfad, {
            method: "post",
            body: JSON.stringify(event),
        });
    }

    async function getForm(): Promise<TodoElement[]> {
        let event: TodoElement[];
        let response :Response;
        response = await fetch(url+pfad, {
            method: "get",
        });

        return event;
    }

    function createElement(event: TodoElement){
        let tableWrapper: HTMLElement = document.getElementById("toDoOUT");
        console.log("found tableWrapper"+tableWrapper);

        let table: HTMLElement = document.createElement("table");
        let tbody:HTMLElement = document.createElement("tbody");

        let row :HTMLTableRowElement = addRow();
        let cell :HTMLTableCellElement[] = addCell(event);

        table.dataset.id = event.id +"";

        cell.forEach(element => {
            row.appendChild(element);
        });
       
        tbody.append(row);
        table.append(tbody);
        tableWrapper.append(table);
        
        console.log("insertert row" + row);
        console.log("insertet cell" + cell);

    }

    function addRow(): HTMLTableRowElement{
        let row :HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
        row.className = "toDoElement";
        return row;
    }

    function addCell(event: TodoElement) :HTMLTableCellElement[]{
        let cell: HTMLTableCellElement[] = new Array<HTMLTableCellElement>(5);
        


        for(let i:number =0; i<5; i++){
            cell[i] =  <HTMLTableCellElement>document.createElement("td");
        }
        cell[0].className = "id_out";
        cell[1].className = "interpret_out";
        cell[2].className = "price_out";
        cell[3].className = "datetime_out";
        cell[4].className = "delet";

        cell[0].textContent =  event.id + "";
        cell[1].textContent =  event.interpret + "";
        cell[2].textContent =  event.price + "";
        cell[3].textContent =  dateConverter(event.date);
        cell[4].append(addDeletButton(event.id))
        
        return cell;
    }

    function addDeletButton(id:number): HTMLElement{
        let delet: HTMLElement = document.createElement("button");
        delet.dataset.id = id + "";
        delet.textContent = "X";
        delet.className = "deletButton";
        delet.setAttribute("type", "button");
        delet.addEventListener("click",function deletElement() {console.log("DeletTableEvent: ["+id+"]");
        })
        return delet;
    }

    function dateConverter(date:Date): string{
        return date.getDay() + "." + date.getMonth() +"."+ date.getFullYear() + " " + date.getHours()+ ":" + date.getMinutes();
    }
}
