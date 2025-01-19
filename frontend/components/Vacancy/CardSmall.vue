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
      class="vacancy-card-small"
      elevation="0"
      rounded="lg"
      :hover="false"
  >
    <header class="pa-5 mb-4">
      <h2 class="text-h6 mb-2">{{ card.title }}</h2>
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
    <v-divider></v-divider>
    <footer class="pa-5">
      <v-btn
          :to="localePath(`/vacancy/${card.id}/${card.slug}`)"
          color="primary"
          class="text-none text-body-1"
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
.vacancy-card-small {
  border: 1px solid #E5E7EB;
}
</style>