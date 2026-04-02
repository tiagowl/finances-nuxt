# Design System - Finances Nuxt

## 1. Visão Geral

Este documento define o design system do Finances Nuxt, garantindo consistência visual e de interação em todas as telas do produto.

---

## 2. Princípios de Design

### 2.1 Filosofia
- **Simplicidade:** Interface limpa, sem elementos desnecessários
- **Clareza:** Informação fácil de escanear e entender
- **Velocidade:** Ações rápidas e feedback imediato
- **Confiança:** Design profissional que transmite segurança

### 2.2 Princípios

| # | Princípio | Aplicação |
|---|-----------|-----------|
| 1 | Mobile First | Designs começam em mobile, expandem para desktop |
| 2 | Hierarquia Visual | O mais importante é o mais visível |
| 3 | Consistência | Mesmos padrões em todo o produto |
| 4 | Acessibilidade | Contraste WCAG AA, touch targets 44px |
| 5 | Performance | Animações suaves, sem peso visual |

---

## 3. Sistema de Cores

### 3.1 Paleta Primária

```css
:root {
  /* Brand Colors */
  --color-primary: #6366F1;        /* Indigo 500 */
  --color-primary-dark: #4F46E5;   /* Indigo 600 */
  --color-primary-light: #818CF8;  /* Indigo 400 */
  
  /* Semantic Colors */
  --color-success: #10B981;        /* Emerald 500 */
  --color-warning: #F59E0B;        /* Amber 500 */
  --color-error: #EF4444;          /* Red 500 */
  --color-info: #3B82F6;           /* Blue 500 */
}
```

### 3.2 Cores Neutras

```css
:root {
  /* Gray Scale */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  
  /* Backgrounds */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-bg-tertiary: #F3F4F6;
  
  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  --color-text-inverse: #FFFFFF;
}
```

### 3.3 Cores de Feedback

```css
:root {
  /* Success */
  --color-success-bg: #ECFDF5;
  --color-success-border: #10B981;
  --color-success-text: #065F46;
  
  /* Warning */
  --color-warning-bg: #FFFBEB;
  --color-warning-border: #F59E0B;
  --color-warning-text: #92400E;
  
  /* Error */
  --color-error-bg: #FEF2F2;
  --color-error-border: #EF4444;
  --color-error-text: #991B1B;
  
  /* Info */
  --color-info-bg: #EFF6FF;
  --color-info-border: #3B82F6;
  --color-info-text: #1E40AF;
}
```

### 3.4 Cores por Categoria (Sugestão)

```css
:root {
  --color-cat-alimentacao: #F59E0B;   /* Amber */
  --color-cat-transporte: #3B82F6;    /* Blue */
  --color-cat-saude: #10B981;         /* Emerald */
  --color-cat-lazer: #EC4899;         /* Pink */
  --color-cat-vestuario: #8B5CF6;     /* Violet */
  --color-cat-contas: #6B7280;        /* Gray */
  --color-cat-moradia: #14B8A6;       /* Teal */
  --color-cat-tecnologia: #F97316;    /* Orange */
}
```

### 3.5 Uso de Cores

```
┌─────────────────────────────────────────────────────────────────┐
│                        MAPA DE CORES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Interfaces do App                                             │
│   ┌─────────────────────────────────────────────────────────┐ │
│   │                                                          │ │
│   │  Brand    │  Primary  │  #6366F1  │  Botões, links       │ │
│   │  Sucesso  │  Success  │  #10B981  │  Transações positivas│ │
│   │  Alerta   │  Warning  │  #F59E0B  │  Atenção, budget 70-99%│ │
│   │  Erro     │  Error    │  #EF4444  │  Erros, budget >100%  │ │
│   │  Info     │  Info     │  #3B82F6  │  Informações         │ │
│   │                                                          │ │
│   └─────────────────────────────────────────────────────────┘ │
│                                                                 │
│   Texto                                                         │
│   ┌─────────────────────────────────────────────────────────┐ │
│   │  Primário   │  #111827  │  Títulos, labels             │ │
│   │  Secundário │  #6B7280  │  Descrições, placeholders    │ │
│   │  Terciário  │  #9CA3AF  │  Dicas, hints                │ │
│   │  Inverso    │  #FFFFFF  │  Sobre fundo escuro          │ │
│   └─────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Tipografia

### 4.1 Font Family

```css
/* Primary: Inter - moderna, legível, otimizada para UI */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### 4.2 Escala Tipográfica

