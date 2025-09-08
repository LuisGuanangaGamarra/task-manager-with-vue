import type { TaskRepository } from '@/domain/repositories/TaskRepository'

export class DeleteTaskUseCase {
    private repo: TaskRepository;
    constructor(repo: TaskRepository) {
        this.repo = repo;
    }
    execute(id: string) {
        return this.repo.remove(id)
    }
}