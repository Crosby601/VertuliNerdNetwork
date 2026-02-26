<template>
  <article class="card card-hover p-5">
    <p class="whitespace-pre-wrap">{{ post.content }}</p>

    <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
      <span>
        {{ new Date(post.createdAt).toLocaleString() }}
      </span>

      <div class="flex items-center gap-2">
        <button class="btn-ghost" @click="$emit('like')">
          ❤️ {{ post.likes }}
        </button>

        <button
          v-if="canDelete"
          class="btn-ghost"
          @click="$emit('delete')"
        >
          🗑️
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  post: {
    id: number
    content: string
    likes: number
    createdAt: string
    authorId: number
  }
  canDelete?: boolean
}>()

defineEmits<{
  (e: 'like'): void
  (e: 'delete'): void
}>()
</script>

<style scoped></style>