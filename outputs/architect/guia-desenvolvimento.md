# Guia de Desenvolvimento - Finances Nuxt

## 1. Getting Started

### 1.1 Pré-requisitos

```bash
Node.js >= 20.x
npm >= 10.x
Git
Conta no Neon (para banco de dados)
Conta no Vercel (para deploy)
```

### 1.2 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/finances-nuxt.git
cd finances-nuxt

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Edite o .env com suas credenciais
# DATABASE_URL=postgresql://...
# JWT_SECRET=sua-chave-super-secreta-min-32-chars

# Execute as migrations do banco
npx prisma migrate dev

# (Opcional) Seed com dados de exemplo
npx prisma db seed

# Inicie o servidor de desenvolvimento
npm run dev
```

### 1.3 Acesso ao Projeto

```
Desenvolvimento local: http://localhost:3000
Prisma Studio: http://localhost:5555 (npm run prisma:studio)
```

---

## 2. Estrutura do Projeto

### 2.1 Visão Geral

```
finances-nuxt/
├── app/                    # Nuxt 4 App Router
├── server/                 # API Routes (H3)
├── prisma/                 # Schema e migrations
├── components/             # Componentes Vue
├── composables/            # Composables reutilizáveis
├── stores/                 # Pinia stores
├── pages/                  # Páginas (file-based routing)
├── layouts/                # Layouts
├── types/                  # TypeScript types
└── utils/                  # Utilitários
```

### 2.2 Convenções de Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes | PascalCase | `TransactionCard.vue` |
| Composables | camelCase com `use` | `useAuth.ts` |
| Stores | camelCase | `auth.ts` |
| API Routes | kebab-case | `transaction-list.get.ts` |
| Types/Interfaces | PascalCase | `TransactionType` |
| Utils | camelCase | `formatCurrency.ts` |
| CSS Classes | kebab-case | `transaction-card` |
| Arquivos | kebab-case | `user-profile.vue` |

---

## 3. Convenções de Código

### 3.1 TypeScript

```typescript
// ✅ Use interfaces para tipos de objetos
interface User {
  id: string;
  email: string;
  name?: string;
}

// ✅ Use types para unions e intersections
type TransactionType = 'income' | 'expense';
type UserWithTransactions = User & {
  transactions: Transaction[];
};

// ✅ Use const para objetos constants
const API_ENDPOINTS = {
  AUTH: '/api/auth',
  TRANSACTIONS: '/api/transactions',
} as const;

// ❌ Evite any - use unknown com type guards
async function parseResponse(response: unknown) {
  if (isTransactionResponse(response)) {
    return response.data;
  }
  throw new Error('Invalid response');
}
```

### 3.2 Vue Components

```vue
<!-- ✅ Props com tipagem e validação -->
<script setup lang="ts">
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false
});

// Emit com tipagem
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'update', value: string): void;
}>();

// Estilo de script: <script setup> com TypeScript
</script>

<template>
  <button 
    :class="['btn', `btn-${variant}`]"
    :disabled="loading"
    @click="emit('click', $event)"
  >
    <slot v-if="!loading" />
    <span v-else>Carregando...</span>
  </button>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-colors;
}

.btn-primary {
  @apply bg-primary-500 text-white hover:bg-primary-600;
}
</style>
```

### 3.3 API Routes

```typescript
// ✅ Estruture suas API routes assim
import { z } from 'zod';
import prisma from '~/server/utils/prisma';

// Schema de validação
const createCategorySchema = z.object({
  name: z.string().min(3).max(50),
  budget: z.number().positive().optional()
});

export default defineEventHandler(async (event) => {
  // 1. Ler e validar body
  const body = await readBody(event);
  const result = createCategorySchema.safeParse(body);
  
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
    });
  }

  // 2. Obter usuário do contexto (middleware já validou)
  const userId = event.context.user?.userId;
  if (!userId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  // 3. Operações no banco
  try {
    const category = await prisma.category.create({
      data: {
        ...result.data,
        userId
      }
    });

    // 4. Retornar resposta
    return { category };
  } catch (error) {
    // Tratar erros específicos do Prisma
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 400,
        message: 'Categoria já existe'
      });
    }
    throw error;
  }
});
```

### 3.4 Composables

```typescript
// ✅ Estruture composables assim
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  // State
  const count = ref(initialValue);
  
  // Getters (computed)
  const isPositive = computed(() => count.value > 0);
  const isNegative = computed(() => count.value < 0);
  const isZero = computed(() => count.value === 0);
  
  // Actions
  function increment() {
    count.value++;
  }
  
  function decrement() {
    count.value--;
  }
  
  function reset() {
    count.value = initialValue;
  }

  // Retornar sempre como objeto
  return {
    count,
    isPositive,
    isNegative,
    isZero,
    increment,
    decrement,
    reset
  };
}
```

### 3.5 Pinia Stores

```typescript
// ✅ Estruture stores assim
import { defineStore } from 'pinia';

