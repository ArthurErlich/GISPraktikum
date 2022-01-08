"use strict";
var Pruefung;
(function (Pruefung) {
    insertNavbar();
    inserFooter();
    //crates multiple used tags
    function insertNavbar() {
        const navbar = document.getElementById("navbar");
        const pageName = document.getElementById("pageName").dataset.pagename;
        switch (pageName) {
            case "mainPage":
                navbar.textContent = "Hauptseite";
                break;
            case "details":
                navbar.textContent = "Details";
                break;
            default:
                navbar.textContent = "404 - Pagename not found";
                break;
        }
    }
    function inserFooter() {
        const footer = document.getElementById("footer");
        const a = document.createElement("a");
        const author = document.createElement("div");
        a.id = "backLink";
        a.setAttribute("href", "/MainFolder/MainStartPage.html");
        a.textContent = "AufgabenPage";
        author.id = "author";
        author.textContent = "made by: Arthur Erlich";
        footer.appendChild(a);
        footer.appendChild(author);
    }
})(Pruefung || (Pruefung = {}));
//# sourceMappingURL=scirpt.js.map