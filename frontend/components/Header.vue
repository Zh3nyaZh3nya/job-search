<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useLocalePath } from "#i18n"

type LocaleCode = typeof locales.value[number]['code']

interface IMenu {
  title: string,
  link: string
}

const { locale, locales } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()

const menu = ref<IMenu[]>([
  {
    title: 'menu_title_1',
    link: '/search/resume',
  },
  {
    title: 'menu_title_2',
    link: '/search/vacancy',
  },
])

const changeLanguage = (lang: LocaleCode): void => {
  if (locale.value !== lang) {
    locale.value = lang
    const path = localePath(route.path)
    router.push(path)
  }
}
</script>

<template>
  <v-app-bar class="bg-transparent py-2 text-white position-absolute" elevation="0">
    <v-container class="d-flex">
      <nuxt-link :to="localePath('/')" class="mr-10 text-h4">
        <span class="text-primary font-weight-bold">Search</span><span>Job</span>
      </nuxt-link>
      <ul class="d-flex align-center ga-4">
        <li v-for="item in menu" :key="item.link" class="text-h6">
          <nuxt-link :to="item.link">
            {{ $t(item.title) }}
          </nuxt-link>
        </li>
      </ul>
      <v-spacer />
      <v-btn
          variant="outlined"
          class="text-none text-body-1 mr-4"
          rounded="xl"
          elevation="0"
          @click="changeLanguage(locale === 'ru' ? locales[1].code : locales[0].code)"
      >
        {{ locale === 'ru' ? locales[1].name : locales[0].name }}
      </v-btn>
      <v-btn
          class="bg-primary text-none text-body-1"
          rounded="xl"
          elevation="0"
      >
        {{ $t('enter') }}
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>