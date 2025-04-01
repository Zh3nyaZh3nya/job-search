<script setup lang="ts">
import { useStore } from "~/store";
import {
  Category, Currency, EducationLevel, WorkExperience,
  WorkSchedule
} from "~/types";

const store = useStore()

const work_schedule: WorkSchedule[] = Object.values(WorkSchedule)
const education_level: EducationLevel[] = Object.values(EducationLevel)
const category: Category[] = Object.values(Category)
const currency: Currency[] = Object.values(Currency)
const workExperience: WorkExperience[] = Object.values(WorkExperience)

function resetFilters() {
  store.filters = {
    city: null,
    work_schedule: null,
    employment: null,
    education_level: null,
    category: null,
    currency: null,
    work_experience: null,
  }
}
</script>

<template>
  <v-sheet color="white" class="card-not-hover filters py-4 d-none d-md-block" rounded="xl">
    <FiltersCities />
    <v-divider class="my-2"></v-divider>
    <FiltersCheckbox :items="category" v-model="store.filters.category" :title="$t('professions')" :key-translate="'category'" />
    <v-divider class="my-2"></v-divider>
    <FiltersCheckbox :items="work_schedule" v-model="store.filters.work_schedule" :title="$t('work_schedule_text')" :key-translate="'work_schedule'" />
    <v-divider class="my-2"></v-divider>
    <FiltersCheckbox :items="education_level" v-model="store.filters.education_level" :title="$t('education')" :key-translate="'educationLevel'" />
    <v-divider class="my-2"></v-divider>
    <FiltersCheckbox :items="currency" v-model="store.filters.currency" :title="$t('currency')" :key-translate="''" />
    <v-divider class="mt-2"></v-divider>
    <FiltersCheckbox v-if="$route.path.includes('/vacancy')" :items="workExperience" v-model="store.filters.work_experience" :title="$t('work_experience_text')" :key-translate="'work_experience'" />
    <v-divider class="mt-2 mb-4" v-if="$route.path.includes('/vacancy')"></v-divider>
    <div class="mx-2 my-2">
      <v-btn block color="primary" variant="outlined" @click="resetFilters">{{ $t('reset')}}</v-btn>
    </div>
  </v-sheet>
</template>

<style lang="scss">
.filters {
  .v-label {
    opacity: 1;
  }
}
</style>
