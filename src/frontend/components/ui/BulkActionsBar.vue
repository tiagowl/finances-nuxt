<script setup lang="ts">
interface Props {
  selectedCount: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'deselect'): void
}>()
</script>

<template>
  <div 
    v-if="selectedCount > 0"
    class="bg-primary-500 text-white rounded-lg p-3 mb-4 flex items-center justify-between animate-fade-in"
  >
    <div class="flex items-center gap-3">
      <span class="text-sm font-medium">
        {{ selectedCount }} item{{ selectedCount > 1 ? 's' : '' }} selecionado{{ selectedCount > 1 ? 's' : '' }}
      </span>
      <button 
        @click="emit('deselect')"
        class="text-sm text-primary-100 hover:text-white underline"
      >
        Desmarcar todos
      </button>
    </div>
    <button 
      @click="emit('delete')"
      class="bg-error-500 hover:bg-error-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
    >
      <span>🗑️</span>
      Excluir selecionados
    </button>
  </div>
</template>
