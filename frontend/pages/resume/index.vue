<script setup lang="ts">
import { useStore } from "~/store";

const store = useStore()
</script>

<template>
  <v-main>
    <section class="mt-8">
      <v-container>
        <h1 class="text-h4 font-weight-regular text-lowercase mb-6">{{ store.GET_RESUME_CARD.length }} {{ $t('resume') }}</h1>
        <v-row>
          <v-col cols="12" md="4" lg="3">
            <FiltersMain />
          </v-col>

          <v-col cols="12" md="8" lg="9" v-if="store.GET_RESUME_CARD.length">
            <v-row>
              <v-col
                  v-for="card in store.GET_RESUME_CARD"
                  :key="card.id"
                  cols="12"
              >
                <ResumeCard :card="card" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="9" v-else>
            <h2>Не получилось найти резюме.</h2>
            <p class="text-body-1 font-weight-regular text-secondary">Попробуйте обновить страницу или изменить фильтры.</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-main>

</template>

<style scoped>

</style>