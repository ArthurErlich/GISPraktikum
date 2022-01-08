"use strict";
var Pruefung;
(function (Pruefung) {
    inserFooter();
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