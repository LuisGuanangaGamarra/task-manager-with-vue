<template>
  <div class="card flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h3 class="font-semibold">{{ task.title }}</h3>
      <div class="text-xs text-gray-500">{{ new Date(task.updatedAt).toLocaleString() }}</div>
    </div>

    <p v-if="task.description" class="text-sm text-gray-600 dark:text-gray-300">{{ task.description }}</p>

    <div class="flex items-center gap-3">
      <select class="input" v-model="localStatus" @change="updateStatus">
        <option value="todo">Por hacer</option>
        <option value="in_progress">En progreso</option>
        <option value="done">Hecha</option>
      </select>
      <button class="btn" @click="$emit('remove', task.id)">Eliminar</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '@/domain/entities/Task'


const props = defineProps<{ task: Task }>()
const emit = defineEmits<{ (e: 'update-status', id: string, status: Task['status']): void,
  (e: 'remove', id: string): void
}>()


const localStatus = ref(props.task.status)
watch(() => props.task.status, (v) => { localStatus.value = v })

const updateStatus = () => emit('update-status', props.task.id, localStatus.value)
</script>