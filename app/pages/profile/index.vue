<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
const { user } = useAuth()

if (user.value) navigateTo(`/profile/${user.value.id}`)
else navigateTo('/login')
</script>

<template><div class="p-6">Redirecting…</div></template>