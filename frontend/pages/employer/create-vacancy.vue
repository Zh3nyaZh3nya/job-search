<script setup lang="ts">
import { useLocalePath } from "#i18n";

const localePath = useLocalePath()
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <v-btn
            variant="text"
            class="text-none px-0 text-h6 font-weight-regular link mb-4"
            min-width="0"
            :to="localePath('/employer')"
        >
          <div class="d-flex align-center">
            <v-icon icon="mdi-chevron-left" size="24" class="mt-1"></v-icon>
            <p>{{ $t('go-to-back') }}</p>
          </div>
        </v-btn>
      </v-container>
    </section>
    <section>
      <v-container>
        <VacancyCreate />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>