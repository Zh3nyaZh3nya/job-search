<script setup lang="ts">
import { useLocalePath } from "#i18n";
import type { IResumeCardSmall } from "~/types";

interface IProps {
  card: IResumeCardSmall
}

const props = defineProps<IProps>()

const localePath = useLocalePath()
</script>

<template>
  <v-card
      v-if="card"
      class="resume-card-small card-not-hover h-100 d-flex justify-space-between flex-column"
      elevation="0"
      rounded="lg"
      :hover="false"
  >
    <header class="pa-5">
      <v-icon :icon="card.avatar" size="57" class="mb-3" color="primary"></v-icon>
      <h3 class="text-caption text-grey mb-1">{{ $t(`educationLevel.${card.education_level}`) }}</h3>
      <h2 class="text-h6 lh-normal font-weight-regular">{{ card.title }}</h2>
      <h4 class="text-h6 text-primary font-weight-regular" v-if="card.from_salary && card.currency">{{ $t('from') }} {{ card.from_salary + card.currency }}</h4>
      <h5 class="text-subtitle-1 text-grey">{{ card.work_experience }}</h5>
    </header>
    <footer>
      <div class="mx-4">
        <v-btn
            :to="localePath(`/vacancy/${card.id}/${card.slug}`)"
            color="primary"
            class="text-none text-body-1 mb-4"
            rounded="xl"
            size="large"
            elevation="0"
            block
            variant="outlined"
        >
          {{ $t('more') }}
        </v-btn>
      </div>
    </footer>
  </v-card>
</template>

<style lang="scss">
</style>