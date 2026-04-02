# Documentação de Requisitos - Sistema de Finanças Pessoais

## 1. Visão Geral do Produto

### 1.1 Nome do Produto
**Finances Nuxt** - Sistema de Gestão de Finanças Pessoais

### 1.2 Tagline
Controle suas finanças de forma simples e eficiente, direto do seu celular.

### 1.3 Descrição Resumida
Aplicação web para gerenciamento de finanças pessoais que permite cadastrar, editar e acompanhar despesas e receitas, categorizar transações e visualizar estatísticas de gastos.

### 1.4 Problema que Resolve
- Dificuldade em controlar gastos mensais
- Falta de visibilidade sobre para onde o dinheiro vai
- Ausência de planejamento financeiro
- Mistura de gastos pessoais com objetivos de compra

---

## 2. Objetivos de Negócio

### 2.1 Objetivos Principais
1. **Facilitar o controle financeiro** - Permitir que qualquer pessoa registre e acompanhe suas finanças sem conhecimento técnico
2. **Promover economia** - Ajudar usuários a identificar gastos desnecessários através de relatórios visuais
3. **Planejar compras** - Criar lista de desejos com preços para facilitar atingir metas

### 2.2 Objetivos Secundários
1. Interface mobile-first para uso frequente
2. Experiência rápida e intuitiva
3. Dados seguros e privados de cada usuário

### 2.3 Métricas de Sucesso
| Métrica | Meta | Como Medir |
|---------|------|------------|
| Usuários ativos mensais | 100 no primeiro ano | Google Analytics |
| Taxa de retenção | 60% após 30 dias | Backend analytics |
| Tempo no app | < 3 min por sessão | Analytics |
| Taxa de conclusão de cadastro | > 70% | Funil de conversão |

---

## 3. Usuários-Alvo

### 3.1 Perfil Principal
**Profissional urbano de 25-45 anos**
- Usa smartphone como principal dispositivo
- Tem renda mensal fixa (salário)
- Busca controle mas não tem tempo para planilhas complexas
- Valoriza interfaces limpas e rápidas

### 3.2 Perfil Secundário
**Estudantes e jovens profissionais**
- Orçamento limitado
- Prioriza celular
- Interessados em planejamento de compras

### 3.3 Não é para
- Empresas (produto é para uso pessoal)
- Profissionais de contabilidade
- Pessoas sem acesso à internet

---

## 4. Funcionalidades Principais

### 4.1 Módulo de Autenticação

#### 4.1.1 Cadastro
- Email (único, validado)
- Senha (mínimo 8 caracteres, armazenada com hash)
- Confirmação de senha
- Redirecionamento automático para dashboard após cadastro

#### 4.1.2 Login
- Email e senha
- Manter sessão (JWT)
- Logout

#### 4.1.3 Requisitos de Segurança
- Senhas hashing com bcrypt
- JWT com expiração
- Validação de input server-side
- Rate limiting em tentativas de login

### 4.2 Módulo de Categorias

#### 4.2.1 Funcionalidades
- Criar categoria com nome e orçamento máximo
- Editar categoria existente
- Excluir categoria (com confirmação)
- Listar todas as categorias do usuário

#### 4.2.2 Regras de Negócio
- Nome da categoria é único por usuário
- Orçamento máximo é opcional (default: sem limite)
- Ao excluir categoria, transações perdem o vínculo

#### 4.2.3 Exemplo de Uso
```
Categoria: "Alimentação"
Orçamento máximo: R$ 1.000,00/mês

Todas as despesas de alimentação são somadas e comparadas com este limite
```

### 4.3 Módulo de Despesas

#### 4.3.1 Despesas Mensais (Fixas)
**Características:**
- Recorrem todo mês
- Tem dia específico de vencimento
- Categoria obrigatória

**Exemplos:**
- Aluguel, internet, streaming, academias, seguros

#### 4.3.2 Despesas Avulsas (Variáveis)
**Características:**
- Não são recorrentes
- Tem data da despesa
- Categoria obrigatória

**Exemplos:**
--farmácia, restaurante, compras do mês, presentes

#### 4.3.3 Funcionalidades Comuns
- CRUD completo
- Listagem ordenada por data
- Visualização de total mensal
- Filtro por período (opcional)

### 4.4 Módulo de Receitas

#### 4.4.1 Receitas Mensais (Fixas)
**Características:**
- Recorrem todo mês
- Tem dia específico de recebimento
- Categoria obrigatória

**Exemplos:**
- Salário, aposentadoria, aluguéis recebidos

#### 4.4.2 Receitas Avulsas (Variáveis)
**Características:**
- Não são recorrentes
- Tem data da receita
- Categoria obrigatória

