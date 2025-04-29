<script setup lang="ts">
import { useStore } from "~/store";
import { useRoute } from "vue-router";

const store = useStore()
const route = useRoute()
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <ResumePage :card="store.GET_RESUME_PAGE(String(route.params.id))" />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>