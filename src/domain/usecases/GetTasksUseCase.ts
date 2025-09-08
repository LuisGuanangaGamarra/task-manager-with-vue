import type { TaskRepository } from '@/domain/repositories/TaskRepository'


export class GetTasksUseCase {
    private repo: TaskRepository;

    constructor(repo: TaskRepository) {
        this.repo = repo;
    }

    execute() { return this.repo.list() }
}