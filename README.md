# ✅ Task Manager with Vue 3

Aplicación de **gestión de tareas colaborativas** desarrollada con **Vue
3 + TypeScript + Pinia + Vue Router**, siguiendo principios de **Clean
Architecture** y **buenas prácticas** de desarrollo frontend.\
Incluye autenticación simulada, persistencia en
localStorage, sincronización en tiempo real entre pestañas y está
preparada para integrarse fácilmente con un backend real en **NestJS** u
otra tecnología.

------------------------------------------------------------------------

## ✨ Características principales

-   🔐 **Autenticación** y guardas de rutas.\
-   📝 **CRUD de tareas** (crear, actualizar estado, asignar,
    eliminar).\
-   🔄 **Sincronización en tiempo real** entre pestañas usando
    `BroadcastChannel`.\
-   🏗 **Arquitectura limpia** con separación de capas:
    -   `presentation` → Vistas, componentes, router, stores.
    -   `domain` → Entidades, repositorios y casos de uso.
    -   `infrastructure` → Repositorios falsos, mapeadores y servicios
        de tiempo real.
-   🎨 **UI moderna** con **TailwindCSS**.
-   📦 **Dockerfile listo** para despliegue en Render, Vercel o
    cualquier servicio compatible.
-   🧪 **Testing preparado** (Vitest y Playwright listos para
    configurar).

------------------------------------------------------------------------

## 🚀 Demo

Usuarios de prueba:

-   **Admin** → `admin@demo.com`\
-   **User** → `user@demo.com`\
-   Password → 123

> 🔑 El login es simulado.

------------------------------------------------------------------------

## 🗂️ Estructura del proyecto

src/ app/ \# bootstrap de la app presentation/ \# UI, router, stores
domain/ \# entidades, repos, casos de uso infrastructure/ \# fake
repos + realtime ioc.ts \# inyección de dependencias main.ts App.vue

------------------------------------------------------------------------

## ⚡ Instalación y ejecución

### Requisitos

-   Node.js \>= 22.10
-   npm \>= 10.9

### Local

- npm install
- npm run dev 

### Con Docker

- docker build -t task-manager-vue 
- docker run -p 8080:80 task-manager-vue

La app estará disponible en http://localhost:8080

------------------------------------------------------------------------

## 🧩 Tecnologías usadas

-   Vue 3 + Composition API
-   TypeScript
-   Pinia (estado global)
-   Vue Router (navegación y guards)
-   TailwindCSS (estilos)
-   Vitest + Playwright (testing)
-   Docker (deploy)

------------------------------------------------------------------------

## 🧪 Testing

Unit tests: npm run test:unit\
Coverage: npm run test:coverage\
E2E: npx playwright install && npx playwright test

## 👨‍💻 Autor

Desarrollado por **Luis Guananga**\
LinkedIn: https://www.linkedin.com/in/luis-virgilio-guananga-gamarra \
GitHub: https://github.com/LuisGuanangaGamarra

------------------------------------------------------------------------

## 📝 Licencia

Este proyecto está bajo la licencia MIT.