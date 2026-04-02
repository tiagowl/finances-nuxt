# Documentação Técnica - Finances Nuxt

## 1. Especificações Técnicas

### 1.1 Stack Tecnológica

| Camada | Tecnologia | Versão | Justificativa |
|--------|------------|--------|---------------|
| **Frontend** | Nuxt 4 | 4.x | App Router, SSR, auto-imports |
| **UI Framework** | Vue 3 | 3.5.x | Composition API, TypeScript |
| **State Management** | Pinia | 2.x | Oficial Vue, devtools support |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first, JIT, mobile-first |
| **API** | Nuxt Server (H3) | 1.x | Server routes integradas |
| **ORM** | Prisma | 5.x | Type-safe, migrations, migrations |
| **Database** | PostgreSQL (Neon) | 15.x | Serverless, branching, SSL |
| **Auth** | JWT + Bcrypt | - | Stateless, seguro |
| **Validation** | Zod | 3.x | Type inference, schema validation |
| **Deploy** | Vercel | - | Edge network, serverless, free tier |

### 1.2 Requisitos de Sistema

```
Node.js: >= 20.x
npm: >= 10.x
PostgreSQL: 15+ (via Neon)
```

### 1.3 Dependências do Projeto

```json
{
  "dependencies": {
    "@pinia/nuxt": "^0.5",
    "@prisma/client": "^5.0",
    "bcrypt": "^5.1",
    "jsonwebtoken": "^9.0",
    "zod": "^3.23",
    "vue": "^3.5",
    "nuxt": "^3.14",
    "@nuxtjs/tailwindcss": "^6.12"
  },
  "devDependencies": {
    "prisma": "^5.0",
    "typescript": "^5.6",
    "@nuxt/devtools": "latest",
    "vue-tsc": "^2.1"
  }
}
```

---

## 2. Modelo de Dados

### 2.1 Schema do Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USER
// ============================================
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  categories       Category[]
  monthlyExpenses  MonthlyExpense[]
  occasionalExpenses OccasionalExpense[]
  monthlyIncomes   MonthlyIncome[]
  occasionalIncomes OccasionalIncome[]
  wishlistItems    WishlistItem[]

  @@map("users")
}

// ============================================
// CATEGORY
// ============================================
model Category {
  id        String   @id @default(cuid())
  name      String
  budget    Float?
  color     String?
  icon      String?
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  monthlyExpenses   MonthlyExpense[]
  occasionalExpenses OccasionalExpense[]
  monthlyIncomes    MonthlyIncome[]
  occasionalIncomes OccasionalIncome[]
  wishlistItems     WishlistItem[]

  @@unique([userId, name])
  @@map("categories")
}

// ============================================
// MONTHLY EXPENSE (Despesa Mensal)
// ============================================
model MonthlyExpense {
  id         String   @id @default(cuid())
  name       String
  price      Float
  day        Int      // 1-31
  categoryId String
  userId     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  // Relations
  category   Category @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("monthly_expenses")
}

// ============================================
// OCCASIONAL EXPENSE (Despesa Avulsa)
// ============================================
model OccasionalExpense {
  id         String   @id @default(cuid())
  name       String
  price      Float
  day        Int
  month      Int
  year       Int
  categoryId String
  userId     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  // Relations
  category   Category @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, month, year])
  @@map("occasional_expenses")
}

// ============================================
// MONTHLY INCOME (Receita Mensal)
// ============================================
model MonthlyIncome {
  id         String   @id @default(cuid())
  name       String
  price      Float
  day        Int
  categoryId String
  userId     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  // Relations
  category   Category @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("monthly_incomes")
}

// ============================================
// OCCASIONAL INCOME (Receita Avulsa)
// ============================================
model OccasionalIncome {
  id         String   @id @default(cuid())
  name       String
  price      Float
  day        Int
  month      Int
  year       Int
  categoryId String
  userId     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  // Relations
  category   Category @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, month, year])
  @@map("occasional_incomes")
}

// ============================================
// WISHLIST ITEM
// ============================================
model WishlistItem {
  id         String   @id @default(cuid())
  name       String
  price      Float
  link       String?
  isPurchased Boolean  @default(false)
  categoryId String
  userId     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  // Relations
  category   Category @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("wishlist_items")
}
```

---

## 3. API Endpoints

### 3.1 Autenticação

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|------------|
| POST | `/api/auth/register` | Cadastro | Não |
| POST | `/api/auth/login` | Login | Não |
| POST | `/api/auth/logout` | Logout | Sim |
| GET | `/api/auth/me` | Dados do usuário | Sim |

#### POST /api/auth/register
```typescript
// Request
{
  email: string,
  password: string
}

// Response 201
{
  user: { id, email, name },
  token: string
}

