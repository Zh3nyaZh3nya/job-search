// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
import { defineNuxtConfig } from 'nuxt/config'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { copyFile, mkdir, readdir, stat } from 'fs/promises'
import { join, dirname } from 'path'

async function copyStaticData() {
  const fromDir = join(process.cwd(), 'assets/staticData')
  const toDir = join(process.cwd(), '.output/assets/staticData')

  async function copyRecursive(src: string, dest: string) {
    const entries = await readdir(src, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = join(src, entry.name)
      const destPath = join(dest, entry.name)

      if (entry.isDirectory()) {
        await mkdir(destPath, { recursive: true })
        await copyRecursive(srcPath, destPath)
      } else {
        await mkdir(dirname(destPath), { recursive: true })
        await copyFile(srcPath, destPath)
      }
    }
  }

  await mkdir(toDir, { recursive: true })
  await copyRecursive(fromDir, toDir)
}

// @ts-ignore
export default defineNuxtConfig({
  hooks: {
    'nitro:build:public-assets': async () => {
      await copyStaticData()
    }
  },
  css: ['~/assets/styles/global.scss', 'vuetify/lib/styles/main.sass', "@/assets/fonts/fonts.css"],
  runtimeConfig: {
    JWT_SECRET: 'd9f72e3a1a62b72914a6e6c238f60f267b9d8c191ef7b23829dc65552e9272d0',
    public: {
      apiUrl: 'http://localhost:3000'
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  // @ts-ignore
  vuetify: {
    defaultAssets: {
      font: false,
    },
  },
  modules: [
    '@nuxtjs/i18n',
    'vue-yandex-maps/nuxt',
    '@pinia/nuxt',
    // @ts-ignore
    (_options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  i18n: {
    defaultLocale: "ru",
    locales: [
      { code: "ru", name: "Рус", iso: 'ru-KZ', file: 'locales/ru.json' },
      { code: "kk", name: "Каз", iso: 'kk-KZ', file: 'locales/kk.json' },
    ],
    lazy: true,
    langDir: '',
  },
  yandexMaps: {
    apikey: '61a0064e-8ce3-4b3e-a7d1-cf970fadd310',
    servicesApikeys: {
      suggest: '047542a5-b4a3-4530-96d1-74d58f0e0117',
    }
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  imports: {
    dirs: [
      'composables',
      'composables/*/index.{ts,js,mjs,mts}',
      'composables/**',
      'store',
      'store/*/index.{ts,js,mjs,mts}',
      'store/**',
    ]
  },
  routeRules: {
    '/api/auth/user': { middleware: ['auth'] },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true
})
