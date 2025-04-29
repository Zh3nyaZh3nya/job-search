<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {useDisplay} from "vuetify/framework";

interface IProps {
  modelValue: any[]
  itemFields: {
    key: string;
    label: string;
    placeholder: string;
    rules?: any[];
    type?: 'text' | 'textarea';
    dateField?: boolean
    mask?: string
    width?: string
  }[]
  title: string
  empty_text: string
}

const props = defineProps<IProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void
}>()
const { width } = useDisplay()

const formRef = ref()
const editingIndex = ref<number | null>(null)
const originalItem = ref<any | null>(null)
const newItem = ref<any>({})
const openDialogRemove = ref<boolean>(false)
const removeIndex = ref<number | null>(null)

const isAdding = computed(() => newItem.value?.active)

watch(() => props.modelValue, (val) => {
  if (!val.length) {
    editingIndex.value = null
    originalItem.value = null
  }
})

function startEditing(index: number) {
  editingIndex.value = index
  originalItem.value = { ...props.modelValue[index] }
}

function cancelEditing() {
  editingIndex.value = null
  originalItem.value = null
}

function saveEditing() {
  if (editingIndex.value !== null) {
    props.modelValue[editingIndex.value] = { ...originalItem.value }
    emit('update:modelValue', [...props.modelValue])
  }
  editingIndex.value = null
  originalItem.value = null
}

function startAdding() {
  newItem.value = Object.fromEntries(props.itemFields.map(field => [field.key, '']))
  newItem.value.active = true
}

async function confirmAdding() {
  const { valid } = await formRef.value?.validate()
  if (!valid) return
  const { active, ...finalItem } = newItem.value
  emit('update:modelValue', [...props.modelValue, finalItem])
  newItem.value = {}
}

function cancelAdding() {
  newItem.value = {}
}

function confirmRemove() {
  if (removeIndex.value !== null) {
    props.modelValue.splice(removeIndex.value, 1)
    emit('update:modelValue', [...props.modelValue])
  }
  openDialogRemove.value = false
}

function restrictDateInput(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/[^\d-]/g, '');

  const parts = value.split('-');
  if (parts.length > 3) parts.length = 3;

  let [year = '', month = '', day = ''] = parts;

  const now = new Date();
  const currentYear = now.getFullYear();

  if (year.length > 4) year = year.slice(0, 4);
  if (+year > currentYear) {
    year = currentYear.toString();
  }

  if (month.length > 2) month = month.slice(0, 2);
  if (+month > 12) {
    month = '12';
  }

  if (day.length > 2) day = day.slice(0, 2);
  if (month && year) {
    const parsedYear = parseInt(year) || currentYear;
    const parsedMonth = parseInt(month) || 1;
    const daysInMonth = new Date(parsedYear, parsedMonth, 0).getDate();
    if (+day > daysInMonth) {
      day = daysInMonth.toString().padStart(2, '0');
    }
  }

  const corrected = [year, month, day].filter(Boolean).join('-');
  input.value = corrected;
}
</script>

