import type { Task } from "@/domain/entities/Task.ts";

const channelName = 'tasks-channel'
const channel =
    typeof window !== 'undefined' ? new BroadcastChannel(channelName) : null

export type TaskEvent = {
    type: 'tasks:created' | 'tasks:updated' | 'tasks:removed'
    payload: Task | { id: string }
}

export function publish(event: TaskEvent) {
    channel?.postMessage(event)
}

export function subscribe(cb: (ev: TaskEvent) => void) {
    channel?.addEventListener('message', (e) => cb(e.data as TaskEvent))
}