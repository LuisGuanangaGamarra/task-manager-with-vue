import type { User } from '@/domain/entities/User'

export interface AuthResponse {
    token: string
    user: User
    expiresAt: number
}

export interface AuthRepository {
    login(email: string, password: string): Promise<AuthResponse>
    logout(): Promise<void>
    me(token: string): Promise<User | null>
}