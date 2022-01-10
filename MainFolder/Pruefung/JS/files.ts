
export interface GefrieGut {
    _id: string,
    name: string,
    spoilDate: Date,
    addDate: Date,
    note: string,
    tag: string // used for pic
}
export enum Tags {
    "chicken" = 0,
    "pig" = 1,
    "beef",
    "veal",// kalb;
    "lamb",
    "venison" //wildbert
}
