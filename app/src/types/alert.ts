export enum AlertStatus {
    Warning
}

export interface IAlert {
    id: string
    title: string
    content?: string
    status: AlertStatus
}

export type Alerts = IAlert[]
