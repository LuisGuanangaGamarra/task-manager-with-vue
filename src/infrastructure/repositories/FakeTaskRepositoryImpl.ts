import type { TaskRepository } from '@/domain/repositories/TaskRepository'
import type { Task } from '@/domain/entities/Task'
import { publish } from '@/infrastructure/realtime/broadcast'

const LS_TASKS:string = 'tm:tasks'

const nowISO = ():string => new Date().toISOString()
const uuid= ():string => crypto.randomUUID ?
    crypto.randomUUID() : String(Date.now())

const ensureSeed = (): void => {
    const exists = localStorage.getItem(LS_TASKS)
    if (!exists) {
        const seed: Task[] = [
            { id: 't1', title: 'Configurar CI', status: 'todo', createdAt: nowISO(), updatedAt: nowISO(), description: 'GitHub Actions' },
            { id: 't2', title: 'Diseñar esquema', status: 'in_progress', createdAt: nowISO(), updatedAt: nowISO() },
            { id: 't3', title: 'Deploy inicial', status: 'done', createdAt: nowISO(), updatedAt: nowISO() },
        ]
        localStorage.setItem(LS_TASKS, JSON.stringify(seed))
    }
}


const read = (): Task[] => {
    ensureSeed()
    return JSON.parse(localStorage.getItem(LS_TASKS) || '[]')
}

const write = (tasks: Task[]):void => {
    localStorage.setItem(LS_TASKS, JSON.stringify(tasks))
}


export class FakeTaskRepositoryImpl implements TaskRepository {
    async list(): Promise<Task[]> {
        return read()
    }

    async get(id: string): Promise<Task | null> {
        return read().find(t => t.id === id) || null
    }

    async create(input: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        const task: Task = {
            ...input,
            id: uuid(),
            createdAt: nowISO(),
            updatedAt: nowISO()
        }

        const tasks = read();
        tasks.unshift(task);
        write(tasks)
        publish({ type: 'tasks:created', payload: task })
        return task
    }

    async update(id: string, patch: Partial<Task>): Promise<Task> {
        const tasks = read()
        const idx = tasks.findIndex(t => t.id === id)

        if (idx === -1)
            throw new Error('Task no encontrada')

        const updated = { ...tasks[idx], ...patch, updatedAt: nowISO() }
        tasks[idx] = updated;

        write(tasks)
        publish({ type: 'tasks:updated', payload: updated })
        return updated
    }
    async remove(id: string): Promise<void> {
        const tasks = read().filter(t => t.id !== id)
        write(tasks)
        publish({ type: 'tasks:removed', payload: { id } })
    }
}