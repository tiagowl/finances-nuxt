# Diagrama de Arquitetura - Finances Nuxt

## 1. Visão Geral da Arquitetura

### 1.1 Estilo Arquitetural

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                        ARQUITETURA DO SISTEMA                               │
│                        Finances Nuxt - Nuxt 4 Fullstack                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌────────────────────────────────────────────────────────────────────┐
    │                         CAMADA DE APRESENTAÇÃO                       │
    │  ┌──────────────────────────────────────────────────────────────┐  │
    │  │                                                              │  │
    │  │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │  │
    │  │   │  PWA    │  │  Tailwind│  │  Pinia  │  │ Vue 4   │      │  │
    │  │   │         │  │  CSS     │  │ Store   │  │ Compos. │      │  │
    │  │   └─────────┘  └─────────┘  └─────────┘  └─────────┘      │  │
    │  │                                                              │  │
    │  │   Mobile First │ Responsive │ Offline Support │ PWA Ready   │  │
    │  │                                                              │  │
    │  └──────────────────────────────────────────────────────────────┘  │
    └────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
    ┌────────────────────────────────────────────────────────────────────┐
    │                          CAMADA DE API (Nuxt Server)                 │
    │  ┌──────────────────────────────────────────────────────────────┐  │
    │  │                                                              │  │
    │  │   ┌─────────────────────────────────────────────────────┐    │  │
    │  │   │                    H3 Server                         │    │  │
    │  │   │                                                      │    │  │
    │  │   │   ┌─────────┐  ┌─────────┐  ┌─────────┐           │    │  │
    │  │   │   │  Auth   │  │ Trans.  │  │Reports │           │    │  │
    │  │   │   │ Handler │  │ Handler │  │ Handler│           │    │  │
    │  │   │   └────┬────┘  └────┬────┘  └────┬────┘           │    │  │
    │  │   │        │            │            │                 │    │  │
    │  │   │        └────────────┼────────────┘                 │    │  │
    │  │   │                     │                              │    │  │
    │  │   └─────────────────────┼──────────────────────────────┘    │  │
    │  │                         ▼                                   │  │
    │  │               ┌─────────────────┐                         │  │
    │  │               │   Prisma ORM    │                         │  │
    │  │               └────────┬────────┘                         │  │
    │  │                        │                                  │  │
    │  │               ┌────────┴────────┐                        │  │
    │  │               │   API Routes    │                        │  │
    │  │               │  (server/api/)  │                        │  │
    │  │               └────────┬────────┘                        │  │
    │  │                        │                                  │  │
    │  └────────────────────────┼──────────────────────────────────┘  │
    └────────────────────────────┼────────────────────────────────────┘
                                 │
                                 ▼
    ┌────────────────────────────────────────────────────────────────────┐
    │                           CAMADA DE DADOS                          │
    │  ┌──────────────────────────────────────────────────────────────┐  │
    │  │                                                              │  │
    │  │   ┌────────────────────────────────────────────────────┐   │  │
    │  │   │                    Neon PostgreSQL                   │   │  │
    │  │   │                                                      │   │  │
    │  │   │   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │   │  │
    │  │   │   │  User  │ │Category│ │Trans. │ │Wishlst│       │   │  │
    │  │   │   └────────┘ └────────┘ └────────┘ └────────┘       │   │  │
    │  │   │                                                      │   │  │
    │  │   │   Serverless │ Branching │ Auto-scaling │ SSL       │   │  │
    │  │   │                                                      │   │  │
    │  │   └────────────────────────────────────────────────────┘   │  │
    │  │                                                              │  │
    │  └──────────────────────────────────────────────────────────────┘  │
    └────────────────────────────────────────────────────────────────────┘