interface Transaction {
  id: string;
  name: string;
  price: number;
  type: 'income' | 'expense';
}

interface TransactionState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
}

export const useTransactionStore = defineStore('transactions', {
  state: (): TransactionState => ({
    items: [],
    loading: false,
    error: null
  }),

  getters: {
    totalIncome: (state) => 
      state.items
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.price, 0),
    
    totalExpense: (state) => 
      state.items
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.price, 0),
    
    balance: (state) => {
      const income = state.items
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.price, 0);
      const expense = state.items
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.price, 0);
      return income - expense;
    }
  },

  actions: {
    async fetchTransactions() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await $fetch('/api/transactions');
        this.items = response.transactions;
      } catch (error: any) {
        this.error = error.data?.message || 'Erro ao carregar';
      } finally {
        this.loading = false;
      }
    },

    async addTransaction(data: Omit<Transaction, 'id'>) {
      try {
        const response = await $fetch('/api/transactions', {
          method: 'POST',
          body: data
        });
        this.items.push(response.transaction);
        return { success: true };
      } catch (error: any) {
        return { 
          success: false, 
          error: error.data?.message || 'Erro ao criar' 
        };
      }
    },

    async deleteTransaction(id: string) {
      try {
        await $fetch(`/api/transactions/${id}`, { method: 'DELETE' });
        this.items = this.items.filter(t => t.id !== id);
        return { success: true };
      } catch (error: any) {
        return { success: false, error: error.data?.message };
      }
    }
  }
});
```

---

## 4. Padrões de Desenvolvimento

### 4.1 Componentização

```vue
<!-- ✅ Componentes pequenos e focados -->
<!-- components/ui/Button.vue -->
<template>
  <button 
    :class="[
      'inline-flex items-center justify-center gap-2',
      'px-4 py-2 rounded-lg font-medium',
      'transition-colors duration-150',
      variants[variant],
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="animate-spin">⟳</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false
});

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  ghost: 'text-primary-500 hover:bg-primary-50',
  danger: 'bg-red-500 text-white hover:bg-red-600'
};
</script>
```

### 4.2 Error Handling

```typescript
// ✅ Use um composable para tratamento de erros
// composables/useErrorHandler.ts
export function useErrorHandler() {
  const toast = useToast();

  function handleError(error: unknown, defaultMessage = 'Algo deu errado') {
    console.error('Error:', error);

    if (isNuxtError(error)) {
      const message = error.data?.message || error.message;
      toast.error(message);
      return message;
    }

    if (error instanceof Error) {
      toast.error(error.message);
      return error.message;
    }

    toast.error(defaultMessage);
    return defaultMessage;
  }

  return { handleError };
}

// Usage
const { handleError } = useErrorHandler();

try {
  await transactionStore.add(data);
  toast.success('Transação criada!');
} catch (error) {
  handleError(error, 'Erro ao criar transação');
}
```

### 4.3 Loading States

```vue
<!-- ✅ Skeleton loading para listas -->
<template>
  <div v-if="loading" class="space-y-4">
    <div v-for="i in 5" :key="i" class="skeleton-card">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text w-3/4"></div>
    </div>
  </div>

  <div v-else-if="items.length === 0">
    <EmptyState message="Nenhum item encontrado" />
  </div>

  <div v-else class="space-y-4">
    <TransactionCard 
      v-for="item in items" 
      :key="item.id" 
      :item="item"
    />
  </div>
</template>

