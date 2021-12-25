"use strict";
var Aufgabe8;
(function (Aufgabe8) {
    //load end check if something is in the database
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
        // id = parseFloat((<HTMLElement>buttonEvent.currentTarget).dataset.id);
        id = creatID();
        let event = {
            id,
            interpret,
            price,
            date
        };
        console.log(event);
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
        await fetch("", {
            method: "post",
            body: JSON.stringify(event),
        });
    }
    async function getForm() {
        return null;
    }
})(Aufgabe8 || (Aufgabe8 = {}));
//# sourceMappingURL=Script.js.map