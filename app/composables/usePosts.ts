export type Post = {
  id: number
  content: string
  likes: number
  createdAt: string
  authorId: number
}

const postsState = ref<Post[]>([
  { id: 1, content: 'Science says: sleep 8 hours. University says: no.', likes: 3, createdAt: new Date().toISOString(), authorId: 1 },
  { id: 2, content: 'Back in my day...', likes: 5, createdAt: new Date().toISOString(), authorId: 2 }
])

export const usePosts = () => {
  const posts = postsState

  const addPost = (content: string, authorId: number) => {
    posts.value.unshift({
      id: Date.now(),
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
      authorId
    })
  }

  const likePost = (id: number) => {
    const p = posts.value.find(x => x.id === id)
    if (p) p.likes++
  }

  const getPostsByAuthor = (authorId: number) =>
    computed(() => posts.value.filter(p => p.authorId === authorId))

  const deletePost = (postId: number, currentUserId: number) => {
    const post = posts.value.find(p => p.id === postId)
    if (!post) return
    if (post.authorId !== currentUserId) return

    posts.value = posts.value.filter(p => p.id !== postId)
  }

  return { posts, addPost, likePost, getPostsByAuthor, deletePost }
}