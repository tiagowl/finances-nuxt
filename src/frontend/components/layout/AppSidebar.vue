<script setup lang="ts">
const route = useRoute()

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/expenses/monthly', label: 'Despesas Mensais', icon: '💸' },
  { path: '/expenses/occasional', label: 'Despesas Avulsas', icon: '🛒' },
  { path: '/incomes/monthly', label: 'Receitas Mensais', icon: '💰' },
  { path: '/incomes/occasional', label: 'Receitas Avulsas', icon: '💵' },
  { path: '/categories', label: 'Categorias', icon: '📁' },
  { path: '/wishlist', label: 'Lista de Desejos', icon: '⭐' }
]

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <aside class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r">
    <div class="flex items-center gap-2 px-6 py-4 border-b">
      <span class="text-2xl">💰</span>
      <span class="font-semibold text-gray-900">Finances Nuxt</span>
    </div>
    
    <nav class="flex-1 px-4 py-4 space-y-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
          isActive(item.path)
            ? 'bg-primary-50 text-primary-600'
            : 'text-gray-600 hover:bg-gray-50'
        ]"
      >
        <span class="text-lg">{{ item.icon }}</span>
        <span class="font-medium">{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>
