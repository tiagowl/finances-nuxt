# Pesquisa de Usuário - Finances Nuxt

## 1. Resumo Executivo

Esta pesquisa tem como objetivo compreender as necessidades, comportamentos e pontos de dor dos usuários-alvo do sistema de finanças pessoais, garantindo que o design atenda às expectativas reais do público.

---

## 2. Metodologia

### 2.1 Abordagem
- **Tipo:** Pesquisa qualitativa e quantitativa
- **Técnicas:** Entrevistas, questionários, análise de tarefas
- **Duração:** 2 semanas

### 2.2 Amostra
| Perfil | Quantidade | Idade | Perfil |
|--------|------------|-------|--------|
| Primário | 5 | 25-35 | Profissionais ocupados |
| Secundário | 3 | 20-25 | Estudantes |
| Terciário | 2 | 40-50 | Empresários |

### 2.3 Canais de Coleta
- Google Forms (questionário)
- Zoom/Meet (entrevistas)
- Testes de usabilidade remote

---

## 3. Personas Validadas

### 3.1 Persona Primária: Ana
```
┌─────────────────────────────────────────────────────────────┐
│                        ANA                                   │
├─────────────────────────────────────────────────────────────┤
│ 28 anos | Analista de Marketing | São Paulo                  │
├─────────────────────────────────────────────────────────────┤
│ 📱 "Quero controle sem complicação"                         │
├─────────────────────────────────────────────────────────────┤
│ COMPORTAMENTO                                                │
│ • Usa smartphone 90% do tempo                               │
│ • Checks de financeiro 2-3x ao dia                          │
│ • Valoriza speed over features                              │
│ • Paga tudo pelo celular                                    │
├─────────────────────────────────────────────────────────────┤
│ NECESSIDADES                                                │
│ ✓ Dashboard rápido com resumo mensal                        │
│ ✓ Adicionar despesa em < 30 segundos                        │
│ ✓ Verificar orçamento por categoria                        │
│ ✓ Alertas quando perto do limite                            │
├─────────────────────────────────────────────────────────────┤
│ FRUSTRAÇÕES COM APPS ATUAIS                                  │
│ ✗ Cadastro longo e complexo                                │
│ ✗ Muita informação na tela inicial                         │
│ ✗ Não funciona bem offline                                  │
│ ✗ Gráficos confusos e poluídos                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Persona Secundária: Carlos
```
┌─────────────────────────────────────────────────────────────┐
│                       CARLOS                                 │
├─────────────────────────────────────────────────────────────┤
│ 42 anos | Dono de Empresa | Rio de Janeiro                  │
├─────────────────────────────────────────────────────────────┤
│ 💻 "Preciso de visão geral, não de detalhes"                │
├─────────────────────────────────────────────────────────────┤
│ COMPORTAMENTO                                                │
│ • Desktop no trabalho, mobile em casa                      │
│ • Consulta semanal, não diária                              │
│ • Multi-tarefa, interrupções frequentes                      │
│ • Usa planilhas como backup                                 │
├─────────────────────────────────────────────────────────────┤
│ NECESSIDADES                                                │
│ ✓ Visão macro de receitas vs despesas                      │
│ ✓ Filtros por período                                      │
│ ✓ Categorias bem definidas                                 │
│ ✓ Exportar dados se necessário                             │
├─────────────────────────────────────────────────────────────┤
│ FRUSTRAÇÕES COM APPS ATUAIS                                  │
│ ✗ Apps muito "de pessoa física"                            │
│ ✗ Meses de curva de aprendizado                            │
│ ✗ Visual nada profissional                                 │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Persona Terciária: Juliana
```
┌─────────────────────────────────────────────────────────────┐
│                      JULIANA                                │
├─────────────────────────────────────────────────────────────┤
│ 22 anos | Estudante Universitária | Belo Horizonte           │
├─────────────────────────────────────────────────────────────┤
│ 🎓 "Quero atingir minhas metas semperder o controle"        │
├─────────────────────────────────────────────────────────────┤
│ COMPORTAMENTO                                                │
│ • Desktop na biblioteca, mobile no ônibus                   │
│ • Uso frequente de lista de compras                         │
│ • Orçamento bem apertado                                   │
│ • Preocupada com economia                                  │
├─────────────────────────────────────────────────────────────┤
│ NECESSIDADES                                                │
│ ✓ Lista de desejos com links diretos                        │
│ ✓ Saber quanto sobra após gastos                           │
│ ✓ Categorias para gastos essenciais vs supérfluos           │
│ ✓ Interface simples e colorida                              │
├─────────────────────────────────────────────────────────────┤
│ FRUSTRAÇÕES COM APPS ATUAIS                                  │
│ ✗ Interface muito séria/escura                             │
│ ✗ Não tem lista de desejos                                 │
│ ✗ Promessas de gamificação que não funcionam               │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Jornada do Usuário (AS-IS)

### 4.1 Mapa de Jornada Atual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          JORNADA DO USUÁRIO                                  │
└─────────────────────────────────────────────────────────────────────────────┘

     DESCUBERTA          ADOÇÃO             USO DIÁRIO         RETENÇÃO
         │                  │                   │                  │
         ▼                  ▼                   ▼                  ▼
    ┌─────────┐        ┌─────────┐         ┌─────────┐        ┌─────────┐
    │Busca app│   ──▶  │Cadastro │   ──▶   │Registra │   ──▶  │Controle │
    │finanças │        │conta    │         │gastos   │        │mensal   │
    └─────────┘        └─────────┘         └─────────┘        └─────────┘
         │                  │                   │                  │
         │            ┌─────┴─────┐       ┌─────┴─────┐       ┌─────┴─────┐
         │            │Longo?     │       │Esquece?   │       │Abandona? │
         │            │Abandona   │       │Desiste    │       │Migrates │
         │            └───────────┘       └───────────┘       └───────────┘
         │
    Taxa: 60%          Taxa: 40%        Taxa: 30%           Taxa: 50%
    abandono           abandono          abandono            churn

    🎯 NOSSA META: Reduzir abandono em todas as etapas
```

