/*
export interface GefrieGut {
    _id?: string,
    name: string,
    spoilDate: Date,
    addDate: Date,
    note: string,
    tag: string // used for pic
}

//changet enums to clas
export class Tags {
        tags: string[] = ["Huenchen", "Schwein", "Kuh", "Schaf", "Wildschein"];
        pics: number[] = [128020, 128022, 128004, 128017, 128023];
        getLength(): number {
            return this.tags.length;
        }
        getTag(id: number) {
            return this.tags[id];
        }
        getPic(id: number) {
            return this.pics[id];
        }
    }
}

//From aufgabe8
   export function dateConverter(date: Date): string {
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
*/