<style scoped>
.skeleton {
  @apply bg-gray-200 rounded animate-pulse;
}
.skeleton-card {
  @apply p-4 bg-white rounded-xl;
}
.skeleton-title {
  @apply h-6 w-1/2 mb-3;
}
.skeleton-text {
  @apply h-4 mb-2;
}
</style>
```

### 4.4 Form Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <Input
      v-model="form.name"
      label="Nome"
      :error="errors.name"
    />
    
    <Input
      v-model.number="form.price"
      label="Valor"
      type="number"
      :error="errors.price"
    />
    
    <Select
      v-model="form.categoryId"
      label="Categoria"
      :options="categories"
      :error="errors.categoryId"
    />
    
    <Button type="submit" :loading="submitting">
      Salvar
    </Button>
  </form>
</template>

<script setup lang="ts">
const { transactionSchema } = useValidation();

const form = reactive({
  name: '',
  price: undefined as number | undefined,
  categoryId: ''
});

const errors = ref<Record<string, string>>({});
const submitting = ref(false);

async function handleSubmit() {
  errors.value = {};
  
  const result = transactionSchema.safeParse(form);
  
  if (!result.success) {
    errors.value = result.error.flatten().fieldErrors
      .reduce((acc, err) => ({
        ...acc,
        [err.path[0]]: err.message
      }), {});
    return;
  }
  
  submitting.value = true;
  try {
    await transactionStore.add(result.data);
    toast.success('Salvo com sucesso!');
  } catch (error) {
    handleError(error);
  } finally {
    submitting.value = false;
  }
}
</script>
```

---

## 5. Git Workflow

### 5.1 Branch Naming

```
feature/nome-da-feature
bugfix/nome-do-bug
hotfix/nome-criticalo
refactor/nome-refatoracao
docs/nome-documentacao
```

### 5.2 Commit Messages

```
feat: adiciona funcionalidade de wishlist
fix: corrige validação de email no cadastro
refactor: extrai composable useTransaction
docs: atualiza README com instruções de deploy
style: formata código com prettier
test: adiciona testes unitários para useFormatters
chore: atualiza dependências
```

### 5.3 Pull Request

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de mudança
- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Docs

## Screenshots (se aplicável)

## Checklist
- [ ] Testes passando
- [ ] Lint passando
- [ ] Sem conflitos com main
- [ ] Atualizei documentação se necessário

## Related Issues
Fixes #123
```

---

## 6. Debugging

### 6.1 Vue DevTools

```bash
# Instale a extensão Vue DevTools
# https://devtools.vuejs.org/

# Use no browser para:
# - Inspecionar componentes
# - Ver Pinia stores
# - Timeline de eventos
# - Performance profiling
```

### 6.2 Prisma Studio

```bash
# Abra Prisma Studio para visualizar/editar dados
npm run prisma:studio

# Ou via CLI para verificar schema
npx prisma validate
npx prisma format
```

### 6.3 API Testing

```bash
# Teste manual com curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Ou use o Nuxt DevTools Network tab
```

### 6.4 Common Issues

```typescript
// Issue: Prisma client not found in production
// Solução: Adicione ao build
// nuxt.config.ts
build: {
  transpile: ['@prisma/client']
}

// Issue: Pinia store not persisting
// Solução: Configure persist corretamente
// stores/index.ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Issue: JWT middleware not running
// Solução: Adicione middleware ao server
// nuxt.config.ts
nitro: {
  routeRules: {
    '/api/**': { middleware: 'auth' }
  }
}
```

---

## 7. Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build localmente

# Database
npm run prisma:studio    # Abre Prisma Studio
npm run prisma:generate   # Gera Prisma Client
npm run prisma:migrate    # Executa migrations
npm run prisma:seed       # Popula banco com dados de exemplo

# Code Quality
npm run lint          # Executa ESLint
npm run lint:fix      # Executa ESLint com auto-fix
npm run typecheck     # Verifica tipos TypeScript

# Testing
npm run test          # Executa todos os testes
npm run test:unit     # Testes unitários
npm run test:e2e     # Testes E2E
npm run test:coverage # Coverage report
```

---

## 8. Checklist Pré-Deploy

```markdown
### Código
- [ ] Todos os testes passando
- [ ] Lint sem erros
- [ ] TypeScript compilando
- [ ] Sem console.log residual
- [ ] Variáveis de ambiente configuradas

### Segurança
- [ ] JWT_SECRET configurado (32+ chars)
- [ ] DATABASE_URL com SSL
- [ ] Headers de segurança configurados
- [ ] Rate limiting implementado
- [ ] Input validation em todas API routes

### Performance
- [ ] Lazy loading em componentes grandes
- [ ] Imagens otimizadas
- [ ] Assets minificados
- [ ] Meta tags SEO
- [ ] Sitemap gerado

### UX
- [ ] Empty states implementados
- [ ] Loading states visíveis
- [ ] Error handling com feedback
- [ ] Mobile responsivo testado
- [ ] Acessibilidade verificada
```

---

**Versão:** 1.0  
**Data:** 01/04/2026  
**Autor:** Arquiteto de Software
