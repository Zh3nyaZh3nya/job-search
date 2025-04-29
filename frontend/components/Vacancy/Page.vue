<script setup lang="ts">
import type { IVacancy } from "~/types";

interface IProps {
  card: IVacancy
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
      <span class="text-grey">ID {{ $t('vacancies') }} {{ card.id }}</span>
    </header>
    <main class="mb-2">
      <v-divider class="mb-2"></v-divider>
      <span class="text-body-2 text-grey">{{ $t('vacancy') }} {{ $t('publish_2') }} {{ card.date_publish }}</span>
      <h1 class="mb-1 text-h5 font-weight-bold">{{ card.title }}</h1>
      <p v-if="!card.to_salary" class="text-primary text-h4 mb-1">{{ card.from_salary }}{{ card.currency }}</p>
      <p v-else class="mb-1">{{ $t('from')}} {{ card.from_salary }} {{ $t('to') }} {{ card.to_salary }}{{ card.currency }}</p>
      <h2 class="text-primary font-weight-regular text-h6 mb-1">{{ card.post }}</h2>
      <h3 class="text-grey text-body-1 mb-2">{{ $t(`category.${card.category}`) }}</h3>
      <v-divider class="mb-2"></v-divider>
      <div class="mb-2">
        <h2 class="text-h5 font-weight-bold mb-3">{{ $t('info-about-vacancy') }}</h2>
        <v-row>
          <v-col cols="12" md="4" class="pb-0 pb-md-4">
            <div>
              <div class="mb-1 info-vacancy-types d-flex">
                <label class="text-grey">{{ $t('employment_type') }}</label>
                <div class="d-flex flex-column">
                  <p v-for="text in card.info_vacancy.type_employment" :key="text">
                    {{ $t(`employmentType.${text}`) }};
                  </p>
                </div>

              </div>
              <div class="mb-1 info-vacancy-types d-flex">
                <label class="text-grey">{{ $t('work_schedule_text') }}</label>
                <div class="d-flex flex-column">
                  <p v-for="text in card.info_vacancy.job_format" :key="text">
                    {{ $t(`work_schedule.${text}`) }};
                  </p>
                </div>

              </div>
              <div class="mb-1 info-vacancy-types d-flex">
                <label class="text-grey">{{ $t('internship') }}</label>
                <p>{{ card.info_vacancy.internship ? $t('yes') : $t('no') }}</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="pt-0 pt-md-4">
            <div class="mb-1 info-vacancy-types d-flex">
              <label class="text-grey">{{ $t('education') }}</label>
              <p>{{ $t(`educationLevel.${card.info_vacancy.education}`) }}</p>
            </div>
            <div class="mb-1 info-vacancy-types d-flex">
              <label class="text-grey">{{ $t('work_experience_text') }}</label>
              <p>{{ $t(`work_experience.${card.info_vacancy.work_experience}`) }}</p>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-divider class="mb-2"></v-divider>
      <div class="mb-2">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="3" class="pb-1 pb-md-4">
                <h4 class="text-h5 font-weight-bold">{{ $t('professional_skills') }}</h4>
              </v-col>
              <v-col cols="12" sm="9" class="py-1 py-md-4">
                <p class="text-primary text-h6 font-weight-regular">
                  {{ card.professional_skills }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="3" class="py-1 py-md-4">
                <h4 class="text-h5 font-weight-bold">{{ $t('personal_skills') }}</h4>
              </v-col>
              <v-col cols="12" sm="9" class="pt-0 pt-md-4">
                <p class="text-h6 font-weight-regular">
                  {{ card.personal_skills }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-divider class="mb-2"></v-divider>
      <div>
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-row>
              <v-col cols="12" sm="3" class="pb-0 pb-md-4">
                <h6 class="text-h5 font-weight-bold">{{ $t('region') }}</h6>
              </v-col>
              <v-col cols="12" sm="9" class="pt-0 pt-md-4">
                <p class="text-h6 font-weight-regular">{{ $t(card.city) }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="3" class="pb-0 pb-md-4">
                <h6 class="text-h5 font-weight-bold">{{ $t('place_work') }}</h6>
              </v-col>
              <v-col cols="12" sm="9" class="pt-0 pt-md-4">
                <p class="text-h6 font-weight-regular">{{ card.address }}</p>
              </v-col>
            </v-row>

          </v-col>
        </v-row>
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