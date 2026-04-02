# Backlog Priorizado - Sistema de Finanças Pessoais

## Metodologia de Priorização

**Framework:** MoSCoW + ROI Simplificado

| Prioridade | Significado | Impacto |
|------------|-------------|--------|
| **Must Have** | Essencial para MVP | Crítico |
| **Should Have** | Importante mas não crítico | Alto |
| **Could Have** | Desejável | Médio |
| **Won't Have** | Não planejado para agora | Baixo |

**Critérios de Avaliação:**
- Valor de negócio (1-5)
- Esforço de desenvolvimento (1-5)
- Dependências (1-3)
- Risco (1-3)

---

## Sprint 1: Foundation (MVP Core)

### Autenticação

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-001 | Cadastro de Usuário | **Must** | 5 | 2 | - | 1 | 15 |
| US-002 | Login de Usuário | **Must** | 5 | 2 | US-001 | 1 | 14 |

### Categorias

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-003 | Criar Categoria | **Must** | 5 | 2 | - | 1 | 15 |
| US-004 | Editar Categoria | **Should** | 4 | 1 | US-003 | 1 | 12 |
| US-005 | Excluir Categoria | **Should** | 3 | 1 | US-003 | 1 | 9 |
| US-006 | Listar Categorias | **Must** | 4 | 1 | US-003 | 1 | 12 |

---

## Sprint 2: Core Transactions

### Despesas Mensais

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-007 | Cadastrar Despesa Mensal | **Must** | 5 | 3 | US-003, US-006 | 1 | 14 |
| US-008 | Editar Despesa Mensal | **Should** | 4 | 2 | US-007 | 1 | 11 |
| US-009 | Excluir Despesa Mensal | **Should** | 4 | 1 | US-007 | 1 | 11 |
| US-010 | Listar Despesas Mensais | **Must** | 4 | 2 | US-007 | 1 | 11 |
| US-011 | Total de Despesas Mensais | **Must** | 5 | 1 | US-010 | 1 | 14 |

### Despesas Avulsas

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-012 | Cadastrar Despesa Avulsa | **Must** | 5 | 3 | US-003, US-006 | 1 | 14 |
| US-013 | Editar Despesa Avulsa | **Should** | 4 | 2 | US-012 | 1 | 11 |
| US-014 | Excluir Despesa Avulsa | **Should** | 4 | 1 | US-012 | 1 | 11 |
| US-015 | Listar Despesas Avulsas | **Must** | 4 | 2 | US-012 | 1 | 11 |

---

## Sprint 3: Receitas

### Receitas Mensais

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-016 | Cadastrar Receita Mensal | **Must** | 5 | 3 | US-003, US-006 | 1 | 14 |
| US-017 | Editar Receita Mensal | **Should** | 4 | 2 | US-016 | 1 | 11 |
| US-018 | Excluir Receita Mensal | **Should** | 4 | 1 | US-016 | 1 | 11 |
| US-019 | Listar Receitas Mensais | **Must** | 4 | 2 | US-016 | 1 | 11 |
| US-020 | Total de Receitas Mensais | **Must** | 5 | 1 | US-019 | 1 | 14 |

### Receitas Avulsas

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-021 | Cadastrar Receita Avulsa | **Must** | 5 | 3 | US-003, US-006 | 1 | 14 |
| US-022 | Editar Receita Avulsa | **Should** | 4 | 2 | US-021 | 1 | 11 |
| US-023 | Excluir Receita Avulsa | **Should** | 4 | 1 | US-021 | 1 | 11 |
| US-024 | Listar Receitas Avulsas | **Must** | 4 | 2 | US-021 | 1 | 11 |

---

## Sprint 4: Wishlist & Stats

### Lista de Desejos

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-025 | Adicionar Item | **Could** | 3 | 2 | US-003, US-006 | 1 | 8 |
| US-026 | Editar Item | **Could** | 3 | 1 | US-025 | 1 | 8 |
| US-027 | Excluir Item | **Could** | 3 | 1 | US-025 | 1 | 8 |
| US-028 | Listar Itens | **Could** | 3 | 1 | US-025 | 1 | 8 |

### Estatísticas

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-029 | Total de Gastos por Categoria | **Must** | 5 | 2 | US-007, US-012 | 2 | 10 |

---

## Sprint 5: Polish

### Interface

