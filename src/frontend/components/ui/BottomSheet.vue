<script setup lang="ts">
interface Props {
  show: boolean
  title?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = ''
  }
})

watch(() => useAttrs(), () => {}, { immediate: true })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div 
        v-if="show"
        class="fixed inset-x-0 inset-y-0 z-50 flex flex-col bg-white safe-bottom"
        @click="handleBackdropClick"
      >
        <div class="flex items-center justify-between px-4 py-3 border-b">
          <h3 v-if="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          <button 
            @click="emit('close')"
            class="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <slot />
        </div>
        <div v-if="$slots.footer" class="p-4 border-t bg-gray-50">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