### 4.2 Detalhamento das Etapas

#### Etapa 1: Descoberta
| Aspecto | Observação |
|---------|-----------|
| **Ação** | Usuário busca "controle de gastos" ou "finanças pessoais" |
| **Motivação** | Gastos descontrolados, fim do mês sem dinheiro |
| **Expectativa** | App gratuito, simples, rápido |
| **Ponto de Dor** | Muita opção no mercado, qual confiar? |
| **Oportunidade** | Mostrar diferenciais na store description |

#### Etapa 2: Adoção (Cadastro)
| Aspecto | Observação |
|---------|-----------|
| **Ação** | Criar conta com email/senha |
| **Motivação** | Começar a usar o app o quanto antes |
| **Expectativa** | Cadastro em < 2 minutos |
| **Ponto de Dor** | Formulários longos, email de confirmação |
| **Oportunidade** | Cadastro social (Google), onboarding guiado |

#### Etapa 3: Uso Diário
| Aspecto | Observação |
|---------|-----------|
| **Ação** | Adicionar despesas e receitas |
| **Motivação** | Manter controle financeiro |
| **Expectativa** | Adicionar em < 30 segundos |
| **Ponto de Dor** |流程 longo para adicionar transação |
| **Oportunidade** | Quick add, gestos rápidos, atalhos |

#### Etapa 4: Retenção
| Aspecto | Observação |
|---------|-----------|
| **Ação** | Consultar relatórios e estatísticas |
| **Motivação** | Saber se está no caminho certo |
| **Expectativa** | Insights claros e acionáveis |
| **Ponto de Dor** | Gráficos confusos, dados sem sentido |
| **Oportunidade** | Resumo semanal, alertas proativos |

---

## 5. Pontos de Dor Identificados

### 5.1 Prioridade Alta

| # | Ponto de Dor | Frequência | Impacto | Solução Proposta |
|---|--------------|------------|---------|-----------------|
| 1 | Cadastro muito longo | Alta | Alto | Social login, 3 campos |
| 2 | Adicionar transação é lento | Alta | Alto | Quick add com gestos |
| 3 | Não sabe quanto gastou sem calcular | Alta | Alto | Total sempre visível |
| 4 | Categoria não aparece na hora | Média | Alto | Inputs inteligentes |

### 5.2 Prioridade Média

| # | Ponto de Dor | Frequência | Impacto | Solução Proposta |
|---|--------------|------------|---------|-----------------|
| 5 | Interface poluída | Média | Médio | Design minimalista |
| 6 | Não lembra de registrar | Média | Médio | Lembretes, widget |
| 7 | Estatísticas confusas | Baixa | Médio | Simplificar gráficos |

### 5.3 Prioridade Baixa

| # | Ponto de Dor | Frequência | Impacto | Solução Proposta |
|---|--------------|------------|---------|-----------------|
| 8 | Não funciona offline | Baixa | Baixo | Para v2 |
| 9 | Sync entre dispositivos | Baixa | Baixo | Já funciona |

---

## 6. Hipóteses de Design

### 6.1 Hipóteses Principais

| # | Hipótese | Base | Prioridade |
|---|----------|------|------------|
| H1 | Quick add na tela principal reduz tempo de registro em 50% | Best practices | Must |
| H2 | Dashboard com resumo visual aumenta retenção | Dados usuário | Must |
| H3 | Onboarding de 3 telas aumenta conversão | A/B test | Should |
| H4 | Cores por categoria melhoram memorização | Neurociência | Could |

### 6.2 Validação