```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px - labels pequenos */
  --text-sm: 0.875rem;   /* 14px - secundário, hints */
  --text-base: 1rem;     /* 16px - corpo de texto */
  --text-lg: 1.125rem;   /* 18px - destaque */
  --text-xl: 1.25rem;    /* 20px - títulos pequenos */
  --text-2xl: 1.5rem;    /* 24px - títulos de seção */
  --text-3xl: 1.875rem;  /* 30px - títulos de página */
  --text-4xl: 2.25rem;   /* 36px - heros */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.25;   /* Títulos */
  --leading-normal: 1.5;    /* Corpo */
  --leading-relaxed: 1.75;  /* Texto longo */
}
```

### 4.3 Hierarquia Tipográfica

```
┌─────────────────────────────────────────────────────────────┐
│  H1 - Título de Página                      text-3xl/700   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                              │
│  H2 - Título de Seção                        text-2xl/600   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                              │
│  H3 - Título de Card                         text-xl/600     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                              │
│  Body - Texto Padrão                        text-base/400   │
│  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  │
│                                                              │
│  Caption - Texto Secundário                   text-sm/400    │
│  Informaciones adicionales y metadata                        │
│                                                              │
│  Label - Rótulos                        text-sm/500        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Espaçamento

### 5.1 Sistema de Grid

```css
:root {
  /* Base unit: 4px */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  
  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px - inputs */
  --radius-md: 0.5rem;    /* 8px - cards */
  --radius-lg: 0.75rem;   /* 12px - modais */
  --radius-xl: 1rem;      /* 16px - grandes */
  --radius-full: 9999px;  /* pills, avatares */
}
```

### 5.2 Uso de Espaçamento

```
┌─────────────────────────────────────────────────────────────┐
│                      ESPAÇAMENTO                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Componentes                                                │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │  inner padding: 16px (space-4)                         │ │
│  │                                                        │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │                                                  │  │ │
│  │  │  inner padding: 12px (space-3)                   │  │ │
│  │  │                                                  │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                                                        │ │
│  │  gap between items: 12px (space-3)                    │ │
│  │                                                        │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
│  Page Layout                                                 │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  page padding: 16px (mobile) / 24px (tablet+)       │ │
│  │  section gap: 24px (space-6)                         │ │
│  │  component gap: 16px (space-4)                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Sombras

### 6.1 Elevação

```css
:root {
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

### 6.2 Aplicação de Sombras

| Elemento | Sombra | Uso |
|----------|--------|-----|
| Botão default | none | Botões secundários |
| Botão hover | shadow-sm | Estados |
| Card | shadow-sm | Cards de lista |
| Card hover | shadow-md | Estados |
| Modal | shadow-xl | Modais, dialogs |
| FAB | shadow-lg | Botão flutuante |
| Dropdown | shadow-lg | Menus, pickers |

---

## 7. Componentes

### 7.1 Botões

```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 150ms ease;
  min-height: 48px; /* Touch target */
}

/* Primary Button */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}
.btn-primary:hover { background-color: var(--color-primary-dark); }
.btn-primary:active { transform: scale(0.98); }

/* Secondary Button */
.btn-secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
}

/* Ghost Button */
.btn-ghost {
  background-color: transparent;
  color: var(--color-primary);
}

/* Danger Button */
.btn-danger {
  background-color: var(--color-error);
  color: white;
}

/* Disabled State */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.btn-sm { padding: 8px 16px; min-height: 36px; }
.btn-lg { padding: 16px 32px; min-height: 56px; }
.btn-full { width: 100%; }
```

### 7.2 Inputs

```css
/* Input Container */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Label */
.input-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

/* Input Field */
.input-field {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  min-height: 48px;
}

.input-field:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Error State */
.input-error {
  border-color: var(--color-error);
}
.input-error:focus-within {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
.input-error-message {
  font-size: 12px;
  color: var(--color-error);
}

/* Placeholder */
.input-field::placeholder {
  color: var(--color-gray-400);
}
```

### 7.3 Cards

```css
.card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 150ms ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
}

/* Card Variants */
.card-clickable {
  cursor: pointer;
}
.card-clickable:active {
  transform: scale(0.99);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

/* Card Body */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Card Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-gray-100);
}
```

### 7.4 FAB (Floating Action Button)

```css
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: var(--shadow-lg);
  border: none;
  cursor: pointer;
  transition: all 200ms ease;
  z-index: 100;
}

