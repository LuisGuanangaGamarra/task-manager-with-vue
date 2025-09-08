import { defineStore } from 'pinia'
import type { Task, TaskStatus } from '@/domain/entities/Task'
import { usecases } from '@/ioc'
import { subscribe, type TaskEvent } from '@/infrastructure/realtime/broadcast'

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[],
        loading: false,
        filter: 'all' as 'all' | TaskStatus
    }),
    getters: {
        filtered: (s) =>
            s.filter === 'all' ? s.tasks
                : s.tasks
                    .filter(t => t.status === s.filter),
        getAllTask: (state) => state.tasks
    },
    actions: {
        async fetch() {
            this.loading = true
            try {
                this.tasks = await usecases.getTasks.execute()
            } catch {
                this.tasks = []
            }
            finally {
                this.loading = false
            }
        },
        async create(title: string, description?: string) {
            const task = await usecases.createTask.execute({ title, description, status: 'todo', assigneeId: undefined })
            this.tasks.unshift(task)
        },
        async update(id: string, patch: Partial<Task>) {
            const updated = await usecases.updateTask.execute(id, patch)
            const idx = this.tasks.findIndex(t => t.id === id)
            if (idx !== -1)
                this.tasks[idx] = updated
        },
        async remove(id: string) {
            await usecases.deleteTask.execute(id)
            this.tasks = this.tasks.filter(t => t.id !== id)
        },
        setFilter(f: 'all' | TaskStatus) {
            this.filter = f
        },
        listenRealtime() {
            subscribe((ev: TaskEvent) => {
                if (ev.type === 'tasks:created')
                    this.tasks.unshift(ev.payload as Task)
                if (ev.type === 'tasks:updated') {
                    const idx = this.tasks.findIndex(t => t.id === ev.payload.id)
                    if (idx !== -1)
                        this.tasks[idx] = ev.payload as Task
                }
                if (ev.type === 'tasks:removed')
                    this.tasks = this.tasks.filter(t => t.id !== ev.payload.id)
            })
        },
    },
})