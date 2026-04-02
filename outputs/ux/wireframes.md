# Wireframes - Finances Nuxt

## 1. Visão Geral

Este documento apresenta os wireframes de baixa e média fidelidade para todas as telas principais do sistema de finanças pessoais, considerando mobile-first e adaptação desktop.

---

## 2. Sistema de Numeração

| Código | Significado |
|--------|-------------|
| WF-01 | Wireframe número |
| M | Mobile (375px) |
| D | Desktop (1280px) |

---

## 3. Telas de Autenticação

### 3.1 WF-01M - Tela de Login (Mobile)

```
┌────────────────────────────────────────┐
│                                        │
│                                        │
│                                        │
│          💰                            │
│                                        │
│     Finances Nuxt                      │
│     Suas finanças sob controle         │
│                                        │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ 📧  Email                      │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ 🔒  *****************          │   │
│  └────────────────────────────────┘   │
│                                        │
│        [ENTRAR]                        │
│                                        │
│                                        │
│   Não tem conta? Cadastre-se          │
│                                        │
│                                        │
│                                        │
└────────────────────────────────────────┘
```

**Elementos:**
- Logo centralizado (60x60px)
- Campos de input com ícones
- Botão primário full-width
- Link para cadastro
- Espaçamento: 16px entre elementos

### 3.2 WF-02M - Tela de Cadastro (Mobile)

```
┌────────────────────────────────────────┐
│                                        │
│  ← Cadastro                            │
│                                        │
│                                        │
│  Crie sua conta                        │
│  É rápido e gratuito                   │
│                                        │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ 📧  Email                      │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ 🔒  Senha (mín. 8 caracteres) │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ 🔒  Confirmar senha            │   │
│  └────────────────────────────────┘   │
│                                        │
│        [CADASTRAR]                     │
│                                        │
│                                        │
│   Já tem conta? Faça login            │
│                                        │
└────────────────────────────────────────┘
```

---

## 4. Telas Principais

### 4.1 WF-03M - Dashboard (Mobile)

```
┌────────────────────────────────────────┐
│ Finances Nuxt              ☰    👤    │
├────────────────────────────────────────┤
│                                        │
│  Olá, Ana! 👋                         │
│  Terça-feira, 01 de abril             │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ 📊 Resumo de Abril             │   │
│  │                                │   │
│  │ 💰 Receitas    R$ 6.000,00    │   │
│  │ ████████████████████████████   │   │
│  │                                │   │
│  │ 💸 Despesas    R$ 3.500,00    │   │
│  │ ████████████████░░░░░░░░░░   │   │
│  │                                │   │
│  │ 📊 Saldo       R$ 2.500,00    │   │
│  │ ██████████░░░░░░░░░░░░░░░   │   │
│  └────────────────────────────────┘   │
│                                        │
│  Gastos por Categoria                  │
│  ┌────────────────────────────────┐   │
│  │ 🍔 Alimentação      ████████  │   │
│  │    R$ 800 / R$ 1.000   80%   │   │
│  └────────────────────────────────┘   │
│  ┌────────────────────────────────┐   │
│  │ 🚗 Transporte        ██████   │   │
│  │    R$ 400 / R$ 300    133% ⚠️│   │
│  └────────────────────────────────┘   │
│  ┌────────────────────────────────┐   │
│  │ 🎬 Entretenimento   ████░░░   │   │
│  │    R$ 200 / R$ 200    100%   │   │
│  └────────────────────────────────┘   │
│                                        │
│                               ＋       │
│                            (FAB)       │
└────────────────────────────────────────┘
```

**Elementos interativos:**
- Header: menu hamburger, avatar/perfil
- Cards de resumo: tocáveis para detail
- Categorias: tocáveis, indicador de % do orçamento
- FAB: botão de ação flutuante para adicionar

