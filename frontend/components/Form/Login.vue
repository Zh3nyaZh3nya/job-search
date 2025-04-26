<script setup lang="ts">
import { ref } from "vue";
import { useApi } from "~/composables/useApi";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useLocalePath } from "#i18n";
import { useAuthStore } from "#imports";

type Select = 'employer' | 'member'

const { select } = defineProps<{
  select: Select
}>()

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const authStore = useAuthStore()

const errors = ref<Record<string, boolean>>({})
const formRefLogin = ref()
const formBody = ref<Record<string, string>>({
  email: '',
  password: '',
  name: '',
  last_name: '',
  gender: '',
  age: ''
})

const rules = {
  required: (v: any) => !!v || t('required'),
  password: (v: string) => {
    if (!v) return t('required')
    if (v.length < 6) return t('password-min-length')
    return true
  },
  email: (v: string) =>
      !v || /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('invalid-email'),
}

const submitForm = async (type: Select) => {
  errors.value = {}

  const { valid } = await formRefLogin.value?.validate()

  for (const field of ['email', 'password']) {
    if (!formBody.value[field]) {
      errors.value[field] = true
    }
  }

  if (!valid || Object.keys(errors.value).length > 0) {
    return
  }

  try {
    const { data } = await useApi(`/api/auth/login?type=${select}`, {
      method: 'POST',
      body: formBody.value
    })

    if(data.value) {
      authStore.user = data.value.user
      await router.push(localePath(`/${type}`))
    }

  } catch (e) {
    console.error(e)
    for (const field of ['email', 'password']) {
      errors.value[field] = true
    }
  }
}
</script>

<template>
  <v-form
      ref="formRefLogin"
      class="d-flex flex-column align-center justify-center py-2"
      @submit.prevent="submitForm(select)"
  >
    <v-text-field
        v-model="formBody.email"
        label="e-mail"
        variant="outlined"
        max-width="250px"
        width="100%"
        :hide-details="!errors.email"
        :error="Boolean(errors.email)"
        color="primary"
        class="mb-2"
        :rules="[rules.required, rules.email]"
    />
    <v-text-field
        v-model="formBody.password"
        type="password"
        :label="$t('password')"
        variant="outlined"
        max-width="250px"
        width="100%"
        :hide-details="!errors.password"
        :error="Boolean(errors.password)"
        color="primary"
        class="mb-2"
        :rules="[rules.required, rules.password]"
    />

    <div class="d-flex justify-center mt-4">
      <v-btn
          type="submit"
          color="primary"
          class="text-decoration-none text-h6"
          size="large"
          elevation="0"
          width="150px"
      >
        {{ $t('enter') }}
      </v-btn>
    </div>
  </v-form>
</template>

<style scoped>

</style>