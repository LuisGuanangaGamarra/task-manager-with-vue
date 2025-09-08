<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3 flex-col">
      <TaskForm @create="createTask" />
      <div v-if="!hasTask" class="flex w-100 flex-row items-center gap-3">
        <span class="text-sm text-gray-500">Filtrar por:</span>
        <select class="input max-w-[200px]" v-model="filter">
          <option value="all">Todas</option>
          <option value="todo">Por hacer</option>
          <option value="in_progress">En progreso</option>
          <option value="done">Hechas</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="card">Cargando tareas...</div>

    <div v-else class="grid gap-3 md:grid-cols-2">
      <TaskItem
          v-for="t in tasks"
          :key="t.id"
          :task="t"
          @update-status="onUpdateStatus"
          @remove="onRemove"
      />
    </div>

    <p v-if="hasTask" class="text-sm text-gray-500">
      No hay tareas todavía. ¡Crea la primera! 🎉
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import TaskForm from '@/presentation/components/TaskForm.vue'
import TaskItem from '@/presentation/components/TaskItem.vue'
import { useTaskStore } from '@/presentation/stores/task.store'
import type { TaskStatus } from "@/domain/entities/Task.ts";
import { storeToRefs } from "pinia"

const store = useTaskStore()

onMounted(() => {
  store.fetch()
  store.listenRealtime()
})

const { getAllTask, filtered: tasks, loading } = storeToRefs(store)

const filter = computed({
  get: () => store.filter,
  set: (v) => store.setFilter(v as 'all' | TaskStatus)
})

const hasTask = computed(() => !loading.value && getAllTask.value.length === 0)

const createTask = async (title: string, description?: string) => {
  await store.create(title, description)
}

const onUpdateStatus = async (id: string, status: TaskStatus) => {
  await store.update(id, { status })
}

const onRemove = async (id: string) => {
  await store.remove(id)
}
</script>