// Response 400
{ error: "Email already exists" }
```

#### POST /api/auth/login
```typescript
// Request
{
  email: string,
  password: string
}

// Response 200
{
  user: { id, email, name },
  token: string
}

// Response 401
{ error: "Invalid credentials" }
```

### 3.2 Categorias

| Método | Endpoint | Descrição | Autenticado |
|--------|----------|-----------|------------|
| GET | `/api/categories` | Listar | Sim |
| POST | `/api/categories` | Criar | Sim |
| GET | `/api/categories/:id` | Detalhe | Sim |
| PUT | `/api/categories/:id` | Editar | Sim |
| DELETE | `/api/categories/:id` | Excluir | Sim |

#### GET /api/categories
```typescript
// Response 200
{
  categories: [
    {
      id: string,
      name: string,
      budget: number | null,
      color: string | null,
      icon: string | null,
      totalSpent: number,
      _count: { monthlyExpenses, occasionalExpenses }
    }
  ]
}
```

#### POST /api/categories
```typescript
// Request
{
  name: string,
  budget?: number,
  color?: string,
  icon?: string
}

// Response 201
{
  category: { id, name, budget, color, icon }
}

// Response 400
{ error: "Category name already exists" }
```

### 3.3 Transações

#### Despesas Mensais
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/expenses/monthly` | Listar |
| POST | `/api/expenses/monthly` | Criar |
| PUT | `/api/expenses/monthly/:id` | Editar |
| DELETE | `/api/expenses/monthly/:id` | Excluir |

#### Despesas Avulsas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/expenses/occasional` | Listar |
| POST | `/api/expenses/occasional` | Criar |
| PUT | `/api/expenses/occasional/:id` | Editar |
| DELETE | `/api/expenses/occasional/:id` | Excluir |

#### Receitas Mensais
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/incomes/monthly` | Listar |
| POST | `/api/incomes/monthly` | Criar |
| PUT | `/api/incomes/monthly/:id` | Editar |
| DELETE | `/api/incomes/monthly/:id` | Excluir |

#### Receitas Avulsas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/incomes/occasional` | Listar |
| POST | `/api/incomes/occasional` | Criar |
| PUT | `/api/incomes/occasional/:id` | Editar |
| DELETE | `/api/incomes/occasional/:id` | Excluir |

#### Estrutura de Transação
```typescript
// Request (Create/Update)
{
  name: string,
  price: number,
  day: number,
  categoryId: string,
  month?: number,  // Para avulsas
  year?: number    // Para avulsas
}

// Response
{
  transaction: {
    id: string,
    name: string,
    price: number,
    day: number,
    month: number | null,
    year: number | null,
    category: { id, name, color, icon },
    createdAt: string,
    updatedAt: string
  }
}
```

### 3.4 Lista de Desejos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/wishlist` | Listar |
| POST | `/api/wishlist` | Criar |
| PUT | `/api/wishlist/:id` | Editar |
| DELETE | `/api/wishlist/:id` | Excluir |

```typescript
// Request
{
  name: string,
  price: number,
  link?: string,
  categoryId: string,
  isPurchased?: boolean
}

// Response
{
  item: {
    id: string,
    name: string,
    price: number,
    link: string | null,
    isPurchased: boolean,
    category: { id, name, color }
  }
}
```

### 3.5 Relatórios

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/reports/summary` | Resumo mensal |
| GET | `/api/reports/by-category` | Gastos por categoria |

#### GET /api/reports/summary
```typescript
// Query params: month, year

// Response
{
  summary: {
    totalIncome: number,
    totalExpenses: number,
    balance: number,
    monthlyIncomes: number,
    monthlyExpenses: number,
    occasionalIncomes: number,
    occasionalExpenses: number,
    topCategories: [
      { id, name, total, percentage, budget, isOverBudget }
    ]
  }
}
```

#### GET /api/reports/by-category
```typescript
// Query params: month, year

// Response
{
  categories: [
    {
      id: string,
      name: string,
      color: string,
      icon: string,
      budget: number | null,
      totalSpent: number,
      percentage: number,
      isOverBudget: boolean,
      transactions: {
        monthly: number,
        occasional: number
      }
    }
  ]
}
```

---

## 4. Segurança

### 4.1 Autenticação JWT

```typescript
// Token Payload
interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;  // 15 minutos
}

// Refresh Token Payload
interface RefreshPayload {
  userId: string;
  type: 'refresh';
  iat: number;
  exp: number;  // 7 dias
}
```

### 4.2 Middleware de Autenticação

```typescript
// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  const publicPaths = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/health'
  ];

  if (publicPaths.includes(event.path)) {
    return;
  }

  const token = getCookie(event, 'auth_token');
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    });
  }

  try {
    const decoded = verifyJWT(token);
    event.context.user = decoded;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid token'
    });
  }
});
```

### 4.3 Validação de Input

```typescript
// server/utils/validation.ts
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve ter pelo menos 1 letra maiúscula')
    .regex(/[0-9]/, 'Senha deve ter pelo menos 1 número')
});

