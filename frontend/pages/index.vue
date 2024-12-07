<script setup lang="ts">
import { ref } from "vue";

const heroNumbers = ref([
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
const cardsServices = ref([
  {
    title: 'card_services_title_1',
    subtitle: 'card_services_subtitle_1',
    image: '/icons/main/card-1.svg'
  },
  {
    title: 'card_services_title_2',
    image: '/icons/main/card-2.svg'
  },
  {
    title: 'card_services_title_3',
    image: '/icons/main/card-3.svg'
  },
  {
    title: 'card_services_title_4',
    image: '/icons/main/card-4.png'
  },
  {
    title: 'card_services_title_5',
    image: '/icons/main/card-5.svg'
  },
])
</script>

<template>
  <v-main class="index pt-0">
    <section class="index__hero pt-16 mb-12">
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
    </section>
    <section class="index__services">
      <v-container>
        <v-row class="index__services-row">
          <v-col
              v-for="(card, index) in cardsServices"
              :key="index"
              cols="12"
              sm="6"
              :md="cardsServices.length === 5 && index >= cardsServices.length - 2 ? 6 : 4"
          >
            <v-card
                rounded="xl"
                elevation="0"
                class="pt-6 px-4 pb-4 index__services-card"
                :class="`index__services-card-${index}`"
                height="100%"
                :style="{ '--bg-image-card-service': `url(${card.image}) no-repeat` }"
                min-height="276px"
            >
              <h2
                  class="text-h6 text-primary mb-2"
                  :class="index >= cardsServices.length - 2 ? 'index__services-card-title no-width' : 'index__services-card-title'"
              >
                {{ $t(card.title) }}
              </h2>
              <p class="index__services-card-subtitle text-secondary text-body-1" v-if="card.subtitle">{{ $t(card.subtitle) }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-main>
</template>

<style lang="scss">
.index {
  &__hero {
    height: 60vh;
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
  &__services {
    &-card {
      border: 1px solid #E5E7EB;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 100%;
        background: var(--bg-image-card-service);
        background-position: right bottom;
        z-index: -1;
      }
      &-0:after {
        background-size: cover;
      }
      &-1:after {
        background-size: cover;
      }
      &-2:after {
        background-size: contain;
      }

      &-title {
        max-width: 245px;
        &.no-width {
          max-width: 100%;
        }
      }
      &-subtitle {
        max-width: 135px;
      }
    }
  }
}
</style>