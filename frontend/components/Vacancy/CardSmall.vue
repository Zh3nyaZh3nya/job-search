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
      <h5 class="text-subtitle-2 d-flex align-center ga-2 mb-2">
        <v-icon icon="mdi-clock-outline"></v-icon>
        {{ $t(`work_schedule.${card.job_format}`) }}
      </h5>
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