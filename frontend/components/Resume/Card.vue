<script setup lang="ts">
import { useLocalePath } from "#i18n";
import type { IResumeCard } from "~/types";
import {getYearLabel} from "~/utils/getYearLabel";

interface IProps {
  card: IResumeCard
  profile?: boolean
}

const props = defineProps<IProps>()
const localePath = useLocalePath()
const emit = defineEmits(['removeCard'])
</script>

<template>
  <v-card
    v-if="card"
    :to="profile ? undefined : localePath(`/resume/${card.id}/${card.slug}`)"
    class="resume-card pa-4 pa-lg-6"
    :hover="!profile"
    :class="profile ? 'card-not-hover' : 'card'"
    elevation="0"
    rounded="xl"
  >
    <v-row>
      <v-col
        cols="12"
        md="2"
        class="d-flex justify-space-between ga-4 pr-md-0"
      >
        <v-icon :icon="card.avatar" size="80" color="primary"></v-icon>
        <div v-if="profile" class="d-flex d-md-none ga-2 mt-2">
          <v-icon icon="mdi-pencil-outline" size="20px" class="cursor-pointer link" @click="$router.push(localePath(`/member/edit-resume/${card.id}`))"></v-icon>
          <v-icon icon="mdi-delete-outline" size="20px" class="cursor-pointer link" @click="emit('removeCard')"></v-icon>
          <v-icon icon="mdi-information-outline" size="20px" class="cursor-pointer link" @click="$router.push(localePath(`/member/resume/${card.id}`))"></v-icon>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="10"
        class="pt-0 pt-md-4 pl-lg-0"
      >
        <div class="w-100">
          <header class="mb-2">
            <div class="d-flex align-start justify-space-between">
              <div>
                <h2 class="font-weight-bold ">{{ card.title }}</h2>
                <h3
                    v-if="profile"
                    class="font-weight-regular"
                    :class="card.active ? $t('text-success') : $t('text-error')"
                >
                  {{ card.active ? $t('active') : $t('not-active') }}
                </h3>
              </div>
              <div v-if="profile" class="d-none d-md-flex ga-2 mt-2">
                <v-icon icon="mdi-pencil-outline" size="20px" class="cursor-pointer link" @click="$router.push(localePath(`/member/edit-resume/${card.id}`))"></v-icon>
                <v-icon icon="mdi-delete-outline" size="20px" class="cursor-pointer link" @click="emit('removeCard')"></v-icon>
                <v-icon icon="mdi-information-outline" size="20px" class="cursor-pointer link" @click="$router.push(localePath(`/member/resume/${card.id}`))"></v-icon>
              </div>
            </div>
            <h3 class="font-weight-regular text-body-2 text-primary mb-1">{{ $t(`category.${card.category}`) }}</h3>
            <h4 class="font-weight-regular text-body-2">{{ card.work_experience }} {{ getYearLabel(card.work_experience) }}</h4>
          </header>
          <main class="mb-6">
            <div class="d-flex align-center flex-wrap ga-2 ga-sm-4 mb-2">
              <div class="d-flex align-center ga-2">
                <v-icon icon="mdi-map-marker-outline" size="25"></v-icon>
                <span>{{ $t(card.city) }}</span>
              </div>
              <div class="d-flex align-center ga-2 text-primary">
                <v-icon icon="mdi-cash-multiple" size="25"></v-icon>
                <span>{{ card.from_salary }}{{ card.currency }}</span>
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
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>

</style>