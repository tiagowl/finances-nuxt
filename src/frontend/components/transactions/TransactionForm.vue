<script setup lang="ts">
import type { MonthlyExpense, MonthlyIncome, Category } from '~/types'
import { useValidation } from '~/composables/useValidation'

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

const { transactionSchema, occasionalTransactionSchema, validate } = useValidation()

const form = reactive({
  name: '',
  price: '',
  day: '',
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
  form.categoryId = ''
  form.month = new Date().getMonth() + 1
  form.year = new Date().getFullYear()
  errors.value = {}
}

async function handleSubmit() {
  errors.value = {}
  
  const data = {
    name: form.name,
    price: parseFloat(form.price),
    day: parseInt(form.day),
    categoryId: form.categoryId,
    ...(props.transactionType === 'occasional' ? { month: form.month, year: form.year } : {})
  }

  const schema = props.transactionType === 'occasional' 
    ? occasionalTransactionSchema 
    : transactionSchema
  
  const result = validate(schema, data)
  
  if (!result.success) {
    errors.value = result.errors
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
        v-model="form.categoryId"
        label="Categoria"
        :options="categories.map(c => ({ value: c.id, label: c.name, color: c.color }))"
        placeholder="Selecione uma categoria"
        :error="errors.categoryId"
        required
      />
      
      <UiInput
        v-model="form.day"
        label="Dia do vencimento/recebimento"
        type="number"
        placeholder="1-31"
        :error="errors.day"
        required
      />

      <div v-if="transactionType === 'occasional'" class="flex gap-4">
        <UiInput
          v-model.number="form.month"
          label="Mês"
          type="number"
          placeholder="1-12"
        />
        <UiInput
          v-model.number="form.year"
          label="Ano"
          type="number"
          placeholder="2024"
        />
      </div>

      <div class="pt-4">
        <UiButton type="submit" :loading="loading" full>
          Salvar
        </UiButton>
      </div>
    </form>
  </UiBottomSheet>
</template>