```

---

## 2. Arquitetura de Componentes

### 2.1 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DIAGRAMA DE COMPONENTES                              │
└─────────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────────┐              ┌─────────────────┐
    │   BROWSER       │              │   MOBILE        │
    │   (Desktop)     │              │   (iOS/Android) │
    └────────┬────────┘              └────────┬────────┘
             │                                 │
             │    HTTPS                         │
             │◄────────────────────────────────►│
             │                                 │
    ┌────────▼──────────────────────────────────▼────────┐
    │                                                      │
    │                   CDN (Vercel Edge)                  │
    │              ┌───────────────────────┐              │
    │              │   Static Assets       │              │
    │              │   (CSS, JS, Images)  │              │
    │              └───────────────────────┘              │
    │                                                      │
    │              ┌───────────────────────┐              │
    │              │   Nuxt SSR/SSG       │              │
    │              │   (H3 Server)         │              │
    │              │   Port: 3000          │              │
    │              └───────────────────────┘              │
    │                                                      │
    └──────────────────────┬───────────────────────────────┘
                           │
                           │ Prisma Client
                           │
    ┌──────────────────────▼───────────────────────────────┐
    │                                                      │
    │                  NEON DATABASE                        │
    │              ┌───────────────────────┐              │
    │              │   PostgreSQL 15        │              │
    │              │                       │              │
    │              │   ┌─────────────────┐ │              │
    │              │   │ Connection Pool │ │              │
    │              │   │ (Serverless)   │ │              │
    │              │   └─────────────────┘ │              │
    │              └───────────────────────┘              │
    │                                                      │
    └──────────────────────────────────────────────────────┘


    ┌──────────────────────────────────────────────────────────┐
    │                     AUTENTICAÇÃO                        │
    │                                                          │
    │   ┌──────────────┐      ┌──────────────┐                │
    │   │    JWT       │◄────►│    Bcrypt   │                │
    │   │   Tokens     │      │   (Hash)    │                │
    │   └──────────────┘      └──────────────┘                │
    │          │                                               │
    │          │                                               │
    │          ▼                                               │
    │   ┌──────────────┐      ┌──────────────┐                │
    │   │   HTTP Only  │      │   Refresh   │                │
    │   │    Cookie    │      │    Token    │                │
    │   └──────────────┘      └──────────────┘                │
    │                                                          │
    └──────────────────────────────────────────────────────────┘
```

---

## 3. Diagrama de Fluxo de Dados

