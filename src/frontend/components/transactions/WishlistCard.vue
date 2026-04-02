<script setup lang="ts">
import type { WishlistItem } from '~/types'
import { formatCurrency } from '~/composables/useFormatters'

interface Props {
  item: WishlistItem
  selectable?: boolean
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  selected: false
})

const emit = defineEmits<{
  (e: 'edit', item: WishlistItem): void
  (e: 'delete', id: string): void
  (e: 'toggle', item: WishlistItem): void
  (e: 'select', id: string): void
}>()
</script>

<template>
  <div class="card" :class="{ 'opacity-50': item.isPurchased }">
    <div class="flex items-start gap-3">
      <button 
        v-if="selectable"
        @click="emit('select', item.id)"
        :class="[
          'w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-1',
          selected 
            ? 'bg-primary-500 border-primary-500 text-white' 
            : 'border-gray-300 hover:border-primary-500'
        ]"
      >
        <span v-if="selected" class="text-xs">✓</span>
      </button>
      <button 
        v-else
        @click="emit('toggle', item)"
        :class="[
          'w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0',
          item.isPurchased 
            ? 'bg-success-500 border-success-500 text-white' 
            : 'border-gray-300 hover:border-primary-500'
        ]"
      >
        <span v-if="item.isPurchased">✓</span>
      </button>
      <div class="flex-1 min-w-0">
        <h3 :class="['font-medium truncate', item.isPurchased ? 'line-through text-gray-500' : 'text-gray-900']">
          {{ item.name }}
        </h3>
        <p class="text-sm text-gray-500">{{ item.category?.name }}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="font-semibold text-gray-900">{{ formatCurrency(item.price) }}</span>
          <span v-if="item.link" class="text-xs text-primary-500">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">
              🔗 Ver loja
            </a>
          </span>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <button 
          @click="emit('edit', item)"
          class="p-2 text-gray-400 hover:text-primary-500 transition-colors"
        >
          ✏️
        </button>
        <button 
          @click="emit('delete', item.id)"
          class="p-2 text-gray-400 hover:text-error-500 transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>
