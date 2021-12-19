namespace Test {

    export class Animal {
        name: string;
        food: string;
        picture: string;

        constructor(_name: string, _food: string, _picture: string) {
            this.food = _food;
            this.name = _name;
            this.picture = _picture;
        }

        public kill(): void {
            //"Kill"
        }
    }

}


