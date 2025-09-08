import type { Task } from '@/domain/entities/Task'


export interface TaskRepository {
    list(): Promise<Task[]>
    get(id: string): Promise<Task | null>
    create(input: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>
    update(id: string, patch: Partial<Task>): Promise<Task>
    remove(id: string): Promise<void>
}