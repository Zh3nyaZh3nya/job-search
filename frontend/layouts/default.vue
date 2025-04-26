<script setup lang="ts">
import { useStore } from "~/store";
import { useI18n } from "vue-i18n";
import { useAuthStore } from '~/store/auth'

const store = useStore()
const authStore = useAuthStore()
const { locale } = useI18n()

await authStore.fetchUser()

watch(() => locale.value, (newLocale) => {
  store.updateStateLocale(newLocale);
}, { immediate: true });
</script>

<template>
  <v-app>
    <Header />
    <NuxtPage />
  </v-app>
</template>

<style scoped>

</style>