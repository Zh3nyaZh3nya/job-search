<script setup lang="ts">
import { ref } from "vue";
import { useApi } from "~/composables/useApi";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useLocalePath } from "#i18n";
import { useAuthStore } from "~/store/auth";

type Select = 'employer' | 'member'

const { select } = defineProps<{
  select: Select
}>()

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const emits = defineEmits(['submitForm'])
const authStore = useAuthStore()

const errors = ref<Record<string, boolean>>({})
const formRefRegister = ref()
const formMember = ref<Record<string, string>>({
  email: '',
  password: '',
  name: '',
  last_name: '',
  gender: '',
  age: ''
})
const formEmployer = ref<Record<string, string>>({
  email: '',
  password: '',
  company: '',
  address: '',
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
  age: (v: number) =>
      !v || (Number(v) >= 16 && Number(v) <= 120) || t('invalid-age'),
}

const submitForm = async (type: Select) => {
  errors.value = {}

  const form = type === 'member' ? formMember.value : formEmployer.value
  const requiredFields =
      type === 'member'
          ? ['email', 'password', 'name', 'last_name', 'gender', 'age']
          : ['email', 'password', 'company', 'address']

  const { valid } = await formRefRegister.value?.validate()

  for (const field of requiredFields) {
    if (!form[field]) {
      errors.value[field] = true
    }
  }

  if (!valid || Object.keys(errors.value).length > 0) return

  try {
    const { data } = await useApi(`/api/auth/register?type=${type}`, {
      method: 'POST',
      credentials: "include",
      body: {
        ...form,
      }
    })

    console.log(data)
    emits('submitForm')

    if(data.value) {
      authStore.user = data.value.user
      await router.push(localePath(`/${type}`))
    }

  } catch (e) {
    console.error('Registration error:', e)

    for (const field of requiredFields) {
      errors.value[field] = true
    }
  }
}
</script>

<template>
  <v-form
      ref="formRefRegister"
      class="d-flex flex-column align-center justify-center py-2"
      @submit.prevent="submitForm('member')"
      v-if="select === 'member'"
  >
    <v-text-field
        v-model="formMember.email"
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
        v-model="formMember.password"
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
    <div class="d-flex ga-2 mb-2">
      <v-text-field
          v-model="formMember.name"
          :label="$t('name')"
          variant="outlined"
          width="121px"
          :hide-details="!errors.name"
          :error="Boolean(errors.name)"
          color="primary"
          :rules="[rules.required, ]"
      />
      <v-text-field
          v-model="formMember.last_name"
          :label="$t('last-name')"
          variant="outlined"
          width="121px"
          :hide-details="!errors.last_name"
          :error="Boolean(errors.last_name)"
          color="primary"
          :rules="[rules.required, ]"
      />
    </div>
    <div class="d-flex ga-2 mb-2">
      <v-select
          v-model="formMember.gender"
          :label="$t('gender')"
          variant="outlined"
          width="121px"
          :items="[
            {
              title: $t('man'),
              value: 'man'
            },
            {
              title: $t('woman'),
              value: 'woman'
            }
          ]"
          item-title="title"
          item-value="value"
          color="primary"
          :hide-details="!errors.gender"
          :error="Boolean(errors.gender)"
          :rules="[rules.required, ]"
      >
      </v-select>
      <v-text-field
          v-model="formMember.age"
          :label="$t('age')"
          variant="outlined"
          width="121px"
          :hide-details="!errors.age"
          :error="Boolean(errors.age)"
          color="primary"
          :rules="[rules.required, rules.age]"
          type="number"
      />
    </div>

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
  <v-form
      ref="formRefRegister"
      class="d-flex flex-column align-center justify-center py-2"
      @submit.prevent="submitForm('employer')"
      v-if="select === 'employer'"
  >
    <v-text-field
        v-model="formEmployer.email"
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
        v-model="formEmployer.password"
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
    <v-text-field
        v-model="formEmployer.company"
        :label="$t('company')"
        variant="outlined"
        width="250px"
        :hide-details="!errors.company"
        :error="Boolean(errors.company)"
        color="primary"
        :rules="[rules.required, ]"
        class="mb-2"
    />
    <v-text-field
        v-model="formEmployer.address"
        :label="$t('address')"
        variant="outlined"
        width="250px"
        :hide-details="!errors.address"
        :error="Boolean(errors.address)"
        color="primary"
        :rules="[rules.required, ]"
        class="mb-2"
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