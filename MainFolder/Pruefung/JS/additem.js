"use strict";
var Pruefung;
(function (Pruefung) {
    let tags;
    (function (tags) {
        tags[tags["chicken"] = 0] = "chicken";
        tags[tags["pig"] = 1] = "pig";
        tags[tags["beef"] = 2] = "beef";
        tags[tags["veal"] = 3] = "veal";
        tags[tags["lamb"] = 4] = "lamb";
        tags[tags["venison"] = 5] = "venison"; //wildbert
    })(tags || (tags = {}));
    const form = document.getElementById("inputForm");
    let idList = new Set();
    //copy from Aufgabe8
    function creatID() {
        let _id; //-> chek if _id is there   
        _id = Math.floor((Math.random() * 1000));
        while (idList.has(_id)) {
            _id = Math.floor((Math.random() * 1000));
        }
        return _id;
    }
})(Pruefung || (Pruefung = {}));
//# sourceMappingURL=additem.js.map