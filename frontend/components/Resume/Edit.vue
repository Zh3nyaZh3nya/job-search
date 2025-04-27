<script setup lang="ts">
import { ref, computed } from "vue"
import { getYearLabel } from "~/utils/getYearLabel";
import { useApi } from "~/composables/useApi";
import { slugify } from "~/utils/slugify";
import {
  Category, CategoryDriveLicense, City, Currency, EducationLevel, EmploymentType,
  WorkSchedule
} from "~/types";
import type { IResume } from "~/types";
import {formatDate} from "~/utils/formatDate";



interface IProps {
  card: IResume
}

const props = defineProps<IProps>()
const { t } = useI18n()
const authStore = useAuthStore()

const title = ref<string>(props.card.title)
const category = ref<string>(props.card.category)
const categoryItem = computed(() => {
  return Object.values(Category).map((category) => ({
    title: t(`category.${category}`),
    value: category
  }))
})
const salaryFrom = ref<number>(props.card.from_salary)
const salaryTo = ref<number>(props.card.to_salary)
const currency = ref<string>(props.card.currency)
const currencyItem = computed(() => {
  return Object.values(Currency).map((cr) => ({
    title: cr,
    value: cr
  }))
})
const workSchedule = ref(props.card.info_resume.conditions.map((condition) => ({
  title: t(`work_schedule.${condition}`),
  value: condition
})))
const workScheduleItem = computed(() => {
  return Object.values(WorkSchedule).map((condition) => ({
    title: t(`work_schedule.${condition}`),
    value: condition
  }))
})
const city = ref<City>(props.card.info_resume.city)
const cityItem = computed(() => {
  return Object.values(City).map((city) => ({
    title: t(`${city}`),
    value: city
  }))
})
const education = ref<EducationLevel>(props.card.education_level)
const educationItem = computed(() => {
  return Object.values(EducationLevel).map((education) => ({
    title: t(`educationLevel.${education}`),
    value: education
  }))
})
const workExperience = ref<number>(props.card.work_experience)
const businessTrip = ref<boolean>(props.card.info_resume.business_trip)
const infoWorkExperience = ref<Record<string, string>>(props.card.info_resume.work_experience)
const educationExp = ref<Record<string, string>>(props.card.info_resume.education)
const languages = ref(props.card.info_resume.lang)
const personalSkills = ref(props.card.info_resume.personal_skills)
const professionalSkills = ref(props.card.info_resume.professional_skills)
const rules = {
  required: (v: any) => !!v || t('required'),
  date: (v: any) => v.length === 10 || t('required'),
}

