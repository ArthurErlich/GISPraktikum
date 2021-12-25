namespace Aufgabe8 {

    interface TodoElement{
        id:number;
        interpret:string;
        price:number;
        date:Date;
    }

    //load end check if something is in the database

    let todoFrom: HTMLFormElement = <HTMLFormElement>(document.getElementById("toDoForm"));

    todoFrom.addEventListener("submit", onSubmint);
    

    async function onSubmint(event:Event){
        event.preventDefault();
        let formData: FormData = new FormData(<HTMLFormElement>event.currentTarget);

        let id : number  =parseFloat((<HTMLElement>event.currentTarget).dataset.id);

        let interpret : string = formData.get("");
        let price : number = formData.get("");
        let date :Date = formData.get("");
        

        let todoElement :TodoElement = {
            id,
            interpret,
            price,
            date
        };
    }

    //fetsh post and get -> create new if id is empty if not edit current
}
