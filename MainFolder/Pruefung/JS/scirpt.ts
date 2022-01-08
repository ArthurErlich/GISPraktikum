namespace Pruefung {
    interface GefrieGut {
        _id: string,
        name: string,
        spoilDate: Date,
        addDate: Date,
        note: string,
        tag: string// used for pic
    }

    insertNavbar();
    inserFooter();

    //crates multiple used tags
    function insertNavbar() {
        const navbar: HTMLElement = document.getElementById("navbar");
        const pageName = document.getElementById("pageName").dataset.pagename;
        switch (pageName) {
            case "mainPage":
                navbar.textContent = "Hauptseite";
                break;
            case "details":
                navbar.textContent = "Details";
                break;
            default:
                navbar.textContent = "404 - Pagename not found"
                break;
        }
    }

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