### 3.1 Fluxo de uma Requisição

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FLUXO DE DADOS                                     │
│                         Cadastro de Nova Transação                              │
└─────────────────────────────────────────────────────────────────────────────────┘


    ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
    │   USUÁRIO   │         │   USUÁRIO   │         │   USUÁRIO   │
    │   (Mobile)  │         │   (Mobile)  │         │   (Mobile)  │
    └──────┬──────┘         └──────┬──────┘         └──────┬──────┘
           │                        │                        │
           │ 1. Abre App            │ 4. Formulário         │ 7. Feedback
           │                        │                        │
           ▼                        ▼                        ▼
    ┌───────────────────────────────────────────────────────────────────┐
    │                      FRONTEND (Nuxt + Pinia)                       │
    │                                                                    │
    │   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐           │
    │   │   Login     │───►│  Dashboard  │───►│   Modal     │           │
    │   │   Page      │    │   Page      │    │   Form      │           │
    │   └─────────────┘    └─────────────┘    └──────┬──────┘           │
    │                                                │                   │
    │                                                │ 5. Submit         │
    │                                                │                   │
    │                                                ▼                   │
    │   ┌────────────────────────────────────────────────────────────┐  │
    │   │                      PINIA STORE                           │  │
    │   │                                                              │  │
    │   │   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │  │
    │   │   │  useAuth()  │    │useTransaction│  │useCategory()│    │  │
    │   │   │             │    │   Store     │    │   Store     │    │  │
    │   │   └─────────────┘    └──────┬──────┘    └─────────────┘    │  │
    │   │                              │                             │  │
    │   └──────────────────────────────┼─────────────────────────────┘  │
    │                                  │                               │
    │                                  │ 6. $fetch('/api/transactions')  │
    │                                  │                               │
    └──────────────────────────────────┼───────────────────────────────┘
                                       │
                                       │ HTTP POST / JSON
                                       │
    ┌──────────────────────────────────┼───────────────────────────────┐
    │                                  │                                │
    │                   ┌──────────────▼──────────────┐                │
    │                   │       NUXT SERVER           │                │
    │                   │       (server/api/)         │                │
    │                   │                             │                │
    │                   │  ┌───────────────────────┐ │                │
    │                   │  │ /api/transactions      │ │                │
    │                   │  │ POST handler          │ │                │
    │                   │  └───────────┬───────────┘ │                │
    │                   │              │             │                │
    │                   │              │ 7. Validar   │                │
    │                   │              │             │                │
    │                   │              ▼             │                │
    │                   │  ┌───────────────────────┐ │                │
    │                   │  │  Prisma Service      │ │                │
    │                   │  │  (Business Logic)    │ │                │
    │                   │  └───────────┬───────────┘ │                │
    │                   │              │             │                │
    │                   │              │ 8. DB Call  │                │
    │                   │              │             │                │
    │                   └──────────────┼─────────────┘                │
    │                                  │                               │
    │                                  │ 9. SQL Query                 │
    │                                  │                               │
    └──────────────────────────────────┼───────────────────────────────┘
                                       │
                                       │
    ┌──────────────────────────────────┼───────────────────────────────┐
    │                                  │                                │
    │                   ┌──────────────▼──────────────┐                │
    │                   │      NEON DATABASE          │                │
    │                   │                            │                │
    │                   │  ┌──────────────────────┐  │                │
    │                   │  │ transactions Table   │  │                │
    │                   │  │                      │  │                │
    │                   │  │ id, name, price,    │  │                │
    │                   │  │ day, type,         │  │                │
    │                   │  │ categoryId, userId  │  │                │
    │                   │  │ created_at...      │  │                │
    │                   │  │                      │  │                │
    │                   │  └──────────────────────┘  │                │
    │                   │                            │                │
    │                   └────────────────────────────┘                │
    │                                                                    │
    └────────────────────────────────────────────────────────────────────┘
                                       │
                                       │ 10. Response: 201 Created
                                       │
    ┌──────────────────────────────────┼───────────────────────────────┐
    │                                  │                                │
    │                                  ▼                                │
    │   ┌────────────────────────────────────────────────────────────┐ │
    │   │                    PINIA STORE                             │ │
    │   │              (Atualiza estado local)                       │ │
    │   │                                                              │ │
    │   │   transactions: [..., { id, name, price, ... }]            │ │
    │   │                                                              │ │
    │   └────────────────────────────────────────────────────────────┘ │
    │                                  │                                │
    │                                  │ 11. Reactive Update             │
    │                                  │                                │
    └──────────────────────────────────┼───────────────────────────────┘
                                       │
                                       │ 12. UI Atualizada
                                       │
    ┌──────────────────────────────────▼───────────────────────────────┐
    │                              USUÁRIO                             │
    │                                                                  │
    │   ┌──────────────────────────────────────────────────────────┐  │
    │   │                                                          │  │
    │   │  ✅ "Transação salva com sucesso!"  │  + R$ 50,00     │  │
    │   │                                                          │  │
    │   └──────────────────────────────────────────────────────────┘  │
    │                                                                  │
    └──────────────────────────────────────────────────────────────────┘