<template>
  <div>
    <h3 class="text-h5 font-weight-bold mb-3">{{ title }}</h3>

    <template v-if="modelValue.length">
      <div v-for="(item, index) in modelValue" :key="index" class="mb-4">
        <div v-if="editingIndex === index">
          <v-card class="pa-4 rounded-lg card-not-hover" elevation="0">
            <v-form ref="formRef" @submit.prevent="saveEditing">
              <div v-for="field in itemFields" :key="field.key" class="mb-2 d-flex">
                <div class="d-flex align-center ga-2" v-if="field.dateField">
                  <p class="text-h6 text-secondary" style="min-width: 40px">{{ field.label }}:</p>
                  <v-text-field
                      v-if="field.type !== 'textarea'"
                      v-model="originalItem[field.key]"
                      :label="field.label"
                      variant="outlined"
                      :placeholder="field.placeholder"
                      :rules="field.rules || []"
                      color="primary"
                      width="100px"
                      :hide-details="true"
                      v-mask="'####-##-##'"
                      @input="restrictDateInput"
                  />
                </div>
                <div class="d-flex align-start flex-wrap w-100 ga-2" v-else>
                  <p class="text-h6 text-secondary" style="width: 150px">{{ field.label }}:</p>
                  <v-text-field
                      v-if="field.type !== 'textarea'"
                      v-model="originalItem[field.key]"
                      :label="field.label"
                      variant="outlined"
                      :placeholder="field.placeholder"
                      :rules="field.rules || []"
                      color="primary"
                      v-bind="field.mask ? { 'v-mask': field.mask } : {}"
                      :hide-details="true"
                      width="100%"
                      :max-width="width < 600 ? '100%' : ''"
                  />
                  <v-textarea
                      v-else-if="field.type === 'textarea' && !field.dateField"
                      v-model="originalItem[field.key]"
                      :label="field.label"
                      variant="outlined"
                      :placeholder="field.placeholder"
                      :rules="field.rules || []"
                      color="primary"
                      :hide-details="true"
                      width="100%"
                      :max-width="width < 600 ? '100%' : ''"
                  />
                </div>

              </div>

              <div class="d-flex justify-center flex-wrap mt-4 ga-4">
                <v-btn
                    size="large"
                    elevation="0"
                    color="primary"
                    :width="width < 600 ? '100%' : '200px'"
                    @click="saveEditing"
                >
                  {{ $t('confirm') }}
                </v-btn>
                <v-btn
                    color="error"
                    :width="width < 600 ? '100%' : '200px'"
                    size="large"
                    elevation="0"
                    @click="cancelEditing"
                >
                  {{ $t('cancel') }}
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </div>
        <div v-else class="d-flex justify-space-between">
          <div>
            <div v-for="field in itemFields" :key="field.key">
              <p class="text-body-1">
                <strong>{{ field.label }}:</strong> {{ item[field.key] }}
              </p>
            </div>
          </div>
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-pencil-outline" class="cursor-pointer" @click="startEditing(index)" />
            <v-icon icon="mdi-delete-outline" class="cursor-pointer" @click="openDialogRemove = true; removeIndex = index" />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div
        v-html="empty_text"
        class="text-h6 font-weight-regular"
      >
      </div>

    </template>

    <v-form v-if="isAdding" ref="formRef" @submit.prevent="confirmAdding">
      <v-card class="pa-4 rounded-lg mt-4 card-not-hover" elevation="0">
        <div v-for="field in itemFields" :key="field.key" class="mb-2 d-flex">
          <div class="d-flex align-center ga-2" v-if="field.dateField">
            <p class="text-h6 text-secondary" style="min-width: 40px">{{ field.label }}:</p>
            <v-text-field
                v-if="field.type !== 'textarea'"
                v-model="newItem[field.key]"
                :label="field.label"
                variant="outlined"
                :placeholder="field.placeholder"
                :rules="field.rules || []"
                color="primary"
                width="100px"
                :hide-details="true"
                v-mask="'####-##-##'"
                @input="restrictDateInput"
            />
          </div>
          <div class="d-flex align-start flex-wrap w-100 ga-2" v-else>
            <p class="text-h6 text-secondary" style="width: 150px">{{ field.label }}:</p>
            <v-text-field
                v-if="field.type !== 'textarea'"
                v-model="newItem[field.key]"
                :label="field.label"
                variant="outlined"
                :placeholder="field.placeholder"
                :rules="field.rules || []"
                color="primary"
                v-bind="field.mask ? { 'v-mask': field.mask } : {}"
                :hide-details="true"
                width="100%"
                :max-width="width < 600 ? '100%' : ''"
            />
            <v-textarea
                v-else-if="field.type === 'textarea' && !field.dateField"
                v-model="newItem[field.key]"
                :label="field.label"
                variant="outlined"
                :placeholder="field.placeholder"
                :rules="field.rules || []"
                color="primary"
                :hide-details="true"
                width="100%"
                :max-width="width < 600 ? '100%' : ''"
            />
          </div>

        </div>

        <div class="d-flex justify-center flex-wrap mt-4 ga-4">
          <v-btn
              size="large"
              elevation="0"
              color="primary"
              :width="width < 600 ? '100%' : '200px'"
              @click="confirmAdding"
          >
            {{ $t('confirm') }}
          </v-btn>
          <v-btn
              color="error"
              :width="width < 600 ? '100%' : '200px'"
              size="large"
              elevation="0"
              @click="cancelAdding"
          >
            {{ $t('cancel') }}
          </v-btn>
        </div>
      </v-card>
    </v-form>

    <div class="d-flex justify-center mt-4">
      <v-btn
          color="primary"
          @click="startAdding"
          :disabled="isAdding || editingIndex !== null"
          size="large"
          elevation="0"
          width="200px"
      >
        <div class="d-flex align-center ga-2">
          <p class="text-none text-h5">{{ $t('add') }}</p>
          <v-icon icon="mdi-plus-circle-outline" class="mt-1"></v-icon>
        </div>
      </v-btn>
    </div>

    <v-dialog v-model="openDialogRemove" max-width="500">
      <v-card class="pa-4 rounded-lg">
        <p class="text-h6 text-center mb-4">{{ $t('edit-dialog-remove-title') }}</p>
        <div class="d-flex justify-center ga-4">
          <v-btn color="primary" @click="confirmRemove">{{ $t('confirm') }}</v-btn>
          <v-btn color="error" @click="openDialogRemove = false">{{ $t('cancel') }}</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
