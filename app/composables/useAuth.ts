type User = {
  id: number
  name: string
  bio: string
  field: string
  avatar?: string // Data URL or an empty string
}

// In-memory users list (mocked data source).
const usersState = ref<User[]>([
  {
    id: 1,
    name: 'Oskar Romanów',
    bio: 'Zbieram ECTS i błędy Vite’a',
    field: 'Informatyka',
    avatar: ''
  },
  {
    id: 2,
    name: 'Alicja Piątkowska',
    bio: 'Zaprojektować Ci dom?',
    field: 'Architektura',
    avatar: ''
  },
  {
    id: 3,
    name: 'Pan Newton',
    bio: 'Spadło mi jabłko na głowę i już tak zostało',
    field: 'Fizyka',
    avatar: ''
  }
])

// Currently signed-in user (null means signed out).
const currentUserId = ref<number | null>(1)

export const useAuth = () => {
  const users = usersState
  const user = computed(() => users.value.find(u => u.id === currentUserId.value) ?? null)
  const isLoggedIn = computed(() => currentUserId.value !== null)

  const loginAs = (id: number) => {
    if (users.value.some(u => u.id === id)) currentUserId.value = id
  }

  const logout = () => {
    currentUserId.value = null
  }

  // Avatar can only be changed for the currently signed-in user.
  const setMyAvatar = (dataUrl: string) => {
    const me = users.value.find(u => u.id === currentUserId.value)
    if (!me) return
    me.avatar = dataUrl
  }

  const getUserById = (id: number) => users.value.find(u => u.id === id) ?? null

  return { users, user, isLoggedIn, loginAs, logout, setMyAvatar, getUserById }
}