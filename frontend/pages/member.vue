<script setup lang="ts">

definePageMeta({
  middleware: 'role'
})
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <h1 class="text-h4">{{ $t('member-title') }}</h1>
      </v-container>
    </section>
    <section>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="8"
          >

          </v-col>
          <v-col
            cols="12"
            md="4"
          >

          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>