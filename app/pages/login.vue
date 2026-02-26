<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold brand">
      Sign in
    </h1>

    <div class="space-y-3">
      <button
        v-for="u in users"
        :key="u.id"
        class="card card-hover w-full text-left p-4"
        @click="handleLogin(u.id)"
      >
        <div class="font-semibold">
          {{ u.name }}
        </div>
        <div class="text-sm muted">
          {{ u.field }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { users, loginAs } = useAuth()
const router = useRouter()

const handleLogin = (id: number) => {
  loginAs(id)
  router.push(`/profile/${id}`)
}
</script>

<style scoped></style>