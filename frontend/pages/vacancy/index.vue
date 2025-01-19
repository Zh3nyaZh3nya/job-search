<script setup lang="ts">
import { useStore } from "~/store";

const store = useStore()
</script>

<template>
  <v-main>
    <section class="mt-8">
      <v-container>
        <h1 class="text-h4 font-weight-regular text-lowercase mb-6">{{ store.GET_RESUME.length }} {{ $t('ads on') }} {{ store.GET_VACANCY.length }} {{ $t('vacancies') }}</h1>
        <v-row>
          <v-col
              v-for="card in store.GET_VACANCY_CARD"
              :key="card.id"
              cols="12"
          >
            <VacancyCard :card="card" />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>