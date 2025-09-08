import type { AuthRepository } from '@/domain/repositories/AuthRepository'

export class LoginUseCase {
    private repo: AuthRepository;

    constructor(repo: AuthRepository) {
        this.repo = repo;
    }
    execute(email: string, password: string) {
        return this.repo.login(email, password)
    }
}