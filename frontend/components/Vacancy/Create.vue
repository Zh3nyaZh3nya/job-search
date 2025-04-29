<script setup lang="ts">
import { computed, ref } from "vue"
import { getYearLabel } from "~/utils/getYearLabel";
import { slugify } from "~/utils/slugify";
import { formatDate } from "~/utils/formatDate";
import { generateRandomId } from "~/utils/generateRandomId";
import { useDisplay } from "vuetify";
import {
  Category,
  City,
  Currency,
  EducationLevel,
  EmploymentType,
  WorkExperience,
  WorkSchedule
} from "~/types";
import type { IVacancy } from "~/types";

const { t } = useI18n()
const authStore = useAuthStore()
const store = useStore()
const { width } = useDisplay()

const formEdit = ref()
const id = ref<string>(generateRandomId('VC'))
const title = ref<string>('')
const datePublish = ref<string>(formatDate())
const activeVacancy = ref<boolean>(true)
const post = ref<string | null>(null)
const internship = ref<boolean>(false)
const category = ref<Category>(Category.IT)
const categoryItem = computed(() => {
  return Object.values(Category).map((category) => ({
    title: t(`category.${category}`),
    value: category
  }))
})
const salaryFrom = ref<number | null>(null)
const salaryTo = ref<number | null>(null)
const currency = ref<Currency>(Currency.KZT)
const currencyItem = computed(() => {
  return Object.values(Currency).map((cr) => ({
    title: cr,
    value: cr
  }))
})
const workSchedule = ref<{
  title: string
  value: WorkSchedule
}[]>([{
  title: t(`work_schedule.${WorkSchedule.FREE}`),
  value: WorkSchedule.FREE
}])
const workScheduleItem = computed(() => {
  return Object.values(WorkSchedule).map((condition) => ({
    title: t(`work_schedule.${condition}`),
    value: condition
  }))
})
const employmentType = ref<{
  title: string
  value: EmploymentType
}[]>([{
  title: t(`employmentType.${EmploymentType.FULL_TIME}`),
  value: EmploymentType.FULL_TIME
}])
const employmentTypeItem = computed(() => {
  return Object.values(EmploymentType).map((condition) => ({
    title: t(`employmentType.${condition}`),
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
const workExperience = ref<{
  title: string
  value: WorkExperience
}>({
  title: t(`work_experience.${WorkExperience.NO_EXPERIENCE}`),
  value: WorkExperience.NO_EXPERIENCE
})
const workExperienceItem = computed(() => {
  return Object.values(WorkExperience).map((exp) => ({
    title: t(`work_experience.${exp}`),
    value: exp
  }))
})
const languages = ref<string>('')
const personalSkills = ref<string>('')
const professionalSkills = ref<string>('')
const rules = {
  required: (v: any) => !!v || t('required'),
}

async function editVacancy() {
  const { valid } = await formEdit.value?.validate()

  if(!valid) return

  const bodyData: IVacancy = {
    id: generateRandomId('VC'),
    slug: slugify(title.value),
    title: title.value,
    post: post.value,
    category: category.value,
    from_salary: salaryFrom.value || 0,
    to_salary: salaryTo.value,
    currency: currency.value,
    company: authStore.user.company,
    date_publish: datePublish.value,
    email: authStore.user.email,
    id_user: authStore.user.id_user,
    userType: authStore.user.userType,
    active: activeVacancy.value,
    professional_skills: professionalSkills.value,
    personal_skills: personalSkills.value,
    info_vacancy: {
      job_format: workSchedule.value.map(item => item.value),
      education: education.value,
      type_employment: employmentType.value.map(item => item.value),
      internship: internship.value,
      work_experience: workExperience.value
    },
    city: city.value,
    address: authStore.user.address,
  }

  await store.createVacancy(bodyData)

  resetForm()
}

function resetForm() {
  id.value = generateRandomId('VC')
  title.value = ''
  datePublish.value = formatDate()
  activeVacancy.value = true
  post.value = null
  internship.value = false
  category.value = Category.IT
  salaryFrom.value = null
  salaryTo.value = null
  currency.value = Currency.KZT
  workSchedule.value = [{
    title: t(`work_schedule.${WorkSchedule.FREE}`),
    value: WorkSchedule.FREE
  }]
  employmentType.value = [{
    title: t(`employmentType.${EmploymentType.FULL_TIME}`),
    value: EmploymentType.FULL_TIME
  }]
  city.value = City.ALMATY
  education.value = EducationLevel.HIGHER
  workExperience.value = {
    title: t(`work_experience.${WorkExperience.NO_EXPERIENCE}`),
    value: WorkExperience.NO_EXPERIENCE
  }
  languages.value = ''
  personalSkills.value = ''
  professionalSkills.value = ''
}

</script>

<template>
  <v-card
      class="card-not-hover pa-4 info-vacancy-edit"
      elevation="0"
      :hover="false"
      rounded="lg"
  >
    <v-form ref="formEdit" @submit.prevent="editVacancy">
      <header class="mb-2 d-flex align-center justify-space-between flex-wrap w-100 w-sm-auto">
        <div class="d-flex align-center flex-column flex-sm-row ga-2 w-100 w-sm-auto w-sm-auto">
          <span class="text-grey">ID {{ $t('vacancy') }} {{ id }}</span>
          <div class="d-flex align-center justify-space-between w-100 w-sm-auto mt-2 mt-sm-0">
            <p :class="activeVacancy ? 'text-success' : 'text-error'" class="w-100">{{ activeVacancy ? $t('active') : $t('not-active') }}</p>
            <div class="d-flex d-sm-none justify-end align-center ga-2 w-100">
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
                  @click="activeVacancy = !activeVacancy"
              >
                <v-icon v-if="activeVacancy" icon="mdi-eye" color="primary"></v-icon>
                <v-icon v-else icon="mdi-eye-closed" color="primary"></v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="d-none d-sm-flex align-center ga-2">
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
              @click="activeVacancy = !activeVacancy"
          >
            <v-icon v-if="activeVacancy" icon="mdi-eye" color="primary"></v-icon>
            <v-icon v-else icon="mdi-eye-closed" color="primary"></v-icon>
          </v-btn>
        </div>
      </header>
      <main class="mb-2">
        <v-divider class="mb-2"></v-divider>
        <p class="text-body-2 text-grey mb-2">{{ $t('publish') }} {{ datePublish }}</p>
        <div class="mb-1 d-flex align-center flex-wrap ga-2">
          <p class="text-grey text-h6 font-weight-regular" style="min-width: 100px">{{ $t('title') }}: </p>
          <v-text-field
              v-model="title"
              variant="outlined"
              :hide-details="true"
              :rules="[rules.required]"
              color="primary"
              :placeholder="$t('edit-placeholder-title')"
              :width="width < 600 ? '100%' : ''"
              :max-width="width < 600 ? '100%' : ''"
          />
        </div>
        <div class="mb-2 d-flex align-center flex-wrap ga-2">
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
              :width="width < 600 ? '100%' : ''"
              :max-width="width < 600 ? '100%' : ''"
          />
        </div>
        <div class="mb-1 d-flex align-center flex-wrap ga-2">
          <p class="text-grey text-h6 font-weight-regular" style="min-width: 100px">{{ $t('grade') }}: </p>
          <v-text-field
              v-model="post"
              variant="outlined"
              :hide-details="true"
              :rules="[rules.required]"
              color="primary"
              :placeholder="$t('edit-placeholder-grade')"
              :width="width < 600 ? '100%' : ''"
              :max-width="width < 600 ? '100%' : ''"
          />
        </div>
        <div class="mb-1 d-flex align-center flex-wrap ga-2">
          <p class="text-grey text-h6 font-weight-regular" style="min-width: 100px">{{ $t('salary') }}: </p>
          <div class="d-flex align-center flex-wrap ga-2">
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
            {{ $t('to') }}
            <v-text-field
                type="number"
                v-model="salaryTo"
                variant="outlined"
                :hide-details="true"
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

        </div>
        <v-divider class="my-2"></v-divider>
        <div class="mb-2">
          <h2 class="text-h5 font-weight-bold mb-3">{{ $t('info-about-vacancy') }}</h2>
          <v-row>
            <v-col cols="12" md="4" class="pb-0 pb-md-4">
              <div>
                <div class="mb-1 info-vacancy-types d-flex align-start flex-wrap flex-sm-nowrap">
                  <label class="text-grey mb-2 mb-sm-0">{{ $t('employment_type') }}</label>
                  <v-combobox
                      chips
                      multiple
                      v-model="employmentType"
                      :items="employmentTypeItem"
                      item-title="title"
                      item-value="value"
                      variant="outlined"
                      :hide-details="true"
                      :rules="[rules.required]"
                      :placeholder="$t('edit-placeholder-employment')"
                      color="primary"
                      :width="width < 600 ? '100%' : ''"
                      :max-width="width < 600 ? '100%' : ''"
                  />
                </div>

                <div class="mb-1 info-vacancy-types d-flex align-start flex-wrap flex-sm-nowrap">
                  <label class="text-grey mb-2 mb-sm-0">{{ $t('work_schedule_text') }}</label>
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
                      :width="width < 600 ? '100%' : ''"
                      :max-width="width < 600 ? '100%' : ''"
                  />
                </div>

                <div class="mb-1 info-vacancy-types d-flex align-start flex-wrap flex-sm-nowrap">
                  <label class="text-grey mb-2 mb-sm-0">{{ $t('internship') }}</label>
                  <v-select
                      v-model="internship"
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
                      :width="width < 600 ? '100%' : ''"
                      :max-width="width < 600 ? '100%' : ''"
                  />
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="5" class="pt-0 pt-md-4">
              <div class="mb-1 info-vacancy-types d-flex align-start flex-wrap flex-sm-nowrap">
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
                    :width="width < 600 ? '100%' : ''"
                    :max-width="width < 600 ? '100%' : ''"
                />
              </div>

              <div class="mb-1 info-vacancy-types d-flex align-start flex-wrap flex-sm-nowrap">
                <label class="text-grey">{{ $t('work_experience_text') }}</label>
                <v-select
                    v-model="workExperience"
                    :items="workExperienceItem"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    :hide-details="true"
                    color="primary"
                    :rules="[rules.required]"
                    :placeholder="$t('edit-placeholder-education')"
                    :width="width < 600 ? '100%' : ''"
                    :max-width="width < 600 ? '100%' : ''"
                />
              </div>
            </v-col>
          </v-row>
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
        <div class="mb-4 d-flex flex-column flex-md-row">
          <div style="min-width: 300px">
            <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('city') }}:</h5>
          </div>
          <div class="d-flex ga-1 text-h6 font-weight-regular w-100">
            <v-select
                v-model="city"
                :items="cityItem"
                item-title="title"
                item-value="value"
                variant="outlined"
                :hide-details="true"
                color="primary"
                :rules="[rules.required]"
                :placeholder="$t('edit-placeholder-education')"
            />
          </div>
        </div>
        <div class="mb-2 d-flex flex-column flex-md-row">
          <div style="min-width: 300px">
            <h5 class="text-h5 font-weight-bold mb-3" style="max-width: 210px">{{ $t('place_work') }}:</h5>
          </div>
          <div class="d-flex ga-1 text-h6 font-weight-regular w-100">
            <p>{{ authStore.user.address }}</p>
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