<template>
  <div v-if="profileUser" class="space-y-6">
    <div class="card p-4">
      <div class="flex items-start gap-4">
        <div class="shrink-0">
          <div
            class="w-20 h-20 rounded-full border border-gray-200 dark:border-gray-800 overflow-hidden
                   bg-white/60 dark:bg-gray-900/40 backdrop-blur
                   flex items-center justify-center"
          >
            <img
              v-if="profileUser.avatar"
              :src="profileUser.avatar"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
            <span v-else class="text-indigo-700 dark:text-indigo-200 font-bold">
              {{ initials(profileUser.name) }}
            </span>
          </div>

          <label
            v-if="isMyProfile"
            class="btn-ghost text-xs cursor-pointer inline-flex mt-2 justify-center w-full"
          >
            Change picture
            <input type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
          </label>

          <p v-else class="mt-2 text-xs muted">
            This isn't your account.
          </p>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 min-w-0">
            <h1 class="text-2xl font-bold truncate">
              {{ profileUser.name }}
            </h1>

            <span
              v-if="isMyProfile"
              class="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                     border border-indigo-500/30
                     bg-indigo-500/10 text-indigo-700
                     dark:bg-indigo-400/10 dark:text-indigo-200"
              title="This is your account"
            >
              My profile
              <span class="text-indigo-600 dark:text-indigo-300" aria-hidden="true">✔</span>
            </span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
            {{ profileUser.field }}
          </p>

          <p class="mt-2 text-gray-700 dark:text-gray-200/90">
            {{ profileUser.bio }}
          </p>

          <div class="mt-4 flex gap-6 text-sm">
            <div class="text-gray-700 dark:text-gray-200">
              <span class="font-semibold">{{ profilePosts.length }}</span>
              <span class="muted"> posts</span>
            </div>
            <div class="text-gray-700 dark:text-gray-200">
              <span class="font-semibold">{{ profileLikes }}</span>
              <span class="muted"> likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <h2 class="text-xl font-bold">User feed</h2>

      <div v-if="profilePosts.length === 0" class="card p-6 text-gray-700 dark:text-gray-200">
        No posts to show.
      </div>

      <div class="space-y-4">
        <PostCard
          v-for="p in profilePosts"
          :key="p.id"
          :post="p"
          :canDelete="isMyProfile"
          @like="likePost(p.id)"
          @delete="handleDelete(p.id)"
        />
      </div>
    </div>
  </div>

  <div v-else class="card p-6 text-gray-700 dark:text-gray-200">
    User not found.
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { usePosts } from '~/composables/usePosts'

const route = useRoute()
const profileId = computed(() => Number(route.params.id))

const { user, isLoggedIn, getUserById, setMyAvatar } = useAuth()
const { posts, likePost, deletePost } = usePosts()

watchEffect(() => {
  if (!isLoggedIn.value) navigateTo('/login')
})

const profileUser = computed(() => getUserById(profileId.value))
const isMyProfile = computed(() => user.value?.id === profileId.value)

const profilePosts = computed(() => posts.value.filter(p => p.authorId === profileId.value))
const profileLikes = computed(() => profilePosts.value.reduce((acc, p) => acc + p.likes, 0))

const initials = (name: string) =>
  name.trim().split(/\s+/).slice(0, 2).map(p => p[0]?.toUpperCase()).join('') || 'U'

const onAvatarChange = (e: Event) => {
  if (!isMyProfile.value) return
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result?.toString() || ''
    setMyAvatar(result)
  }
  reader.readAsDataURL(file)
  input.value = ''
}

const handleDelete = (postId: number) => {
  if (!user.value) return
  deletePost(postId, user.value.id)
}
</script>

<style scoped></style>