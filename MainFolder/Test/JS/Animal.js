"use strict";
var Test;
(function (Test) {
    class Animal {
        name;
        food;
        picture;
        constructor(_name, _food, _picture) {
            this.food = _food;
            this.name = _name;
            this.picture = _picture;
        }
        kill() {
            //"Kill"
        }
    }
    Test.Animal = Animal;
})(Test || (Test = {}));
//# sourceMappingURL=Animal.js.map