<script setup lang="ts">
import { formatCurrency } from '~/composables/useFormatters'

interface Props {
  totalIncome: number
  totalExpenses: number
  balance: number
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="card text-center p-5">
      <p class="text-xs text-gray-500 uppercase tracking-wide font-medium">Receitas</p>
      <p class="text-xl sm:text-2xl font-bold text-success-500 mt-2">
        {{ formatCurrency(totalIncome) }}
      </p>
    </div>
    <div class="card text-center p-5">
      <p class="text-xs text-gray-500 uppercase tracking-wide font-medium">Despesas</p>
      <p class="text-xl sm:text-2xl font-bold text-error-500 mt-2">
        {{ formatCurrency(totalExpenses) }}
      </p>
    </div>
    <div class="card text-center p-5 sm:col-span-1">
      <p class="text-xs text-gray-500 uppercase tracking-wide font-medium">Saldo</p>
      <p 
        :class="[
          'text-xl sm:text-2xl font-bold mt-2',
          balance >= 0 ? 'text-success-500' : 'text-error-500'
        ]"
      >
        {{ formatCurrency(balance) }}
      </p>
    </div>
  </div>
</template>
