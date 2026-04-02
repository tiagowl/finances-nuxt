<script setup lang="ts">
import type { Category } from '~/types'
import { formatCurrency } from '~/composables/useFormatters'

interface Props {
  category: Category
  selectable?: boolean
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  selected: false
})

const emit = defineEmits<{
  (e: 'edit', category: Category): void
  (e: 'delete', id: string): void
  (e: 'select', id: string): void
}>()
</script>

<template>
  <div class="card">
    <div class="flex items-center gap-3">
      <button 
        v-if="selectable"
        @click="emit('select', category.id)"
        :class="[
          'w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0',
          selected 
            ? 'bg-primary-500 border-primary-500 text-white' 
            : 'border-gray-300 hover:border-primary-500'
        ]"
      >
        <span v-if="selected" class="text-xs">✓</span>
      </button>
      <div 
        class="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
        :style="{ backgroundColor: category.color || '#6366F1', color: 'white' }"
      >
        {{ category.icon || '📁' }}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-gray-900 truncate">{{ category.name }}</h3>
        <p v-if="category.budget" class="text-sm text-gray-500">
          {{ formatCurrency(category.totalSpent || 0) }} / {{ formatCurrency(category.budget) }}
        </p>
        <p v-else class="text-sm text-gray-500">
          {{ formatCurrency(category.totalSpent || 0) }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button 
          @click="emit('edit', category)"
          class="p-2 text-gray-400 hover:text-primary-500 transition-colors"
        >
          ✏️
        </button>
        <button 
          @click="emit('delete', category.id)"
          class="p-2 text-gray-400 hover:text-error-500 transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
    <div v-if="category.budget" class="mt-3">
      <UiProgressBar 
        :value="category.totalSpent || 0" 
        :max="category.budget" 
        show-label
      />
    </div>
  </div>
</template>
