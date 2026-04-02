# Protótipos Interativos - Finances Nuxt

## 1. Visão Geral

Este documento descreve os protótipos interativos de alta fidelidade para validação com usuários e desenvolvimento.

---

## 2. Protótipos por Tela

### 2.1 Tela de Login

**Link do protótipo:** (Figma/FigJam)
**Código de acesso:** PROTOTYPE-001

#### Interações Implementadas

| Elemento | Interação | Comportamento |
|----------|-----------|----------------|
| Campo Email | Tap | Abre teclado numérico |
| Campo Senha | Tap | Abre teclado, caracteres ocultos |
| Botão Entrar | Tap | Loading → Dashboard ou Erro |
| Link Cadastro | Tap | Navega para tela de cadastro |

#### Estados do Protótipo

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Default      │ ──▶ │    Loading      │ ──▶ │    Success      │
│                 │     │                 │     │    (Dashboard)  │
│ [Entrar]        │     │ [Entrando...]   │     │   Redireciona  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │
        │ (credenciais erradas)
        ▼
┌─────────────────┐
│     Error       │
│                 │
│ [Email ou senha │
│  incorretos]    │
└─────────────────┘
```

---

### 2.2 Dashboard Principal

**Link do protótipo:** PROTOTYPE-002

#### Interações Implementadas

| Elemento | Interação | Comportamento |
|----------|-----------|----------------|
| Card Receitas | Tap | Expande com breakdown |
| Card Despesas | Tap | Expande com breakdown |
| Card Saldo | Tap | Mostra histórico |
| Categoria | Tap | Navega para detalhe |
| FAB (+) | Tap | Abre modal de adicionar |
| Menu Hamburger | Tap | Abre drawer |
| Avatar | Tap | Abre perfil/logout |

#### Micro-interações

```
FAB Tap:
┌─────────────────┐
│                 │
│        ＋       │  ──▶  Scale 1.1 + Rotation 45°
│                 │       (300ms ease-out)
└─────────────────┘

Card Tap:
┌─────────────────┐
│ 💰 Receitas     │  ──▶  Expand com slide-down
│ R$ 6.000,00     │       Detalhes aparecem
│ ████████████████│       (250ms ease-in-out)
└─────────────────┘

Swipe Categoria:
┌──────────┬───────────────────────┐
│  Editar  │ 🍔 Alimentação        │
└──────────┴───────────────────────┘
     │
     └── Reveal animado (200ms)
```

---

### 2.3 Modal de Adicionar Transação

**Link do protótipo:** PROTOTYPE-003

#### Fluxo do Protótipo

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │  ✕  Nova Transação                                  │  │
│   ├─────────────────────────────────────────────────────┤  │
│   │                                                       │  │
│   │   Tipo:  ○ Despesa    ○ Receita                      │  │
│   │          ● Mensal    ● Avulsa                       │  │
│   │                                                       │  │
│   │   ┌─────────────────────────────────────────────┐   │  │
│   │   │ Nome da transação                          │   │  │
│   │   └─────────────────────────────────────────────┘   │  │
│   │                                                       │  │
│   │   ┌─────────────────────────────────────────────┐   │  │
│   │   │ 💰 R$ 0,00                                  │   │  │
│   │   └─────────────────────────────────────────────┘   │  │
│   │                                                       │  │
│   │   ┌─────────────────────────────────────────────┐   │  │
│   │   │ 📁 Categoria                        ▼     │   │  │
│   │   └─────────────────────────────────────────────┘   │  │
│   │                                                       │  │
│   │   ┌─────────────────────────────────────────────┐   │  │
│   │   │ 📅 Dia do vencimento              15       │   │  │
│   │   └─────────────────────────────────────────────┘   │  │
│   │                                                       │  │
│   │              [SALVAR TRANSAÇÃO]                    │  │
│   │                                                       │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Interações

| Elemento | Interação | Comportamento |
|----------|-----------|----------------|
| Toggle Tipo | Tap | Alterna Despesa/Receita |
| Toggle Frequência | Tap | Alterna Mensal/Avulsa |
| Campo Nome | Type | Feedback visual |
| Campo Valor | Type | Formatação R$ |
| Dropdown Categoria | Tap | Abre picker |
| Botão Salvar | Tap | Valida → Feedback → Fecha |

#### Estados

```
Empty State:
┌────────────────────────┐
│ Nome da transação     │  placeholder: "Ex: Aluguel, Mercado"
└────────────────────────┘

Valid State:
┌────────────────────────┐
│ Aluguel               │  ✓ verde à direita
└────────────────────────┘

Error State:
┌────────────────────────┐
│                       │  ✗ vermelho + mensagem
│ Campo obrigatório     │
└────────────────────────┘

