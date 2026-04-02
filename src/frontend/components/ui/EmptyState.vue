<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'action'): void
}>()
</script>

<template>
  <div class="empty-state">
    <div class="w-16 h-16 mx-auto mb-4 text-gray-300">
      <svg v-if="!icon" class="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span v-else class="text-6xl">{{ icon }}</span>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
    <p v-if="description" class="text-sm text-gray-500 mb-6 max-w-xs">{{ description }}</p>
    <UiButton v-if="actionLabel" @click="emit('action')">
      {{ actionLabel }}
    </UiButton>
  </div>
</template>

<style scoped>
.empty-state {
  @apply flex flex-col items-center justify-center py-12 px-4 text-center;
}
</style>
