<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAsyncData } from "nuxt/app";
import { useApi } from "~/composables/useApi";

const route = useRoute()

const { data: vacancyData } = await useAsyncData('vacancyPageData', async () => {
  const { data } = await useApi(`/api/vacancy/${String(route.params.id)}`, { method: 'GET' })
  const { vacancy } = data.value

  return { vacancy }
})
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <VacancyPage :card="vacancyData?.vacancy" />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>