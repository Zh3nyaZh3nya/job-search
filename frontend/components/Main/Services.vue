<script setup lang="ts">
import { ref } from "vue";

interface CardService {
  title: string;
  subtitle?: string;
  image: string;
}

const cards = ref<CardService[]>([
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
  <v-row class="index__services-row">
    <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        sm="6"
        :md="cards.length === 5 && index >= cards.length - 2 ? 6 : 4"
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
            :class="index >= cards.length - 2 ? 'index__services-card-title no-width' : 'index__services-card-title'"
        >
          {{ $t(card.title) }}
        </h2>
        <p class="index__services-card-subtitle text-secondary text-body-1" v-if="card.subtitle">{{ $t(card.subtitle) }}</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.index {
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