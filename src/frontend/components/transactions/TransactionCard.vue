<script setup lang="ts">
import type { MonthlyExpense, MonthlyIncome } from '~/types'
import { formatCurrency } from '~/composables/useFormatters'

interface Props {
  transaction: MonthlyExpense | MonthlyIncome
  type: 'expense' | 'income'
  selectable?: boolean
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  selected: false
})

const emit = defineEmits<{
  (e: 'edit', transaction: MonthlyExpense | MonthlyIncome): void
  (e: 'delete', id: string): void
  (e: 'toggle', id: string): void
}>()

const icon = computed(() => {
  return props.type === 'expense' ? '💸' : '💰'
})

const color = computed(() => {
  return props.type === 'expense' ? 'text-error-500' : 'text-success-500'
})

const formattedPrice = computed(() => {
  return formatCurrency(props.transaction.price)
})
</script>

<template>
  <div class="card">
    <div class="flex items-center gap-3">
      <button 
        v-if="selectable"
        @click="emit('toggle', transaction.id)"
        :class="[
          'w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0',
          selected 
            ? 'bg-primary-500 border-primary-500 text-white' 
            : 'border-gray-300 hover:border-primary-500'
        ]"
      >
        <span v-if="selected" class="text-xs">✓</span>
      </button>
      <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
        {{ transaction.category?.icon || icon }}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-gray-900 truncate">{{ transaction.name }}</h3>
        <p class="text-sm text-gray-500">
          Dia {{ transaction.day }} • {{ transaction.category?.name }}
        </p>
      </div>
      <div class="text-right">
        <p :class="['font-semibold', color]">{{ formattedPrice }}</p>
        <div class="flex items-center gap-1 mt-1">
          <button 
            @click="emit('edit', transaction)"
            class="p-1 text-gray-400 hover:text-primary-500 transition-colors"
          >
            ✏️
          </button>
          <button 
            @click="emit('delete', transaction.id)"
            class="p-1 text-gray-400 hover:text-error-500 transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