### 4.2 WF-04M - Dashboard (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Finances Nuxt                                    👤 Ana    [Logout]    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ ┌──────────┐                                                            │
│ │ ☰ Menu   │                                                            │
│ │          │    ┌────────────────────────────────────────────────────┐  │
│ │ 📊 Home  │    │ Olá, Ana!                                         │  │
│ │ 💰 Desp. │    │ Terça-feira, 01 de abril de 2026                  │  │
│ │ 💸 Desp.A│    └────────────────────────────────────────────────────┘  │
│ │ 📈 Receit│                                                            │
│ │ 📉 Receit│    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
│ │ 📁 Categ.│    │ 💰 Receitas    │ │ 💸 Despesas   │ │ 📊 Saldo      │  │
│ │ ⭐ Desejo│    │ R$ 6.000,00   │ │ R$ 3.500,00   │ │ R$ 2.500,00   │  │
│ │          │    └───────────────┘ └───────────────┘ └───────────────┘  │
│ │          │                                                            │
│ │          │    ┌────────────────────────────────────────────────────┐  │
│ │          │    │ Gastos por Categoria                              │  │
│ │          │    │                                                    │  │
│ │          │    │ 🍔 Alimentação     ████████░░   80%  R$800/1000  │  │
│ │          │    │ 🚗 Transporte      ███████████  133%  R$400/300  │  │
│ │          │    │ 🎬 Entretenimento  ████████░░  100%  R$200/200  │  │
│ │          │    └────────────────────────────────────────────────────┘  │
│ │          │                                                            │
│ │          │                               ＋                           │
│ └──────────┘                                                            │
│                                                                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Telas de Transações

### 5.1 WF-05M - Despesas Mensais (Mobile)

```
┌────────────────────────────────────────┐
│ ← Despesas Mensais           ＋        │
├────────────────────────────────────────┤
│                                        │
│ Total do mês: R$ 1.680,00             │
│                                        │
│ ┌────────────────────────────────┐   │
│ │ 📅 Aluguel              R$ 1.200│  │
│ │    Vence dia 5 • Alimentação   │  │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ 📅 Internet             R$ 100│   │
│ │    Vence dia 10 • Contas       │  │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ 📅 Netflix              R$ 55│   │
│ │    Vence dia 15 • Entretenim.  │  │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ 📅 Academia            R$ 150│   │
│ │    Vence dia 20 • Saúde       │  │
│ └────────────────────────────────┘   │
│                                        │
│                                        │
│                                        │
│                                        │
└────────────────────────────────────────┘
```

**Interações:**
- Swipe para esquerda → Editar
- Swipe para esquerda → Excluir
- Tap → Expandir detalhes

### 5.2 WF-06M - Formulário Adicionar Despesa (Mobile)

```
┌────────────────────────────────────────┐
│ ← Nova Despesa                         │
├────────────────────────────────────────┤
│                                        │
│  Tipo:  ( ) Mensal   (•) Avulsa       │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ Nome da despesa                 │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ R$ 0,00                        │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ Categoria              ▼      │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │ Dia do vencimento       5    │   │
│  └────────────────────────────────┘   │
│                                        │
│                                        │
│        [SALVAR DESPESA]                │
│                                        │
└────────────────────────────────────────┘
```

### 5.3 WF-07M - Lista de Categorias (Mobile)

```
┌────────────────────────────────────────┐
│ ← Categorias                   ＋        │
├────────────────────────────────────────┤
│                                        │
│ ┌────────────────────────────────┐   │
│ │ 🍔 Alimentação           ＋ ─  │   │
│ │ ████████░░░░░░░░░░░░░░░░ 80%  │   │
│ │ R$ 800 / R$ 1.000,00          │   │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ 🚗 Transporte            ＋ ─  │   │
│ │ ████████████░░░░░░░░░░░░░ 133%│   │
│ │ R$ 400 / R$ 300,00   ⚠️ Estourado│ │
│ └────────────────────────────────┘   │
│ ┌────────────────────────────────┐   │
│ │ 🎬 Entretenimento        ＋ ─  │   │
│ │ ██████████░░░░░░░░░░░░░░ 100%│   │
│ │ R$ 200 / R$ 200,00             │   │
│ └────────────────────────────────┘   │
│                                        │
│ ┌────────────────────────────────┐   │
│ │ 💊 Saúde                ＋ ─   │   │
│ │ █████░░░░░░░░░░░░░░░░░░░ 50%│   │
│ │ R$ 150 / R$ 300,00            │   │
│ └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

**Legenda:**
- `＋` = Editar
- `-` = Excluir
- `⚠️` = Orçamento estourado

---

## 6. Tela de Lista de Desejos

### 6.1 WF-08M - Lista de Desejos (Mobile)

```
┌────────────────────────────────────────┐
│ ← Lista de Desejos             ＋        │
├────────────────────────────────────────┤
│                                        │
│ Saldo disponível: R$ 2.500,00         │
│                                        │
│ Atingir meta: R$ 1.200,00             │
│ ████████░░░░░░░░░░░░░░░░░░░░░  48%    │
│                                        │
│ ┌────────────────────────────────┐   │
│ │ 👟 Tênis Nike Air Max         │   │
│ │ 💰 R$ 450,00                   │   │
│ │ 🎮 Esportes                    │   │
│ │ 🔗 [Ver loja]                  │   │
│ └────────────────────────────────┘   │
│                                        │
│ ┌────────────────────────────────┐   │
│ │ 📱 iPhone 15 Case              │   │
│ │ 💰 R$ 89,00                    │   │
│ │ 📱 Tecnologia                  │   │
│ │ 🔗 [Ver loja]                  │   │
│ └────────────────────────────────┘   │
│                                        │
│ ┌────────────────────────────────┐   │
│ │ 📚 Livros - Próximo mês       │   │
│ │ 💰 R$ 150,00                   │   │
│ │ 📚 Educação                    │   │
│ │ 🔗 Sem link                    │   │
│ └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

