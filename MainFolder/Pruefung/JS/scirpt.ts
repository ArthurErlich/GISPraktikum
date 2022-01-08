namespace Pruefung {

    interface gefrieGut {
        _id: string,
        name: string,
        spoilDate: Date,
        addDate: Date,
        note: string,
    }
    inserFooter();


    //crates footer for all Pages
    function inserFooter() {
        const footer: HTMLElement = document.getElementById("footer");
        const a: HTMLElement = document.createElement("a");
        const author: HTMLElement = document.createElement("div");

        a.id = "backLink";
        a.setAttribute("href", "/MainFolder/MainStartPage.html");
        a.textContent = "AufgabenPage";

        author.id = "author";
        author.textContent = "made by: Arthur Erlich";

        footer.appendChild(a);
        footer.appendChild(author);
    }

}