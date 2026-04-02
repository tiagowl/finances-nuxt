<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const transactionsStore = useTransactionsStore()
const categoriesStore = useCategoriesStore()
const toast = useToast()

const { selectedCount, hasSelection, isSelected, toggle, toggleAll, deselectAll, getSelectedIds } = useBulkSelection()

const showForm = ref(false)
const editingTransaction = ref<any>(null)
const loading = ref(false)

const form = reactive({
  name: '',
  price: '',
  day: '',
  categoryId: ''
})

onMounted(async () => {
  await Promise.all([
    transactionsStore.fetchMonthlyIncomes(),
    categoriesStore.fetchCategories()
  ])
})

function openForm(transaction?: any) {
  if (transaction) {
    editingTransaction.value = transaction
    form.name = transaction.name
    form.price = transaction.price.toString()
    form.day = transaction.day.toString()
    form.categoryId = transaction.categoryId
  } else {
    editingTransaction.value = null
    form.name = ''
    form.price = ''
    form.day = ''
    form.categoryId = ''
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingTransaction.value = null
}

async function handleSubmit(data: any) {
  let response
  if (editingTransaction.value) {
    response = await transactionsStore.updateMonthlyIncome(editingTransaction.value.id, data)
  } else {
    response = await transactionsStore.createMonthlyIncome(data)
  }

  if (response.success) {
    toast.success(editingTransaction.value ? 'Receita atualizada!' : 'Receita criada!')
    closeForm()
  } else {
    toast.error(response.error || 'Erro ao salvar')
  }
}

async function handleDelete(id: string) {
  if (!confirm('Tem certeza que deseja excluir esta receita?')) return
  
  const response = await transactionsStore.deleteMonthlyIncome(id)
  if (response.success) {
    toast.success('Receita excluída!')
  } else {
    toast.error(response.error || 'Erro ao excluir')
  }
}

async function handleBulkDelete() {
  const ids = getSelectedIds()
  if (!confirm(`Tem certeza que deseja excluir ${ids.length} receita(s)?`)) return
  
  loading.value = true
  let deleted = 0

  for (const id of ids) {
    const response = await transactionsStore.deleteMonthlyIncome(id)
    if (response.success) {
      deleted++
    }
  }

  loading.value = false
  deselectAll()
  await transactionsStore.fetchMonthlyIncomes()
  
  toast.success(`${deleted} receita(s) excluída(s)!`)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Receitas Mensais</h1>
        <p class="text-gray-500">Seus ingresos fixos do mês</p>
      </div>
      <UiButton @click="openForm()" :disabled="categoriesStore.categories.length === 0">
        + Nova Receita
      </UiButton>
    </div>

    <UiBulkActionsBar
      v-if="hasSelection"
      :selected-count="selectedCount"
      @delete="handleBulkDelete"
      @deselect="deselectAll"
    />

    <div class="card bg-success-50 mb-6">
      <p class="text-sm text-gray-600">Total do mês</p>
      <p class="text-2xl font-bold text-success-500">
        {{ formatCurrency(transactionsStore.totalMonthlyIncomes) }}
      </p>
    </div>

    <div v-if="transactionsStore.loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="card animate-pulse">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div class="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>

    <div v-else-if="transactionsStore.monthlyIncomes.length === 0">
      <UiEmptyState 
        icon="💰"
        title="Nenhuma receita mensal"
        description="Adicione suas receitas fixas como salário, aposentadoria..."
        action-label="Adicionar receita"
        @action="openForm()"
      />
    </div>

    <div v-else class="space-y-3">
      <div class="flex items-center justify-between mb-2">
        <button 
          @click="toggleAll(transactionsStore.monthlyIncomes)"
          class="text-sm text-gray-500 hover:text-primary-500 flex items-center gap-2"
        >
          <span :class="['w-5 h-5 rounded border-2 flex items-center justify-center', 
            selectedCount === transactionsStore.monthlyIncomes.length && selectedCount > 0
              ? 'bg-primary-500 border-primary-500 text-white' 
              : 'border-gray-300']">
            <span v-if="selectedCount === transactionsStore.monthlyIncomes.length && selectedCount > 0" class="text-xs">✓</span>
          </span>
          Selecionar todos
        </button>
        <span class="text-xs text-gray-400">{{ transactionsStore.monthlyIncomes.length }} itens</span>
      </div>
      <TransactionsTransactionCard
        v-for="income in transactionsStore.monthlyIncomes"
        :key="income.id"
        :transaction="income"
        type="income"
        :selectable="true"
        :selected="isSelected(income.id)"
        @edit="openForm"
        @delete="handleDelete"
        @toggle="toggle"
      />
    </div>

    <TransactionsTransactionForm
      :show="showForm"
      title="Nova Receita Mensal"
      :categories="categoriesStore.categories"
      type="income"
      transaction-type="monthly"
      :initial-data="editingTransaction"
      @close="closeForm"
      @submit="handleSubmit"
    />
  </div>
</template>
