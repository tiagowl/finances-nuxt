# Architecture Decision Records (ADRs) - Finances Nuxt

## Índice de ADRs

| ADR | Título | Status | Data |
|-----|--------|--------|------|
| ADR-001 | Escolha do Nuxt 4 como framework | Aceito | 01/04/2026 |
| ADR-002 | Uso do Prisma como ORM | Aceito | 01/04/2026 |
| ADR-003 | Neon PostgreSQL como banco de dados | Aceito | 01/04/2026 |
| ADR-004 | Autenticação com JWT | Aceito | 01/04/2026 |
| ADR-005 | Tailwind CSS para estilização | Aceito | 01/04/2026 |
| ADR-006 | Pinia para state management | Aceito | 01/04/2026 |
| ADR-007 | Zod para validação | Aceito | 01/04/2026 |
| ADR-008 | Deploy no Vercel | Aceito | 01/04/2026 |

---

## ADR-001: Escolha do Nuxt 4 como Framework

### Status
**Aceito** | 01/04/2026

### Contexto
Precisamos escolher um framework para o sistema de finanças pessoais que suporte:
- SSR para SEO e performance
- API routes integradas
- Mobile-first responsive
- TypeScript nativo
- Curva de aprendizado suave

### Decisão
Utilizar **Nuxt 4** como framework principal.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| Next.js 14 | Ecossistema grande, App Router maduro | Curva de aprendizado Vue menor para equipe |
| Nuxt 3 | Composition API, auto-imports | Nuxt 4 é mais novo |
| **Nuxt 4** | App Router, melhor DX, futuras features | Menos recursos online que Next.js |
| NestJS + Vue | Separação clara backend/frontend | Overhead, mais configurações |

### Consequências

**Positivas:**
- DX excelente com auto-imports e file-based routing
- Server routes integradas simplificam API
- SSR automático com hydration
- TypeScript nativo bem integrado
- App Router traz melhorias de performance

**Negativas:**
- Menor comunidade que Next.js
- Menos recursos de documentação para Nuxt 4 (novo)
- Dependência do ecossistema Vue

### Implementação

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Finances Nuxt',
      meta: [
        { name: 'description', content: 'Controle suas finanças pessoais' }
      ]
    }
  },
  routeRules: {
    '/api/**': { cors: true }
  }
});
```

---

## ADR-002: Uso do Prisma como ORM

### Status
**Aceito** | 01/04/2026

### Contexto
Precisamos de uma forma de interagir com o banco de dados que seja:
- Type-safe
- Fácil de fazer migrations
- Com schema legível
- Suporte a PostgreSQL
- Migrations versionadas

### Decisão
Utilizar **Prisma ORM** como camada de acesso a dados.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| Raw SQL | Performance máxima, controle total | Error-prone, sem type safety |
| Knex.js | Flexível, query builder | Type safety limitado |
| TypeORM | Popular, muitos features | Configuração complexa, migrations confusas |
| **Prisma** | Type-safe, migrations fáceis, DX excelente | Vendor lock-in, overhead de runtime |
| Drizzle | Type-safe, leve, performático | Ecossistema menor |

### Consequências

**Positivas:**
- Type-safe em toda a aplicação
- Schema declarativo e legível
- Migrations automatizadas
- Prisma Studio para visualização
- Auto-completion excelente

**Negativas:**
- Runtime overhead (instâncias)
- Conexões com pool (precisa configuração)
- Não tão flexível quanto raw SQL

### Implementação

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  
  categories Category[]
}

model Category {
  id     String @id @default(cuid())
  name   String
  budget Float?
  userId String
  
  user User @relation(fields: [userId], references: [id])
}
```

```typescript
// server/utils/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error']
});

export default prisma;

// Usage in API routes
export default defineEventHandler(async (event) => {
  const categories = await prisma.category.findMany({
    where: { userId: event.context.user.userId }
  });
  return categories;
});
```

---

## ADR-003: Neon PostgreSQL como Banco de Dados

### Status
**Aceito** | 01/04/2026

### Contexto
Precisamos de um banco de dados que seja:
- Serverless (paga pelo uso)
- PostgreSQL (robusto, ACID)
- Branching (dev/staging/prod)
- SSL nativo
- CDN integrado
- Easy setup

### Decisão
Utilizar **Neon PostgreSQL** como banco de dados.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| Supabase | Serverless, auto-API, realtime | Mais caro, features extras que não usamos |
| PlanetScale | Serverless, branching | Não é PostgreSQL real (Vitess) |
| Neon | Serverless, branching, PostgreSQL | Região única (precisa CDN) |
| Railway | Simples, PostgreSQL | Não é serverless, pricing por uso |
| ElephantSQL | Barato, simples | Sem branching, plano free limitado |
| **Neon** | Serverless, branching, PostgreSQL, free tier | Pode ter cold starts |

### Consequências

**Positivas:**
- Free tier generoso (0.5GB storage, 0.5GB RAM)
- Branching para dev/staging/prod
- Serverless (auto-scale)
- Full PostgreSQL compatibility
- SSL nativo

