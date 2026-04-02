<script setup lang="ts">
import type { Category } from '~/types'
import { formatCurrency } from '~/composables/useFormatters'

interface Props {
  categories: Category[]
}

defineProps<Props>()
</script>

<template>
  <div class="card">
    <h3 class="font-semibold text-gray-900 mb-4">Gastos por Categoria</h3>
    <div class="space-y-4">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="flex items-center gap-3"
      >
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          :style="{ backgroundColor: category.color || '#6366F1', color: 'white' }"
        >
          {{ category.icon || '📁' }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700 truncate">{{ category.name }}</span>
            <span class="text-sm text-gray-500">{{ formatCurrency(category.totalSpent || 0) }}</span>
          </div>
          <UiProgressBar 
            v-if="category.budget"
            :value="category.totalSpent || 0" 
            :max="category.budget"
          />
        </div>
      </div>
      <p v-if="categories.length === 0" class="text-sm text-gray-500 text-center py-4">
        Nenhuma categoria cadastrada
      </p>
    </div>
  </div>
</template>
