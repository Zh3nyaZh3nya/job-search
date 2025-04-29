<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()

await authStore.fetchUser()
</script>

<template>
  <v-app>
    <Header />
    <NuxtPage />
  </v-app>
</template>

<style scoped>

</style>