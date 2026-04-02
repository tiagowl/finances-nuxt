<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'url'
  error?: string
  disabled?: boolean
  required?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const inputValue = computed({
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
        'input-field',
        error ? 'input-error' : '',
        disabled ? 'bg-gray-50 cursor-not-allowed' : ''
      ]"
    >
      <span v-if="icon" class="text-gray-400">{{ icon }}</span>
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
      />
    </div>
    <span v-if="error" class="input-error-message">{{ error }}</span>
  </div>
</template>
