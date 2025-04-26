<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useLocalePath } from "#i18n"
import { useAuthStore } from "~/store/auth";

type LocaleCode = typeof locales.value[number]['code']

interface IMenu {
  title: string,
  link: string
}

type Select = 'employer' | 'member'

const { locale, locales, t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

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
const select = ref<Select>('member')
const tab = ref<'auth' | 'register'>('auth')
const rules = {
  required: (v: any) => !!v || t('required'),
}

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
      <v-dialog max-width="500" v-if="!authStore.isAuthenticated">
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
          <v-card rounded="lg" class="pa-4">
            <div class="d-flex justify-center mb-4">
              <v-tabs
                  v-model="tab"
                  class="d-flex justify-center"
              >
                <v-tab value="auth" color="primary">{{ $t('auth') }}</v-tab>
                <v-tab value="register" color="primary">{{ $t('register') }}</v-tab>
              </v-tabs>
            </div>

            <div>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="auth">
                  <formLogin :select="select" />
                </v-tabs-window-item>

                <v-tabs-window-item value="register">
                  <div class="d-flex justify-center my-2">
                    <v-select
                        v-model="select"
                        :label="tab === 'auth' ? $t('select-variant-enter') : $t('select-variant-register')"
                        variant="outlined"
                        rounded="lg"
                        max-width="250px"
                        :items="[
                          {
                            title: $t('employer'),
                            value: 'employer'
                          },
                          {
                            title: $t('member'),
                            value: 'member'
                          }
                        ]"
                        item-title="title"
                        item-value="value"
                        color="primary"
                        :hide-details="true"
                        :rules="[rules.required]"
                    >
                    </v-select>
                  </div>

                  <v-tabs-window v-model="select">
                    <v-tabs-window-item value="member">
                      <formRegister :select="select" @submitForm="isActive.value = false" />
                    </v-tabs-window-item>

                    <v-tabs-window-item value="employer">
                      <formRegister :select="select" @submitForm="isActive.value = false" />
                    </v-tabs-window-item>
                  </v-tabs-window>
                </v-tabs-window-item>
              </v-tabs-window>
            </div>

          </v-card>
        </template>
      </v-dialog>
      <v-btn
          v-else
          class="bg-primary text-none text-body-1"
          rounded="xl"
          elevation="0"
          :to="localePath(`/${authStore?.user?.userType}`)"
      >
        {{ $t('profile') }}
      </v-btn>
    </v-container>
  </v-app-bar>

</template>

<style scoped>

</style>