<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const categoriesStore = useCategoriesStore()
const toast = useToast()

const { selectedCount, hasSelection, isSelected, toggle, toggleAll, deselectAll, getSelectedIds } = useBulkSelection()

const showForm = ref(false)
const editingCategory = ref<any>(null)
const loading = ref(false)

const form = reactive({
  name: '',
  budget: '',
  color: '#6366F1',
  icon: ''
})

onMounted(() => {
  categoriesStore.fetchCategories()
})

function openForm(category?: any) {
  if (category) {
    editingCategory.value = category
    form.name = category.name
    form.budget = category.budget?.toString() || ''
    form.color = category.color || '#6366F1'
    form.icon = category.icon || ''
  } else {
    editingCategory.value = null
    form.name = ''
    form.budget = ''
    form.color = '#6366F1'
    form.icon = ''
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingCategory.value = null
}

async function handleSubmit() {
  const data = {
    name: form.name,
    budget: form.budget ? parseFloat(form.budget) : null,
    color: form.color || null,
    icon: form.icon || null
  }

  let response
  if (editingCategory.value) {
    response = await categoriesStore.updateCategory(editingCategory.value.id, data)
  } else {
    response = await categoriesStore.createCategory(data)
  }

  if (response.success) {
    toast.success(editingCategory.value ? 'Categoria atualizada!' : 'Categoria criada!')
    closeForm()
    await categoriesStore.fetchCategories()
  } else {
    toast.error(response.error || 'Erro ao salvar')
  }
}

async function handleDelete(id: string) {
  if (!confirm('Tem certeza que deseja excluir esta categoria?')) return
  
  const response = await categoriesStore.deleteCategory(id)
  if (response.success) {
    toast.success('Categoria excluída!')
    await categoriesStore.fetchCategories()
  } else {
    toast.error(response.error || 'Erro ao excluir')
  }
}

async function handleBulkDelete() {
  const ids = getSelectedIds()
  if (!confirm(`Tem certeza que deseja excluir ${ids.length} categoria(s)?`)) return
  
  loading.value = true
  let deleted = 0
  let errors = 0

  for (const id of ids) {
    const response = await categoriesStore.deleteCategory(id)
    if (response.success) {
      deleted++
    } else {
      errors++
    }
  }

  loading.value = false
  deselectAll()
  await categoriesStore.fetchCategories()
  
  if (errors > 0) {
    toast.error(`${deleted} excluída(s), ${errors} erro(s)`)
  } else {
    toast.success(`${deleted} categoria(s) excluída(s)!`)
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Categorias</h1>
        <p class="text-gray-500">Gerencie suas categorias de transações</p>
      </div>
      <UiButton @click="openForm()">
        + Nova Categoria
      </UiButton>
    </div>

    <UiBulkActionsBar
      v-if="hasSelection"
      :selected-count="selectedCount"
      @delete="handleBulkDelete"
      @deselect="deselectAll"
    />

    <div v-if="categoriesStore.loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="card animate-pulse">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="categoriesStore.categories.length === 0">
      <UiEmptyState 
        icon="📁"
        title="Nenhuma categoria"
        description="Cadastre suas categorias para organizar suas transações"
        action-label="Criar categoria"
        @action="openForm()"
      />
    </div>

    <div v-else class="space-y-3">
      <div class="flex items-center justify-between mb-2">
        <button 
          @click="toggleAll(categoriesStore.categories)"
          class="text-sm text-gray-500 hover:text-primary-500 flex items-center gap-2"
        >
          <span :class="['w-5 h-5 rounded border-2 flex items-center justify-center', 
            selectedCount === categoriesStore.categories.length && selectedCount > 0
              ? 'bg-primary-500 border-primary-500 text-white' 
              : 'border-gray-300']">
            <span v-if="selectedCount === categoriesStore.categories.length && selectedCount > 0" class="text-xs">✓</span>
          </span>
          Selecionar todos
        </button>
        <span class="text-xs text-gray-400">{{ categoriesStore.categories.length }} itens</span>
      </div>
      <CategoriesCategoryCard
        v-for="category in categoriesStore.categories"
        :key="category.id"
        :category="category"
        :selectable="true"
        :selected="isSelected(category.id)"
        @edit="openForm"
        @delete="handleDelete"
        @select="toggle"
      />
    </div>

    <UiModal :show="showForm" :title="editingCategory ? 'Editar Categoria' : 'Nova Categoria'" @close="closeForm">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <UiInput
          v-model="form.name"
          label="Nome"
          placeholder="Ex: Alimentação, Transporte..."
          required
        />

        <UiInput
          v-model="form.budget"
          type="number"
          label="Orçamento máximo (opcional)"
          placeholder="0,00"
        />

        <div class="input-group">
          <label class="input-label">Cor</label>
          <input type="color" v-model="form.color" class="w-full h-12 rounded-lg cursor-pointer" />
        </div>

        <UiInput
          v-model="form.icon"
          label="Ícone (emoji)"
          placeholder="Ex: 🍔, 🚗, 💊"
        />

        <UiButton type="submit" full>
          {{ editingCategory ? 'Salvar' : 'Criar' }}
        </UiButton>
      </form>
    </UiModal>
  </div>
</template>
