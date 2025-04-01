<script setup lang="ts">
import { useLocalePath } from "#i18n";
import type { IVacancy } from "~/types";

interface IProps {
  card: IVacancy
}

const props = defineProps<IProps>()
const localePath = useLocalePath()

</script>

<template>
  <v-card
      :to="localePath(`/vacancy/${card.id}/${card.slug}`)"
      class="pa-4 rounded-lg d-flex align-start ga-4 cursor-pointer"
  >
    <div class="d-flex flex-column">
      <h2 class="text-h6 font-weight-regular">{{ card.title }}</h2>
      <h3 class="text-subtitle-1 font-weight-regular">
        <label for="" class="text-primary">{{ $t('company') }}:</label>
        {{ card.company }}
      </h3>
      <h4 class="text-subtitle-1 font-weight-regular">
        <label for="" class="text-primary">{{ $t('address') }}:</label>
        {{ $t(card.city) }} / {{ card.address }}
      </h4>
      <h4 class="text-subtitle-1 font-weight-regular">
        <label for="" class="text-primary">{{ $t('education') }}:</label>
        {{ $t(`educationLevel.${card.info_vacancy.education}`) }}
      </h4>
      <h4 class="text-subtitle-1 font-weight-regular">
        <label for="" class="text-primary">{{ $t('work_experience_text') }}:</label>
        {{ $t(`work_experience.${card.info_vacancy.work_experience}`) }}
      </h4>
      <div>
        <span class="text-body-1" v-if="!card.to_salary">
          <label for="" class="text-primary">{{ $t('salary') }}: </label>
          от {{ card.from_salary }}{{ card.currency }}
        </span>
        <span class="text-body-1" v-else>
          <label for="" class="text-primary">{{ $t('salary') }}: </label>
          {{ $t('from')}} {{ card.from_salary }} {{ $t('to') }} {{ card.to_salary }}{{ card.currency }}
        </span>
      </div>
    </div>
  </v-card>
</template>

<style scoped>

</style>