**Negativas:**
- Cold starts podem causar lentidão inicial
- Região única por projeto (precisa CDN para latência)
- 100 conexões simultâneas max (free tier)

### Implementação

```env
# .env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```typescript
// server/utils/prisma.ts - Connection pooling
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['error'] : []
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

---

## ADR-004: Autenticação com JWT

### Status
**Aceito** | 01/04/2026

### Contexto
Precisamos de um sistema de autenticação que seja:
- Stateless
- Seguro
- HTTP Only cookies
- Refresh token rotation
- Expiração automática
- Fácil de implementar

### Decisão
Implementar autenticação com **JWT + Refresh Tokens** em HTTP Only cookies.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| Sessions (express-session) | Simples, stateless-like | Storage no servidor |
| JWT localStorage | Simples, rápido | Vulnerável a XSS |
| **JWT HTTP Only Cookie** | Seguro, stateless | Mais complexo, CSRF |
| NextAuth/Auth.js | Feito para isso | Opinionado, pode ser overkill |
| Lucia Auth | Flexível, leve | Curva de aprendizado |

### Consequências

**Positivas:**
- Stateless (escalável)
- HTTP Only (seguro contra XSS)
- Refresh token rotation (segurança extra)
- Expiração automática
- Não depende de estado no servidor

**Negativas:**
- Implementação mais complexa
-需处理 CSRF (usar SameSite cookie)
- JWT no payload (dados sensíveis visíveis)

### Implementação

```typescript
// server/utils/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export function signAccessToken(payload: { userId: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

export function signRefreshToken(payload: { userId: string }) {
  return jwt.sign({ ...payload, type: 'refresh' }, REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function verifyRefreshToken(token: string) {
  const decoded = jwt.verify(token, REFRESH_SECRET) as { userId: string };
  if (decoded.type !== 'refresh') {
    throw new Error('Invalid token type');
  }
  return decoded;
}
```

```typescript
// server/api/auth/login.post.ts
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '~/server/utils/prisma';
import { signAccessToken, signRefreshToken } from '~/server/utils/jwt';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = loginSchema.parse(body);

  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const accessToken = signAccessToken({ userId: user.id, email: user.email });
  const refreshToken = signRefreshToken({ userId: user.id });

  setCookie(event, 'auth_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 15 // 15 minutes
  });

  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return {
    user: { id: user.id, email: user.email, name: user.name },
    token: accessToken
  };
});
```

```typescript
// server/api/auth/refresh.post.ts
import prisma from '~/server/utils/prisma';
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token');
  
  if (!refreshToken) {
    throw createError({ statusCode: 401, message: 'No refresh token' });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      throw createError({ statusCode: 401, message: 'User not found' });
    }

    // Rotate tokens
    const newAccessToken = signAccessToken({ userId: user.id, email: user.email });
    const newRefreshToken = signRefreshToken({ userId: user.id });

    setCookie(event, 'auth_token', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 15
    });

    setCookie(event, 'refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    });

    return { success: true };
  } catch (error) {
    deleteCookie(event, 'auth_token');
    deleteCookie(event, 'refresh_token');
    throw createError({ statusCode: 401, message: 'Invalid refresh token' });
  }
});
```

---

## ADR-005: Tailwind CSS para Estilização

### Status
**Aceito** | 01/04/2026

### Contexto
Precisamos de uma solução de CSS que seja:
- Mobile-first
- Utility-first
- JIT compilation
- Customizável
- Performance (purged)
- Design system consistente

### Decisão
Utilizar **Tailwind CSS** para estilização.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| CSS Modules | nativo, sem dependência | Sem design system, verbose |
| Styled Components | Composable, dynamic | Runtime CSS, bundle maior |
| Sass/SCSS | Preprocessador poderoso | Old school, sem utilitários |
| UnoCSS | Rápido,原子化 | Ecossistema menor |
| **Tailwind CSS** | Utility-first, JIT, design system | HTML verboso |

### Consequências

**Positivas:**
- Development speed excelente
- Consistência de design
- JIT para performance
- Mobile-first por padrão
- Customização via config
- Design system pronto

**Negativas:**
- HTML pode ficar verboso
- Curva inicial para devs CSS tradicional
- Customização profunda requer config complexa

### Implementação

```javascript
// tailwind.config.js
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6366F1',
          600: '#4F46E5'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
```

```vue
<!-- Componente -->
<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <h2 class="text-xl font-semibold text-gray-900">
      {{ title }}
    </h2>
    <p class="mt-2 text-gray-600">
      {{ description }}
    </p>
    <button class="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
      {{ action }}
    </button>
  </div>
</template>
```

---

## ADR-006: Pinia para State Management

### Status
**Aceito** | 01/04/2026

### Contexto
Precisamos de um sistema de estado que seja:
- TypeScript-first
- DevTools integrado
- Oficial Vue
- SSR-safe
- Persistência opcional

### Decisão
Utilizar **Pinia** para gerenciamento de estado.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| Vuex | Oficial, maduro | Verbose, TypeScript não nativo |
| **Pinia** | TypeScript-first, DevTools, oficial | Mais novo |
| Jotai | Leve, granular | Atoms podem ser confusos |
| Zustand | Simples, React-like | Não é Vue-native |