export const categorySchema = z.object({
  name: z.string().min(3).max(50),
  budget: z.number().positive().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: z.string().max(50).optional()
});

export const transactionSchema = z.object({
  name: z.string().min(3).max(100),
  price: z.number().positive(),
  day: z.number().int().min(1).max(31),
  categoryId: z.string().cuid()
});
```

### 4.4 Headers de Segurança

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [],
      link: [],
      meta: [
        { name: 'X-Content-Type-Options', content: 'nosniff' },
        { name: 'X-Frame-Options', content: 'DENY' },
        { name: 'X-XSS-Protection', content: '1; mode=block' },
        { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
      ]
    }
  }
});
```

---

## 5. Performance

### 5.1 Estratégias

| Estratégia | Implementação | Impacto |
|------------|---------------|---------|
| SSR | Nuxt 4 App Router | SEO, LCP rápido |
| Code Splitting | Automático Nuxt | Bundle menor |
| Lazy Loading | Componentes dinâmicos | TTFB menor |
| CDN | Vercel Edge | Latência baixa |
| Image Opt | Nuxt Image | LCP melhor |
| Caching | Headers Cache-Control | Requests menos |

### 5.2 Métricas Alvo

| Métrica | Target | Measurement |
|---------|--------|-------------|
| FCP | < 1.5s | Lighthouse |
| LCP | < 2.5s | Lighthouse |
| TTI | < 3.5s | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| Bundle Size | < 200KB gzip | Build |

### 5.3 Otimizações Implementadas

```typescript
// Lazy load componentes
const TransactionForm = defineAsyncComponent(() => 
  import('~/components/transactions/TransactionForm.vue')
);

// Composables com SSR check
const useAuth = () => {
  if (process.server) return null;
  return useState('auth', () => ({...}));
};

// API route caching
export default cachedEventHandler(async (event) => {
  // Cache by user
}, {
  getKey: (event) => `reports:${event.context.user.userId}`
});
```

---

## 6. Configurações

### 6.1 Variáveis de Ambiente

```env
# .env.example

# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Auth
JWT_SECRET="your-super-secret-key-min-32-chars"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"

# App
NUXT_PUBLIC_APP_URL="https://yourapp.vercel.app"
NUXT_PUBLIC_APP_NAME="Finances Nuxt"

# Optional
SENTRY_DSN=""
ANALYTICS_ID=""
```

### 6.2 Nuxt Config

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt'
  ],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
      appName: process.env.NUXT_PUBLIC_APP_NAME
    }
  },

  app: {
    head: {
      title: 'Finances Nuxt',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Controle suas finanças pessoais' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' }
      ]
    }
  },

  routeRules: {
    '/api/**': { cors: true },
    '/dashboard/**': { ssr: true }
  },

  nitro: {
    preset: 'vercel'
  }
});
```

### 6.3 Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1', // Main
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      }
    }
  },
  plugins: []
}
```

---

## 7. Testes

### 7.1 Estrutura de Testes

```
tests/
├── unit/
│   ├── composables/
│   │   ├── useFormatters.test.ts
│   │   └── useValidation.test.ts
│   │
│   ├── stores/
│   │   ├── auth.test.ts
│   │   └── transactions.test.ts
│   │
│   └── utils/
│       └── password.test.ts
│
├── integration/
│   ├── api/
│   │   ├── auth.test.ts
│   │   ├── categories.test.ts
│   │   └── transactions.test.ts
│   │
│   └── utils/
│       └── setup.ts
│
└── e2e/
    ├── login.spec.ts
    ├── register.spec.ts
    └── transactions.spec.ts
```

### 7.2 Exemplo de Teste

```typescript
// tests/unit/composables/useFormatters.test.ts
import { describe, it, expect } from 'vitest';
import { useFormatters } from '~/composables/useFormatters';

describe('useFormatters', () => {
  describe('formatCurrency', () => {
    it('formats number to BRL currency', () => {
      const { formatCurrency } = useFormatters();
      expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
    });

    it('handles zero', () => {
      const { formatCurrency } = useFormatters();
      expect(formatCurrency(0)).toBe('R$ 0,00');
    });

    it('handles negative numbers', () => {
      const { formatCurrency } = useFormatters();
      expect(formatCurrency(-100)).toBe('-R$ 100,00');
    });
  });
});
```

---

**Versão:** 1.0  
**Data:** 01/04/2026  
**Autor:** Arquiteto de Software
