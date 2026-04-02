<script setup lang="ts">
import type { MonthlyExpense, MonthlyIncome, Category } from '~/types'

interface Props {
  show: boolean
  title: string
  categories: Category[]
  type: 'expense' | 'income'
  transactionType: 'monthly' | 'occasional'
  initialData?: Partial<MonthlyExpense | MonthlyIncome>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: any): void
}>()

const { expenseSchema, occasionalExpenseSchema, incomeSchema, occasionalIncomeSchema, validate } = useValidation()

const form = reactive({
  name: '',
  price: '',
  day: '',
  date: '',
  categoryId: '',
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear()
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)

watch(() => props.show, (value) => {
  if (value && props.initialData) {
    form.name = (props.initialData as any).name || ''
    form.price = (props.initialData as any).price?.toString() || ''
    form.day = (props.initialData as any).day?.toString() || ''
    form.date = (props.initialData as any).date || ''
    form.categoryId = (props.initialData as any).categoryId || ''
    form.month = (props.initialData as any).month || new Date().getMonth() + 1
    form.year = (props.initialData as any).year || new Date().getFullYear()
  } else if (value) {
    resetForm()
  }
})

function resetForm() {
  form.name = ''
  form.price = ''
  form.day = ''
  form.date = new Date().toISOString().split('T')[0]
  form.categoryId = ''
  form.month = new Date().getMonth() + 1
  form.year = new Date().getFullYear()
  errors.value = {}
}

async function handleSubmit() {
  errors.value = {}
  
  let data: any
  let schema: any

  if (props.type === 'expense') {
    if (props.transactionType === 'occasional') {
      if (!form.date) {
        errors.value.date = 'Data é obrigatória'
        return
      }
      const parsedDate = new Date(form.date + 'T00:00:00')
      if (isNaN(parsedDate.getTime())) {
        errors.value.date = 'Data inválida'
        return
      }
      data = {
        name: form.name,
        price: parseFloat(form.price),
        day: parsedDate.getDate(),
        month: parsedDate.getMonth() + 1,
        year: parsedDate.getFullYear(),
        categoryId: form.categoryId
      }
      schema = occasionalExpenseSchema
    } else {
      data = {
        name: form.name,
        price: parseFloat(form.price),
        day: parseInt(form.day),
        categoryId: form.categoryId
      }
      schema = expenseSchema
    }
  } else {
    if (props.transactionType === 'occasional') {
      if (!form.date) {
        errors.value.date = 'Data é obrigatória'
        return
      }
      const parsedDate = new Date(form.date + 'T00:00:00')
      if (isNaN(parsedDate.getTime())) {
        errors.value.date = 'Data inválida'
        return
      }
      data = {
        name: form.name,
        price: parseFloat(form.price),
        day: parsedDate.getDate(),
        month: parsedDate.getMonth() + 1,
        year: parsedDate.getFullYear(),
        categoryId: null
      }
      schema = occasionalIncomeSchema
    } else {
      data = {
        name: form.name,
        price: parseFloat(form.price),
        day: parseInt(form.day),
        categoryId: null
      }
      schema = incomeSchema
    }
  }
  
  const result = validate(schema, data)
  
  if (!result.success) {
    errors.value = { ...errors.value, ...result.errors }
    return
  }

  loading.value = true
  try {
    emit('submit', result.data)
    emit('close')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UiBottomSheet :show="show" :title="title" @close="emit('close')">
    <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
      <UiInput
        v-model="form.name"
        label="Nome"
        placeholder="Ex: Aluguel, Mercado..."
        :error="errors.name"
        required
      />
      
      <UiInput
        v-model="form.price"
        label="Valor"
        type="number"
        placeholder="0,00"
        :error="errors.price"
        required
      />
      
      <UiSelect
        v-if="type === 'expense'"
        v-model="form.categoryId"
        label="Categoria"
        :options="categories.map(c => ({ 
          value: c.id, 
          label: c.name, 
          color: c.color,
          budget: c.budget,
          totalSpent: c.totalSpent
        }))"
        placeholder="Selecione uma categoria"
        :error="errors.categoryId"
        :required="true"
        :show-budget="true"
      />

      <UiInput
        v-if="transactionType === 'monthly'"
        v-model="form.day"
        label="Dia do vencimento/recebimento"
        type="number"
        placeholder="1-31"
        :error="errors.day"
        required
      />

      <UiInput
        v-else
        v-model="form.date"
        label="Data"
        type="date"
        :error="errors.date"
        required
      />

      <div class="pt-4">
        <UiButton type="submit" :loading="loading" full>
          Salvar
        </UiButton>
      </div>
    </form>
  </UiBottomSheet>
</template>