### Consequências

**Positivas:**
- TypeScript-first
- DevTools excelente
- Módulos organizados
- SSR-safe com Nuxt
- Persistência via plugin

**Negativas:**
- Paradigma diferente de Vuex
- Curva para quem conhece Vuex

### Implementação

```typescript
// stores/auth.ts
import { defineStore } from 'pinia';
import type { User } from '~/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    userName: (state) => state.user?.name || state.user?.email?.split('@')[0],
    userInitials: (state) => {
      const name = state.user?.name || state.user?.email || '?';
      return name.substring(0, 2).toUpperCase();
    }
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        });
        
        this.user = response.user;
        this.token = response.token;
        this.isAuthenticated = true;
        
        return { success: true };
      } catch (error: any) {
        return { success: false, error: error.data?.message || 'Login failed' };
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' });
      } finally {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
      }
    },

    setUser(user: User) {
      this.user = user;
      this.isAuthenticated = true;
    }
  },

  persist: {
    storage: piniaPluginPersistedstate.localStorage
  }
});
```

---

## ADR-007: Zod para Validação

### Status
**Aceito** | 01/04/2026

### Contexto
Precisamos de uma biblioteca de validação que seja:
- TypeScript-first
- Type inference
- Schema composable
- Server e client
- Error messages customizáveis

### Decisão
Utilizar **Zod** para validação de dados.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| Yup | Popular, chains | Type inference fraco |
| Joi | Robusto, validações ricas | Verbose, sem inferência |
| **Zod** | TypeScript-first, inferência, composable | Menos validators built-in |
| Valibot | Pequeno, type-safe | Ecossistema menor |

### Consequências

**Positivas:**
- Type inference automático
- Schema reutilizável
- Validação composable
- Server e client same code
- Error handling padronizado

**Negativas:**
- Curva inicial
- Alguns validators menos convenientes que Yup

### Implementação

```typescript
// utils/validations.ts
import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve ter pelo menos 1 letra maiúscula')
    .regex(/[0-9]/, 'Senha deve ter pelo menos 1 número')
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres'),
  budget: z
    .number()
    .positive('Orçamento deve ser positivo')
    .optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve ser um hex válido')
    .optional()
});

export const transactionSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome é obrigatório')
    .max(100, 'Nome muito longo'),
  price: z
    .number()
    .positive('Valor deve ser positivo'),
  day: z
    .number()
    .int()
    .min(1, 'Dia deve ser entre 1 e 31')
    .max(31, 'Dia deve ser entre 1 e 31'),
  categoryId: z
    .string()
    .cuid('ID da categoria inválido')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
```

```typescript
// server/api/categories/index.post.ts
import { z } from 'zod';
import prisma from '~/server/utils/prisma';
import { categorySchema } from '~/utils/validations';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // Validate with Zod
  const result = categorySchema.safeParse(body);
  
  if (!result.success) {
    throw createError({
      statusCode: 400,
      data: result.error.flatten()
    });
  }

  const { name, budget, color, icon } = result.data;
  const userId = event.context.user.userId;

  // Check for duplicate
  const existing = await prisma.category.findFirst({
    where: { userId, name }
  });

  if (existing) {
    throw createError({
      statusCode: 400,
      message: 'Já existe uma categoria com este nome'
    });
  }

  const category = await prisma.category.create({
    data: { name, budget, color, icon, userId }
  });

  return { category };
});
```

---

## ADR-008: Deploy no Vercel

### Status
**Aceito** | 01/04/2026

### Contexto
Precisamos de uma plataforma de deploy que seja:
- Serverless
- CDN global
- Free tier
- Git integration
- Preview deployments
- Analytics

### Decisão
Utilizar **Vercel** para deploy.

### Alternativas Consideradas

| Alternativa | Prós | Contras |
|-------------|------|---------|
| Netlify | Git integration, Functions | Menos otimizado para Nuxt |
| Railway | Simples, PostgreSQL integrado | Não é serverless real |
| Render | Free tier, Web Services | Cold starts longos |
| AWS Amplify | AWS ecosystem | Complexo |
| **Vercel** | Nuxt optimized, Edge, free tier | Vendor lock-in |
| DigitalOcean App Platform | Simples, barato | Menos features |

### Consequências

**Positivas:**
- Deploy instantâneo
- Preview URLs automáticas
- Edge network global
- Otimizado para Nuxt (nitro preset)
- Free tier generoso (100GB bandwidth)
- Analytics integrado

**Negativas:**
- Vendor lock-in
- Funções serverless com timeout
- Limites no free tier para serverless

### Implementação

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "framework": "nuxt",
  "regions": ["gru1"],
  "env": {
    "DATABASE_URL": "@database_url"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" }
      ]
    }
  ]
}
```

```bash
# Deploy via CLI
vercel --prod

# Ou via Git (automático)
git push origin main
# Vercel detecta Nuxt e deploya automaticamente
```

---

## Histórico de Alterações

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| 1.0 | 01/04/2026 | Arquiteto | Versão inicial com 8 ADRs |
