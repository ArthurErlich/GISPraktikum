namespace Pruefung {
    insertNavbar();
    inserFooter();

    //crates multiple used tags
    function insertNavbar() {
        const navbar: HTMLElement = document.getElementById("navbar");
        const pageName = document.getElementById("pageName").dataset.pagename;
        switch (pageName) {
            case "mainPage":
                navbar.appendChild(navButton("Hauptseite", "index.html", true));
                navbar.appendChild(navButton("Gefriegut hinzufügen", "additem.html", false));
                break;
            case "details":
                navbar.appendChild(navButton("Hauptseite", "index.html", false));
                navbar.appendChild(navButton("Gefriegut hinzufügen", "additem.html", false));
                navbar.appendChild(navButton("Details", "details.html", true));
                break;
            case "additem":
                navbar.appendChild(navButton("Hauptseite", "index.html", false));
                navbar.appendChild(navButton("Gefriegut hinzufügen", "additem.html", true));
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
        a.setAttribute("href", "../../MainStartPage.html");
        a.textContent = "AufgabenPage";
        author.id = "author";
        author.textContent = "made by: Arthur Erlich";

        footer.appendChild(a);
        footer.appendChild(author);
    }

    function navButton(name: string, linkPath: string, isActive: boolean): HTMLElement {
        const navElement: HTMLElement = document.createElement("div");
        const navLink: HTMLElement = document.createElement("a");

        navLink.textContent = name;
        if (isActive) {
            navElement.className = "navbarButton active";
            navLink.className = "navLink active";
            navLink.setAttribute("href", "#");
        } else {
            navElement.className = "navbarButton";
            navLink.className = "navLink";
            navLink.setAttribute("href", "../HTML/" + linkPath);
        }
        navElement.appendChild(navLink);
        return navElement;
    }
}
