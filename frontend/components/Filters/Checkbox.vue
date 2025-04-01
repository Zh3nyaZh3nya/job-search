<script setup lang="ts" generic="T extends string">
const props = defineProps<{
  items: T[];
  modelValue: T[] | null;
  title: string
  keyTranslate: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T[] | null): void
}>()

const model = computed<T[] | null>({
  get: () => props.modelValue,
  set: (value) => {
    if (Array.isArray(value)) {
      emit('update:modelValue', [...value])
    } else {
      emit('update:modelValue', [value])
    }
  }
})
</script>

<template>
  <div class="mx-4 professions-filters">
    <h3 class="text-h6">{{ title }}</h3>
    <v-checkbox
        v-for="item in items"
        :key="item"
        :value="item"
        :hide-details="true"
        v-model="model"
        color="primary"
    >
      <template #label>
        <span v-if="keyTranslate">{{ $t(`${keyTranslate}.${item}`) }}</span>
        <span v-else>{{ $t(`${item}`) }}</span>
      </template>
    </v-checkbox>
  </div>
</template>

<style lang="scss">
.professions-filters {
  .v-checkbox .v-selection-control {
    min-height: 30px;
    display: flex;
    gap: 8px;
  }
  .v-selection-control--density-default {
    --v-selection-control-size: 30px;
  }
  .v-icon--size-default {
    font-size: 19px;
  }
  .v-selection-control__input, .v-selection-control__wrapper {
    width: 15px;
    height: 25px;
  }
}
</style>