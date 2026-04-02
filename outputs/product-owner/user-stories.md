# User Stories - Sistema de Finanças Pessoais

## Autenticação

### US-001: Cadastro de Usuário
**Como** novo usuário  
**Eu quero** criar uma conta com email e senha  
**Para que** eu possa acessar minhas informações financeiras de forma segura

**Critérios de Aceitação:**
- CA-001.1: Sistema aceita email válido com formato correto
- CA-001.2: Senha deve ter no mínimo 8 caracteres
- CA-001.3: Email deve ser único no sistema
- CA-001.4: Após cadastro, usuário é automaticamente logado

### US-002: Login de Usuário
**Como** usuário cadastrado  
**Eu quero** fazer login com email e senha  
**Para que** eu possa acessar minha conta

**Critérios de Aceitação:**
- CA-002.1: Sistema valida credenciais corretas
- CA-002.2: Credenciais incorretas exibem mensagem de erro
- CA-002.3: Login bem-sucedido redireciona para dashboard
- CA-002.4: Sessão persiste até logout explícito

---

## Gestão de Categorias

### US-003: Criar Categoria
**Como** usuário autenticado  
**Eu quero** criar categorias para organizar minhas transações  
**Para que** eu possa classificar despesas e receitas

**Critérios de Aceitação:**
- CA-003.1: Usuário informa nome da categoria
- CA-003.2: Usuário define orçamento máximo de gasto
- CA-003.3: Categoria é salva e aparece na listagem
- CA-003.4: Nome da categoria deve ser único por usuário

### US-004: Editar Categoria
**Como** usuário autenticado  
**Eu quero** editar uma categoria existente  
**Para que** eu possa corrigir informações ou ajustar orçamento

### US-005: Excluir Categoria
**Como** usuário autenticado  
**Eu quero** excluir uma categoria  
**Para que** eu possa remover categorias que não uso mais

**Critérios de Aceitação:**
- CA-005.1: Sistema pergunta confirmação antes de excluir
- CA-005.2: Transações vinculadas perdem a categoria (setam NULL)
- CA-005.3: Exclusão remove a categoria permanentemente

### US-006: Listar Categorias
**Como** usuário autenticado  
**Eu quero** ver todas as minhas categorias  
**Para que** eu possa escolher ao cadastrar transações

---

## Gestão de Despesas Mensais

### US-007: Cadastrar Despesa Mensal
**Como** usuário autenticado  
**Eu quero** cadastrar uma despesa mensal fixa  
**Para que** eu possa rastrear gastos recorrentes

**Critérios de Aceitação:**
- CA-007.1: Usuário informa: nome, preço, dia do vencimento, categoria
- CA-007.2: Nome é obrigatório (mínimo 3 caracteres)
- CA-007.3: Preço deve ser maior que zero
- CA-007.4: Dia deve estar entre 1 e 31
- CA-007.5: Categoria é obrigatória (vinculada a uma existente)

### US-008: Editar Despesa Mensal
**Como** usuário autenticado  
**Eu quero** editar uma despesa mensal  
**Para que** eu possa atualizar informações quando necessário

### US-009: Excluir Despesa Mensal
**Como** usuário autenticado  
**Eu quero** excluir uma despesa mensal  
**Para que** eu possa remover gastos que não existem mais

### US-010: Listar Despesas Mensais
**Como** usuário autenticado  
**Eu quero** ver todas as minhas despesas mensais  
**Para que** eu possa ter visão geral dos gastos fixos

### US-011: Visualizar Total de Despesas Mensais
**Como** usuário autenticado  
**Eu quero** ver o total de gastos mensais  
**Para que** eu possa saber quanto pago por mês em despesas fixas

**Critérios de Aceitação:**
- CA-011.1: Total é calculado somando todas as despesas mensais
- CA-011.2: Total é exibido no topo da página de despesas mensais
- CA-011.3: Total atualiza automaticamente ao adicionar/editar/remover

---

## Gestão de Despesas Avulsas

### US-012: Cadastrar Despesa Avulsa
**Como** usuário autenticado  
**Eu quero** cadastrar uma despesa avulsa  
**Para que** eu possa registrar gastos únicos do dia a dia

**Critérios de Aceitação:**
- CA-012.1: Usuário informa: nome, preço, dia da despesa, categoria
- CA-012.2: Nome é obrigatório (mínimo 3 caracteres)
- CA-012.3: Preço deve ser maior que zero
- CA-012.4: Dia deve estar entre 1 e 31
- CA-012.5: Categoria é obrigatória

### US-013: Editar Despesa Avulsa
**Como** usuário autenticado  
**Eu quero** editar uma despesa avulsa  
**Para que** eu possa corrigir informações incorretas

### US-014: Excluir Despesa Avulsa
**Como** usuário autenticado  
**Eu quero** excluir uma despesa avulsa  
**Para que** eu possa remover lançamentos errados

### US-015: Listar Despesas Avulsas
**Como** usuário autenticado  
**Eu quero** ver todas as minhas despesas avulsas  
**Para que** eu possa acompanhar gastos variáveis

