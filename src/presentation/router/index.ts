import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/presentation/views/LoginView.vue'
import TasksView from '@/presentation/views/TasksView.vue'
import { useAuthStore } from '@/presentation/stores/auth.store'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/tasks' },
        { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
        { path: '/tasks', name: 'tasks', component: TasksView, meta: { requiresAuth: true } },
        { path: '/:pathMatch(.*)*', redirect: '/tasks' },
    ],
})

router.beforeEach((to) => {
    const auth = useAuthStore()
    if (to.meta.public)
        return true
    if (to.meta.requiresAuth && !auth.isAuthenticated)
        return { name: 'login' }
    return true
})

export default router