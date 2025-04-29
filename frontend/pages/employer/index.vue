<script setup lang="ts">
import { vacancyTransformToCard } from "~/assets/staticData/vacancyTransformToCard";
import type { IUserEmployer } from "~/types";

const authStore = useAuthStore()
const { user, vacancy } = storeToRefs(authStore)
const { fetchUserVacancy } = authStore
const localePath = useLocalePath()

const openDialogRemove = ref<boolean>(false)
const removeIndexVacancy = ref<number | null>(null)

await fetchUserVacancy()

async function confirmRemove() {
  if(removeIndexVacancy.value === null) return

  await authStore.deleteUserVacancy(vacancy.value[removeIndexVacancy.value].id)
  removeIndexVacancy.value = null
  openDialogRemove.value = false
}

const employerUser = computed(() => {
  if (user.value?.userType === 'employer') {
    return user.value as IUserEmployer
  }
  return null
})

definePageMeta({
  middleware: 'role'
})
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <h2 class="text-h5 mb-4">{{ $t('your-vacancy') }}</h2>
        <v-row class="d-flex flex-column-reverse flex-md-row flex-lg-row">
          <v-col
              cols="12"
              md="8"
          >
            <div v-if="vacancy.length">
              <v-row>
                <v-col
                    v-for="(item, index) in vacancyTransformToCard(vacancy, 'usually')"
                    :key="item.title"
                    cols="12"
                >
                  <VacancyCard :card="item" :profile="true" @remove-card="openDialogRemove = !openDialogRemove, removeIndexVacancy = index" />
                </v-col>

              </v-row>
              <div class="d-flex justify-center">
                <v-btn
                    color="primary"
                    elevation="0"
                    class="mt-2 text-none text-h6"
                    min-width="0"
                    :to="localePath('/employer/create-vacancy')"
                    size="large"
                >
                  <div class="d-flex align-center ga-2">
                    <p>{{ $t('add') }}</p>
                    <v-icon icon="mdi-plus-circle-outline" size="18"></v-icon>
                  </div>

                </v-btn>
              </div>
            </div>

            <div v-else class="text-h5">
              <p>{{ $t('not-vacancy-title') }}</p>
              <p>{{ $t('not-vacancy-subtitle') }}</p>
              <v-btn
                  color="primary"
                  elevation="0"
                  class="mt-2 text-none px-0 py-0 text-h6"
                  min-width="0"
                  :to="localePath('/employer/create-vacancy')"
                  size="large"
                  variant="text"
              >
                <div class="d-flex align-center ga-2">
                  <p>{{ $t('create') }}</p>
                  <v-icon icon="mdi-arrow-right" size="18"></v-icon>
                </div>

              </v-btn>
            </div>
          </v-col>
          <v-col
              cols="12"
              md="4"
              v-if="employerUser"
              class="d-flex justify-center align-start w-100"
          >
            <v-sheet rounded="xl" elevation="" color="white" height="275px" width="100%" class="pa-4 card-not-hover text-center">
              <h4 class="text-h6 font-weight-regular mb-2">{{ $t('your-profile') }}</h4>
              <v-icon icon="mdi-account-circle-outline" color="primary" size="80" class="mb-2" />
              <p>{{ employerUser.email }}</p>
              <p>
                {{ employerUser.company }}
              </p>
              <v-btn
                  :to="localePath('/employer/profile')"
                  color="primary"
                  width="200px"
                  elevation="0"
                  class="mt-4 text-none"
                  size="large"
                  variant="outlined"
                  rounded="xl"
              >
                {{ $t('go-to') }}
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-dialog v-model="openDialogRemove" max-width="500">
      <v-card class="pa-4 rounded-lg">
        <p class="text-h6 text-center mb-4">{{ $t('edit-dialog-remove-title') }}</p>
        <div class="d-flex justify-center ga-4">
          <v-btn color="primary" @click="confirmRemove">{{ $t('confirm') }}</v-btn>
          <v-btn color="error" @click="openDialogRemove = false">{{ $t('cancel') }}</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<style scoped>

</style>