```

---

## 4. Arquitetura de Pastas

### 4.1 Estrutura de Diretórios Nuxt 4

```
finances-nuxt/
│
├── .output/                    # Build output (gitignore)
├── .nuxt/                     # Nuxt build (gitignore)
├── .output/                   # Production build
│
├── app/                       # Nuxt 4 App Router
│   │
│   ├── layouts/
│   │   ├── default.vue        # Layout principal
│   │   ├── auth.vue          # Layout para autenticação
│   │   └── dashboard.vue     # Layout do dashboard
│   │
│   ├── pages/
│   │   ├── index.vue         # Landing/Login
│   │   ├── register.vue      # Cadastro
│   │   ├── dashboard.vue     # Dashboard principal
│   │   ├── categories/
│   │   │   └── index.vue     # Lista de categorias
│   │   ├── expenses/
│   │   │   ├── monthly.vue   # Despesas mensais
│   │   │   └── occasional.vue # Despesas avulsas
│   │   ├── incomes/
│   │   │   ├── monthly.vue   # Receitas mensais
│   │   │   └── occasional.vue # Receitas avulsas
│   │   └── wishlist/
│   │       └── index.vue     # Lista de desejos
│   │
│   ├── components/
│   │   ├── ui/               # Componentes base
│   │   │   ├── Button.vue
│   │   │   ├── Input.vue
│   │   │   ├── Card.vue
│   │   │   ├── Modal.vue
│   │   │   ├── BottomSheet.vue
│   │   │   ├── FAB.vue
│   │   │   ├── Snackbar.vue
│   │   │   ├── ProgressBar.vue
│   │   │   ├── Skeleton.vue
│   │   │   ├── EmptyState.vue
│   │   │   └── ErrorState.vue
│   │   │
│   │   ├── transactions/
│   │   │   ├── TransactionForm.vue
│   │   │   ├── TransactionList.vue
│   │   │   ├── TransactionCard.vue
│   │   │   ├── TransactionFilters.vue
│   │   │   └── TransactionSummary.vue
│   │   │
│   │   ├── categories/
│   │   │   ├── CategoryForm.vue
│   │   │   ├── CategoryList.vue
│   │   │   ├── CategoryCard.vue
│   │   │   └── CategoryProgress.vue
│   │   │
│   │   ├── dashboard/
│   │   │   ├── SummaryCard.vue
│   │   │   ├── RecentTransactions.vue
│   │   │   └── BudgetOverview.vue
│   │   │
│   │   └── layout/
│   │       ├── AppHeader.vue
│   │       ├── AppSidebar.vue
│   │       ├── AppDrawer.vue
│   │       └── AppFooter.vue
│   │
│   ├── composables/          # Composables reutilizáveis
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── useFormatters.ts
│   │   ├── useValidation.ts
│   │   └── useToast.ts
│   │
│   ├── stores/               # Pinia Stores
│   │   ├── auth.ts
│   │   ├── categories.ts
│   │   ├── transactions.ts
│   │   ├── wishlist.ts
│   │   └── ui.ts
│   │
│   └── router/
│       └── middleware.ts     # Navigation guards
│
├── server/                   # Nuxt Server (API Routes)
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register.post.ts
│   │   │   ├── login.post.ts
│   │   │   ├── logout.post.ts
│   │   │   └── me.get.ts
│   │   │
│   │   ├── categories/
│   │   │   ├── index.get.ts
│   │   │   ├── index.post.ts
│   │   │   ├── [id].get.ts
│   │   │   ├── [id].put.ts
│   │   │   └── [id].delete.ts
│   │   │
│   │   ├── transactions/
│   │   │   ├── index.get.ts
│   │   │   ├── index.post.ts
│   │   │   ├── [id].get.ts
│   │   │   ├── [id].put.ts
│   │   │   └── [id].delete.ts
│   │   │
│   │   ├── wishlist/
│   │   │   ├── index.get.ts
│   │   │   ├── index.post.ts
│   │   │   ├── [id].put.ts
│   │   │   └── [id].delete.ts
│   │   │
│   │   └── reports/
│   │       ├── summary.get.ts
│   │       └── by-category.get.ts
│   │
│   ├── middleware/
│   │   └── auth.ts          # JWT validation
│   │
│   ├── utils/
│   │   ├── prisma.ts        # Prisma client
│   │   ├── jwt.ts          # JWT helpers
│   │   ├── password.ts     # Bcrypt helpers
│   │   └── validation.ts    # Zod schemas
│   │
│   └── plugins/
│       └── prisma.ts        # Prisma plugin
│
├── prisma/
│   ├── schema.prisma        # Schema do banco
│   ├── seed.ts             # Seed data
│   └── migrations/         # Migrations
│
├── public/                 # Arquivos estáticos
│   ├── favicon.ico
│   ├── og-image.png
│   └── manifest.json       # PWA manifest
│
├── assets/
│   ├── css/
│   │   ├── main.css        # Tailwind entry
│   │   └── variables.css   # CSS custom properties
│   └── icons/              # SVG icons
│
├── composables/            # Composables globais (separados do app)
│
├── components/            # Componentes globais (registry)
│
├── layouts/               # Layouts globais
│
├── pages/                 # Pages globais
│
├── stores/                # Stores globais (Pinia)
│
├── types/                 # TypeScript types
│   ├── api.d.ts
│   ├── models.d.ts
│   └── utils.d.ts
│
├── utils/                 # Utilitários globais
│
├── config/                # Configurações
│   └── index.ts
│
├── nuxt.config.ts         # Configuração Nuxt
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind config
├── postcss.config.js       # PostCSS config
├── package.json
└── README.md
```

---

## 5. Diagrama de Sequência

### 5.1 Sequência de Autenticação

```
┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐
│ USUÁRIO│     │ FRONT  │     │  NUXT  │     │ PRISMA │     │  NEON  │
│        │     │  END   │     │ SERVER │     │       │     │   DB   │
└───┬────┘     └───┬────┘     └───┬────┘     └───┬────┘     └───┬────┘
    │              │              │              │              │
    │ Login Request│              │              │              │
    │─────────────►│              │              │              │
    │              │ POST /api/auth/login         │              │
    │              │─────────────►│              │              │
    │              │              │              │              │
    │              │              │ Validar credenciais         │
    │              │              │─────────────►│              │
    │              │              │              │              │
    │              │              │ SELECT user WHERE email     │
    │              │              │─────────────►│              │
    │              │              │              │              │
    │              │              │◄─────────────│              │
    │              │              │   User Row   │              │
    │              │              │              │              │
    │              │              │ Bcrypt compare               │
    │              │              │  (verify password)          │
    │              │              │              │              │
    │              │              │ JWT sign()                  │
    │              │              │  (generate token)           │
    │              │              │              │              │
    │              │◄─────────────│              │              │
    │              │   { token }  │              │              │
    │              │              │              │              │
    │◄─────────────│              │              │              │
    │ Login Success│              │              │              │
    │              │              │              │              │
    │              │              │              │              │
    │  GET /dashboard             │              │              │
    │─────────────►│              │              │              │
    │              │              │              │              │
    │              │ Header: Authorization: Bearer <token>     │
    │              │─────────────►│              │              │
    │              │              │              │              │
    │              │              │ JWT verify()              │
    │              │              │  (middleware)             │
    │              │              │              │              │
    │              │              │ Get /api/categories        │
    │              │              │─────────────►│              │
    │              │              │              │              │
    │              │              │ SELECT * FROM categories   │
    │              │              │ WHERE userId = ?          │
    │              │              │─────────────►│              │
    │              │              │              │              │
    │              │              │◄─────────────│              │
    │              │              │   Categories │              │
    │              │              │              │              │
    │◄─────────────│              │              │              │
    │ Dashboard     │              │              │              │
    │ Rendered      │              │              │              │
    │              │              │              │              │
    └──┴───────────┴──────────────┴──────────────┴──────────────┘
