namespace Test {

    export class Dog extends Pet {

        specialSound: string = "WOOF";

        constructor(_name: string, _food: string, _picture: string, _isBestFreand: boolean, _specialSound: string) {
            super(_name, _food, _picture, _isBestFreand);
            this.specialSound = _specialSound;
        }
    }
}