---

## 7. Wireframes de Estados

### 7.1 WF-09M - Empty State (Sem dados)

```
┌────────────────────────────────────────┐
│ ← Despesas Mensais           ＋        │
├────────────────────────────────────────┤
│                                        │
│                                        │
│                                        │
│            📝                          │
│                                        │
│     Nenhuma despesa mensal            │
│          cadastrada                    │
│                                        │
│    Comece adicionando suas            │
│      despesas fixas aqui               │
│                                        │
│                                        │
│      [+ Adicionar Despesa]            │
│                                        │
│                                        │
│                                        │
│                                        │
└────────────────────────────────────────┘
```

### 7.2 WF-10M - Loading State

```
┌────────────────────────────────────────┐
│ ← Despesas Mensais           ＋        │
├────────────────────────────────────────┤
│                                        │
│                                        │
│                                        │
│                                        │
│            ⏳                          │
│                                        │
│       Carregando...                   │
│                                        │
│                                        │
│    ═══════════════════                 │
│         (progress bar)                  │
│                                        │
│                                        │
│                                        │
│                                        │
└────────────────────────────────────────┘
```

### 7.3 WF-11M - Error State

```
┌────────────────────────────────────────┐
│ ← Despesas Mensais           ＋        │
├────────────────────────────────────────┤
│                                        │
│                                        │
│                                        │
│            ⚠️                          │
│                                        │
│    Ops! Algo deu errado               │
│                                        │
│    Não foi possível carregar           │
│     suas despesas                      │
│                                        │
│                                        │
│       [Tentar novamente]               │
│                                        │
│                                        │
│                                        │
│                                        │
└────────────────────────────────────────┘
```

---

## 8. Fluxo de Navegação

### 8.1 Mapa de Navegação

```
                    ┌─────────────┐
                    │   LOGIN     │
                    └──────┬──────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│  │ CADASTRO │───▶│ DASHBOARD│◀───│ LOGIN    │     │
│  └──────────┘    └──────┬───┘    └──────────┘     │
│                         │                          │
│          ┌──────────────┼──────────────┐           │
│          │              │              │           │
│          ▼              ▼              ▼           │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│   │DESPESAS    │ │RECEITAS    │ │CATEGORIAS  │  │
│   │MENSAIS     │ │MENSAIS     │ │            │  │
│   └────────────┘ └────────────┘ └────────────┘  │
│          │              │              │           │
│          ▼              ▼              ▼           │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│   │DESPESAS    │ │RECEITAS    │ │ WISHLIST   │  │
│   │AVULSAS     │ │AVULSAS     │ │            │  │
│   └────────────┘ └────────────┘ └────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 8.2 Fluxo de Adicionar Transação

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  ┌────────────┐      ┌────────────┐      ┌──────────┐ │
│  │  DASHBOARD │ ───▶ │   FAB(＋)  │ ───▶ │  MODAL   │ │
│  │            │      │            │      │ TIPO     │ │
│  └────────────┘      └────────────┘      └────┬─────┘ │
│                                               │       │
│                            ┌──────────────────┼───────┤
│                            │                  │       │
│                            ▼                  ▼       │
│                    ┌────────────┐      ┌────────────┐ │
│                    │ DESPESA    │      │ RECEITA    │ │
│                    │ FORM       │      │ FORM       │ │
│                    └─────┬──────┘      └─────┬──────┘ │
│                          │                   │        │
│                          ▼                   ▼        │
│                    ┌────────────┐      ┌────────────┐ │
│                    │  FEEDBACK  │      │  FEEDBACK  │ │
│                    │  "Salvo!"  │      │  "Salvo!"  │ │
│                    └─────┬──────┘      └─────┬──────┘ │
│                          │                   │        │
│                          └─────────┬─────────┘        │
│                                    ▼                  │
│                           ┌────────────┐               │
│                           │ DASHBOARD  │               │
│                           │(atualizado)│               │
│                           └────────────┘               │
└────────────────────────────────────────────────────────┘
```

