namespace Aufgabe8 {

    interface TodoElement{
        id:number;
        interpret:string;
        price:number;
        date:Date;
    }

    //load end check if something is in the database

    let todoFrom: HTMLFormElement = <HTMLFormElement>(document.getElementById("eventsFrom"));

    todoFrom.addEventListener("submit", onSubmint);
    

    async function onSubmint(buttonEvent:Event){
        buttonEvent.preventDefault();
        let id:number;
        let formData: FormData = new FormData(<HTMLFormElement>buttonEvent.currentTarget);
        console.log(buttonEvent.currentTarget);
        
        let interpret : string = <string>formData.get("interpret_input");
        let price : number = parseInt(<string>(formData.get("price_input")));
        let date :Date = new Date(<string>formData.get("datetime_local_input"));

       // id = parseFloat((<HTMLElement>buttonEvent.currentTarget).dataset.id);
        id = creatID();

          let event :TodoElement = {
            id,
            interpret,
            price,
            date
        };
        console.log(event);
        
    }

    function creatID():number{
        let id:number =  Math.floor((Math.random()*100)); //-> chek if id is there        
        return id;
    }
    function checkInput(formData: FormData,id:number):TodoElement{

        return null;
    }
    //fetsh post and get -> create new if id is empty if not edit current

    async function postForm(event:TodoElement) {
        await fetch("",{
            method: "post",
            body: JSON.stringify(event),
        });
    }
    async function getForm(): Promise<TodoElement> {

        return null;
    }
}