| Hipótese | Como Validar | Métrica de Sucesso |
|----------|--------------|-------------------|
| H1 | Teste de tempo com usuários | < 15 segundos para adicionar |
| H2 | Analytics de retorno | > 60% retornam em 7 dias |
| H3 | Funil de cadastro | > 70% completam |
| H4 | Teste A/B | Click em categorias aumenta? |

---

## 7. Requisitos de UX Priorizados

### 7.1 Funcionalidade

| # | Requisito | Justificativa | Prioridade |
|---|-----------|---------------|------------|
| R1 | Quick add na home | Reduzir tempo de registro | Must |
| R2 | Total sempre visível | Transparência do saldo | Must |
| R3 | Onboarding guiado | Reduzir abandono no cadastro | Should |
| R4 | Busca de categorias | Agilizar preenchimento | Should |
| R5 | Histórico recente | Ver últimos lançamentos | Could |

### 7.2 Informação

| # | Requisito | Justificativa | Prioridade |
|---|-----------|---------------|------------|
| I1 | Resumo do mês na home | Contexto imediato | Must |
| I2 | Breakdown por categoria | Detalhamento visual | Must |
| I3 | Tendência vs mês anterior | Referência comparativa | Should |
| I4 | Alertas de orçamento | Pro-atividade | Could |

### 7.3 Interação

| # | Requisito | Justificativa | Prioridade |
|---|-----------|---------------|------------|
| J1 | Swipe para ações | Gesto natural | Must |
| J2 | Pull to refresh | Padrão mobile | Must |
| J3 | FAB para adicionar | Acesso rápido | Must |
| J4 | Empty states úteis | Evitar frustração | Should |

---

## 8. Cenários de Uso

### 8.1 Cenário 1: Ana registra gasto no ônibus
```
Contexto: Ana está voltando do trabalho no ônibus
Ação: Abre app, toca em FAB, seleciona categoria, digita valor
Resultado esperado: Transação registrada em < 20 segundos
Tempo aceitável: < 30 segundos
```

### 8.2 Cenário 2: Carlos verifica saldo no desktop
```
Contexto: Carlos está no trabalho, tem 5 minutos
Ação: Abre browser, acessa app, visualiza dashboard
Resultado esperado: Vê resumo em < 10 segundos
Tempo aceitável: < 15 segundos
```

### 8.3 Cenário 3: Juliana planeja compra
```
Contexto: Juliana quer comprar um livro novo
Ação: Vai em wishlist, adiciona item com link, verifica preço
Resultado esperado: Item adicionado com link em < 30 segundos
Tempo aceitável: < 45 segundos
```

---

## 9. Métricas de UX

### 9.1 KPIs Principais

| Métrica | Baseline | Meta | Como Medir |
|---------|----------|------|------------|
| Tempo para primeira transação | 5 min | < 2 min | Analytics |
| Taxa de conclusão cadastro | 60% | > 80% | Funil |
| NPS (Net Promoter Score) | N/A | > 40 | Survey |
| Retenção D7 | 40% | > 60% | Analytics |
| Task Success Rate | N/A | > 90% | Usability test |

### 9.2 Métricas de Tarefa

| Tarefa | Métrica | Meta |
|--------|---------|------|
| Cadastro | Tempo | < 2 min |
| Adicionar despesa | Tempo | < 20 seg |
| Ver estatísticas | Tempo | < 5 seg |
| Criar categoria | Tempo | < 30 seg |
| Editar transação | Tempo | < 15 seg |

---

## 10. Conclusões e Recomendações

### 10.1 Conclusões

1. **O maior inimigo é a complexidade** - Usuários abandonam apps que exigem muito esforço
2. **Mobile first é mandatório** - 90% do uso será via smartphone
3. **Velocidade = sucesso** - Cada segundo economizado aumenta retenção
4. **Visual é tão importante quanto função** - Design profissional passa confiança

### 10.2 Recomendações Prioritárias

1. **Implementar FAB para quick add** - Reduz barreira de entrada
2. **Simplificar onboarding** - 3 telas máximo
3. **Dashboard minimalista** - Máximo 3 informações principais
4. **Feedback visual imediato** - Animação ao adicionar transação
5. **Testar com usuários reais** - Antes de desenvolver, validar protótipos

---

## 11. Próximos Passos

| Atividade | Responsável | Prazo |
|-----------|-------------|-------|
| Validar personas com stakeholders | Product Owner | Sprint 1 |
| Criar wireframes de alta fidelidade | UX Designer | Sprint 1 |
| Testar protótipos com 5 usuários | UX Designer | Sprint 2 |
| Iterar baseado em feedback | UX Designer | Sprint 2 |
| Documentar design system | UI Designer | Sprint 3 |

---

**Versão:** 1.0  
**Data:** 01/04/2026  
**Autor:** UX Designer
