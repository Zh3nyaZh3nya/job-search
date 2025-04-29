<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAsyncData } from "nuxt/app";
import { useApi } from "~/composables/useApi";

const route = useRoute()

const { data: resumeData } = await useAsyncData('resumePageData', async () => {
  const { data } = await useApi(`/api/resume/${String(route.params.id)}`, { method: 'GET' })
  const { resume } = data.value

  return { resume }
})
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <ResumePage :card="resumeData?.resume" />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>