<script setup lang="ts">
import { useLocalePath } from "#i18n";
import type { IVacancyCard } from "~/types";

interface IProps {
  card: IVacancyCard
  profile?: boolean
}

const props = defineProps<IProps>()
const localePath = useLocalePath()
const emit = defineEmits(['removeCard'])
</script>

<template>
  <v-card
      v-if="card"
      :to="profile ? undefined : localePath(`/vacancy/${card.id}/${card.slug}`)"
      class="vacancy-card card pa-6"
      :hover="!profile"
      :class="profile ? 'card-not-hover' : 'card'"
      elevation="0"
      rounded="xl"
  >
    <header class="mb-4">
      <div class="d-flex justify-space-between">
        <h2 class="font-weight-bold text-h5">{{ card.title }}</h2>
        <div v-if="profile" class="d-flex ga-2 mt-2">
          <v-icon icon="mdi-pencil-outline" size="20px" class="cursor-pointer link" @click="$router.push(localePath(`/employer/edit-vacancy/${card.id}`))"></v-icon>
          <v-icon icon="mdi-delete-outline" size="20px" class="cursor-pointer link" @click="emit('removeCard')"></v-icon>
          <v-icon icon="mdi-information-outline" size="20px" class="cursor-pointer link" @click="$router.push(localePath(`/employer/vacancy/${card.id}`))"></v-icon>
        </div>
      </div>
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
          <div class="d-flex flex-wrap ga-1">
            <p v-for="(job, index) in card.job_format" :key="job">
              {{ $t(`work_schedule.${job}`)}}<label v-if="index !== card.job_format.length - 1">,</label>
            </p>
          </div>
          <span></span>
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