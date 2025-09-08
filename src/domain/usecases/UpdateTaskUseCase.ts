import type { TaskRepository } from '@/domain/repositories/TaskRepository'
import type { Task } from "@/domain/entities/Task.ts";


export class UpdateTaskUseCase {
    private repo: TaskRepository;

    constructor(repo: TaskRepository) {
        this.repo = repo;
    }

    execute(id: string, patch: Partial<Task>) { return this.repo.update(id, patch) }
}