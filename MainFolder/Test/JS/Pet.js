"use strict";
var Test;
(function (Test) {
    class Pet extends Test.Animal {
        isBestFreand = true;
        constructor(_name, _food, _picture, _isBestFreand) {
            super(_name, _food, _picture);
            this.isBestFreand = _isBestFreand;
        }
    }
    Test.Pet = Pet;
})(Test || (Test = {}));
//# sourceMappingURL=Pet.js.map