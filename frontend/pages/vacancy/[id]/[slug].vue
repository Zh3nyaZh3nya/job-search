<script setup lang="ts">
import { useStore } from "~/store";
import { useRoute } from "vue-router";

const store = useStore()
const route = useRoute()
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <VacancyPage :card="store.GET_VACANCY_PAGE(+route.params.id)" />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>