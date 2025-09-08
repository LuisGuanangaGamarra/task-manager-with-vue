import type { AuthRepository, AuthResponse } from '@/domain/repositories/AuthRepository'
import type { User } from '@/domain/entities/User'

const LS_TOKEN = 'tm:token'
const LS_USERS = 'tm:users'

const seedUsers: User[] = [
    { id: 'u1', name: 'Admin', email: 'admin@demo.com', role: 'admin', password: '123' },
    { id: 'u2', name: 'Lucía', email: 'user@demo.com', role: 'user' , password: '123' },
]

function ensureSeed() {
    const exists = localStorage.getItem(LS_USERS)
    if (!exists) localStorage.setItem(LS_USERS, JSON.stringify(seedUsers))
}

export class FakeAuthRepositoryImpl implements AuthRepository {
    async login(email: string, password: string): Promise<AuthResponse> {
        ensureSeed()

        const users: User[] = JSON.parse(localStorage.getItem(LS_USERS) || '[]')
        const user = users.find(u => u.email === email && u.password === password)
        if (!user) throw new Error('Credenciales inválidas')


        const token = `fake-jwt-${user.id}-${Date.now()}`
        const expiresAt = Date.now() + 1000 * 60 * 60
        localStorage.setItem(LS_TOKEN, JSON.stringify({ token, user, expiresAt }))
        return { token, user, expiresAt }
    }

    async logout(): Promise<void> { localStorage.removeItem(LS_TOKEN) }

    async me(token: string): Promise<User | null> {
        const raw = localStorage.getItem(LS_TOKEN)
        if (!raw) return null
        const data = JSON.parse(raw)
        if (data.token !== token || Date.now() > data.expiresAt) return null
        return data.user
    }
}