---

## Gestão de Receitas Mensais

### US-016: Cadastrar Receita Mensal
**Como** usuário autenticado  
**Eu quero** cadastrar uma receita mensal fixa  
**Para que** eu possa rastrear ingresos recorrentes

**Critérios de Aceitação:**
- CA-016.1: Usuário informa: nome, preço, dia do recebimento, categoria
- CA-016.2: Nome é obrigatório (mínimo 3 caracteres)
- CA-016.3: Preço deve ser maior que zero
- CA-016.4: Dia deve estar entre 1 e 31
- CA-016.5: Categoria é obrigatória

### US-017: Editar Receita Mensal
**Como** usuário autenticado  
**Eu quero** editar uma receita mensal  
**Para que** eu possa atualizar informações

### US-018: Excluir Receita Mensal
**Como** usuário autenticado  
**Eu quero** excluir uma receita mensal  
**Para que** eu possa remover ingresos que não existem mais

### US-019: Listar Receitas Mensais
**Como** usuário autenticado  
**Eu quero** ver todas as minhas receitas mensais  
**Para que** eu possa ter visão geral dos ingresos fixos

### US-020: Visualizar Total de Receitas Mensais
**Como** usuário autenticado  
**Eu quero** ver o total de receitas mensais  
**Para que** eu possa saber quanto recebo por mês

---

## Gestão de Receitas Avulsas

### US-021: Cadastrar Receita Avulsa
**Como** usuário autenticado  
**Eu quero** cadastrar uma receita avulsa  
**Para que** eu possa registrar ingresos únicos

**Critérios de Aceitação:**
- CA-021.1: Usuário informa: nome, preço, dia, categoria
- CA-021.2: Todos os campos são obrigatórios
- CA-021.3: Validações de formato aplicadas

### US-022: Editar Receita Avulsa
**Como** usuário autenticado  
**Eu quero** editar uma receita avulsa  
**Para que** eu possa corrigir informações

### US-023: Excluir Receita Avulsa
**Como** usuário autenticado  
**Eu quero** excluir uma receita avulsa  
**Para que** eu possa remover lançamentos errados

### US-024: Listar Receitas Avulsas
**Como** usuário autenticado  
**Eu quero** ver todas as minhas receitas avulsas  
**Para que** eu possa acompanhar ingresos variáveis

---

## Gestão de Lista de Desejos

### US-025: Adicionar Item à Lista de Desejos
**Como** usuário autenticado  
**Eu quero** adicionar um item na lista de desejos  
**Para que** eu possa planejar compras futuras

**Critérios de Aceitação:**
- CA-025.1: Usuário informa: nome, categoria, preço, link para compra
- CA-025.2: Nome é obrigatório
- CA-025.3: Preço deve ser maior que zero
- CA-025.4: Link é opcional mas deve ser URL válida se fornecido
- CA-025.5: Categoria é obrigatória

### US-026: Editar Item da Lista de Desejos
**Como** usuário autenticado  
**Eu quero** editar um item da lista  
**Para que** eu possa atualizar informações ou corrigir erros

### US-027: Excluir Item da Lista de Desejos
**Como** usuário autenticado  
**Eu quero** excluir um item da lista  
**Para que** eu possa remover itens já comprados ou desejados

### US-028: Listar Itens da Lista de Desejos
**Como** usuário autenticado  
**Eu quero** ver todos os itens da minha lista de desejos  
**Para que** eu possa acompanhar meus objetivos de compra

---

## Estatísticas e Relatórios

### US-029: Ver Total de Gastos por Categoria
**Como** usuário autenticado  
**Eu quero** ver o total de gastos para cada categoria  
**Para que** eu possa identificar onde estou gastando mais

**Critérios de Aceitação:**
- CA-029.1: Exibe lista de categorias com total de gastos
- CA-029.2: Inclui todas as despesas (fixas e avulsas) no cálculo
- CA-029.3: Mostra percentual em relação ao orçamento máximo
- CA-029.4: Destaca categorias que ultrapassaram o orçamento

---

## Requisitos Não-Funcionais

### US-030: Interface Responsiva Mobile
**Como** usuário que prioriza uso mobile  
**Eu quero** acessar o sistema pelo celular  
**Para que** eu possa gerenciar finanças de qualquer lugar

### US-031: Interface Desktop Adaptada
**Como** usuário que usa desktop  
**Eu quero** uma experiência adequada no navegador  
**Para que** eu possa usar o sistema também no computador

---

## User Stories - Resumo por Módulo

| Módulo | Quantidade US |
|--------|---------------|
| Autenticação | 2 |
| Categorias | 4 |
| Despesas Mensais | 5 |
| Despesas Avulsas | 4 |
| Receitas Mensais | 5 |
| Receitas Avulsas | 4 |
| Lista de Desejos | 4 |
| Estatísticas | 1 |
| Interface | 2 |
| **Total** | **31** |