---

## 9. Componentes Reutilizáveis

### 9.1 Botão Primário

```
Mobile:  Full-width, 48px altura, 8px border-radius
Desktop: 200px largura máx, 48px altura, 8px border-radius

Estado Normal:
┌────────────────────────────────┐
│         [SALVAR]               │
└────────────────────────────────┘

Estado Hover (Desktop):
┌────────────────────────────────┐
│         [SALVAR]               │  +5% lightness
└────────────────────────────────┘

Estado Pressed:
┌────────────────────────────────┐
│         [SALVANDO...]          │  opacity 0.8
└────────────────────────────────┘

Estado Disabled:
┌────────────────────────────────┐
│         [SALVAR]               │  opacity 0.5
└────────────────────────────────┘
```

### 9.2 Input de Texto

```
┌────────────────────────────────┐
│ 📧  Email                     │
└────────────────────────────────┘
  │       │
  │       └── Ícone à esquerda (24x24)
  │
  └── Label acima, 14px, #666

Estado Focus:
┌────────────────────────────────┐
│ 📧  Email                     │  ← borda: primary
└────────────────────────────────┘

Estado Error:
┌────────────────────────────────┐
│ 📧  Email                     │  ← borda: #e74c3c
│ Email inválido                │  ← mensagem de erro
└────────────────────────────────┘
```

### 9.3 Card de Transação

```
┌────────────────────────────────┐
│ 📅 Aluguel              R$1.200│
│    Vence dia 5 • Alimentação   │
└────────────────────────────────┘
  │    │              │
  │    │              └── Preço alinhado à direita
  │    │
  │    └── Dia + Categoria em texto secundário
  │
  └── Ícone do tipo (calendar)

Swipe para direita (Android) / Edit (iOS):
┌──────────┬────────────────────────────────┐
│ EDITAR   │ Aluguel                R$1.200│
│          │    Vence dia 5 • Alimentação   │
└──────────┴────────────────────────────────┘

Swipe para esquerda:
┌────────────────────────────────┬──────────┐
│ Aluguel                R$1.200│ EXCLUIR  │
│    Vence dia 5 • Alimentação   │          │
└────────────────────────────────┴──────────┘
```

---

## 10. Especificações de Responsividade

### 10.1 Breakpoints

| Dispositivo | Largura | Layout |
|-------------|---------|--------|
| Mobile Small | 320-374px | Single column |
| Mobile Large | 375-767px | Single column |
| Tablet | 768-1023px | 2 columns |
| Desktop | 1024-1439px | Sidebar + content |
| Desktop Large | 1440px+ | Sidebar + content (max-width: 1440px) |

### 10.2 Adaptações Desktop

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Menu | Hamburger drawer | Sidebar fixa |
| Grid | 1 coluna | Multi-colunas |
| FAB | Bottom right | Não aplicável |
| Cards | Full width | 300-400px max |
| Modal | Full screen | Centered dialog |

---

## 11. Checklist de Implementação

### 11.1 Funcional
- [ ] Todos os links de navegação funcionais
- [ ] Formulários validam entrada
- [ ] Swipe gestures implementados
- [ ] FAB abre modal de adicionar
- [ ] Empty states para todas as listas

### 11.2 Visual
- [ ] Espaçamentos consistentes (8px grid)
- [ ] Tipografia Hierarchy clara
- [ ] Cores de feedback (success/error)
- [ ] Ícones consistentes
- [ ] Estados de loading implementados

### 11.3 Acessibilidade
- [ ] Labels em todos os inputs
- [ ] Contraste WCAG AA
- [ ] Focus visible em keyboard nav
- [ ] Touch targets 44x44px
- [ ] Screen reader friendly

---

**Versão:** 1.0  
**Data:** 01/04/2026  
**Autor:** UX Designer
