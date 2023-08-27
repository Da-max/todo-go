export enum ErrorTypes {
    FILL = 'FILL',
    VALUE = 'VALUE',
    NETWORK = 'NETWORK',
    OTHER = 'OTHER',
}

export enum AlertTypes {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    DANGER = 'DANGER',
}

export type MessageTypes = AlertTypes | ErrorTypes

export type AlertTypeStrings = keyof typeof AlertTypes
export type ErrorTypeStrings = keyof typeof ErrorTypes

export interface IMessage {
    id: string
    text: string
    type: MessageTypes
}

export interface IError extends IMessage {
    type: ErrorTypes
}

export interface IAlert extends IMessage {
    type: AlertTypes
}

export const MESSAGE_STORE_NAME = 'message' as const

export type messageStoreState = {
    messages: IMessage[]
}

export type messageStoreActions = {
    add: (text: string, type: AlertTypes | ErrorTypes) => void
    remove: (id: string) => boolean
}

export enum Position {
    TOP,
    BOTTOM,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
}

export function isError(message: IMessage): message is IError {
    return message.type === ErrorTypes.FILL || message.type === ErrorTypes.VALUE
}
