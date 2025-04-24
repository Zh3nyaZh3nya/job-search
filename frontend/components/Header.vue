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
    link: '/resume',
  },
  {
    title: 'menu_title_2',
    link: '/vacancy',
  },
])
const select = ref<'employer' | 'member' | null>(null)

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
      <nuxt-link :to="localePath('/')" class="mr-10 text-h4 link" :class="route.path !== localePath('/') ? 'text-black' : ''">
        <span class="text-primary font-weight-bold">Search</span><span>Job</span>
      </nuxt-link>
      <ul class="d-flex align-center ga-4">
        <li v-for="item in menu" :key="item.link" class="link text-h6" :class="route.path !== localePath('/') ? 'text-black' : ''">
          <nuxt-link :to="localePath(item.link)">
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
          :class="route.path !== localePath('/') ? 'text-black' : ''"
      >
        {{ locale === 'ru' ? locales[1].name : locales[0].name }}
      </v-btn>
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
              v-bind="activatorProps"
              class="bg-primary text-none text-body-1"
              rounded="xl"
              elevation="0"
          >
            {{ $t('enter') }}
          </v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card rounded="xl" class="pa-4">
            <p class="text-h5 text-center mb-4">Авторизация</p>
            <v-select
                v-model="select"
                :label="$t('select-variant-enter')"
                variant="outlined"
                rounded="xl"
                :items="[
                  {
                    title: $t('employer'),
                    value: 'employer'
                  },
                  {
                    title: $t('members'),
                    value: 'members'
                  }
                ]"
                item-title="title"
                item-value="value"
                color="primary"
            >

            </v-select>
            <div class="d-flex justify-center">
              <v-btn
                  color="primary"
                  class="text-decoration-none text-h6"
                  size="large"
                  elevation="0"
                  :to="select === 'employer' ? localePath('/employer') : localePath('/member')"
                  @click="isActive.value = false"
              >
                {{ $t('enter') }}
              </v-btn>
            </div>

          </v-card>
        </template>
      </v-dialog>

    </v-container>
  </v-app-bar>

</template>

<style scoped>

</style>