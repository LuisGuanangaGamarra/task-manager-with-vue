import { defineStore } from 'pinia'
import type { User } from '@/domain/entities/User'
import { usecases } from '@/ioc'

interface AuthState {
    token: string | null
    user: User | null
    expiresAt: number | null
}

const LS = 'tm:auth'

const persist = (state: AuthState): void => {
    localStorage.setItem(LS, JSON.stringify(state))
}

const hydrate = (): AuthState => {
    const defaultValues: AuthState = { token: null, user: null, expiresAt: null }
    try {
        const raw = localStorage.getItem(LS)
        if (!raw) {
           return defaultValues
        }

        return JSON.parse(raw)
    }
    catch {
        return defaultValues
    }
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => hydrate(),
    getters: {
        isAuthenticated: (s) => !!s.token && !!s.user && (!!s.expiresAt && Date.now() < s.expiresAt),
    },
    actions: {
        async login(email: string, password: string) {
            const { token, user, expiresAt } = await usecases.login.execute(email, password)
            this.token = token
            this.user = user
            this.expiresAt = expiresAt
            persist(this.$state)
        },
        logout() {
            usecases.logout.execute()
            this.token = null
            this.user = null
            this.expiresAt = null
            persist(this.$state)
        },
    },
})