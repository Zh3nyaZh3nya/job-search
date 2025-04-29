<script setup lang="ts">
import { getYearLabel } from "~/utils/getYearLabel";
import type { IUserEmployer, IUserMember } from "~/types";

interface IProps {
  user: IUserMember | IUserEmployer
}

const { user } = defineProps<IProps>()
const emits = defineEmits(['logout'])
</script>

<template>
  <v-sheet
      v-if="user"
      class="card-not-hover "
      elevation="0"
      :hover="false"
      rounded="lg"
  >
    <div class="d-flex ga-4 pa-4">
      <div>
        <v-icon icon="mdi-account-circle-outline" size="80px" color="primary"></v-icon>
      </div>
      <div class="d-flex flex-column">
        <p>Email: {{ user.email }}</p>
        <div v-if="user.userType === 'member'">
          <p>{{ $t('фио') }}: {{ user.name }} {{ user.last_name }}</p>
          <p>{{ $t('gender') + '/' + $t('age') }}: {{ $t(user.gender) }} {{ user.age }} {{ getYearLabel(user.age) }}</p>
        </div>
        <div v-else>
          <p>{{ $t('company') }}: {{ user.company }}</p>
          <p>{{ $t('address') }}: {{ user.address }}</p>
        </div>
      </div>
    </div>
    <v-divider color="secondary" class="my-2" />
    <div class="px-4 pt-2 pb-4 d-flex justify-end">
      <v-btn
        rounded="lg"
        elevation="0"
        color="error"
        class="text-none text-h5"
        size="large"
        @click="emits('logout')"
      >
        {{ $t('logout') }}
      </v-btn>
    </div>
  </v-sheet>
</template>

<style scoped>

</style>