**Exemplos:**
- Freelances, vendas, bônus

#### 4.4.3 Funcionalidades Comuns
- CRUD completo
- Listagem ordenada por data
- Visualização de total mensal

### 4.5 Módulo de Lista de Desejos

#### 4.5.1 Funcionalidades
- Adicionar item com nome, categoria, preço e link
- Editar item existente
- Excluir item
- Listar todos os itens

#### 4.5.2 Regras de Negócio
- Link é opcional
- Se fornecido, deve ser URL válida
- Categoria obrigatória (para organização)

#### 4.5.3 Exemplo de Uso
```
Item: "Tênis Nike Air Max"
Categoria: "Esportes"
Preço: R$ 450,00
Link: https://loja.com/tenis-nike

Usuário pode clicar no link para comprar quando decidir
```

### 4.6 Módulo de Estatísticas

#### 4.6.1 Gastos por Categoria
- Lista todas as categorias
- Mostra total gasto em cada uma
- Calcula percentual do orçamento usado
- Destaca categorias que ultrapassaram limite

#### 4.6.2 Cálculos
```
Gasto por categoria = soma de todas as despesas (fixas + avulsas)
Percentual = (Gasto / Orçamento máximo) × 100
```

#### 4.6.3 Visualização
- Barras de progresso para cada categoria
- Cores indicativas (verde < 70%, amarelo 70-100%, vermelho > 100%)
- Ordenação por percentual ou valor absoluto

---

## 5. Restrições e Limitações

### 5.1 Técnicas
- **Stack:** Nuxt 4, Pinia, Tailwind CSS
- **Backend:** Nuxt API Routes com Prisma ORM
- **Banco:** Neon (PostgreSQL serverless)
- **Deploy:** Vercel ou similar

### 5.2 Arquiteturais
- Mobile-first (prioridade de uso via navegador mobile)
- Desktop adaptation (adaptação para desktop)
- Multi-tenant: dados isolados por usuário
- Offline: não suportado inicialmente

### 5.3 Escopo
**Está fora do escopo inicial (v1):**
- Importação de dados bancários
- Integração com cartões de crédito
- Gráficos avançados
- Notificações push
- Exportação de dados
- Temas dark/light
- Multi-moeda
- Compartilhamento familiar

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance
| Critério | Meta |
|----------|------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | > 90 |

### 6.2 Acessibilidade
- Contraste WCAG AA
- Inputs com labels visíveis
- Foco navegável por teclado
- Tamanho mínimo de toque: 44x44px

### 6.3 Segurança
- HTTPS obrigatório
- Sanitização de inputs
- Validação server-side
- Headers de segurança (CSP, X-Frame-Options, etc.)

### 6.4 Compatibilidade
- iOS Safari 14+
- Chrome Android (últimas 2 versões)
- Chrome/Edge/Firefox (últimas versões)
- Sem suporte a Internet Explorer

---

## 7. Modelo de Dados

### 7.1 Entidades

```
┌─────────────┐       ┌─────────────┐
│    User     │       │  Category   │
├─────────────┤       ├─────────────┤
│ id          │       │ id          │
│ email       │       │ name        │
│ password    │       │ budget       │
│ createdAt   │       │ userId       │
│ updatedAt   │       │ createdAt   │
└──────┬──────┘       │ updatedAt   │
       │               └──────┬──────┘
       │                      │
       │    ┌─────────────────┼─────────────────┐
       │    │                 │                 │
       ▼    ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────────────┐   ┌─────────────────┐
│MonthlyExpense│   │  OccasionalExpense  │   │   WishlistItem  │
├─────────────┤   ├─────────────────────┤   ├─────────────────┤
│ id          │   │ id                  │   │ id              │
│ name        │   │ name                │   │ name            │
│ price       │   │ price               │   │ price           │
│ day         │   │ day                 │   │ link            │
│ categoryId  │   │ categoryId          │   │ categoryId      │
│ userId      │   │ userId              │   │ userId          │
│ createdAt   │   │ createdAt           │   │ createdAt       │
│ updatedAt   │   │ updatedAt           │   │ updatedAt       │
└─────────────┘   └─────────────────────┘   └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│  MonthlyIncome   │       │  OccasionalIncome│
├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │
│ name            │       │ name            │
│ price           │       │ price           │
│ day             │       │ day             │
│ categoryId      │       │ categoryId      │
│ userId          │       │ userId          │
│ createdAt       │       │ createdAt       │
│ updatedAt       │       │ updatedAt       │
└─────────────────┘       └─────────────────┘
```

