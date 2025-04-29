<script setup lang="ts">
import type { IResume } from "~/types";
import { getYearLabel } from "~/utils/getYearLabel";

interface IProps {
  card: IResume
}

const props = defineProps<IProps>()
</script>

<template>
  <v-card
      v-if="card"
      class="card-not-hover pa-4"
      elevation="0"
      :hover="false"
      rounded="lg"
  >
    <header class="mb-2">
      <span class="text-grey">ID {{ $t('resume') }} {{ card.id }}</span>
    </header>
    <main class="mb-2">
      <v-divider class="mb-2"></v-divider>
      <span class="text-body-2 text-grey">{{ $t('publish') }} {{ card.date_publish }}</span>
      <h1 class="mb-1 text-h5 font-weight-bold">{{ card.title }}</h1>
      <h3 class="text-grey text-body-1 mb-2">{{ $t(`category.${card.category}`) }}</h3>
      <p class="text-primary text-h4 mb-1">{{ card.from_salary }}{{ card.currency }}</p>
      <v-divider class="my-2"></v-divider>
      <div class="mb-2">
        <h2 class="text-h5 font-weight-bold mb-3">{{ $t('info-about-resume') }}</h2>
        <v-row>
          <v-col cols="12" md="4" class="pb-0 pb-md-4">
            <div>
              <div class="mb-1 info-vacancy-types d-flex align-start">
                <label class="text-grey">{{ $t('employment_type') }}</label>
                <div class="d-flex flex-wrap">
                  <p v-for="(condition, index) in card.info_resume.conditions" :key="condition">
                    {{ $t(`work_schedule.${condition}`) }}<span v-if="index !== card.info_resume.conditions.length - 1">,</span>
                  </p>
                </div>
              </div>
              <div class="mb-1 info-vacancy-types d-flex align-start">
                <label class="text-grey">{{ $t('gender') }}, {{ $t('age') }}</label>
                <p>{{ $t(card.info_resume.gender) }}, {{ card.info_resume.age }} {{ getYearLabel(card.info_resume.age) }}</p>
              </div>
              <div class="mb-1 info-vacancy-types d-flex align-start">
                <label class="text-grey">{{ $t('city') }}</label>
                <p>{{ $t(card.info_resume.city) }}</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="pt-0 pt-md-4">
            <div class="mb-1 info-vacancy-types d-flex align-start">
              <label class="text-grey">{{ $t('education') }}</label>
              <p>{{ $t(`educationLevel.${card.education_level}`) }}</p>
            </div>
            <div class="mb-1 info-vacancy-types d-flex align-start">
              <label class="text-grey">{{ $t('work_experience_text') }}</label>
              <p v-if="card.work_experience !== 0">{{ card.work_experience }} {{ getYearLabel(card.work_experience) }}</p>
              <p v-else>{{ $t(`work_experience.NO_EXPERIENCE`)}}</p>
            </div>
            <div class="mb-1 info-vacancy-types d-flex align-start">
              <label class="text-grey">{{ $t('business_trip') }}</label>
              <p>{{ card.info_resume.business_trip ? 'Да' : 'Нет' }}</p>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-divider class="mt-4 mb-2"></v-divider>
      <div class="mb-2" v-if="card.info_resume.work_experience.length">
        <h3 class="text-h5 font-weight-bold mb-3">{{ $t('labor_activity') }}</h3>
        <div v-for="(exp, index) in card.info_resume.work_experience" :key="exp.title" class="d-flex flex-column flex-md-row">
          <p class="text-secondary font-weight-medium mt-1" style="min-width: 300px">{{ $t('from')}} {{ exp.date_from }} {{ $t('to') }} {{ exp.date_to }} </p>
          <div>
            <p class="text-h6">{{ exp.title }}</p>
            <p class="text-body-1 text-secondary">{{ exp.company }}</p>
            <p class="font-weight-regular text-body-1">{{ exp.desc_experience }}</p>
          </div>
        </div>
      </div>
      <v-divider class="mt-4 mb-2" v-if="card.info_resume.work_experience.length"></v-divider>
      <div class="mb-2" v-if="card.info_resume.education.length">
        <h4 class="text-h5 font-weight-bold mb-3">{{ $t('education') }}</h4>
        <div v-for="(edc, index) in card.info_resume.education" :key="edc.place" class="d-flex flex-column flex-md-row">
          <p class="text-secondary font-weight-medium mt-1" style="min-width: 300px">{{ edc.date_from }}</p>
          <div>
            <p class="text-h6">{{ edc.place }}</p>
            <p class="text-body-1 text-secondary">{{ edc.professional }}</p>
          </div>
        </div>
      </div>
      <v-divider class="mt-4 mb-2" v-if="card.info_resume.education.length"></v-divider>
      <div class="mb-2 d-flex flex-column flex-md-row">
        <div style="min-width: 300px">
          <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('professional_skills') }}:</h5>
        </div>
        <div class="d-flex flex-wrap ga-0 ga-sm-1 text-h6 font-weight-regular">
          <p>{{ card.info_resume.personal_skills }};</p>
        </div>
      </div>
      <v-divider class="mb-2"></v-divider>
      <div class="mb-2 d-flex flex-column flex-md-row">
        <div style="min-width: 300px">
          <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('personal_skills') }}:</h5>
        </div>
        <div class="d-flex ga-1 text-h6 font-weight-regular">
          <p>{{ card.info_resume.personal_skills }}</p>
        </div>
      </div>
      <v-divider class="mb-2"></v-divider>
      <div class="d-flex flex-column flex-md-row">
        <div style="min-width: 300px">
          <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('know_lang') }}:</h5>
        </div>
        <div class="d-flex ga-1 text-h6 font-weight-regular">
          <p>{{ card.info_resume.lang }};</p>
        </div>
      </div>
    </main>
  </v-card>
</template>

<style lang="scss">
.info-vacancy-types {
  label {
    display: inline-block;
    min-width: 150px;
  }
}
</style>