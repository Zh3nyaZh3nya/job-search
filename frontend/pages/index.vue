<script setup lang="ts">
import { useStore } from "~/store";
import { useLocalePath } from "#i18n";

const store = useStore()
const localePath = useLocalePath()
</script>

<template>
  <v-main class="index pt-0">
    <section class="index__hero pt-16 mb-12">
      <MainHero />
    </section>
    <section class="index__services">
      <v-container>
        <MainServices />
      </v-container>
    </section>
    <section class="index__vacancy">
      <v-container>
        <header class="d-flex justify-space-between align-center mb-4">
          <h2 class="text-h4">{{ $t('vacancy') }}</h2>
          <nuxt-link class="text-primary text-h6" :to="localePath('/vacancy')">{{ $t('all-vacancy') }}</nuxt-link>
        </header>
        <article>
          <v-row>
            <v-col
                v-for="(card, index) in store.GET_VACANCY_MAIN"
                :key="card.id"
                cols="12"
                :md="index === 2 ? 12 : 6"
                lg="4"
            >
              <VacancyCardSmall :card="card" />
            </v-col>
          </v-row>
        </article>
      </v-container>
    </section>
    <section class="index__resume">
      <v-container>
        <header class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h4">{{ $t('resume') }}</h2>
          <nuxt-link class="text-primary text-h6" :to="localePath('/resume')">{{ $t('all-resume') }}</nuxt-link>
        </header>
        <article>
          <v-row>
            <v-col
                v-for="(card, index) in store.GET_RESUME_MAIN"
                :key="card.id"
                cols="12"
                md="6"
                lg="3"
            >
              <ResumeCardSmall :card="card" />
            </v-col>
          </v-row>
        </article>
      </v-container>
    </section>
  </v-main>
</template>

<style lang="scss">

</style>