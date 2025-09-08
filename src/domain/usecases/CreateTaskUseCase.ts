import type { Task } from '@/domain/entities/Task'
import type { TaskRepository } from '@/domain/repositories/TaskRepository'


export class CreateTaskUseCase {
    private repo: TaskRepository;
    constructor(repo: TaskRepository) {
        this.repo = repo;
    }

    execute(input: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
        return this.repo.create(input)
    }
}