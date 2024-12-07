<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectItem = ref('job')
const selectItems = ref([
  {
    title: t('search_selects_1'),
    value: 'job',
  },
  {
    title: t('search_selects_2'),
    value: 'members'
  }
])
</script>

<template>
  <v-sheet color="white" rounded="pill" width="100%" min-height="74px" elevation="12" class="d-flex align-center pa-3">
    <v-form class="d-flex align-center w-100 ga-2">
      <v-select
          v-model="selectItem"
          :items="selectItems"
          rounded="pill"
          size="x-large"
          variant="solo"
          :hide-details="true"
          min-width="220"
      ></v-select>

      <v-text-field :placeholder="$t('search_placeholder')" :hide-details="true" variant="solo" elevation="0" width="100%" rounded="pill">

      </v-text-field>
      <v-btn rounded="pill" class="text-none text-body-1" size="x-large" height="56px" color="primary">
        {{ $t('search') }}
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped>

</style>