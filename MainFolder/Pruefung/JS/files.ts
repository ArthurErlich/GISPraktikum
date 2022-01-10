
export interface GefrieGut {
    _id: string,
    name: string,
    spoilDate: Date,
    addDate: Date,
    note: string,
    tag: string // used for pic
}
export enum Tags {
    "chicken",
    "pig",
    "beef",
    "veal",// kalb;
    "lamb",
    "venison" //wildbert
}
