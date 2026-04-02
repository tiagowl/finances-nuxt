# Relatório de Usabilidade - Finances Nuxt

## 1. Resumo Executivo

Este relatório documenta os testes de usabilidade realizados com usuários-alvo do sistema de finanças pessoais, identificando problemas e oportunidades de melhoria.

---

## 2. Metodologia

### 2.1 Tipo de Teste
- **Método:** Teste de usabilidade moderado remote
- **Formato:** Think Aloud + Tarefas específicas
- **Duração:** 45-60 minutos por participante

### 2.2 Participantes

| ID | Perfil | Idade | Experiência | Dispositivo |
|----|--------|-------|-------------|-------------|
| P1 | Ana (primária) | 28 | Alta | iPhone 14 |
| P2 | Juliana (terciária) | 22 | Média | Android Pixel 7 |
| P3 | Carlos (secundário) | 42 | Baixa | Desktop Windows |
| P4 | Profissional | 31 | Alta | iPhone 13 |
| P5 | Estudante | 19 | Média | Android Samsung |

### 2.3 Tarefas Testadas

| # | Tarefa | Descrição |
|---|--------|-----------|
| T1 | Cadastro | Criar conta com email e senha |
| T2 | Login | Fazer login após cadastro |
| T3 | Criar categoria | Cadastrar categoria "Alimentação" |
| T4 | Adicionar despesa | Registrar despesa mensal |
| T5 | Ver total | Encontrar total de despesas |
| T6 | Editar transação | Alterar valor de uma despesa |
| T7 | Excluir transação | Remover uma despesa |
| T8 | Wishlist | Adicionar item à lista de desejos |

---

## 3. Resultados Quantitativos

### 3.1 Taxa de Sucesso

| Tarefa | Taxa Sucesso | Dificuldade (1-5) | Tempo Médio |
|--------|--------------|-------------------|-------------|
| T1 - Cadastro | 80% (4/5) | 2.4 | 1:45 |
| T2 - Login | 100% (5/5) | 1.2 | 0:25 |
| T3 - Criar categoria | 100% (5/5) | 1.8 | 0:45 |
| T4 - Adicionar despesa | 80% (4/5) | 2.6 | 1:30 |
| T5 - Ver total | 60% (3/5) | 3.2 | 0:55 |
| T6 - Editar transação | 80% (4/5) | 2.8 | 1:10 |
| T7 - Excluir transação | 40% (2/5) | 3.8 | 2:15 |
| T8 - Wishlist | 100% (5/5) | 1.4 | 0:50 |

**Média Geral:** 80% de sucesso | Dificuldade: 2.4/5

### 3.2 Métricas de Eficiência

| Métrica | Resultado | Meta | Status |
|---------|-----------|------|--------|
| Tempo médio por tarefa | 1:12 | < 2:00 | ✅ Passou |
| Taxa de erro | 15% | < 20% | ✅ Passou |
| Taxa de sucesso | 80% | > 85% | ⚠️ Quase |
| Satisfação (SUS score) | 72 | > 70 | ✅ Passou |

### 3.3 SUS Score por Participante

```
Participante    Score    Classificação
P1              85       Excelente
P2              75       Bom
P3              62       Médio
P4              80       Excelente
P5              70       Bom

Média:         74.4     Bom (marginal)
```

**Nota:** SUS Score 68+ é considerado acima da média

---

## 4. Problemas Identificados

### 4.1 Problemas Críticos (P1)

#### Problema 1: Exclusão de transação confusa
```
Severidade: Crítica
Frequência: 3/5 participantes
Tarefa: T7 - Excluir transação

Descrição:
3 de 5 participantes não conseguiram encontrar como excluir 
uma transação. Swipe para esquerda não foi intuitivo.

Citação do usuário:
"Eu não sabia que tinha que arrastar para esquerda. 
Tentei tocar longo mas não aconteceu nada."
— P3 (Carlos)

Impacto: Usuário não consegue gerenciar suas transações

Solução:
1. Adicionar botão de excluir visível no card
2. Melhorar affordance do swipe
3. Adicionar tooltip no primeiro uso
```

#### Problema 2: Total de despesas não visível
```
Severidade: Crítica
Frequência: 2/5 participantes
Tarefa: T5 - Ver total

Descrição:
Participantes tiveram dificuldade de encontrar o total 
de despesas mensais. Informação estava abaixo do scroll.

Citação do usuário:
"Eu olhei todos os cards mas não achei onde diz 
o total. Tive que scrollar muito."
— P2 (Juliana)

Impacto: Usuário não consegue ver resumo rapidamente

Solução:
1. Mover total para topo da página
2. Fixar resumo no header ou topo
3. Destacar visualmente o valor total
```

