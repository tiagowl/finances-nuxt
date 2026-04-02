<script setup lang="ts">
interface Option {
  value: string
  label: string
  color?: string | null
  budget?: number | null
  totalSpent?: number | null
}

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  options: Option[]
  error?: string
  disabled?: boolean
  required?: boolean
  showBudget?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecione...',
  disabled: false,
  required: false,
  showBudget: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const selectedOption = computed(() => {
  return props.options.find(o => o.value === props.modelValue)
})

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function getBudgetPercentage(budget: number | null | undefined, spent: number | null | undefined): number {
  if (!budget || budget === 0) return 0
  const percentage = ((spent || 0) / budget) * 100
  return Math.min(percentage, 100)
}

function getRemaining(budget: number | null | undefined, spent: number | null | undefined): number {
  if (!budget) return 0
  return Math.max(budget - (spent || 0), 0)
}
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
    
    <div v-if="showBudget && selectedOption?.budget" class="mt-2 p-3 bg-gray-50 rounded-lg">
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs text-gray-600">Orçamento: {{ formatCurrency(selectedOption.budget) }}</span>
        <span class="text-xs text-gray-600">{{ formatCurrency(selectedOption.totalSpent || 0) }} gastos</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="h-2 rounded-full transition-all"
          :class="getBudgetPercentage(selectedOption.budget, selectedOption.totalSpent) >= 100 ? 'bg-error-500' : 'bg-primary-500'"
          :style="{ width: `${getBudgetPercentage(selectedOption.budget, selectedOption.totalSpent)}%` }"
        ></div>
      </div>
      <p class="text-xs mt-1" :class="getBudgetPercentage(selectedOption.budget, selectedOption.totalSpent) >= 100 ? 'text-error-500' : 'text-gray-500'">
        <span v-if="getBudgetPercentage(selectedOption.budget, selectedOption.totalSpent) >= 100">
          Limite atingido!
        </span>
        <span v-else>
          Faltam {{ formatCurrency(getRemaining(selectedOption.budget, selectedOption.totalSpent)) }} para o limite
        </span>
      </p>
    </div>
    
    <span v-if="error" class="input-error-message">{{ error }}</span>
  </div>
</template>
