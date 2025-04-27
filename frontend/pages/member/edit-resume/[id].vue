<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "~/store/auth";
import { useLocalePath } from "~/.nuxt/imports";

const store = useAuthStore()
const route = useRoute()
const localePath = useLocalePath()

const resume = computed(() => store.resume.find(item => item.id === Number(route.params.id)))
</script>

<template>
  <v-main>
    <section>
      <v-container v-if="resume">
        <v-btn
            variant="text"
            class="text-none px-0 text-h6 font-weight-regular link mb-4"
            min-width="0"
            :to="localePath('/member')"
        >
          <div class="d-flex align-center">
            <v-icon icon="mdi-chevron-left" size="24" class="mt-1"></v-icon>
            <p>{{ $t('go-to-back') }}</p>
          </div>
        </v-btn>
        <h1 class="text-h4">{{ $t('resume') }}: {{ resume.title }}</h1>
      </v-container>
    </section>
    <section>
      <v-container v-if="resume">
        <ResumeEdit :card="resume" />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>