namespace Pruefung {
    interface GefrieGut {
        _id: string,
        name: string,
        spoilDate: Date,
        addDate: Date,
        note: string,
        tag: string// used for pic
    }
    createItem();

    function createItem() {
        let items: HTMLElement = document.getElementById("items");
        //server anfragen und liste der Items holen
        items.appendChild(createBox("test"));//GefrieGut interface übergeben

    }
    function createBox(_id: string): HTMLElement {
        const itemBox: HTMLElement = document.createElement("div");
        itemBox.className = "item flexChild";
        itemBox.dataset.id = _id;
        itemBox.appendChild(creatLink(_id));
        return itemBox;
    }

    function createItemAtributes(): HTMLElement[] {
        let item_atirbutes: HTMLElement[] = new Array(3);

        for (let i: number = 0; i < item_atirbutes.length; i++) {
            item_atirbutes[i] = document.createElement("div");
        }
        item_atirbutes[0].className = "item_pic";
        item_atirbutes[1].className = "item_name";
        item_atirbutes[2].className = "item_spoilDate";

        item_atirbutes[0].textContent = "item_pic";
        item_atirbutes[1].textContent = "item_name";
        item_atirbutes[2].textContent = "item_spoilDate";

        return item_atirbutes;
    }

    function creatLink(_id: string): HTMLElement {
        const link: HTMLElement = document.createElement("a");
        link.className = "itme_link";
        link.setAttribute("href", "../HTML/details.html?id=" + _id)

        let itmeInner: HTMLElement[] = createItemAtributes();
        itmeInner.forEach(element => {
            link.appendChild(element);
        });
        return link;
    }
}