```

---

## 6. Diagrama de Implantação

### 6.1 Arquitetura de Hosting (Vercel)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              ARQUITETURA DE IMPLANTAÇÃO                        │
│                               (Vercel + Neon Serverless)                       │
└─────────────────────────────────────────────────────────────────────────────────┘


    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                              USUÁRIOS                                       │
    │                                                                             │
    │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
    │   │Mobile   │  │Mobile   │  │Desktop  │  │ Tablet  │  │Mobile   │      │
    │   │iPhone   │  │Android  │  │Chrome   │  │ iPad    │  │Firefox  │      │
    │   └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘      │
    │        │             │             │             │             │          │
    │        └──────────────┴─────────────┴─────────────┴─────────────┘          │
    │                                     │                                        │
    │                                     │ HTTPS                                  │
    └─────────────────────────────────────┼───────────────────────────────────────┘
                                          │
                                          ▼
    ┌───────────────────────────────────────────────────────────────────────────┐
    │                            VERCEL EDGE NETWORK                             │
    │                                                                             │
    │   ┌─────────────────────────────────────────────────────────────────────┐  │
    │   │                                                                    │  │
    │   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │  │
    │   │   │   PoP NYC   │  │   PoP LAX   │  │   PoP GRU   │               │  │
    │   │   │   (USA)     │  │   (USA)     │  │   (Brasil)  │               │  │
    │   │   └─────────────┘  └─────────────┘  └─────────────┘               │  │
    │   │                                                                    │  │
    │   │   ┌─────────────────────────────────────────────────────────────┐  │  │
    │   │   │              CDN (Static Assets)                            │  │  │
    │   │   │         _nuxt/*, assets/*, public/*                       │  │  │
    │   │   │              (Cached globally)                              │  │  │
    │   │   └─────────────────────────────────────────────────────────────┘  │  │
    │   │                                                                    │  │
    │   └─────────────────────────────────────────────────────────────────────┘  │
    │                                                                             │
    └───────────────────────────────────────────────────────────────────────────┘
                                          │
                                          │ SSR Requests
                                          │
                                          ▼
    ┌───────────────────────────────────────────────────────────────────────────┐
    │                         VERCEL SERVERS (Serverless)                       │
    │                                                                             │
    │   ┌─────────────────────────────────────────────────────────────────────┐  │
    │   │                                                                      │  │
    │   │                    NUXT 4 APPLICATION                                │  │
    │   │                                                                      │  │
    │   │   ┌──────────────────┐    ┌──────────────────┐                     │  │
    │   │   │   Instance 1     │    │   Instance N     │                     │  │
    │   │   │   (Auto-scale)    │    │   (Auto-scale)   │                     │  │
    │   │   │                   │    │                   │                     │  │
    │   │   │   ┌───────────┐  │    │   ┌───────────┐  │                     │  │
    │   │   │   │ H3 Server │  │    │   │ H3 Server │  │                     │  │
    │   │   │   └─────┬─────┘  │    │   └─────┬─────┘  │                     │  │
    │   │   │         │        │    │         │        │                     │  │
    │   │   │   ┌─────┴─────┐  │    │   ┌─────┴─────┐  │                     │  │
    │   │   │   │   SSR     │  │    │   │   SSR     │  │                     │  │
    │   │   │   │  Render   │  │    │   │  Render   │  │                     │  │
    │   │   │   └───────────┘  │    │   └───────────┘  │                     │  │
    │   │   └──────────────────┘    └──────────────────┘                     │  │
    │   │                                                                      │  │
    │   │                    Auto-scaling based on traffic                      │  │
    │   │                    Cold start: ~200ms                               │  │
    │   │                    Max instances: unlimited                           │  │
    │   │                                                                      │  │
    │   └───────────────────────────────────────────────────────────────────────┘  │
    │                                                                             │
    │                              Environment Variables                          │
    │                         DATABASE_URL, JWT_SECRET, API_KEYS                 │
    │                                                                             │
    └───────────────────────────────────────────────────────────────────────────┘
                                          │
                                          │ Prisma Client
                                          │ (Connection Pool)
                                          │
                                          ▼
    ┌───────────────────────────────────────────────────────────────────────────┐
    │                              NEON (Serverless PostgreSQL)                   │
    │                                                                             │
    │   ┌─────────────────────────────────────────────────────────────────────┐  │
    │   │                                                                      │  │
    │   │   ┌─────────────────┐      ┌─────────────────┐                       │  │
    │   │   │  Branch main    │      │  Branch dev     │                       │  │
    │   │   │                 │      │                 │                       │  │
    │   │   │  ┌───────────┐ │      │  ┌───────────┐  │                       │  │
    │   │   │  │ Primary   │ │      │  │ Dev DB   │  │                       │  │
    │   │   │  │ Endpoint  │ │      │  │ Endpoint │  │                       │  │
    │   │   │  └───────────┘ │      │  └───────────┘  │                       │  │
    │   │   │        │        │      │        │        │                       │  │
    │   │   │  ┌─────┴─────┐  │      │  ┌─────┴─────┐  │                       │  │
    │   │   │  │ Compute   │  │      │  │ Compute   │  │                       │  │
    │   │   │  │ (Autosusp)│  │      │  │ (Always   │  │                       │  │
    │   │   │  │ <5ms cold │  │      │  │  on)      │  │                       │  │
    │   │   │  │ start     │  │      │  └───────────┘  │                       │  │
    │   │   │  └───────────┘  │      │                 │                       │  │
    │   │   └─────────────────┘      └─────────────────┘                       │  │
    │   │                                                                      │  │
    │   │                     PostgreSQL 15                                     │  │
    │   │                     Connection Pool: 100 max                          │  │
    │   │                     Auto-scaling compute                             │  │
    │   │                     SSL/TLS encrypted                                │  │
    │   │                                                                      │  │
    │   └───────────────────────────────────────────────────────────────────────┘  │
    │                                                                             │
    └───────────────────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
    ┌───────────────────────────────────────────────────────────────────────────┐
    │                              MONITORING & LOGGING                          │
    │                                                                             │
    │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                      │
    │   │  Vercel     │  │   Sentry    │  │  Neon       │                      │
    │   │  Analytics  │  │   Errors    │  │  Dashboard  │                      │
    │   └─────────────┘  └─────────────┘  └─────────────┘                      │
    │                                                                             │
    └───────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Diagrama de Segurança

### 7.1 Camadas de Segurança

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CAMADAS DE SEGURANÇA                                │
└─────────────────────────────────────────────────────────────────────────────────┘


    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                              TRANSPORTE (TLS)                                 │
    │                                                                             │
    │   ┌─────────────────────────────────────────────────────────────────────┐  │
    │   │                                                                      │  │
    │   │   HTTPS Only (TLS 1.3)                                              │  │
    │   │   HSTS Header                                                       │  │
    │   │   Secure Cookies                                                    │  │
    │   │                                                                      │  │
    │   └─────────────────────────────────────────────────────────────────────┘  │
    │                                                                             │
    └─────────────────────────────────────────────────────────────────────────────┘
    │
    ▼
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                              APLICAÇÃO (Nuxt)                                │
    │                                                                             │
    │   ┌─────────────────────────────────────────────────────────────────────┐  │
    │   │                                                                      │  │
    │   │   Input Validation (Zod)                                             │  │
    │   │   ├── Email format                                                   │  │
    │   │   ├── Password strength                                              │  │
    │   │   └── Sanitization                                                   │  │
    │   │                                                                      │  │
    │   │   Authentication (JWT)                                               │  │
    │   │   ├── Access Token (15min)                                          │  │
    │   │   ├── Refresh Token (7 days)                                        │  │
    │   │   └── HTTP Only Cookies                                             │  │
    │   │                                                                      │  │
    │   │   Authorization                                                      │  │
    │   │   ├── Middleware guards                                              │  │
    │   │   └── Resource ownership check                                      │  │
    │   │                                                                      │  │
    │   └─────────────────────────────────────────────────────────────────────┘  │
    │                                                                             │
    └─────────────────────────────────────────────────────────────────────────────┘
    │
    ▼
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                              DADOS (Neon)                                    │
    │                                                                             │
    │   ┌─────────────────────────────────────────────────────────────────────┐  │
    │   │                                                                      │  │
    │   │   Database Security                                                  │  │
    │   │   ├── Row-Level Security (RLS)                                      │  │
    │   │   ├── User isolation (WHERE userId = ?)                             │  │
    │   │   ├── Connection pooling                                              │  │
    │   │   └── Encrypted at rest                                              │  │
    │   │                                                                      │  │
    │   │   Password Storage                                                   │  │
    │   │   ├── Bcrypt (cost factor 12)                                       │  │
    │   │   └── Never stored in plain text                                     │  │
    │   │                                                                      │  │
    │   └─────────────────────────────────────────────────────────────────────┘  │
    │                                                                             │
    └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Diagrama de Escalabilidade

### 8.1 Estratégia de Escalonamento

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           ESTRATÉGIA DE ESCALABILIDADE                          │
└─────────────────────────────────────────────────────────────────────────────────┘


    CARGA BAIXA (< 100 users simul.)
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                                                                             │
    │   ┌─────────────┐                                                          │
    │   │  Nuxt App   │                                                          │
    │   │  (1 inst)   │                                                          │
    │   └─────────────┘                                                          │
    │          │                                                                  │
    │          ▼                                                                  │
    │   ┌─────────────┐                                                          │
    │   │    Neon     │                                                          │
    │   │  (0.5 CU)  │                                                          │
    │   └─────────────┘                                                          │
    │                                                                             │
    │   Custo: ~$5/mês                                                          │
    └─────────────────────────────────────────────────────────────────────────────┘


                                    ▼ (auto-scale)


    CARGA MÉDIA (100-1000 users)
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                                                                             │
    │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                       │
    │   │  Nuxt App  │  │  Nuxt App   │  │  Nuxt App   │                       │
    │   │  (inst 1)  │  │  (inst 2)   │  │  (inst N)   │                       │
    │   └─────────────┘  └─────────────┘  └─────────────┘                       │
    │          │                  │                  │                           │
    │          └──────────────────┼──────────────────┘                           │
    │                              │                                              │
    │                              ▼                                              │
    │                     ┌─────────────┐                                        │
    │                     │    Neon     │                                        │
    │                     │  (2-4 CU)  │                                        │
    │                     └─────────────┘                                        │
    │                                                                             │
    │   Custo: ~$20/mês                                                          │
    └─────────────────────────────────────────────────────────────────────────────┘


                                    ▼ (auto-scale)


    CARGA ALTA (1000+ users)
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │                                                                             │
    │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
    │   │   CDN       │  │   CDN       │  │   CDN       │  │   CDN       │     │
    │   │  (PoP 1)   │  │  (PoP 2)    │  │  (PoP N)    │  │  (PoP BR)   │     │
    │   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
    │          │                  │                  │                  │         │
    │          └──────────────────┴──────────────────┴──────────────────┘         │
    │                                          │                                    │
    │                                          ▼                                    │
    │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                       │
    │   │  Nuxt App   │  │  Nuxt App   │  │  Nuxt App   │  ... auto-scale        │
    │   └─────────────┘  └─────────────┘  └─────────────┘                       │
    │                              │                                              │
    │                              ▼                                              │
    │                     ┌─────────────┐                                        │
    │                     │    Neon     │                                        │
    │                     │  (8+ CU)   │                                        │
    │                     └─────────────┘                                        │
    │                                                                             │
    │   Custo: ~$50+/mês                                                        │
    └─────────────────────────────────────────────────────────────────────────────┘
```

---

**Versão:** 1.0  
**Data:** 01/04/2026  
**Autor:** Arquiteto de Software
