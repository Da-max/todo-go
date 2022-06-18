import { defineStore } from 'pinia'
import { Alerts, AlertStatus } from '../types/alert'

const useStore = defineStore('main', {
    state: (): {loading: boolean, alerts: Alerts} => ({
        loading: false,
        alerts: []
    }),
    actions: {
        addAlert (title: string, status: AlertStatus, content?: string) {
            this.alerts.push({
                id: new Date().toString(),
                title,
                content,
                status
            })
        }
    }
})

export default useStore
