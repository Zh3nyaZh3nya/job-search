<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "~/store";
import { City } from "~/types";

const store = useStore()

const cities: City[] = Object.values(City)

const showAllCities = ref<boolean>(false)

function toggleCity(selected: City) {
  if (store.filters.city === selected) {
    store.filters.city = null
  } else {
    store.filters.city = selected
  }
}

const city = computed<City | null>({
  get: () => store.filters.city,
  set: (value) => {
    store.filters.city = value
  }
})
</script>

<template>
  <div class="mx-4 cities-filters">
    <h2 class="text-h6">{{ $t('city') }}</h2>
    <v-radio-group v-model="city" :hide-details="true" @change="handleCityChange">
      <v-row>
        <v-col cols="12" md="6">
          <v-radio
              v-for="cityOption in cities.slice(0, 5)"
              :key="cityOption"
              :value="cityOption"
              color="primary"
              @click="toggleCity(cityOption)"

          >
            <template #label>
              <p class="font-weight-regular text-body-1" :class="{ 'text-primary': city === cityOption }">
                {{ $t(cityOption) }}
              </p>
            </template>
          </v-radio>
          <v-expand-transition>
            <div v-if="showAllCities">
              <v-radio
                  v-for="cityOption in cities.slice(10, 14)"
                  :key="cityOption"
                  :value="cityOption"
                  color="primary"
                  @click="toggleCity(cityOption)"
              >
                <template #label>
                  <p class="font-weight-regular text-body-1" :class="{ 'text-primary': city === cityOption }">
                    {{ $t(cityOption) }}
                  </p>
                </template>
              </v-radio>
            </div>
          </v-expand-transition>
        </v-col>
        <v-col cols="12" md="6">
          <v-radio
              v-for="cityOption in cities.slice(5, 10)"
              :key="cityOption"
              :value="cityOption"
              color="primary"
              @click="toggleCity(cityOption)"
          >
            <template #label>
              <p class="font-weight-regular text-body-1" :class="{ 'text-primary': city === cityOption }">
                {{ $t(cityOption) }}
              </p>
            </template>
          </v-radio>
          <v-expand-transition>
            <div v-if="showAllCities">
              <v-radio
                  v-for="cityOption in cities.slice(14)"
                  :key="cityOption"
                  :value="cityOption"
                  color="primary"
                  @click="toggleCity(cityOption)"
              >
                <template #label>
                  <p class="font-weight-regular text-body-1" :class="{ 'text-primary': city === cityOption }">
                    {{ $t(cityOption) }}
                  </p>
                </template>
              </v-radio>
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>

      <div v-if="cities.length > 5">
        <v-btn
            variant="text"
            @click="showAllCities = !showAllCities"
            class="mt-2 text-none text-body-1 text-decoration-underline px-0"
            color="primary"
            :min-width="20"
        >
          {{ showAllCities ? $t('hide') : $t('showAll') }}
        </v-btn>
      </div>
    </v-radio-group>
  </div>
</template>

<style lang="scss">
.cities-filters {
  .v-selection-control__wrapper {
    display: none;
  }
}
</style>