<script setup lang="ts">
import { useLocalePath } from "#i18n";
import { getYearLabel } from "~/utils/getYearLabel";
import type { IResume } from "~/types";

interface IProps {
  card: IResume
}

const props = defineProps<IProps>()
const localePath = useLocalePath()

</script>

<template>
  <v-card
      :to="localePath(`/resume/${card.id}/${card.slug}`)"
      class="pa-4 rounded-lg d-flex align-start ga-4 cursor-pointer"
  >
    <div>
      <v-icon :icon="card.avatar" size="57" color="primary"></v-icon>
    </div>
    <div class="d-flex flex-column">
      <h2 class="text-h6 font-weight-regular">{{ card.title }}</h2>
      <h3 class="font-weight-regular text-body-1">{{ card.info_resume.age }} {{ getYearLabel(card.info_resume.age) }} / {{ $t(card.info_resume.gender) }}</h3>
      <h4 class="font-weight-regular text-body-1">
        <label for="" class="text-primary">Стаж работы: </label>
        {{ card.work_experience }}
      </h4>
      <h5 class="font-weight-regular text-body-1">
        <label for="" class="text-primary">Город:</label>
        {{ $t(card.info_resume.city) }}
      </h5>
      <h6 class="font-weight-regular text-body-1">
        <label for="" class="text-primary">Образование:</label>
        {{ $t(`educationLevel.${card.education_level}`) }}
      </h6>
      <div>
        <span class="text-body-1" v-if="!card.to_salary">
          <label for="" class="text-primary">Ожидаемая зарплата: </label>
          {{ card.from_salary }}{{ card.currency }}
        </span>
        <span class="text-body-1" v-else>
          <label for="" class="text-primary">Ожидаемая зарплата: </label>
          {{ $t('from')}} {{ card.from_salary }} {{ $t('to') }} {{ card.to_salary }}{{ card.currency }}
        </span>
      </div>
    </div>
  </v-card>
</template>

<style scoped>

</style>