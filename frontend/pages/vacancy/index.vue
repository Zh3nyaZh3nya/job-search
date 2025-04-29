<script setup lang="ts">
import { useStore } from "~/store";
import { useAsyncData } from "nuxt/app";

const store = useStore()

const { data } = await useAsyncData('vacancyGet', async () => {
  await store.fetchVacancy()
})
</script>

<template>
  <v-main>
    <section class="mt-8">
      <v-container>
        <h1 class="text-h4 font-weight-regular text-lowercase mb-6">{{ store.GET_VACANCY_CARD.length }} {{ $t('vacancies') }}</h1>
        <v-row>
          <v-col cols="12" md="4" lg="3">
            <FiltersMain />
          </v-col>
          <v-col
              cols="12"
              md="8"
              lg="9"
              v-if="store.GET_VACANCY_CARD.length"
          >
            <v-row>
              <v-col
                  v-for="card in store.GET_VACANCY_CARD"
                  :key="card.id"
                  cols="12"
              >
                <VacancyCard class="w-100" :card="card" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="9" v-else>
            <h2>Не получилось найти вакансии.</h2>
            <p class="text-body-1 font-weight-regular text-secondary">Попробуйте обновить страницу или изменить фильтры.</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>