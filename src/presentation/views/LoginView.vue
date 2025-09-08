<template>
  <div class="max-w-md mx-auto">
    <div class="card">
      <h2 class="text-xl font-semibold mb-4">Ingresar</h2>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="label" for="email">Email</label>
          <input id="email" v-model="formState.email" type="email" class="input" placeholder="admin@demo.com" />
        </div>
        <div>
          <label class="label" for="password">Password</label>
          <input id="password" v-model="formState.password" type="password" class="input" placeholder="123" />
        </div>
        <button class="btn btn-primary w-full cursor-pointer text-center justify-center" :disabled="formState.loading">
          {{ formState.loading ? 'Ingresando...' : 'Entrar' }}
        </button>
        <p class="text-sm text-gray-500">
          Usuarios demo: <code>admin@demo.com</code> / <code>user@demo.com</code>
        </p>
        <p class="text-sm text-gray-500">
          password <code>123</code>
        </p>
        <p v-if="formState.error" class="text-sm text-red-600">{{ formState.error }}</p>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/presentation/stores/auth.store'


const formState = reactive({
  email: '',
  password: '',
  loading: false,
  error: ''
})

const router = useRouter()
const auth = useAuthStore()


const onSubmit = async () => {
  formState.loading = true;
  formState.error = ''
  try {
    await auth.login(formState.email, formState.password)
    await router.push({ name: 'tasks' })
  } catch (e: any) {
    formState.error = e?.message || 'Error al ingresar'
  } finally {
    formState.loading = false
  }
}
</script>