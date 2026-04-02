# Finances Nuxt

Sistema de gerenciamento de finanças pessoais construido com Nuxt 4, Prisma e PostgreSQL.

## Stack Tecnologica

- **Frontend:** Nuxt 4, Vue 3, TypeScript
- **State Management:** Pinia
- **Estilizacao:** Tailwind CSS
- **Backend:** Nuxt Server (H3)
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL (Neon)
- **Autenticacao:** JWT + Bcrypt

## Getting Started

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variaveis de Ambiente

Copie o arquivo `env.example` para `.env` e configure as variaveis:

```bash
cp env.example .env
```

Edite o `.env` com suas credenciais:
- `DATABASE_URL`: URL do banco PostgreSQL
- `JWT_SECRET`: Chave secreta para JWT (minimo 32 caracteres)
- `REFRESH_TOKEN_SECRET`: Chave secreta para refresh token
- `TEST_USER_EMAIL`: Email do usuario de teste
- `TEST_USER_PASSWORD`: Senha do usuario de teste
- `TEST_USER_NAME`: Nome do usuario de teste

### 3. Configurar Banco de Dados

```bash
# Gerar Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Popular banco com dados de teste
npm run db:seed
```

### 4. Iniciar Desenvolvimento

```bash
npm run dev
```

O projeto estara disponivel em `http://localhost:3000`

## Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento |
| `npm run build` | Build para producao |
| `npm run preview` | Preview do build |
| `npm run lint` | Verificar lint |
| `npm run lint:fix` | Corrigir lint automaticamente |
| `npm run typecheck` | Verificar tipos TypeScript |
| `npm run prisma:generate` | Gerar Prisma Client |
| `npm run prisma:migrate` | Executar migrations |
| `npm run prisma:studio` | Abrir Prisma Studio |
| `npm run db:seed` | Popular banco com dados de teste |

## Conta de Teste

As credenciais estao configuradas no `.env`:
- `TEST_USER_EMAIL`: Email do usuario (padrao: teste@finances.com)
- `TEST_USER_PASSWORD`: Senha do usuario (padrao: Teste123)

## Estrutura do Projeto

```
src/frontend/
├── app/                    # Nuxt 4 App Router
├── components/             # Componentes Vue
│   ├── ui/               # Componentes base
│   ├── transactions/      # Componentes de transacoes
│   ├── categories/       # Componentes de categorias
│   ├── dashboard/        # Componentes do dashboard
│   └── layout/           # Componentes de layout
├── composables/          # Composables reutilizaveis
├── stores/               # Pinia stores
├── pages/                # Paginas (file-based routing)
├── layouts/             # Layouts
├── types/               # Tipos TypeScript
├── server/               # API Routes
│   ├── api/             # Endpoints da API
│   ├── middleware/       # Middleware server
│   └── utils/           # Utilitarios server
└── prisma/              # Schema e migrations
```

## Funcionalidades

- [x] Autenticacao (cadastro, login, logout)
- [x] CRUD de Categorias
- [x] CRUD de Despesas Mensais
- [x] CRUD de Despesas Avulsas
- [x] CRUD de Receitas Mensais
- [x] CRUD de Receitas Avulsas
- [x] Lista de Desejos
- [x] Dashboard com resumo
- [x] Estatisticas por categoria
- [x] Interface responsiva (mobile-first)
- [x] Validacao de formularios
- [x] Feedback visual (toasts)

## Deploy

O projeto esta configurado para deploy no Vercel com Nitro preset `vercel`.

```bash
npm run build
```

O deploy sera automatico ao fazer push no repositorio conectado ao Vercel.

## Licenca

MIT
