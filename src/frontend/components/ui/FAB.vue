<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()

const isActive = ref(false)

function toggle() {
  isActive.value = !isActive.value
  emit('click')
}
</script>

<template>
  <button
    class="fab"
    :class="{ 'active': isActive }"
    @click="toggle"
  >
    <span class="text-2xl transition-transform duration-300" :class="{ 'rotate-45': isActive }">+</span>
  </button>
</template>

<style scoped>
.fab {
  @apply fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 z-40;
}

.fab.active {
  @apply bg-primary-600;
}
</style>