Success Feedback:
┌────────────────────────┐
│   ✓                    │
│   Transação salva!     │
│                       │
│   [Ver no dashboard]  │
│   [+ Nova transação]  │
└────────────────────────┘
```

---

### 2.4 Lista de Categorias

**Link do protótipo:** PROTOTYPE-004

#### Interações

| Elemento | Interação | Comportamento |
|----------|-----------|----------------|
| Categoria | Tap | Expande/edita inline |
| Categoria | Swipe L | Revela botão excluir |
| Categoria | Swipe R | Revela botão editar |
| Botão + | Tap | Abre modal criar |
| Progress Bar | - | Atualiza em tempo real |

#### Progresso Visual

```
████████████░░░░  75%  (verde)
███████████████  100% (amarelo)
███████████████▓ 133% (vermelho + alerta)
```

---

### 2.5 Lista de Desejos

**Link do protótipo:** PROTOTYPE-005

#### Interações

| Elemento | Interação | Comportamento |
|----------|-----------|----------------|
| Item | Tap | Abre modal editar |
| Link | Tap | Abre URL em nova aba |
| Checkbox | Tap | Marca como comprado |
| FAB | Tap | Abre modal adicionar |

#### Estados do Item

```
┌────────────────────────────────────────────────────────┐
│  ☐ Tênis Nike Air Max                      R$ 450,00 │
│     🎮 Esportes                                    │
│     🔗 [Ver loja →]                                │
└────────────────────────────────────────────────────────┘

                        │
                        ▼ (tap checkbox)

┌────────────────────────────────────────────────────────┐
│  ☑ Tênis Nike Air Max                      R$ 450,00 │
│     🎮 Esportes                                    │
│     ✓ Comprado!                                    │
└────────────────────────────────────────────────────────┘
     │
     └── risca o texto, opacidade 0.5
```

---

## 3. Componentes Interativos

### 3.1 Floating Action Button (FAB)

```javascript
// Comportamento do FAB
{
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  size: '56px',
  icon: '+',
  
  states: {
    default: { scale: 1, rotation: 0 },
    hover: { scale: 1.05 },
    active: { scale: 0.95 },
    expanded: { rotation: 45, scale: 1.1 }
  },
  
  animations: {
    tap: 'scale 100ms ease-out',
    expand: 'rotation 300ms ease-out'
  }
}
```

### 3.2 Bottom Sheet

```
┌────────────────────────────────────────┐
│                                        │
│         ═══════════                    │  ← Drag handle
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Selecione a Categoria           │ │
│  └──────────────────────────────────┘ │
│                                        │
│  🔍 Buscar...                         │
│                                        │
│  🍔 Alimentação                        │
│  ────────────────────────────         │
│  🚗 Transporte                        │
│  ────────────────────────────         │
│  🎬 Entretenimento                    │
│  ────────────────────────────         │
│  💊 Saúde                            │
│  ────────────────────────────         │
│  👔 Vestuário                        │
│                                        │
│  + Criar nova categoria               │
│                                        │
└────────────────────────────────────────┘

Gestures:
- Drag up: Abre completamente
- Drag down: Fecha
- Tap outside: Fecha
- Tap item: Seleciona e fecha
```

### 3.3 Snackbars/Toasts

```
┌────────────────────────────────────────┐
│                                        │
│         ┌─────────────────────┐       │
│         │ ✓ Transação salva!  │       │
│         └─────────────────────┘       │
│                                        │
│              ↑                         │
│         (aparece do bottom)
│
│    Auto-dismiss: 3 segundos
│    Tap para dispensar
```

### 3.4 Modais de Confirmação

```
┌────────────────────────────────────────┐
│                                        │
│         ┌─────────────────────┐       │
│         │     ⚠️ Atenção       │       │
│         │                     │       │
│         │ Deseja excluir a    │       │
│         │ categoria "Lazer"?  │       │
│         │                     │       │
│         │ Esta ação não pode  │       │
│         │ ser desfeita.       │       │
│         │                     │       │
│         │ [Cancelar]  [Excluir]│      │
│         └─────────────────────┘       │
│                                        │
└────────────────────────────────────────┘

Botão Excluir:
- Texto vermelho
- Focus mais à direita (padrão destructive)
```

---

## 4. Animações e Transições

### 4.1 Transições de Tela

| Transição | Tipo | Duração | Easing |
|-----------|------|---------|--------|
| Push | Slide left | 300ms | ease-out |
| Pop | Slide right | 300ms | ease-out |
| Modal | Slide up | 350ms | ease-out |
| Dismiss | Slide down | 250ms | ease-in |

### 4.2 Animações de Elementos

| Elemento | Animação | Duração | Trigger |
|----------|----------|---------|---------|
| FAB | Scale bounce | 200ms | Tap |
| Card | Expand height | 250ms | Tap |
| Swipe | Reveal action | 150ms | Gesture |
| List item | Stagger fade | 50ms/item | Enter |
| Progress bar | Width fill | 400ms | Load |
| Toast | Slide up + fade | 300ms | Show |

### 4.3 Loading States

```
Skeleton Screen:
┌────────────────────────────────────────┐
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────┘
   Animação shimmer (esquerda → direita)

