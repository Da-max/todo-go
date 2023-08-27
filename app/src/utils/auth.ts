import { RemovableRef, useLocalStorage } from '@vueuse/core'
import { definePlugin } from 'villus'

class Auth {
    private _token: RemovableRef<string | null>
    constructor(token: string | null = '') {
        this._token = useLocalStorage('token', token)
    }

    public get token(): string | null {
        return this._token.value
    }

    public set token(v: string | null) {
        if (v) {
            this._token.value = v
        } else {
            this._token.value = null
        }
    }

    public villusPlugin = definePlugin(({ opContext }) => {
        opContext.headers.Authorization = `BEARER ${this._token.value}`
    })
}

export default new Auth()
