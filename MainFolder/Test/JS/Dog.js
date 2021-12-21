"use strict";
var Test;
(function (Test) {
    class Dog extends Test.Pet {
        specialSound = "WOOF";
        constructor(_name, _food, _picture, _isBestFreand, _specialSound) {
            super(_name, _food, _picture, _isBestFreand);
            this.specialSound = _specialSound;
        }
    }
    Test.Dog = Dog;
})(Test || (Test = {}));
//# sourceMappingURL=Dog.js.map