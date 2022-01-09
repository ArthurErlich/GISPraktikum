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
                navbar.appendChild(navButton("Hauptseite", true));
                break;
            case "details":
                navbar.appendChild(navButton("Hauptseite", false));
                navbar.appendChild(navButton("Details", true));
                break;
            case "additem":
                navbar.appendChild(navButton("Hauptseite", false));
                navbar.appendChild(navButton("Gefriegut", true));
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

    function navButton(name: string, isActive: boolean): HTMLElement {
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
            navLink.setAttribute("href", "../HTML/index.html");
        }
        navElement.appendChild(navLink);
        return navElement;
    }

}