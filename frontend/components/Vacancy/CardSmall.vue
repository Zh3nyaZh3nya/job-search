<script setup lang="ts">
import { useLocalePath } from "#i18n";
import type { IVacancyCardSmall } from "~/types";

interface IProps {
  card: IVacancyCardSmall
}

const props = defineProps<IProps>()
const localePath = useLocalePath()
</script>

<template>
  <v-card
      v-if="card"
      class="vacancy-card-small card-not-hover h-100"
      elevation="0"
      rounded="lg"
      :hover="false"
  >
    <header class="pa-5">
      <h2 class="text-h6 mb-2  font-weight-regular">{{ card.title }}</h2>
      <h3 class="text-subtitle-2 text-primary">{{ $t(`category.${card.category}`) }}</h3>
      <h4 class="text-subtitle-2 text-primary mb-3">{{ $t('from') }} {{ card.from_salary + card.currency }}</h4>
      <div class="d-flex align-center ga-2 mb-2">
        <v-icon icon="mdi-clock-outline"></v-icon>
        <div class="d-flex flex-wrap">
          <p class="text-subtitle-2" v-for="(job, index) in card.job_format" :key="job" :class="index !== card.job_format.length - 1 ? 'mr-1' : ''">
            {{ $t(`work_schedule.${job}`) }}<label v-if="index !== card.job_format.length - 1">, </label>
          </p>
        </div>

      </div>

      <h6 class="text-subtitle-2 d-flex align-center ga-2">
        <v-icon icon="mdi-school-outline"></v-icon>
        {{ $t(`educationLevel.${card.education}`) }}
      </h6>
    </header>
    <footer>
      <v-divider class="mb-4"></v-divider>
      <v-btn
          :to="localePath(`/vacancy/${card.id}/${card.slug}`)"
          color="primary"
          class="text-none text-body-1 mx-4 mb-4"
          rounded="xl"
          size="large"
          elevation="0"
      >
        {{ $t('more') }}
      </v-btn>
    </footer>
  </v-card>
</template>

<style lang="scss">
</style>