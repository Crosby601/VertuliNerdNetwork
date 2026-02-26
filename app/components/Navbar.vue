<template>
  <nav
    class="border-b sticky top-0 z-50 transition-colors duration-300
       bg-white/90 backdrop-blur shadow-sm border-slate-300
       dark:bg-slate-950/70 dark:border-slate-800 dark:shadow-black/20"
  >
    <div class="max-w-6xl mx-auto p-4 flex items-center justify-between">
      <NuxtLink to="/" class="brand">
        Vertuli Nerd Network
      </NuxtLink>

      <div class="flex items-center gap-3 text-sm">
        <NuxtLink to="/" class="link">Feed</NuxtLink>

        <template v-if="user">
          <NuxtLink :to="`/profile/${user.id}`" class="link">My profile</NuxtLink>
          <span class="muted hidden sm:inline">{{ user.name }}</span>
          <button class="btn-ghost" @click="handleLogout">Sign out</button>
        </template>

        <template v-else>
          <NuxtLink to="/login" class="link">Sign in</NuxtLink>
        </template>

        <button class="btn-ghost" @click="toggleTheme" :title="isDark ? 'Light' : 'Dark'">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
const { user, logout } = useAuth()
const router = useRouter()

const isDark = ref(false)

const applyTheme = (dark: boolean) => {
  isDark.value = dark
  if (process.client) {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') return applyTheme(true)
  if (saved === 'light') return applyTheme(false)

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  applyTheme(!!prefersDark)
})

const toggleTheme = () => applyTheme(!isDark.value)

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped></style>