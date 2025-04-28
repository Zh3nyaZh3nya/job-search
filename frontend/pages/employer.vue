<script setup lang="ts">
import { useApi } from "~/composables/useApi";
import { useAsyncData } from "#app";
import { useAuthStore } from "~/store/auth";
import type { IUserEmployer } from "~/types";

const authStore = useAuthStore()

const { data: userData } = await useAsyncData('userData', async () => {
  try {
    if(!authStore.isAuthenticated) return
    const { data } = await useApi<{ user: IUserEmployer }>('/api/auth/user', { method: 'GET' })
    const user = data?.value?.user as IUserEmployer | null

    if(user) {
      authStore.user = user
    }
  } catch (e) {
    console.log(e)
  }
})

definePageMeta({
  middleware: 'role'
})
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <h1 class="text-h4">{{ $t('employer-title') }}</h1>
      </v-container>
    </section>
    <section>
      <v-container>

      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>