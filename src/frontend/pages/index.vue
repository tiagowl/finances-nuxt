<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore()
const toast = useToast()
const { loginSchema, validate } = useValidation()

const config = useRuntimeConfig()

const form = reactive({
  email: '',
  password: ''
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)

async function handleSubmit() {
  errors.value = {}
  
  const result = validate(loginSchema, form)
  if (!result.success) {
    errors.value = result.errors
    return
  }

  loading.value = true
  const response = await authStore.login(form.email, form.password)
  loading.value = false

  if (response.success) {
    toast.success('Login realizado com sucesso!')
    navigateTo('/dashboard')
  } else {
    toast.error(response.error || 'Erro ao fazer login')
  }
}

function fillTestCredentials() {
  form.email = config.public.testUserEmail || 'teste@finances.com'
  form.password = config.public.testUserPassword || 'Teste123'
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <span class="text-5xl mb-4 block">💰</span>
        <h1 class="text-2xl font-bold text-gray-900">Finances Nuxt</h1>
        <p class="text-gray-500 mt-2">Suas finanças sob controle</p>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Entrar</h2>

        <div class="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
          <p class="text-sm font-medium text-success-700 mb-2">🔑 Credenciais de Teste</p>
          <p class="text-xs text-success-600 mb-3">
            Email: <code class="bg-success-100 px-1 rounded">{{ config.public.testUserEmail || 'teste@finances.com' }}</code>
          </p>
          <p class="text-xs text-success-600 mb-3">
            Senha: <code class="bg-success-100 px-1 rounded">{{ config.public.testUserPassword || 'Teste123' }}</code>
          </p>
          <button 
            @click="fillTestCredentials"
            class="text-xs text-success-700 font-medium hover:underline"
          >
            Preencher credenciais
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
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
            placeholder="••••••••"
            :error="errors.password"
            required
          />

          <UiButton type="submit" :loading="loading" full>
            Entrar
          </UiButton>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Não tem conta? 
          <NuxtLink to="/register" class="text-primary-500 hover:underline">
            Cadastre-se
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
