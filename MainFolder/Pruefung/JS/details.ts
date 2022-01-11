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
        tags: string[] = ["chicken",
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
    const pfadTag: string = "/tag"

    //NICE
    let searchURI: URLSearchParams = new URLSearchParams(window.location.search);
    console.log(searchURI.get("tag"));

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
        let itmeInner: HTMLElement[] = createItemAtributes(gefrieGut);

        itemBox.className = "item flexChild";
        itemBox.dataset.id = gefrieGut._id;

        itmeInner.forEach(element => {
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

        item_atirbutes[0].textContent = gefrieGut.tag;
        item_atirbutes[1].textContent = gefrieGut.name;
        item_atirbutes[1].textContent = dateConverter(new Date());
        item_atirbutes[2].textContent = dateConverter(new Date());

        return item_atirbutes;
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
            let response: Response = await fetch(url + pfadTag + "?" + search + "=", {
                method: "get"
            });
            let text = await response.text()
            items = JSON.parse(text);
            console.log(items);
            return items;

        } catch (error) {
            console.error("server is Offline");
            console.log(error);
            return null;
        }

    }
}