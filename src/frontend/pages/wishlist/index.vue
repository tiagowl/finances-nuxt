<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const wishlistStore = useWishlistStore()
const categoriesStore = useCategoriesStore()
const transactionsStore = useTransactionsStore()
const toast = useToast()

const { selectedCount, hasSelection, isSelected, toggle, toggleAll, deselectAll, getSelectedIds } = useBulkSelection()

const showForm = ref(false)
const editingItem = ref<any>(null)
const loading = ref(false)

const form = reactive({
  name: '',
  price: '',
  link: '',
  categoryId: ''
})

onMounted(async () => {
  await Promise.all([
    wishlistStore.fetchItems(),
    categoriesStore.fetchCategories()
  ])
})

function openForm(item?: any) {
  if (item) {
    editingItem.value = item
    form.name = item.name
    form.price = item.price.toString()
    form.link = item.link || ''
    form.categoryId = item.categoryId
  } else {
    editingItem.value = null
    form.name = ''
    form.price = ''
    form.link = ''
    form.categoryId = ''
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingItem.value = null
}

async function handleSubmit() {
  const data = {
    name: form.name,
    price: parseFloat(form.price),
    link: form.link || undefined,
    categoryId: form.categoryId
  }

  let response
  if (editingItem.value) {
    response = await wishlistStore.updateItem(editingItem.value.id, data)
  } else {
    response = await wishlistStore.createItem(data)
  }

  if (response.success) {
    toast.success(editingItem.value ? 'Item atualizado!' : 'Item adicionado!')
    closeForm()
  } else {
    toast.error(response.error || 'Erro ao salvar')
  }
}

async function handleDelete(id: string) {
  if (!confirm('Tem certeza que deseja excluir este item?')) return
  
  const response = await wishlistStore.deleteItem(id)
  if (response.success) {
    toast.success('Item excluído!')
  } else {
    toast.error(response.error || 'Erro ao excluir')
  }
}

async function handleMarkAsPurchased(item: any) {
  const currentDate = new Date()
  
  const expenseData = {
    name: item.name,
    price: item.price,
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    categoryId: item.categoryId
  }

  try {
    const response = await transactionsStore.createOccasionalExpense(expenseData)
    
    if (response.success) {
      await wishlistStore.updateItem(item.id, { isPurchased: true })
      toast.success(`${item.name} comprado e adicionado aos gastos!`)
    } else {
      toast.error(response.error || 'Erro ao registrar compra')
    }
  } catch (error) {
    toast.error('Erro ao processar compra')
  }
}

async function handleBulkDelete() {
  const ids = getSelectedIds()
  if (!confirm(`Tem certeza que deseja excluir ${ids.length} item(ns)?`)) return
  
  loading.value = true
  let deleted = 0

  for (const id of ids) {
    const response = await wishlistStore.deleteItem(id)
    if (response.success) {
      deleted++
    }
  }

  loading.value = false
  deselectAll()
  await wishlistStore.fetchItems()
  
  toast.success(`${deleted} item(ns) excluído(s)!`)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Lista de Desejos</h1>
        <p class="text-gray-500">Planeje suas compras futuras</p>
      </div>
      <UiButton @click="openForm()" :disabled="categoriesStore.categories.length === 0">
        + Novo Item
      </UiButton>
    </div>

    <UiBulkActionsBar
      v-if="hasSelection"
      :selected-count="selectedCount"
      @delete="handleBulkDelete"
      @deselect="deselectAll"
    />

    <div class="card bg-primary-50 mb-6">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-600">Total para comprar</p>
          <p class="text-2xl font-bold text-primary-500">
            {{ formatCurrency(wishlistStore.total) }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-600">{{ wishlistStore.pendingItems.length }} itens</p>
          <p class="text-sm text-gray-500">{{ wishlistStore.purchasedItems.length }} comprados</p>
        </div>
      </div>
    </div>

    <div v-if="wishlistStore.loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="card animate-pulse">
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div class="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>

    <div v-else-if="wishlistStore.items.length === 0">
      <UiEmptyState 
        icon="⭐"
        title="Sua lista está vazia"
        description="Adicione itens que você deseja comprar no futuro"
        action-label="Adicionar item"
        @action="openForm()"
      />
    </div>

    <div v-else class="space-y-3">
      <div v-if="wishlistStore.pendingItems.length > 0">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-medium text-gray-500">PENDENTES</h3>
          <button 
            @click="toggleAll(wishlistStore.pendingItems)"
            class="text-xs text-gray-500 hover:text-primary-500 flex items-center gap-2"
          >
            <span :class="['w-4 h-4 rounded border flex items-center justify-center', 
              selectedCount === wishlistStore.pendingItems.length && selectedCount > 0
                ? 'bg-primary-500 border-primary-500 text-white' 
                : 'border-gray-300']">
              <span v-if="selectedCount === wishlistStore.pendingItems.length && selectedCount > 0" class="text-[8px]">✓</span>
            </span>
            Selecionar
          </button>
        </div>
        <TransactionsWishlistCard
          v-for="item in wishlistStore.pendingItems"
          :key="item.id"
          :item="item"
          :selectable="true"
          :selected="isSelected(item.id)"
          @edit="openForm"
          @delete="handleDelete"
          @toggle="handleMarkAsPurchased"
          @select="toggle"
        />
      </div>

      <div v-if="wishlistStore.purchasedItems.length > 0" class="mt-6">
        <h3 class="text-sm font-medium text-gray-500 mb-3">COMPRADOS</h3>
        <TransactionsWishlistCard
          v-for="item in wishlistStore.purchasedItems"
          :key="item.id"
          :item="item"
          @edit="openForm"
          @delete="handleDelete"
          @toggle="() => wishlistStore.togglePurchased(item.id)"
        />
      </div>
    </div>

    <UiModal :show="showForm" :title="editingItem ? 'Editar Item' : 'Novo Item'" @close="closeForm">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <UiInput
          v-model="form.name"
          label="Nome do item"
          placeholder="Ex: Tênis Nike Air Max"
          required
        />

        <UiInput
          v-model="form.price"
          type="number"
          label="Preço"
          placeholder="0,00"
          required
        />

        <UiSelect
          v-model="form.categoryId"
          label="Categoria"
          :options="categoriesStore.categories.map(c => ({ value: c.id, label: c.name, color: c.color }))"
          placeholder="Selecione uma categoria"
          required
        />

        <UiInput
          v-model="form.link"
          type="url"
          label="Link para compra (opcional)"
          placeholder="https://..."
        />

        <UiButton type="submit" full>
          {{ editingItem ? 'Salvar' : 'Adicionar' }}
        </UiButton>
      </form>
    </UiModal>
  </div>
</template>