.fab:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-xl);
}

.fab:active {
  transform: scale(0.95);
}

.fab-icon {
  transition: transform 300ms ease;
}

.fab.active .fab-icon {
  transform: rotate(45deg);
}
```

### 7.5 Progress Bar

```css
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--color-gray-200);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 400ms ease;
}

/* Progress Colors */
.progress-fill.success { background-color: var(--color-success); }
.progress-fill.warning { background-color: var(--color-warning); }
.progress-fill.danger { background-color: var(--color-error); }
.progress-fill.primary { background-color: var(--color-primary); }
```

---

## 8. Ícones

### 8.1 Biblioteca
**Fonte:** Lucide Icons (MIT License)

### 8.2 Ícones Principais

| Contexto | Ícone | Uso |
|----------|-------|-----|
| Home | `<Home />` | Navegação |
| Despesas | `<TrendingDown />` | Despesas |
| Receitas | `<TrendingUp />` | Receitas |
| Categorias | `<FolderOpen />` | Categorias |
| Wishlist | `<Star />` | Lista de desejos |
| Adicionar | `<Plus />` | FAB |
| Editar | `<Pencil />` | Ações |
| Excluir | `<Trash2 />` | Ações |
| Menu | `<Menu />` | Hamburger |
| Fechar | `<X />` | Modal |
| Sucesso | `<Check />` | Feedback |
| Erro | `<AlertCircle />` | Feedback |
| Loading | `<Loader />` | Loading |

### 8.3 Tamanhos

```css
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }
```

---

## 9. Estados de Interface

### 9.1 Empty State

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  color: var(--color-gray-300);
  margin-bottom: 16px;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
  max-width: 280px;
}
```

### 9.2 Loading State (Skeleton)

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text { height: 16px; margin-bottom: 8px; }
.skeleton-title { height: 24px; width: 60%; margin-bottom: 16px; }
.skeleton-avatar { width: 48px; height: 48px; border-radius: 50%; }
.skeleton-card { height: 80px; margin-bottom: 12px; }
```

### 9.3 Error State

```css
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  text-align: center;
}

.error-state-icon {
  width: 48px;
  height: 48px;
  color: var(--color-error);
  margin-bottom: 16px;
}

.error-state-message {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}
```

---

## 10. Motion e Animações

### 10.1 Durações

```css
:root {
  --duration-instant: 100ms;   /* Feedback imediato */
  --duration-fast: 150ms;      /* Transições rápidas */
  --duration-normal: 250ms;    /* Padrão */
  --duration-slow: 350ms;      /* Modais, páginas */
  --duration-slower: 500ms;    /* Animações complexas */
}
```

### 10.2 Easings

```css
:root {
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 10.3 Animações Comuns

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(16px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale In */
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Bounce */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* Spin (Loading) */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 11. Responsividade

### 11.1 Breakpoints

```css
/* Mobile */
@media (max-width: 639px) { }

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### 11.2 Adaptações Desktop

```css
@media (min-width: 1024px) {
  .sidebar {
    display: flex;
  }
  
  .main-content {
    margin-left: 240px;
    max-width: 1024px;
  }
  
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .fab {
    display: none; /* FAB não aparece em desktop */
  }
}
```

---

## 12. Checklist de Implementação

### Componentes
- [ ] Button (primary, secondary, ghost, danger)
- [ ] Button sizes (sm, md, lg, full)
- [ ] Input (text, email, password, number)
- [ ] Select/Dropdown
- [ ] Card
- [ ] Modal
- [ ] BottomSheet
- [ ] FAB
- [ ] ProgressBar
- [ ] Snackbar/Toast
- [ ] Skeleton
- [ ] EmptyState
- [ ] ErrorState

### Tokens
- [ ] Cores (CSS variables)
- [ ] Tipografia (CSS variables)
- [ ] Espaçamento (CSS variables)
- [ ] Sombras (CSS variables)
- [ ] Border radius (CSS variables)
- [ ] Transições (CSS variables)

### Utilitários
- [ ] Classes de alinhamento
- [ ] Classes de display
- [ ] Classes de texto (cores, sizes, weights)
- [ ] Classes de espaçamento
- [ ] Classes de utilidade (sr-only, truncate)

---

**Versão:** 1.0  
**Data:** 01/04/2026  
**Autor:** UI Designer  
**Última atualização:** 01/04/2026