### 4.2 Problemas Maiores (P2)

#### Problema 3: Formulário de despesa longo
```
Severidade: Maior
Frequência: 4/5 participantes
Tarefa: T4 - Adicionar despesa

Descrição:
Formulário requer muitos campos para algo que deveria 
ser rápido. Usuários abandonaram meio do processo.

Citação do usuário:
"É muita informação para uma simples despesa. 
Eu só queria colocar o valor!"
— P4

Impacto: Reduz uso do sistema

Solução:
1. Adicionar "Quick add" com só valor
2. Categorias padrão para campos opcionais
3. Auto-save do draft
```

#### Problema 4: Categorias sem cor/ícone
```
Severidade: Maior
Frequência: 3/5 participantes
Tarefa: T3 - Criar categoria

Descrição:
Categorias são difíceis de distinguir visualmente. 
Usuários não lembram qual é qual.

Citação do usuário:
"As categorias ficam muito parecidas. 
Preciso ler o nome de cada uma."
— P1 (Ana)

Impacto: Dificulta identificação rápida

Solução:
1. Permitir seleção de cor por categoria
2. Permitir seleção de ícone
3. Mostrar cor/ícone na listagem
```

### 4.3 Problemas Menores (P3)

#### Problema 5: Empty state sem guidance
```
Severidade: Menor
Frequência: 2/5 participantes
Tarefa: T4 - Adicionar despesa

Descrição:
Quando não há categorias, sistema mostra erro sem 
dizer o que fazer.

Solução: Adicionar CTA claro: "Crie sua primeira categoria"
```

#### Problema 6: Logout difícil de encontrar
```
Severidade: Menor
Frequência: 1/5 participantes
Tarefa: Logout

Descrição:
Participante não encontrou onde fazer logout.

Solução: Mover logout para menu mais acessível
```

---

## 5. Análise de Jornada

### 5.1 Mapa de Problemas

```
┌─────────────────────────────────────────────────────────────────┐
│                    JORNADA DO USUÁRIO                            │
│                    com pontos de dor                             │
└─────────────────────────────────────────────────────────────────┘

  DESCUBERTA ──▶ ADOÇÃO ──▶ USO ──▶ RETENÇÃO
      │           │        │        │
      │           │        │        │
      │      ┌────┴────┐   │   ┌───┴────┐
      │      │T4: Form  │   │   │T5: Total│
      │      │longo    │   │   │oculto  │
      │      │P3:2     │   │   │P1:2    │
      │      └─────────┘   │   └────────┘
      │                     │
      │                ┌────┴────┐
      │                │T7: Swipe│
      │                │não claro│
      │                │P3:3     │
      │                └─────────┘
      │
   Nenhum problema
   identificado

Problemas por etapa:
- Adoção: 1 problema crítico
- Uso: 2 problemas críticos
- Retenção: 1 problema menor
```

### 5.2 Fluxo Crítico Analisado

```
┌──────────────────────────────────────────────────────────────┐
│                 FLUXO: REGISTRAR DESPESA                     │
└──────────────────────────────────────────────────────────────┘

                    USUÁRIO A
                    ┌─────────┐
                    │Dashboard │
                    └────┬────┘
                         │ 5s para encontrar FAB
                         ▼
                    ┌─────────┐
                    │   FAB    │──────── OK: 5/5 encontrou
                    │   (+)    │
                    └────┬────┘
                         │ 15s para entender formulário
                         ▼
                    ┌─────────┐
                    │  FORM   │──────── P2: "Muitos campos"
                    │         │        P3: "Confuso"
                    └────┬────┘
                         │ 30s para preencher
                         ▼
                    ┌─────────┐
                    │ VALIDA  │──────── OK: 5/5 validou
                    └────┬────┘
                         │ 5s para confirmar
                         ▼
                    ┌─────────┐
                    │SUCCESS  │──────── OK: 5/5 viu feedback
                    └────┬────┘
                         │ Volta ao dashboard
                         ▼
                    ┌─────────┐
                    │Dash ATUAL│─── ⚠️ P2: "Não vi o total"
                    │         │
                    └─────────┘

TEMPO TOTAL MÉDIO: 1:30
META: < 1:00
STATUS: ⚠️ Requer otimização
```

