<script setup lang="ts">
const authStore = useAuthStore()
const showDrawer = ref(false)
const showUserMenu = ref(false)

function toggleDrawer() {
  showDrawer.value = !showDrawer.value
}

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

function closeUserMenu() {
  showUserMenu.value = false
}

async function handleLogout() {
  await authStore.logout()
  navigateTo('/')
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/expenses/monthly', label: 'Despesas Mensais', icon: '💸' },
  { path: '/expenses/occasional', label: 'Despesas Avulsas', icon: '🛒' },
  { path: '/incomes/monthly', label: 'Receitas Mensais', icon: '💰' },
  { path: '/incomes/occasional', label: 'Receitas Avulsas', icon: '💵' },
  { path: '/categories', label: 'Categorias', icon: '📁' },
  { path: '/wishlist', label: 'Lista de Desejos', icon: '⭐' }
]

const route = useRoute()
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
  <header class="bg-white border-b sticky top-0 z-30">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center gap-3">
        <button 
          @click="toggleDrawer"
          class="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span class="text-xl">☰</span>
        </button>
        
        <NuxtLink to="/dashboard" class="flex items-center gap-2">
          <span class="text-2xl">💰</span>
          <span class="font-semibold text-gray-900 hidden sm:block">Finances Nuxt</span>
        </NuxtLink>
      </div>
      
      <div class="relative">
        <button 
          @click="toggleUserMenu"
          class="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium"
        >
          {{ authStore.userInitials }}
        </button>
        
        <Transition
          enter-active-class="transition-opacity duration-150"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div 
            v-if="showUserMenu"
            class="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border py-2"
            v-click-outside="closeUserMenu"
          >
            <div class="px-4 py-2 border-b">
              <p class="font-medium text-gray-900">{{ authStore.userName }}</p>
              <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
            </div>
            <button 
              @click="handleLogout"
              class="w-full px-4 py-2 text-left text-error-500 hover:bg-gray-50 transition-colors"
            >
              Sair
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </header>

  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="showDrawer"
      class="fixed inset-0 z-50 bg-black/50 lg:hidden"
      @click="showDrawer = false"
    >
      <div 
        class="absolute inset-y-0 left-0 w-64 bg-white shadow-xl"
        @click.stop
      >
        <div class="flex items-center justify-between px-4 py-4 border-b">
          <div class="flex items-center gap-2">
            <span class="text-2xl">💰</span>
            <span class="font-semibold text-gray-900">Menu</span>
          </div>
          <button 
            @click="showDrawer = false"
            class="p-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <nav class="p-4 space-y-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="showDrawer = false"
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

        <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium">
              {{ authStore.userInitials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-900 truncate">{{ authStore.userName }}</p>
              <p class="text-sm text-gray-500 truncate">{{ authStore.user?.email }}</p>
            </div>
          </div>
          <button 
            @click="handleLogout"
            class="w-full btn btn-secondary text-error-500"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
