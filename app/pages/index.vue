<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold brand drop-shadow-sm">
      Feed naukowy
    </h1>

    <!-- Dodawanie posta -->
    <div class="card p-4">
      <div class="flex gap-3">
        <input
          v-model="newPost"
          class="input flex-1"
          placeholder="Napisz coś mądrego…"
        />

        <button class="btn-primary" @click="handleAdd">
          Dodaj
        </button>
      </div>

      <p v-show="newPost.length === 0" class="text-xs muted mt-2">
        Tip: brzmiące mądrze też się liczy.
      </p>
    </div>

    <!-- Brak postów -->
    <div
      v-if="posts.length === 0"
      class="card p-6 text-gray-600"
    >
      Brak postów.
    </div>

    <!-- Lista postów -->
    <div class="space-y-4">
      <PostCard
        v-for="p in posts"
        :key="p.id"
        :post="p"
        @like="likePost(p.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePosts } from '~/composables/usePosts'
import { useAuth } from '~/composables/useAuth'

const { posts, addPost, likePost } = usePosts()
const { user } = useAuth()

const newPost = ref('')

const handleAdd = () => {
  if (!newPost.value.trim() || !user.value) return

  addPost(newPost.value.trim(), user.value.id)
  newPost.value = ''
}
</script>

<style scoped></style>