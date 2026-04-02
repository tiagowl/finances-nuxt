<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const transactionsStore = useTransactionsStore()
const categoriesStore = useCategoriesStore()

const categoriesWithSpending = ref<any[]>([])

onMounted(async () => {
  await Promise.all([
    categoriesStore.fetchCategories(),
    transactionsStore.fetchSummary(),
    transactionsStore.fetchMonthlyExpenses(),
    transactionsStore.fetchMonthlyIncomes()
  ])
  
  await fetchCategoriesWithSpending()
})

async function fetchCategoriesWithSpending() {
  try {
    const response = await $fetch<{ categories: any[] }>('/api/reports/by-category')
    categoriesWithSpending.value = response.categories
  } catch (error) {
    console.error('Erro ao carregar categorias com gastos:', error)
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Olá, {{ authStore.userName }}! 👋</h1>
      <p class="text-gray-500 mt-1">Aqui está o resumo das suas finanças</p>
    </div>

    <DashboardSummaryCards 
      :total-income="transactionsStore.totalIncomes"
      :total-expenses="transactionsStore.totalExpenses"
      :balance="transactionsStore.balance"
    />

    <DashboardCategoryOverview 
      :categories="categoriesWithSpending"
      class="mt-6"
    />

    <div class="mt-6 grid grid-cols-2 gap-4">
      <NuxtLink to="/expenses/monthly" class="card card-clickable p-5 text-center">
        <span class="text-3xl">💸</span>
        <p class="font-semibold text-gray-900 mt-3">Despesas Mensais</p>
        <p class="text-sm text-gray-500 mt-1">{{ transactionsStore.monthlyExpenses.length }} itens</p>
      </NuxtLink>
      <NuxtLink to="/incomes/monthly" class="card card-clickable p-5 text-center">
        <span class="text-3xl">💰</span>
        <p class="font-semibold text-gray-900 mt-3">Receitas Mensais</p>
        <p class="text-sm text-gray-500 mt-1">{{ transactionsStore.monthlyIncomes.length }} itens</p>
      </NuxtLink>
    </div>
  </div>
</template>
