<script setup lang="ts">
interface Option {
  value: string
  label: string
  color?: string | null
}

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  options: Option[]
  error?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecione...',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div class="input-group">
    <label v-if="label" class="input-label">
      {{ label }}
      <span v-if="required" class="text-error-500">*</span>
    </label>
    <div 
      :class="[
        'input-field cursor-pointer',
        error ? 'input-error' : '',
        disabled ? 'bg-gray-50 cursor-not-allowed' : ''
      ]"
    >
      <select
        v-model="selectedValue"
        :disabled="disabled"
        :required="required"
        class="flex-1 bg-transparent outline-none text-gray-900 cursor-pointer appearance-none"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="text-gray-400">▼</span>
    </div>
    <span v-if="error" class="input-error-message">{{ error }}</span>
  </div>
</template>
