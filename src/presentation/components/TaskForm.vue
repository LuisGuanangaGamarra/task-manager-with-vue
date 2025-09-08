<template>
  <form @submit.prevent="submit" class="card flex-1 flex items-end gap-3">
    <div class="flex-1">
      <label class="label">Título</label>
      <input v-model="formState.title" class="input" placeholder="Nueva tarea" />
    </div>
    <div class="flex-1 hidden md:block">
      <label class="label">Descripción (opcional)</label>
      <input v-model="formState.description" class="input" placeholder="Detalles" />
    </div>
    <button class="btn btn-primary">Crear</button>
  </form>
</template>


<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{ (e: 'create', title: string, description?: string): void }>()

const formState = reactive({
  title: '',
  description: ''
})

const submit = () => {
  if (!formState.title.trim())
    return;

  emit('create', formState.title, formState.description);
  formState.title = '';
  formState.description = '';
}
</script>