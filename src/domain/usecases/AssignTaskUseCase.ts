import type { TaskRepository } from '@/domain/repositories/TaskRepository'


export class AssignTaskUseCase {
    private repo: TaskRepository;
    constructor(repo: TaskRepository) {
        this.repo = repo;
    }

    execute(id: string, assigneeId?: string) {
        return this.repo.update(id, { assigneeId })
    }
}