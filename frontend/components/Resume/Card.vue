<script setup lang="ts">
import { useLocalePath } from "#i18n";
import type { IResumeCard } from "~/types";

interface IProps {
  card: IResumeCard
}

const props = defineProps<IProps>()
const localePath = useLocalePath()
</script>

<template>
  <v-card
    v-if="card"
    :to="localePath(`/resume/${card.id}/${card.slug}`)"
    class="resume-card card pa-6"
    :hover="true"
    elevation="0"
    rounded="xl"
  >
    <v-row>
      <v-col cols="12" sm="1">
        <v-icon :icon="card.avatar" size="80" color="primary"></v-icon>
      </v-col>
      <v-col cols="12" sm="11">
        <header class="mb-2">
          <h2 class="font-weight-bold">{{ card.title }}</h2>
          <h3 class="font-weight-regular text-body-2 text-primary mb-1">{{ $t(`category.${card.category}`) }}</h3>
          <h4 class="font-weight-regular text-body-2">{{ card.work_experience }}</h4>
        </header>
        <main class="mb-6">
          <div class="d-flex align-center ga-4 mb-2">
            <div class="d-flex align-center ga-2">
              <v-icon icon="mdi-map-marker-outline" size="25"></v-icon>
              <span>{{ $t(card.city) }}</span>
            </div>
            <div class="d-flex align-center ga-2 text-primary">
              <v-icon icon="mdi-cash-multiple" size="25"></v-icon>
              <span v-if="!card.to_salary">{{ card.from_salary }}{{ card.currency }}</span>
              <span v-else>{{ $t('from')}} {{ card.from_salary }} {{ $t('to') }} {{ card.to_salary }}{{ card.currency }}</span>
            </div>
          </div>
          <div class="d-flex align-center ga-4">
            <div class="d-flex align-center ga-2">
              <v-icon icon="mdi-school-outline" size="25"></v-icon>
              <span>{{ $t(`educationLevel.${card.education_level}`)}}</span>
            </div>
          </div>
        </main>
        <footer>
          <span class="text-grey text-body-1">
            {{ $t('publish') }} {{ card.date_publish }}
          </span>
        </footer>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>

</style>