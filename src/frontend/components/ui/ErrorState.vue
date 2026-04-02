<script setup lang="ts">
interface Props {
  icon?: string
  message: string
  actionLabel?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="w-12 h-12 mb-4 text-error-500">
      <svg class="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Ops! Algo deu errado</h3>
    <p class="text-sm text-gray-500 mb-6">{{ message }}</p>
    <UiButton v-if="actionLabel" variant="secondary" @click="emit('retry')">
      {{ actionLabel }}
    </UiButton>
  </div>
</template>
