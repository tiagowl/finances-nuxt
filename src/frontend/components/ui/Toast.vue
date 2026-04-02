<script setup lang="ts">
const show = ref(false)

function open() {
  show.value = true
}

function close() {
  show.value = false
}

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div 
        v-if="show"
        class="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
