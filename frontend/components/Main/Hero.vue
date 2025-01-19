<script setup lang="ts">
import { ref } from "vue";

interface INumbers {
  numbers: string
  text: string
}

const heroNumbers = ref<INumbers[]>([
  {
    numbers: "191 668",
    text: "hero_numbers_1"
  },
  {
    numbers: "172 239",
    text: "hero_numbers_2"
  },
  {
    numbers: "463 313",
    text: "hero_numbers_3"
  },
])
</script>

<template>
  <v-container class="mt-4">
    <h2 class="mb-4 text-white text-h6 index__hero-subtitle">{{ $t('hero_title_1') }}</h2>
    <h1 class="mb-12 text-white text-h2 font-weight-bold index__hero-title">{{ $t('hero_title_2') }}</h1>

    <Search class="mb-16" />

    <div class="d-flex justify-center">
      <ul class="d-flex index__hero-numbers ga-16">
        <li class="index__hero-numbers-item text-white d-flex flex-column" v-for="item in heroNumbers" :key="item.numbers">
          <span class="d-inline-block font-weight-black text-h5">{{ item.numbers }}</span>
          <span class="text-h6">{{ $t(item.text) }}</span>
        </li>
      </ul>
    </div>
  </v-container>
</template>

<style lang="scss">
.index {
  &__hero {
    min-height: 60vh;
    background: url("/hero.jpg") no-repeat top center;
    background-size: cover;
    &-title {
      max-width: 605px;
      width: 100%;
    }
    &-numbers {
      li:not(:last-child) {
        padding-right: 56px;
        border-right: 1px solid white;
      }
    }
  }
}
</style>