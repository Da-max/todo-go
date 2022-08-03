export enum ErrorTypes {
    FILL,
    VALUE,
}

export type Error = {
    type: ErrorTypes
    text: string
}
