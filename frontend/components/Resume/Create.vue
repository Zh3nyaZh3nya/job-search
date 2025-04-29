<script setup lang="ts">
import { computed, ref } from "vue"
import { getYearLabel } from "~/utils/getYearLabel";
import { slugify } from "~/utils/slugify";
import { formatDate } from "~/utils/formatDate";
import { generateRandomId } from "~/utils/generateRandomId";
import { Category, City, Currency, EducationLevel, WorkSchedule } from "~/types";
import type { IResume } from "~/types";

const { t } = useI18n()
const authStore = useAuthStore()
const store = useStore()

const formEdit = ref()
const id = ref<string>(generateRandomId('RM'))
const title = ref<string>('')
const datePublish = ref<string>(formatDate())
const activeResume = ref<boolean>(true)
const category = ref<Category>(Category.IT)
const categoryItem = computed(() => {
  return Object.values(Category).map((category) => ({
    title: t(`category.${category}`),
    value: category
  }))
})
const salaryFrom = ref<number | null>(null)
const currency = ref<Currency>(Currency.KZT)
const currencyItem = computed(() => {
  return Object.values(Currency).map((cr) => ({
    title: cr,
    value: cr
  }))
})
const workSchedule = ref<Record<string, string | WorkSchedule>[]>([{
  title: t(`work_schedule.${WorkSchedule.FREE}`),
  value: WorkSchedule.FREE
}])
const workScheduleItem = computed(() => {
  return Object.values(WorkSchedule).map((condition) => ({
    title: t(`work_schedule.${condition}`),
    value: condition
  }))
})
const city = ref<City>(City.ALMATY)
const cityItem = computed(() => {
  return Object.values(City).map((city) => ({
    title: t(`${city}`),
    value: city
  }))
})
const education = ref<EducationLevel>(EducationLevel.HIGHER)
const educationItem = computed(() => {
  return Object.values(EducationLevel).map((education) => ({
    title: t(`educationLevel.${education}`),
    value: education
  }))
})
const workExperience = ref<number>(0)
const businessTrip = ref<boolean>(false)
const infoWorkExperience = ref<IResume['info_resume']['work_experience']>([])
const educationExp = ref<IResume['info_resume']['education']>([])
const languages = ref<string>('')
const personalSkills = ref<string>('')
const professionalSkills = ref<string>('')
const rules = {
  required: (v: any) => !!v || t('required'),
  date: (v: any) => v.length === 10 || t('required'),
}

async function editResume() {
  const { valid } = await formEdit.value?.validate()

  if(!valid) return

  const bodyData: IResume = {
    id: id.value,
    title: title.value,
    slug: slugify(title.value),
    from_salary: salaryFrom.value,
    currency: currency.value,
    work_experience: workExperience.value,
    date_publish: datePublish.value,
    avatar: 'mdi-account-circle-outline',
    education_level: education.value,
    category: category.value,
    email: authStore.user.email,
    id_user: authStore.user.id_user,
    userType: authStore.user.userType,
    active: activeResume.value,
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
    }
  }

  await store.createResume(bodyData)

  resetForm()
}

function resetForm() {
  id.value = generateRandomId('RM')
  title.value = ''
  datePublish.value = formatDate()
  activeResume.value = true
  category.value = Category.IT
  salaryFrom.value = null
  currency.value = Currency.KZT
  workSchedule.value = [
    { title: t(`work_schedule.${WorkSchedule.FREE}`), value: WorkSchedule.FREE }
  ]
  city.value = City.ALMATY
  education.value = EducationLevel.HIGHER
  workExperience.value = 0
  businessTrip.value = false
  infoWorkExperience.value = []
  educationExp.value = []
  languages.value = ''
  personalSkills.value = ''
  professionalSkills.value = ''
}

watch(workExperience, (newExp) => {
  if(String(newExp) === '') {
    workExperience.value = 0
  }
})
</script>

<template>
  <v-card
      class="card-not-hover pa-4 info-vacancy-edit"
      elevation="0"
      :hover="false"
      rounded="lg"
  >
    <v-form ref="formEdit" @submit.prevent="editResume">
      <header class="mb-2 d-flex align-center justify-space-between">
        <div class="d-flex ga-2">
          <span class="text-grey">ID {{ $t('resume') }} {{ id }}</span>
          <span :class="activeResume ? 'text-success' : 'text-error'">{{ activeResume ? $t('active') : $t('not-active') }}</span>
        </div>
        <div class="d-flex align-center ga-2">
          <v-btn
              color="primary"
              elevation="0"
              class="text-h6 text-none"
              size="large"
              width="100px"
              type="submit"
          >
            {{ $t('save') }}
          </v-btn>
          <v-btn
              elevation="0"
              class="text-h6 text-none"
              size="large"
              min-width="0"
              variant="text"
              @click="activeResume = !activeResume"
          >
            <v-icon v-if="activeResume" icon="mdi-eye" color="primary"></v-icon>
            <v-icon v-else icon="mdi-eye-closed" color="primary"></v-icon>
          </v-btn>
        </div>
      </header>
      <main class="mb-2">
        <v-divider class="mb-2"></v-divider>
        <p class="text-body-2 text-grey mb-2">{{ $t('publish') }} {{ datePublish }}</p>
        <div class="mb-1 d-flex align-center ga-2">
          <p class="text-grey text-h6 font-weight-regular" style="min-width: 100px">{{ $t('title') }}: </p>
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
          <p class="text-grey text-h6 font-weight-regular" style="min-width: 100px">{{ $t('category-text') }}: </p>
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
          <p class="text-grey text-h6 font-weight-regular" style="min-width: 100px">{{ $t('salary') }}: </p>
          <v-text-field
              type="number"
              v-model="salaryFrom"
              variant="outlined"
              :hide-details="true"
              color="primary"
              :rules="[rules.required]"
              :placeholder="$t('edit-placeholder-from-salary')"
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
                      color="primary"
                      :placeholder="$t('edit-placeholder-work-experience')"
                      max-width="60px"
                      type="number"
                  />
                  <p v-if="Number(workExperience) !== 0">{{ getYearLabel(workExperience) }}</p>
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
              v-if="workExperience !== 0"
              v-model="infoWorkExperience"
              :item-fields="[
                { key: 'date_from', dateField: true, label: $t('from'), placeholder: '2020-01-01', rules: [rules.required, rules.date], },
                { key: 'date_to', dateField: true, label: $t('to'), placeholder: '2024-01-01', rules: [rules.required, rules.date], },
                { key: 'title', label: $t('position'), placeholder: 'Frontend Developer', rules: [rules.required] },
                { key: 'company', label: $t('company'), placeholder: 'Google', rules: [rules.required] },
                { key: 'desc_experience', label: $t('experience-description'), placeholder: 'Работал в ...' , type: 'textarea'},
              ]"
              :title="$t('labor_activity')"
              :empty_text="`
                <p>${$t('you-dont-have-work-exp-title')}</p>
                <p>${$t('you-dont-have-work-exp-subtitle')}</p>
              `"
          />
          <div v-else>
            <h3 class="text-h5 font-weight-bold mb-3">{{ $t('labor_activity') }}</h3>
            <p class="text-h6 font-weight-regular">{{ $t('you-dont-have-work-exp') }}</p>
          </div>
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
              :empty_text="`
                <p>${$t('you-dont-have-education-exp-title')}</p>
                <p>${$t('you-dont-have-education-exp-subtitle')}</p>
              `"
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
        <div class="d-flex flex-column flex-md-row">
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
      </main>
    </v-form>
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