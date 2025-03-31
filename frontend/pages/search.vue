<script setup lang="ts">
import { useStore } from "~/store";
import { useRoute } from "vue-router";

const store = useStore()
const route = useRoute()

const type = ref(route.query.type as 'job' | 'members' || 'job')
const search = ref(route.query.search as string || '')

const dataSearch = computed(() => {
  return store.GET_SEARCH_RESULT(type.value, search.value)
})

watch(() => route.query, (newQuery) => {
  type.value = newQuery.type as 'job' | 'members' || 'job';
  search.value = newQuery.search as string || '';
});
</script>

<template>
  <v-main>
    <section class="mt-10">
      <v-container>
        <Search :type="type" :search="search" />
      </v-container>
    </section>
    <section v-if="dataSearch&&dataSearch.length">
      <v-container>
        <h1 class="mb-4">Результаты поиска {{type === 'job' ? `(${dataSearch.length} вакансии)` : `(${dataSearch.length} рюземе)`}}: </h1>
        <v-row v-if="type === 'members'">
          <v-col
            v-for="card in dataSearch"
            :key="card.id"
            cols="12"
            md="6"
          >
            <ResumeSearch :card="card" />
          </v-col>
        </v-row>
        <v-row v-if="type === 'job'">
          <v-col
            v-for="card in dataSearch"
            :key="card.id"
            cols="12"
            md="4"
          >
            <VacancySearch :card="card" />
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section v-else>
      <v-container>
        <h1>Не удалось найти {{ type === 'job' ? 'вакансии' : 'рюземе' }} по поиску: {{ search }}</h1>
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>