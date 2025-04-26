import { useFetch, useRequestHeaders, useNuxtApp } from '#app'
import { useRuntimeConfig } from 'nuxt/app'

type UseFetchType = typeof useFetch

export const useApi: UseFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()
  const nuxt = useNuxtApp().vueApp.$nuxt
  const { locale } = nuxt.$i18n

  const headers = process.server ? useRequestHeaders(['cookie']) : {}

  const modifiedOptions = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
      'Accept-Language': locale.value,
    },
    baseURL: config.public.apiUrl,
  }

  return useFetch(path, modifiedOptions)
}
