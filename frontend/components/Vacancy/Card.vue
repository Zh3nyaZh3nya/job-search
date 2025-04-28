<script setup lang="ts">
import { useLocalePath } from "#i18n";
import type { IVacancyCard } from "~/types";

interface IProps {
  card: IVacancyCard
}

const props = defineProps<IProps>()
const localePath = useLocalePath()
</script>

<template>
  <v-card
      v-if="card"
      :to="localePath(`/vacancy/${card.id}/${card.slug}`)"
      class="vacancy-card card pa-6"
      :hover="true"
      elevation="0"
      rounded="xl"
  >
    <header class="mb-4">
      <h2 class="font-weight-bold text-h5">{{ card.title }}</h2>
      <h3 class="font-weight-regular text-subtitle-1">{{ card.post }}</h3>
      <h4 class="font-weight-regular text-body-1 text-primary">{{ $t(`category.${card.category}`) }}</h4>
      <h5 class="font-weight-regular text-h4 text-primary lh-normal">{{ card.from_salary }} {{ card.currency }}</h5>
    </header>
    <main class="mb-6">
      <div class="d-flex align-center ga-2 mb-2">
        <v-icon icon="mdi-shield-check-outline" color="green" size="25"></v-icon>
        <span class="text-h6 font-weight-regular">{{ card.company }}</span>
      </div>
      <div class="d-flex flex-wrap align-center ga-2 ga-sm-4 mb-2">
        <div class="d-flex align-center ga-2" v-if="card.city">
          <v-icon icon="mdi-map-marker-outline" size="25"></v-icon>
          <span class="text-subtitle-1">{{ $t(card.city) }}, {{ card.address }}</span>
        </div>
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-briefcase-variant-outline" size="25"></v-icon>
          <span class="text-subtitle-1">{{ $t(`work_experience.${card.work_experience}`) }}</span>
        </div>
      </div>
      <div class="d-flex align-center flex-wrap ga-2 ga-sm-4">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-clock-outline" size="24"></v-icon>
          <span>{{ $t(`work_schedule.${card.job_format}`)}}</span>
        </div>
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-school-outline" size="24"></v-icon>
          <span>{{ $t(`educationLevel.${card.education_level}`) }}</span>
        </div>
      </div>
    </main>
    <footer class="d-flex justify-end">
      <span class="text-subtitle-1 text-grey">{{ $t('publish') }} {{ card.date_publish }}</span>
    </footer>
  </v-card>
</template>

<style scoped>

</style>