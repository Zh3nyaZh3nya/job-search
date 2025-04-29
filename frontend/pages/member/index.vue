<script setup lang="ts">
import { resumeTransformToCard } from "~/assets/staticData/resumeTransformToCard";
import type { IUserMember } from "~/types";

const authStore = useAuthStore()
const { user, resume } = storeToRefs(authStore)
const { fetchUserResumes } = authStore
const localePath = useLocalePath()

const openDialogRemove = ref<boolean>(false)
const removeIndexResume = ref<number | null>(null)

await fetchUserResumes()

async function confirmRemove() {
  if(removeIndexResume.value === null) return

  await authStore.deleteUserResume(resume.value[removeIndexResume.value].id)
  removeIndexResume.value = null
  openDialogRemove.value = false
}

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
            <div v-if="resume.length">
              <v-row>
                <v-col
                    v-for="(item, index) in resumeTransformToCard(resume, 'usually')"
                    :key="item.title"
                    cols="12"
                >
                  <ResumeCard :card="item" :profile="true" @remove-card="openDialogRemove = !openDialogRemove, removeIndexResume = index" />
                </v-col>

              </v-row>
              <div class="d-flex justify-center">
                <v-btn
                    color="primary"
                    elevation="0"
                    class="mt-2 text-none text-h6"
                    min-width="0"
                    :to="localePath('/member/create-resume')"
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
              <p>{{ $t('not-resume-title') }}</p>
              <p>{{ $t('not-resume-subtitle') }}</p>
              <v-btn
                  color="primary"
                  elevation="0"
                  class="mt-2 text-none px-0 py-0 text-h6"
                  min-width="0"
                  :to="localePath('/member/create-resume')"
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
              class="d-flex justify-center align-start w-100"
          >
            <v-sheet rounded="xl" elevation="" color="white" height="275px" width="100%" class="pa-4 card-not-hover text-center">
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