namespace Test {
    export class Pet extends Animal {
        isBestFreand: boolean = true;

        constructor(_name: string, _food: string, _picture: string, _isBestFreand: boolean) {
            super(_name, _food, _picture);
            this.isBestFreand = _isBestFreand;
        }
    }
   
}


