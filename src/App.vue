<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <header class="border-b border-gray-200 dark:border-gray-800">
      <div class="container py-4 flex items-center justify-between">
        <h1 class="text-xl font-semibold">Vue Task Manager</h1>
        <nav v-if="isAuth" class="flex gap-3 text-sm items-center">
          <RouterLink to="/tasks" class="hover:underline">Tareas</RouterLink>
          <button class="btn btn-primary cursor-pointer" @click="logout">Salir</button>
        </nav>
      </div>
    </header>
    <main class="container py-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/presentation/stores/auth.store'
  import { storeToRefs } from "pinia"
  import { useRouter } from "vue-router"

  const auth = useAuthStore()
  const { isAuthenticated: isAuth } = storeToRefs(auth)

  const router = useRouter()

  const logout = async () => {
    auth.logout()
    await router.push({ name: 'login' })
  }
</script>