namespace Pruefung {
    interface GefrieGut {
        _id: string,
        name: string,
        spoilDate: Date,
        addDate: Date,
        note: string,
        tag: string // used for pic
    }
    enum tags {
        "chicken",
        "pig",
        "beef",
        "veal",// kalb;
        "lamb",
        "venison" //wildbert
    }

    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("inputForm");

    let idList = new Set();

    //copy from Aufgabe8
    function creatID(): number {
        let _id: number; //-> chek if _id is there   
        _id = Math.floor((Math.random() * 1000));

        while (idList.has(_id)) {
            _id = Math.floor((Math.random() * 1000));
        }
        return _id;
    }
}  