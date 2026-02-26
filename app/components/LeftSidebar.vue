<template>
  <div class="card p-4 sticky top-24 space-y-4">
    <div>
      <h3 class="font-semibold">Feed</h3>
      <p class="text-xs muted">Shortcuts and topics. No evil algorithm involved.</p>
    </div>

    <div class="panel space-y-2">
      <div class="text-xs muted">Quick post</div>

      <textarea
        v-model="draft"
        rows="3"
        class="input"
        placeholder="Drop a thought. Science can handle itself."
      />

      <button class="btn-primary w-full" @click="submitQuickPost" :disabled="!canPost">
        Publish
      </button>

      <div v-if="!user" class="text-xs muted">
        Sign in to publish.
      </div>
    </div>

    <div class="panel">
      <div class="text-xs muted">Pinned topic</div>
      <div class="mt-2 font-semibold">Nuxt 4 · Tailwind · UI patterns</div>
      <p class="text-sm muted mt-1">
        Topic of the week: “how to look like a product, not a lab”.
      </p>
    </div>

    <div class="panel">
      <div class="text-xs muted">Trending tags</div>
      <div class="mt-3 flex flex-wrap gap-2">
        <span v-for="t in tags" :key="t" class="tag">{{ t }}</span>
      </div>
    </div>

    <div class="space-y-2 text-sm">
      <NuxtLink to="/" class="link block">🏠 Feed</NuxtLink>

      <NuxtLink v-if="user" :to="`/profile/${user.id}`" class="link block">
        👤 My profile
      </NuxtLink>

      <NuxtLink v-else to="/login" class="link block">
        🔐 Sign in
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { usePosts } from '~/composables/usePosts'

const { user } = useAuth()
const { addPost } = usePosts()
const router = useRouter()

const draft = ref('')
const canPost = computed(() => !!user.value && !!draft.value.trim())

const submitQuickPost = () => {
  if (!canPost.value || !user.value) return
  addPost(draft.value.trim(), user.value.id)
  draft.value = ''
  router.push('/')
}

const tags = ['#nuxt', '#tailwind', '#frontend', '#uml', '#system-design', '#clean-ui', '#typescript']
</script>