async function editResume() {
  try {
    const bodyData: IResume = {
      id: props.card.id,
      title: title.value,
      slug: slugify(title.value),
      from_salary: salaryFrom.value,
      currency: currency.value,
      work_experience: workExperience.value,
      date_publish: formatDate(),
      avatar: 'mdi-account-circle-outline',
      education_level: education.value,
      category: category.value,
      email: authStore.user.email,
      id_user: authStore.user.id_user,
      userType: authStore.user.userType,
      active: true,
      to_salary: salaryTo.value,
      info_resume: {
        conditions: workSchedule.value.map(item => item.value),
        removal: businessTrip.value,
        business_trip: businessTrip.value,
        gender: authStore.user.gender,
        age: authStore.user.age,
        city: city.value,
        work_experience: infoWorkExperience.value,
        education: educationExp.value,
        professional_skills: professionalSkills.value,
        personal_skills: personalSkills.value,
        lang: languages.value,
        category_drive_license: props.card.info_resume.category_drive_license || []
      }
    }

    const { data } = await useApi('/api/edit-resume', {
      method: 'POST',
      body: bodyData
    })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <v-card
      v-if="card"
      class="card-not-hover pa-4 info-vacancy-edit"
      elevation="0"
      :hover="false"
      rounded="lg"
  >
    <header class="mb-2 d-flex align-center justify-space-between">
      <span class="text-grey">ID {{ $t('resume') }} {{ card.id }}</span>
      <v-btn
        color="primary"
        elevation="0"
        class="text-h6 text-none"
        size="large"
        width="100px"
        @click="editResume"
      >
        {{ $t('save') }}
      </v-btn>
    </header>
    <main class="mb-2">
      <v-divider class="mb-2"></v-divider>
      <p class="text-body-2 text-grey mb-2">{{ $t('publish') }} {{ card.date_publish }}</p>
      <div class="mb-1 d-flex align-center ga-2">
        <p class="text-grey text-h6 font-weight-regular">{{ $t('title') }}: </p>
        <v-text-field
          v-model="title"
          variant="outlined"
          :hide-details="true"
          :rules="[rules.required]"
          color="primary"
          :placeholder="$t('edit-placeholder-title')"
        />
      </div>
      <div class="mb-2 d-flex align-center ga-2">
        <p class="text-grey text-h6 font-weight-regular">{{ $t('category-text') }}: </p>
        <v-select
            v-model="category"
            :items="categoryItem"
            item-title="title"
            item-value="value"
            variant="outlined"
            :hide-details="true"
            color="primary"
            :rules="[rules.required]"
            :placeholder="$t('edit-placeholder-category')"
        />
      </div>
      <div class="mb-1 d-flex align-center ga-2">
        <p class="text-primary text-h4">{{ $t('from')}} </p>
        <v-text-field
            type="number"
            v-model="salaryFrom"
            variant="outlined"
            :hide-details="true"
            :rules="[rules.required]"
            color="primary"
            :placeholder="$t('edit-placeholder-from-salary')"
            max-width="100px"
        />
        <p class="text-primary text-h4">{{ $t('to') }}</p>
        <v-text-field
            type="number"
            v-model="salaryTo"
            variant="outlined"
            :hide-details="true"
            :rules="[rules.required]"
            color="primary"
            :placeholder="$t('edit-placeholder-to-salary')"
            max-width="100px"
        />
        <v-select
            v-model="currency"
            :items="currencyItem"
            item-title="title"
            item-value="value"
            variant="outlined"
            :hide-details="true"
            color="primary"
            :rules="[rules.required]"
            :placeholder="$t('edit-placeholder-currency')"
            max-width="100px"
        />
      </div>
      <v-divider class="my-2"></v-divider>
      <div class="mb-2">
        <h2 class="text-h5 font-weight-bold mb-3">{{ $t('info-about-resume') }}</h2>
        <v-row>
          <v-col cols="12" md="4" class="pb-0 pb-md-4">
            <div>
              <div class="mb-1 info-vacancy-types d-flex align-start">
                <label class="text-grey">{{ $t('employment_type') }}</label>
                <v-combobox
                    chips
                    multiple
                    v-model="workSchedule"
                    :items="workScheduleItem"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    :hide-details="true"
                    :rules="[rules.required]"
                    :placeholder="$t('edit-placeholder-employment')"
                    color="primary"
                />
              </div>
              <div class="mb-2 info-vacancy-types d-flex align-start">
                <label class="text-grey">{{ $t('gender') }}, {{ $t('age') }}</label>
                <p>{{ $t(authStore.user.gender) }}, {{ authStore.user.age }} {{ getYearLabel(authStore.user.age) }}</p>
              </div>
              <div class="mb-1 info-vacancy-types d-flex align-start">
                <label class="text-grey">{{ $t('city') }}</label>
                <v-select
                    v-model="city"
                    :items="cityItem"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    :hide-details="true"
                    color="primary"
                    :rules="[rules.required]"
                    :placeholder="$t('edit-placeholder-city')"
                />
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="pt-0 pt-md-4">
            <div class="mb-1 info-vacancy-types d-flex align-start">
              <label class="text-grey">{{ $t('education') }}</label>
              <v-select
                  v-model="education"
                  :items="educationItem"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  :hide-details="true"
                  color="primary"
                  :rules="[rules.required]"
                  :placeholder="$t('edit-placeholder-education')"
              />
            </div>
            <div class="mb-1 info-vacancy-types d-flex align-start">
              <label class="text-grey">{{ $t('work_experience_text') }}</label>
              <div class="d-flex align-center ga-2">
                <v-text-field
                    v-model="workExperience"
                    variant="outlined"
                    :hide-details="true"
                    :rules="[rules.required]"
                    color="primary"
                    :placeholder="$t('edit-placeholder-work-experience')"
                    max-width="60px"
                    type="number"
                />
                <p>{{ getYearLabel(workExperience) }}</p>
              </div>
            </div>
            <div class="mb-1 info-vacancy-types d-flex align-start">
              <label class="text-grey">{{ $t('business_trip') }}</label>
              <v-select
                  v-model="businessTrip"
                  :items="[
                      {
                        title: $t('yes'),
                        value: true
                      },
                      {
                        title: $t('no'),
                        value: false
                      }
                  ]"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  :hide-details="true"
                  color="primary"
                  :rules="[rules.required]"
                  :placeholder="$t('edit-placeholder-business_trip')"
                  max-width="80px"
              />
            </div>
          </v-col>
        </v-row>
      </div>
      <v-divider class="mt-4 mb-2"></v-divider>
      <div class="mb-2">
        <UIEditSection
            v-model="infoWorkExperience"
            :item-fields="[
              { key: 'date_from', dateField: true, label: $t('from'), placeholder: '2020-01-01', rules: [rules.required, rules.date], },
              { key: 'date_to', dateField: true, label: $t('to'), placeholder: '2024-01-01', rules: [rules.required, rules.date], },
              { key: 'title', label: $t('position'), placeholder: 'Frontend Developer', rules: [rules.required] },
              { key: 'company', label: $t('company'), placeholder: 'Google', rules: [rules.required] },
              { key: 'desc_experience', label: $t('experience-description'), placeholder: 'Работал в ...' , type: 'textarea'},
            ]"
            :title="$t('labor_activity')"
        />
      </div>
      <v-divider class="mt-4 mb-2"></v-divider>
      <div class="mb-2">
        <UIEditSection
            v-model="educationExp"
            :item-fields="[
              { key: 'date_from', dateField: true, label: $t('year-finish'), placeholder: '2015-09-01', rules: [rules.required, rules.date] },
              { key: 'place', label: $t('place'), placeholder: 'University Name', rules: [rules.required] },
              { key: 'professional', label: $t('speciality'), placeholder: 'Software Engineering', rules: [rules.required] },
            ]"
            :title="$t('education')"
        />
      </div>
      <v-divider class="mt-4 mb-2"></v-divider>
      <div class="mb-2 d-flex flex-column flex-md-row">
        <div style="min-width: 300px">
          <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('professional_skills') }}:</h5>
        </div>
        <div class="d-flex ga-1 text-h6 font-weight-regular w-100">
          <v-textarea
              v-model="professionalSkills"
              variant="outlined"
              :hide-details="true"
              :rules="[rules.required]"
              color="primary"
              :placeholder="$t('edit-placeholder-professional-skills')"
              width="100%"
              max-width="100%"
          />
        </div>
      </div>
      <v-divider class="mb-2"></v-divider>
      <div class="mb-2 d-flex flex-column flex-md-row">
        <div style="min-width: 300px">
          <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('personal_skills') }}:</h5>
        </div>
        <div class="d-flex ga-1 text-h6 font-weight-regular w-100">
          <v-textarea
              v-model="personalSkills"
              variant="outlined"
              :hide-details="true"
              :rules="[rules.required]"
              color="primary"
              :placeholder="$t('edit-placeholder-personal-skills')"
              width="100%"
              max-width="100%"
          />
        </div>
      </div>
      <v-divider class="mb-2"></v-divider>
      <div class="d-flex flex-column flex-md-row" :class="card.info_resume.category_drive_license.length ? 'mb-2' : ''">
        <div style="min-width: 300px">
          <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('know_lang') }}:</h5>
        </div>
        <div class="d-flex ga-1 text-h6 font-weight-regular w-100">
          <v-text-field
              v-model="languages"
              variant="outlined"
              :hide-details="true"
              :rules="[rules.required]"
              color="primary"
              :placeholder="$t('edit-placeholder-lang')"
              width="100%"
              max-width="100%"
          />
        </div>
      </div>
      <v-divider class="mb-2" v-if="card.info_resume.category_drive_license.length"></v-divider>
      <div class="d-flex" v-if="card.info_resume.category_drive_license.length">
        <div style="min-width: 300px">
          <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('category_drive_license') }}:</h5>
        </div>
        <div class="d-flex ga-1 text-h6 font-weight-regular">
          <p v-for="lic in card.info_resume.category_drive_license" :key="lic">{{ lic }};</p>
        </div>
      </div>
    </main>
  </v-card>
</template>

<style lang="scss">
.info-vacancy {
  &-types {
    label {
      display: inline-block;
      width: 150px;
    }
  }
  &-edit {
    .v-input {
      max-width: 250px;
      .v-field__input {
        padding: 4px 4px 4px 12px;
        min-height: 40px;
        -webkit-mask-image: none;
        mask-image: none;
      }
    }
  }

}
</style>