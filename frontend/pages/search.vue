<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAsyncData } from 'nuxt/app'

const route = useRoute()
const router = useRouter()

const type = ref<'job' | 'members'>((route.query.type as 'job' | 'members') || 'job')
const search = ref<string>((route.query.search as string) || '')

const { data: dataSearch, pending, error, refresh } = await useAsyncData('searchResult', async () => {
  const { data } = await useApi(`/api/search`, {
    params: {
      type: type.value,
      search: search.value,
    },
  })

  const { result } = data.value

  return { result }
},
  {
    watch: [type, search],
    immediate: true,
  }
)

watch(() => route.query, (newQuery) => {
  type.value = (newQuery.type as 'job' | 'members') || 'job'
  search.value = (newQuery.search as string) || ''
})
</script>


<template>
  <v-main>
    <section class="mt-10">
      <v-container>
        <Search :type="type" :search="search" />
      </v-container>
    </section>

    <section v-if="pending">
      <v-container>
        <v-progress-circular indeterminate color="primary" />
      </v-container>
    </section>

    <section v-else-if="dataSearch?.result?.length">
      <v-container>
        <h1 class="mb-4">
          Результаты поиска
          {{ type === 'job' ? `(${dataSearch.result.length} вакансии)` : `(${dataSearch.result.length} резюме)` }}:
        </h1>

        <v-row v-if="type === 'members'">
          <v-col
              v-for="card in dataSearch.result"
              :key="card.id"
              cols="12"
              md="6"
          >
            <ResumeSearch :card="card" />
          </v-col>
        </v-row>

        <v-row v-if="type === 'job'">
          <v-col
              v-for="card in dataSearch.result"
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
        <h1>Не удалось найти {{ type === 'job' ? 'вакансии' : 'резюме' }} по поиску: {{ search }}</h1>
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>