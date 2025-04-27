<script setup lang="ts">
import { resumeTransformToCard } from "~/assets/staticData/resumeTransformToCard";
import type { IUserMember } from "~/types";

const authStore = useAuthStore()
const { user, resume } = storeToRefs(authStore)
const { fetchUserResumes } = authStore
const localePath = useLocalePath()

await fetchUserResumes()

const memberUser = computed(() => {
  if (user.value?.userType === 'member') {
    return user.value as IUserMember
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
        <h2 class="text-h5 mb-4">{{ $t('your-resume') }}</h2>
        <v-row class="d-flex flex-column-reverse flex-md-row flex-lg-row">
          <v-col
              cols="12"
              md="8"
          >
            <v-row v-if="resume.length">
              <v-col
                  v-for="item in resumeTransformToCard(resume, 'usually')"
                  :key="item.title"
                  cols="12"
              >
                <ResumeCard :card="item" :profile="true" />
              </v-col>
            </v-row>
            <div v-else class="text-h5">
              <p>{{ $t('not-resume-title') }}</p>
              <p>{{ $t('not-resume-subtitle') }}</p>
              <v-btn
                  color="primary"
                  elevation="0"
                  class="mt-2 text-none px-0 py-0 text-h6"
                  min-width="0"
                  :to="localePath('/create-resume')"
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
              v-if="memberUser"
              class="d-flex justify-center w-100"
          >
            <v-sheet rounded="xl" elevation="" color="white" width="100%" class="pa-4 card-not-hover text-center">
              <h4 class="text-h6 font-weight-regular mb-2">{{ $t('your-profile') }}</h4>
              <v-icon icon="mdi-account-circle-outline" color="primary" size="80" class="mb-2" />
              <p>{{ memberUser.email }}</p>
              <p>
                {{ memberUser.name }} {{ memberUser.last_name }}
              </p>
              <v-btn
                  :to="localePath('/member/profile')"
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
  </v-main>
</template>

<style scoped>

</style>