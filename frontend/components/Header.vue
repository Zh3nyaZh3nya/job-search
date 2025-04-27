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

const isOpenBurger = ref<boolean>(false)
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
  <v-app-bar
      class="py-2 text-white position-absolute"
      elevation="0"
      :class="isOpenBurger ? '' : 'bg-transparent'"
  >
    <v-container class="d-flex">
      <nuxt-link :to="localePath('/')" class="mr-10 text-h4 link" :class="route.path !== localePath('/') ? 'text-black' : ''">
        <span class="text-primary font-weight-bold">Search</span><span>Job</span>
      </nuxt-link>
      <ul class="d-none d-sm-flex align-center ga-4">
        <li v-for="item in menu" :key="item.link" class="link text-h6" :class="route.path !== localePath('/') ? 'text-black' : ''">
          <nuxt-link :to="localePath(item.link)">
            {{ $t(item.title) }}
          </nuxt-link>
        </li>
      </ul>
      <v-spacer />
      <v-btn
          variant="outlined"
          class="text-none text-body-1 mr-0 mr-sm-4"
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
              class="bg-primary text-none text-body-1 d-none d-sm-flex"
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
          class="bg-primary text-none text-body-1 d-none d-sm-flex"
          rounded="xl"
          elevation="0"
          :to="localePath(`/${authStore?.user?.userType}`)"
      >
        {{ $t('profile') }}
      </v-btn>
      <v-btn
          class="text-none text-body-1 d-block d-sm-none pr-0"
          rounded="xl"
          elevation="0"
          variant="text"
          @click="isOpenBurger = !isOpenBurger"
      >
        <v-icon :icon="isOpenBurger ? 'mdi-close' : 'mdi-menu'" size="24" color="primary"></v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
  <v-navigation-drawer
    v-model="isOpenBurger"
    temporary
    :scrim="false"
    v-if="isOpenBurger"
    class="w-100"
    color="background"
  >
    <div class="d-flex flex-column justify-space-between h-100 mt-4">
      <div class="mt-2 bg-white py-4" style="border-radius: 12px">
        <ul class="align-center ga-4">
          <li v-for="item in menu" :key="item.link" class="link text-h6" :class="route.path !== localePath('/') ? 'text-black' : ''">
            <nuxt-link :to="localePath(item.link)" class="mx-4">
              {{ $t(item.title) }}
            </nuxt-link>
            <v-divider color="primary" class="my-2" />
          </li>
        </ul>
      </div>
      <div class="mt-2 bg-white h-100 pt-4 pb-8 d-flex align-end" style="border-radius: 12px 12px 0 0">
        <div class="mx-4 w-100">
          <v-dialog max-width="500" v-if="!authStore.isAuthenticated">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                  v-bind="activatorProps"
                  class="bg-primary text-none text-h6"
                  rounded="lg"
                  elevation="0"
                  block
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
              class="bg-primary text-none text-h6"
              rounded="lg"
              elevation="0"
              size="large"
              block
              :to="localePath(`/${authStore?.user?.userType}`)"
          >
            {{ $t('profile') }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>

</style>