### 7.2 Relacionamentos
- User 1:N Categories
- User 1:N MonthlyExpenses
- User 1:N OccasionalExpenses
- User 1:N MonthlyIncomes
- User 1:N OccasionalIncomes
- User 1:N WishlistItems
- Category 1:N MonthlyExpenses
- Category 1:N OccasionalExpenses
- Category 1:N MonthlyIncomes
- Category 1:N OccasionalIncomes
- Category 1:N WishlistItems

---

## 8. Fluxos de Tela

### 8.1 Fluxo de Autenticação
```
┌──────────┐     ┌──────────┐     ┌───────────┐
│  Login   │────▶│ Cadastro │────▶│ Dashboard │
└──────────┘     └──────────┘     └───────────┘
     │                │                 │
     │                │                 ▼
     │                │           ┌──────────┐
     └────────────────┘           │Dashboard │
          (já tenho conta)         └──────────┘
```

### 8.2 Fluxo de Transações
```
┌───────────────┐     ┌──────────────┐
│Dashboard      │────▶│ Despesas     │
│(visão geral)  │     │ Mensais      │
└───────────────┘     └──────────────┘
       │                     │
       ▼                     ▼
┌───────────────┐     ┌──────────────┐
│Receitas       │     │ Despesas     │
│Mensais        │     │ Avulsas      │
└───────────────┘     └──────────────┘
```

### 8.3 Navegação Principal
```
┌─────────────────────────────────────────┐
│  ☰  Finances Nuxt           [Logout]   │
├─────────────────────────────────────────┤
│                                         │
│  📊 Dashboard                           │
│  💰 Despesas Mensais                   │
│  💸 Despesas Avulsas                   │
│  📈 Receitas Mensais                   │
│  📉 Receitas Avulsas                   │
│  📁 Categorias                          │
│  ⭐ Lista de Desejos                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 9. Wireframes Simplificados

### 9.1 Dashboard Mobile
```
┌────────────────────────┐
│ Finances Nuxt      ☰   │
├────────────────────────┤
│                        │
│ Olá, Ana! 👋           │
│                        │
│ ┌──────────────────┐  │
│ │ Resumo do Mês     │  │
│ │ 💰 Receitas:      │  │
│ │ R$ 6.000,00       │  │
│ │ 💸 Despesas:      │  │
│ │ R$ 3.500,00       │  │
│ │ 📊 Saldo:         │  │
│ │ R$ 2.500,00       │  │
│ └──────────────────┘  │
│                        │
│ ┌──────────────────┐  │
│ │ Gastos por Categoria│
│ │ ██████████░░ 80%  │  │
│ │ ████████░░░░ 60%  │  │
│ └──────────────────┘  │
│                        │
│ [+] Nova Transação     │
└────────────────────────┘
```

### 9.2 Página de Categorias
```
┌────────────────────────┐
│ ← Categorias           │
├────────────────────────┤
│                        │
│ ┌──────────────────┐   │
│ │ 🍔 Alimentação   │   │
│ │ R$ 800 / R$1.000│   │
│ │ ████████░░ 80%  │   │
│ │ [Editar] [Excluir]│  │
│ └──────────────────┘   │
│                        │
│ ┌──────────────────┐   │
│ │ 🚗 Transporte    │   │
│ │ R$ 400 / R$300   │   │
│ │ ███████████ 133% │ ⚠️│
│ │ [Editar] [Excluir]│  │
│ └──────────────────┘   │
│                        │
│ [+ Nova Categoria]     │
└────────────────────────┘
```

---

## 10. Glossário

| Termo | Definição |
|-------|-----------|
| **Despesa Mensal** | Gasto fixo que se repete todo mês (ex: aluguel) |
| **Despesa Avulsa** | Gasto pontual e não recorrente (ex:farmácia) |
| **Receita Mensal** | Entrada de dinheiro fixa mensal (ex: salário) |
| **Receita Avulsa** | Entrada de dinheiro pontual (ex: freelance) |
| **Orçamento Máximo** | Limite de gasto definido para uma categoria |
| **Categoria** | Agrupador para classificar transações |
| **Wishlist** | Lista de desejos com links para compras |

---

## 11. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Neon indisponível | Baixa | Alto | Backup local, monitoramento |
| JWT comprometido | Baixa | Alto | Expiração curta, refresh token |
| Perda de dados | Muito baixa | Crítico | Backups automáticos Neon |
| UX confusa | Média | Médio | Testes com usuários |
| Performance ruim | Média | Médio | Lazy loading, otimização queries |

---

## 12. Versões do Documento

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0 | 01/04/2026 | Product Owner | Versão inicial |
