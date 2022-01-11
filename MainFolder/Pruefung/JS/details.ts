namespace Pruefung {

    interface GefrieGut {
        _id?: string,
        name: string,
        spoilDate: Date,
        addDate: Date,
        note: string,
        tag: string // used for pic
    }

    class Tags {
        tags: string[] =
            ["chicken",
                "pig",
                "beef",
                "veal",
                "lamb",
                "venison"]
        getLength(): number {
            return this.tags.length;
        }

        getTag(id: number) {
            return this.tags[id];
        }
    }


    const url: string = "http://localhost:3500"
    const pfadEdit: string = "/edit";

    //NICE
    let searchURI: URLSearchParams = new URLSearchParams(window.location.search);
    console.log(searchURI.get("id"));

    loadIndex();
    async function loadIndex() {
        let itmes: GefrieGut[] = await getItems(searchURI);

        itmes.forEach(element => {
            createItem(element);
        });
    }

    function createItem(gefrieGut: GefrieGut) {
        const flexBox: HTMLElement = document.getElementById("itemDetails");
        //server anfragen und liste der Items holen
        flexBox.appendChild(createBox(gefrieGut)); //GefrieGut interface übergeben
    }

    function createBox(gefrieGut: GefrieGut): HTMLElement {
        const itemBox: HTMLElement = document.createElement("div");
        let atributes: HTMLElement[] = createItemAtributes(gefrieGut);
        itemBox.className = "item flexChild";
        itemBox.dataset.id = gefrieGut._id;

        atributes.forEach(element => {
            itemBox.appendChild(element);
        });

        return itemBox;
    }


    function createItemAtributes(gefrieGut: GefrieGut): HTMLElement[] {
        let item_atirbutes: HTMLElement[] = new Array(4);

        for (let i: number = 0; i < item_atirbutes.length; i++) {
            item_atirbutes[i] = document.createElement("div");
        }

        item_atirbutes[0].className = "item_pic";
        item_atirbutes[1].className = "item_name";
        item_atirbutes[1].className = "item_addlDate";
        item_atirbutes[2].className = "item_spoilDate";
        item_atirbutes[3].className = "item_editRemouve";

        item_atirbutes[0].textContent = gefrieGut.tag;
        item_atirbutes[1].textContent = gefrieGut.name;
        item_atirbutes[1].textContent = dateConverter(new Date());
        item_atirbutes[2].textContent = dateConverter(new Date());

        let editRemove: HTMLElement[] = createEditRemove();
        editRemove.forEach(element => {
            item_atirbutes[3].appendChild(element);
        });


        return item_atirbutes;
    }
    function createEditRemove(): HTMLElement[] {
        let editFunction: HTMLElement[] = new Array(2);

        editFunction[0] = creatLinkRemove();

        editFunction[1] = document.createElement("button");

        return;
    }

    function creatLinkRemove(_id: string): HTMLElement {
        const link: HTMLElement = document.createElement("a");
        const removeButton: HTMLElement = document.createElement("button");
        removeButton.textContent = "REMOVE";

        link.className = "itemLink";
        link.setAttribute("href", "../HTML/additem.html?id=" + _id);
        link.id = "item_edit";
        link.appendChild(removeButton);
        return link;
    }
    //From aufgabe8
    function dateConverter(date: Date): string {
        //W3Scool Array https://www.w3schools.com/jsref/jsref_getmonth.asp
        const month = ["01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12"];
        return date.getUTCDate() + "." + month[date.getMonth()] + "." + date.getFullYear();
    }

    async function getItems(search: URLSearchParams): Promise<GefrieGut[]> {
        let items: GefrieGut[];
        console.log("connecting to HTTP server");

        try {
            let response: Response = await fetch(url + pfadEdit + "?" + search + "=", {
                method: "get"
            });
            let text = await response.text()
            items = JSON.parse(text);
            console.log(items);
            return items;

        } catch (error) {
            console.error("server is Offline");
            console.log(error);
            throw new Error(error);
        }

    }
}