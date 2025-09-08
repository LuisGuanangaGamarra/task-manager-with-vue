import type { AuthRepository } from '@/domain/repositories/AuthRepository'

export class LogoutUseCase {
    private repo: AuthRepository;

    constructor(repo: AuthRepository) {
        this.repo = repo;
    }

    execute() { return this.repo.logout() }
}