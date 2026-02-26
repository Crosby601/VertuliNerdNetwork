<template>
  <div class="card p-4 sticky top-24 space-y-4">
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold">User</h3>
        <span class="text-xs muted">{{ contextLabel }}</span>
      </div>

      <div v-if="contextUser" class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 overflow-hidden
                 bg-white/70 dark:bg-slate-900/40 backdrop-blur flex items-center justify-center shrink-0"
          :title="contextUser.name"
        >
          <img
            v-if="contextUser.avatar"
            :src="contextUser.avatar"
            alt="avatar"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-xs font-semibold">
            {{ initials(contextUser.name) }}
          </span>
        </div>

        <div class="min-w-0">
          <div class="font-semibold truncate">{{ contextUser.name }}</div>
          <div class="text-xs muted truncate">{{ contextUser.field }}</div>
        </div>
      </div>

      <div v-else class="text-sm muted">No user data available.</div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div class="panel">
        <div class="text-xs muted">Posts</div>
        <div class="text-xl font-bold">{{ contextPostsCount }}</div>
      </div>

      <div class="panel">
        <div class="text-xs muted">Likes</div>
        <div class="text-xl font-bold">{{ contextLikesCount }}</div>
      </div>

      <div class="panel col-span-2">
        <div class="text-xs muted">Total in the system</div>
        <div class="mt-1 text-sm">
          <span class="font-semibold">{{ totalPosts }}</span> posts
          <span class="muted">·</span>
          <span class="font-semibold">{{ totalLikes }}</span> likes
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="flex items-center justify-between">
        <div class="text-xs muted">Active now</div>
        <div class="text-xs muted">{{ activeUsers.length }} online</div>
      </div>

      <div class="mt-3 flex items-center justify-between gap-3">
        <div class="flex -space-x-2">
          <div
            v-for="u in activeUsers"
            :key="u.id"
            class="relative w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 overflow-hidden
                   bg-white/70 dark:bg-slate-900/40 backdrop-blur flex items-center justify-center"
            :title="u.name"
          >
            <span class="text-xs font-semibold">{{ initials(u.name) }}</span>
            <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
          </div>
        </div>

        <NuxtLink to="/login" class="link text-xs shrink-0">
          Switch account →
        </NuxtLink>
      </div>
    </div>

    <div class="panel space-y-3">
      <div class="text-xs muted">Suggested</div>

      <div class="space-y-2">
        <div
          v-for="s in suggested"
          :key="s.id"
          class="flex items-center justify-between gap-3"
        >
          <div class="min-w-0">
            <div class="font-semibold text-sm truncate">{{ s.name }}</div>
            <div class="text-xs muted truncate">{{ s.tag }}</div>
          </div>

          <NuxtLink :to="`/profile/${s.id}`" class="btn-ghost text-xs px-2 py-1 shrink-0">
            Profile
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="text-xs muted">Top post</div>
      <div v-if="topPost" class="mt-2 space-y-2">
        <p class="text-sm">{{ topPost.content }}</p>
        <div class="text-xs muted">❤️ {{ topPost.likes }} · {{ formatDate(topPost.createdAt) }}</div>
      </div>
      <div v-else class="text-sm muted mt-2">No data available.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePosts } from '~/composables/usePosts'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const { posts } = usePosts()
const { user, users, getUserById } = useAuth()

const contextUserId = computed(() => {
  const isProfile = route.path.startsWith('/profile/')
  if (isProfile) {
    const id = Number(route.params.id)
    return Number.isFinite(id) ? id : (user.value?.id ?? null)
  }
  return user.value?.id ?? null
})

const contextUser = computed(() => {
  if (!contextUserId.value) return null
  return getUserById(contextUserId.value)
})

const contextLabel = computed(() => (route.path.startsWith('/profile/') ? 'profile' : 'account'))

const totalPosts = computed(() => posts.value.length)
const totalLikes = computed(() => posts.value.reduce((acc, p) => acc + p.likes, 0))

const contextPosts = computed(() => {
  if (!contextUserId.value) return []
  return posts.value.filter(p => p.authorId === contextUserId.value)
})

const contextPostsCount = computed(() => contextPosts.value.length)
const contextLikesCount = computed(() => contextPosts.value.reduce((acc, p) => acc + p.likes, 0))

const topPost = computed(() => {
  if (posts.value.length === 0) return null
  return [...posts.value].sort((a, b) => b.likes - a.likes)[0]
})

const activeUsers = computed(() => users.value.slice(0, 3))

const suggested = computed(() => {
  const meId = user.value?.id
  const others = users.value.filter(u => u.id !== meId)
  return others.slice(0, 2).map(u => ({
    id: u.id,
    name: u.name,
    tag: u.field || 'Nerd stuff'
  }))
})

const formatDate = (iso: string) => new Date(iso).toLocaleString()
const initials = (name: string) =>
  name.trim().split(/\s+/).slice(0, 2).map(p => p[0]?.toUpperCase()).join('') || 'U'
</script>

<style scoped></style>