| ID | User Story | Prioridade | Valor | Esforço | Dependência | Risco | Score |
|----|------------|------------|-------|---------|-------------|-------|-------|
| US-030 | Interface Mobile Responsiva | **Must** | 5 | 3 | Todas | 2 | 9 |
| US-031 | Interface Desktop Adaptada | **Should** | 4 | 2 | US-030 | 1 | 10 |

---

## Visão Geral do Backlog

### Por Prioridade

```
┌─────────────────────────────────────────────────────────────┐
│ MUST HAVE (12 US)                                           │
├─────────────────────────────────────────────────────────────┤
│ US-001 Cadastro de Usuário                                  │
│ US-002 Login de Usuário                                     │
│ US-003 Criar Categoria                                      │
│ US-006 Listar Categorias                                    │
│ US-007 Cadastrar Despesa Mensal                             │
│ US-010 Listar Despesas Mensais                              │
│ US-011 Total de Despesas Mensais                            │
│ US-012 Cadastrar Despesa Avulsa                             │
│ US-015 Listar Despesas Avulsas                              │
│ US-016 Cadastrar Receita Mensal                             │
│ US-019 Listar Receitas Mensais                              │
│ US-020 Total de Receitas Mensais                            │
│ US-021 Cadastrar Receita Avulsa                             │
│ US-024 Listar Receitas Avulsas                              │
│ US-029 Total de Gastos por Categoria                         │
│ US-030 Interface Mobile Responsiva                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SHOULD HAVE (10 US)                                         │
├─────────────────────────────────────────────────────────────┤
│ US-004 Editar Categoria                                     │
│ US-005 Excluir Categoria                                    │
│ US-008 Editar Despesa Mensal                                │
│ US-009 Excluir Despesa Mensal                               │
│ US-013 Editar Despesa Avulsa                                │
│ US-014 Excluir Despesa Avulsa                               │
│ US-017 Editar Receita Mensal                                │
│ US-018 Excluir Receita Mensal                               │
│ US-022 Editar Receita Avulsa                                │
│ US-023 Excluir Receita Avulsa                               │
│ US-031 Interface Desktop Adaptada                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ COULD HAVE (4 US)                                           │
├─────────────────────────────────────────────────────────────┤
│ US-025 Adicionar Item Wishlist                              │
│ US-026 Editar Item Wishlist                                 │
│ US-027 Excluir Item Wishlist                                │
│ US-028 Listar Itens Wishlist                                │
└─────────────────────────────────────────────────────────────┘
```

### Por Sprint

| Sprint | Tema | US Count | Complexidade |
|--------|------|----------|--------------|
| 1 | Foundation | 6 | Baixa |
| 2 | Core Transactions | 9 | Média |
| 3 | Receitas | 9 | Média |
| 4 | Wishlist & Stats | 5 | Baixa |
| 5 | Polish | 2 | Baixa |

### Estimativa de Esforço Total

| Categoria | Pontos (Fibonacci) |
|-----------|-------------------|
| Autenticação | 4 |
| Categorias | 5 |
| Despesas Mensais | 9 |
| Despesas Avulsas | 7 |
| Receitas Mensais | 9 |
| Receitas Avulsas | 7 |
| Lista de Desejos | 5 |
| Estatísticas | 2 |
| Interface | 5 |
| **Total** | **53 pontos** |

---

## Dependências

```
US-001 (Cadastro)
    └── US-002 (Login)
    
US-003 (Criar Categoria)
    ├── US-004 (Editar Categoria)
    ├── US-005 (Excluir Categoria)
    ├── US-006 (Listar Categorias)
    ├── US-007 (Cadastrar Despesa Mensal) ─────────────────┐
    ├── US-012 (Cadastrar Despesa Avulsa) ─────────────────┤
    ├── US-016 (Cadastrar Receita Mensal) ─────────────────┤
    ├── US-021 (Cadastrar Receita Avulsa) ─────────────────┤
    └── US-025 (Adicionar Wishlist) ──────────────────────┤
                                                            │
US-007 ─────────┐                                          │
US-012 ─────────┤                                          │
                └── US-029 (Estatísticas por Categoria) ───┘

US-030 (Interface Mobile)
    └── US-031 (Interface Desktop)
```

---

## Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Complexidade do Prisma com Neon | Média | Alto | Estudar documentação antecipadamente |
| Autenticação segura | Alta | Alto | Usar hash bcrypt, JWT |
| Performance mobile | Média | Médio | Lazy loading, otimização de queries |
| UX em formulários complexos | Baixa | Alto | Testes com personas |