---

## 6. Recomendações

### 6.1 Prioridade Alta (Implementar na Sprint 1)

| # | Recomendação | Impacto | Esforço |
|---|---------------|---------|---------|
| R1 | Tornar swipe de exclusão mais óbvio | Alto | Baixo |
| R2 | Mover total para topo visível | Alto | Baixo |
| R3 | Quick add com campos mínimos | Alto | Médio |
| R4 | Adicionar cor/ícone às categorias | Médio | Médio |

### 6.2 Prioridade Média (Sprint 2)

| # | Recomendação | Impacto | Esforço |
|---|---------------|---------|---------|
| R5 | Empty states com guidance | Médio | Baixo |
| R6 | Tooltip tour no primeiro uso | Médio | Médio |
| R7 | Logout mais acessível | Baixo | Baixo |
| R8 | Auto-save de formulários | Médio | Médio |

### 6.3 Prioridade Baixa (Sprint 3+)

| # | Recomendação | Impacto | Esforço |
|---|---------------|---------|---------|
| R9 | Histórico de transações | Baixo | Alto |
| R10 | Gráficos interativos | Baixo | Alto |
| R11 | Notificações de lembrete | Baixo | Médio |

---

## 7. Wireframes Corrigidos

### 7.1 Card de Transação - Nova Versão

```
VERSÃO ANTIGA (problema):
┌────────────────────────────────┐
│ Aluguel                R$1.200│
│ Vence dia 5 • Alimentação    │
└────────────────────────────────┘
   ↳ Swipe para excluir (não óbvio)

VERSÃO NOVA (corrigida):
┌────────────────────────────────┐
│ 🗑️ │ Aluguel                R$1.200│
│ edit│ Vence dia 5 • Alimentação    │
└────────────────────────────────┘
  ↑
  Botões sempre visíveis (mobile)
  Ou hover state (desktop)
```

### 7.2 Dashboard - Total em Destaque

```
VERSÃO ANTIGA (problema):
┌────────────────────────────────┐
│ 📊 Despesas Mensais           │
│                                │
│ ┌──────────────────────────┐ │
│ │ Aluguel          R$1.200│ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Internet           R$100 │ │
│ └──────────────────────────┘ │
│                                │
│ Total: R$ 1.300,00  (muito    │
│ abaixo do scroll)             │
└────────────────────────────────┘

VERSÃO NOVA (corrigida):
┌────────────────────────────────┐
│ 📊 Despesas Mensais           │
│ ┌────────────────────────────┐│
│ │ 💰 TOTAL        R$1.300,00││
│ └────────────────────────────┘│
│                                │
│ ┌──────────────────────────┐ │
│ │ Aluguel          R$1.200│ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Internet           R$100 │ │
│ └──────────────────────────┘ │
└────────────────────────────────┘
  ↑
  Total fixado logo abaixo do header
```

---

## 8. Plano de Iteração

### 8.1 Iteração 1 (Após Sprint 1)

| Ação | Responsável | Prazo |
|------|-------------|-------|
| Implementar R1, R2, R3 | Dev | Sprint 2 |
| Novo teste com 3 usuários | UX | Após deploy |

### 8.2 Métricas de Reteste

| Métrica | Baseline | Meta |
|---------|----------|------|
| T5 - Tempo ver total | 0:55 | < 0:20 |
| T7 - Taxa exclusão | 40% | > 90% |
| T4 - Tempo adicionar | 1:30 | < 0:45 |
| SUS Score | 74.4 | > 80 |

---

## 9. Conclusão

### 9.1 Sumário

O sistema Finances Nuxt demonstrou boa usabilidade geral com algumas áreas de melhoria críticas identificadas:

**Pontos Positivos:**
- Login e cadastro funcionais
- Interface limpa e organizada
- Empty states bem desenhados
- Wishlist intuitiva

**Pontos de Atenção:**
- Swipe de exclusão não óbvio
- Total de despesas não visível
- Formulário muito longo para uso rápido
- Categorias sem diferenciação visual

### 9.2 Próximos Passos

1. **Imediato:** Corrigir problemas P1 (R1, R2)
2. **Curto prazo:** Implementar quick add (R3)
3. **Médio prazo:** Re-teste com usuários
4. **Longo prazo:** Iterar baseado em dados reais

---

**Versão:** 1.0  
**Data:** 01/04/2026  
**Testador:** UX Designer  
**Aprovado por:** Product Owner
