<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const toast = useToast()
const { registerSchema, validate } = useValidation()

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)

async function handleSubmit() {
  errors.value = {}
  
  if (form.password !== form.confirmPassword) {
    errors.value.confirmPassword = 'As senhas não conferem'
    return
  }

  const result = validate(registerSchema, { ...form })
  if (!result.success) {
    errors.value = result.errors
    return
  }

  loading.value = true
  const response = await authStore.register(form.email, form.password, form.name || undefined)
  loading.value = false

  if (response.success) {
    toast.success('Conta criada com sucesso!')
    navigateTo('/dashboard')
  } else {
    toast.error(response.error || 'Erro ao criar conta')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <span class="text-5xl mb-4 block">💰</span>
        <h1 class="text-2xl font-bold text-gray-900">Finances Nuxt</h1>
        <p class="text-gray-500 mt-2">Crie sua conta gratuitamente</p>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Cadastro</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <UiInput
            v-model="form.name"
            label="Nome (opcional)"
            placeholder="Seu nome"
          />

          <UiInput
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="seu@email.com"
            :error="errors.email"
            required
          />

          <UiInput
            v-model="form.password"
            type="password"
            label="Senha"
            placeholder="Mínimo 8 caracteres"
            :error="errors.password"
            required
          />

          <UiInput
            v-model="form.confirmPassword"
            type="password"
            label="Confirmar senha"
            placeholder="Repita a senha"
            :error="errors.confirmPassword"
            required
          />

          <UiButton type="submit" :loading="loading" full>
            Criar conta
          </UiButton>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Já tem conta? 
          <NuxtLink to="/" class="text-primary-500 hover:underline">
            Faça login
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