Spinner:
┌───────────────┐
│               │
│      ◐        │  Rotação 360°
│               │  1s loop
│               │
└───────────────┘
```

---

## 5. Protótipo de Fluxo Completo

### 5.1 Fluxo: Registrar Despesa

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Dashboard  │───▶│    FAB      │───▶│    Form     │───▶│   Success   │
│             │ tap│     (+)     │ tap│  Despesa    │ tap│   Toast    │
└─────────────┘    └─────────────┘    └──────┬──────┘    └──────┬──────┘
                                            │                  │
                                   select   │   type           │
                                   category │   value         │
                                            │                  │
                                            ▼                  │
                                   ┌─────────────┐            │
                                   │  Validation │ ─── error │
                                   │   Check     │            │
                                   └─────────────┘            │
                                                               │
                                                               ▼
                                                       ┌─────────────┐
                                                       │  Dashboard  │
                                                       │  (updated)  │
                                                       └─────────────┘
```

### 5.2 Fluxo: Cadastro Completo

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Login    │───▶│  Cadastro   │───▶│  Onboarding │───▶│  Dashboard  │
│             │ tap│             │ tap│  1/3        │ tap│  (empty)    │
└─────────────┘    └──────┬──────┘    └──────┬──────┘    └─────────────┘
                          │                   │                 ▲
                          │                   ▼                 │
                          │           ┌─────────────┐           │
                          │           │  Onboarding │           │
                          │           │    2/3      │ ─── skip  │
                          │           └──────┬──────┘           │
                          │                  │                  │
                          │                  ▼                  │
                          │          ┌─────────────┐           │
                          │          │  Onboarding │           │
                          │          │    3/3      │ ─── done  │
                          │          └──────┬──────┘           │
                          │                 │                   │
                          ▼                 ▼                   │
                   ┌─────────────┐   ┌─────────────┐           │
                   │   Error     │   │  Dashboard  │───────────┘
                   │   Toast     │   │  (ready)    │
                   └─────────────┘   └─────────────┘
```

---

## 6. Teste do Protótipo

### 6.1 Cenários de Teste

| # | Cenário | Passos | Resultado Esperado |
|---|---------|--------|-------------------|
| 1 | Login com sucesso | Email + Senha válidos → Entrar | Dashboard carrega |
| 2 | Login com erro | Credenciais inválidas → Entrar | Mensagem de erro |
| 3 | Adicionar despesa | FAB → Form → Preencher → Salvar | Dashboard atualiza |
| 4 | Verificar orçamento | Acessar Categorias | Barras de progresso visíveis |
| 5 | Empty state | Acessar sem dados | Tela de onboarding vazio |
| 6 | Swipe excluir | Swipe → Confirmar | Item removido |

### 6.2 Checklist de Teste

- [ ] Todas as navegações funcionam
- [ ] Formulários validam corretamente
- [ ] Feedback visual em todas ações
- [ ] Estados de loading funcionam
- [ ] Empty states estão implementados
- [ ] Transições são suaves
- [ ] Responsividade funciona
- [ ] Teclado não cobre campos

---

## 7. Handoff para Desenvolvimento

### 7.1 Especificações Técnicas

| Tela | Estado | Complexidade | Prioridade |
|------|--------|--------------|------------|
| Login | Prototipado | Baixa | P1 |
| Dashboard | Prototipado | Média | P1 |
| CRUD Transações | Prototipado | Média | P1 |
| Categorias | Prototipado | Baixa | P1 |
| Wishlist | Prototipado | Baixa | P2 |

### 7.2 Componentes para Implementação

```
/components
├── ui/
│   ├── Button.vue
│   ├── Input.vue
│   ├── Card.vue
│   ├── Modal.vue
│   ├── BottomSheet.vue
│   ├── FAB.vue
│   ├── Snackbar.vue
│   ├── ProgressBar.vue
│   ├── Skeleton.vue
│   └── EmptyState.vue
│
├── transactions/
│   ├── TransactionForm.vue
│   ├── TransactionList.vue
│   └── TransactionCard.vue
│
└── layout/
    ├── AppHeader.vue
    ├── AppSidebar.vue
    └── AppDrawer.vue
```

---

**Versão:** 1.0  
**Data:** 01/04/2026  
**Autor:** UX Designer
**Status:** Pronto para handoff
