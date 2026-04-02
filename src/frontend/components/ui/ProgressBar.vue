<script setup lang="ts">
interface Props {
  color?: 'primary' | 'success' | 'warning' | 'danger'
  value: number
  max?: number
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  max: 100,
  showLabel: false
})

const percentage = computed(() => {
  if (props.max === 0) return 0
  return Math.min((props.value / props.max) * 100, 100)
})

const displayPercentage = computed(() => Math.round(percentage.value))

const colorClasses = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-error-500'
}

const computedColor = computed(() => {
  if (props.color !== 'primary') return props.color
  if (percentage.value > 100) return 'danger'
  if (percentage.value > 80) return 'warning'
  return 'primary'
})
</script>

<template>
  <div class="w-full">
    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        :class="[
          'h-full rounded-full transition-all duration-500 ease-out',
          colorClasses[computedColor]
        ]"
        :style="{ width: `${Math.min(percentage, 100)}%` }"
      />
    </div>
    <div v-if="showLabel" class="flex justify-between mt-1 text-xs text-gray-500">
      <span>{{ displayPercentage }}%</span>
      <span v-if="percentage > 100" class="text-error-500">Orçamento estourado!</span>
    </div>
  </div>
</template>
