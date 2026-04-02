# Critérios de Aceitação - Sistema de Finanças Pessoais

## 1. Autenticação

### US-001: Cadastro de Usuário

**Cenário:** Cadastro com dados válidos
```
Dado que estou na página de cadastro
Quando preencho email "ana@email.com", senha "minhasenha123" e confirmo "minhasenha123"
E clico em "Cadastrar"
Então sou redirecionado para o dashboard
E uma mensagem de sucesso é exibida
E estou automaticamente logado
```

**Cenário:** Email já cadastrado
```
Dado que estou na página de cadastro
E já existe um usuário com email "ana@email.com"
Quando preencho email "ana@email.com" e senha válida
E clico em "Cadastrar"
Então uma mensagem de erro é exibida: "Email já cadastrado"
E permanecem na página de cadastro
E senha não é exibida em texto plano
```

**Cenário:** Email inválido
```
Dado que estou na página de cadastro
Quando preencho email "ana-email-invalido" e senha válida
Então o campo email exibe erro de validação
E botão de cadastro permanece desabilitado
```

**Cenário:** Senha muito curta
```
Dado que estou na página de cadastro
Quando preencho senha "1234567" (menos de 8 caracteres)
Então o campo senha exibe erro: "Mínimo 8 caracteres"
E botão de cadastro permanece desabilitado
```

**Cenário:** Senhas não conferem
```
Dado que estou na página de cadastro
Quando preencho senha "senha123" e confirmação "senha456"
Então o campo confirmação exibe erro: "Senhas não conferem"
E botão de cadastro permanece desabilitado
```

---

### US-002: Login de Usuário

**Cenário:** Login com credenciais corretas
```
Dado que estou cadastrado com email "ana@email.com" e senha "minhasenha123"
E estou na página de login
Quando preencho email "ana@email.com" e senha "minhasenha123"
E clico em "Entrar"
Então sou redirecionado para o dashboard
E uma mensagem de boas-vindas é exibida com meu nome/email
```

**Cenário:** Login com senha incorreta
```
Dado que estou cadastrado com email "ana@email.com" e senha "minhasenha123"
E estou na página de login
Quando preencho email "ana@email.com" e senha "senhaerrada"
E clico em "Entrar"
Então uma mensagem de erro é exibida: "Email ou senha incorretos"
E permanenho na página de login
E campos são limpos por segurança
```

**Cenário:** Login com email não cadastrado
```
Dado que não existe usuário com email "naoexiste@email.com"
E estou na página de login
Quando preencho email "naoexiste@email.com" e senha "qualquer123"
E clico em "Entrar"
Então uma mensagem de erro é exibida: "Email ou senha incorretos"
```

**Cenário:** Sessão persiste após recarga
```
Dado que fiz login com sucesso
Quando recarrego a página
Então permaneço logado
E sou redirecionado para o dashboard
```

---

## 2. Categorias

### US-003: Criar Categoria

**Cenário:** Criação bem-sucedida
```
Dado que estou autenticado
E estou na página de categorias
Quando preencho nome "Alimentação" e orçamento máximo "R$ 500,00"
E clico em "Salvar"
Então a categoria aparece na listagem
E uma mensagem de sucesso é exibida
```

**Cenário:** Nome duplicado
```
Dado que existe categoria "Alimentação" para meu usuário
E estou na página de categorias
Quando tento criar categoria com nome "Alimentação"
Então uma mensagem de erro é exibida: "Já existe uma categoria com este nome"
E a categoria não é duplicada
```

**Cenário:** Nome muito curto
```
Dado que estou autenticado
E estou na página de categorias
Quando preencho nome "Al" (menos de 3 caracteres)
Então o campo exibe erro: "Mínimo 3 caracteres"
```

**Cenário:** Orçamento negativo
```
Dado que estou autenticado
Quando preencho orçamento "-100"
Então o campo exibe erro: "Valor deve ser positivo"
```

---

### US-005: Excluir Categoria

**Cenário:** Exclusão com confirmação
```
Dado que existe categoria "Lazer" com transações vinculadas
E estou na página de categorias
Quando clico em "Excluir" na categoria "Lazer"
E confirmo a exclusão no modal
Então a categoria é removida
E transações vinculadas têm categoria setada como null
E uma mensagem de sucesso é exibida
```

**Cenário:** Exclusão cancelada
```
Dado que existe categoria "Lazer"
E estou na página de categorias
Quando clico em "Excluir" na categoria "Lazer"
E clico em "Cancelar" no modal
Então a categoria permanece
E modal é fechado
```

---

## 3. Despesas Mensais

### US-007: Cadastrar Despesa Mensal

**Cenário:** Cadastro completo
```
Dado que tenho categorias cadastradas
E estou na página de despesas mensais
Quando preencho nome "Netflix", preço "R$ 55,90", dia "5", categoria "Entretenimento"
E clico em "Salvar"
Então a despesa aparece na listagem
E o total é atualizado automaticamente
```

**Cenário:** Campo obrigatório não preenchido
```
Dado que estou na página de despesas mensais
Quando deixo o campo nome vazio
E clico em "Salvar"
Então uma mensagem de erro indica campos obrigatórios
E a despesa não é salva
```

**Cenário:** Preço inválido
```
Dado que estou na página de despesas mensais
Quando preencho preço "0" ou "-10"
Então o campo exibe erro: "Valor deve ser maior que zero"
```

**Cenário:** Dia inválido
```
Dado que estou na página de despesas mensais
Quando preencho dia "32" ou "0"
Então o campo exibe erro: "Dia deve estar entre 1 e 31"
```

**Cenário:** Sem categorias cadastradas
```
Dado que não tenho categorias cadastradas
E estou na página de despesas mensais
Quando clico em "Nova Despesa"
Então uma mensagem 안내 indica cadastrar categorias primeiro
E o formulário não é aberto
```

---

### US-011: Total de Despesas Mensais

**Cenário:** Cálculo correto
```
Dado que tenho despesas mensais:
- "Aluguel" R$ 1.500,00
- "Internet" R$ 100,00
- "Streaming" R$ 80,00
E estou na página de despesas mensais
Então o total exibido é "R$ 1.680,00"
```

**Cenário:** Atualização em tempo real
```
Dado que tenho despesas mensais totalizando R$ 1.000,00
E estou na página de despesas mensais
Quando adiciono despesa "Academia" R$ 150,00
Então o total atualiza para "R$ 1.150,00" imediatamente
Sem necessidade de recarregar a página
```

**Cenário:** Total zerado
```
Dado que não tenho despesas mensais cadastradas
E estou na página de despesas mensais
Então o total exibido é "R$ 0,00"
```

---

## 4. Despesas Avulsas

### US-012: Cadastrar Despesa Avulsa

**Cenário:** Cadastro de despesa do dia
```
Dado que tenho categorias cadastradas
E estou na página de despesas avulsas
Quando preencho nome "Almoço", preço "R$ 25,00", dia "15", categoria "Alimentação"
E clico em "Salvar"
Então a despesa aparece na listagem
```

**Cenário:** Validação de link da categoria
```
Dado que estou na página de despesas avulsas
Quando seleciono categoria "Alimentação"
Então o dropdown mostra apenas categorias do meu usuário
```

---

## 5. Receitas

### US-016: Cadastrar Receita Mensal

**Cenário:** Cadastro completo
```
Dado que tenho categorias de receita cadastradas
E estou na página de receitas mensais
Quando preencho nome "Salário", preço "R$ 5.000,00", dia "5", categoria "Trabalho"
E clico em "Salvar"
Então a receita aparece na listagem
E o total de receitas é atualizado
```

---

### US-020: Total de Receitas Mensais

**Cenário:** Cálculo correto
```
Dado que tenho receitas mensais:
- "Salário" R$ 5.000,00
- "Freelance" R$ 1.000,00
E estou na página de receitas mensais
Então o total exibido é "R$ 6.000,00"
```

---

## 6. Lista de Desejos

### US-025: Adicionar Item

**Cenário:** Item com link válido
```
Dado que estou autenticado
E tenho categorias cadastradas
E estou na página de lista de desejos
Quando preencho nome "Tênis", categoria "Esportes", preço "R$ 299,90", link "https://loja.com/tenis"
E clico em "Salvar"
Então o item aparece na listagem
E o link é clicável
```

**Cenário:** Item sem link
```
Dado que estou autenticado
E estou na página de lista de desejos
Quando preencho nome "Livro", categoria "Educação", preço "R$ 49,90"
E deixo o campo link vazio
E clico em "Salvar"
Então o item é salvo normalmente
E o campo link aparece como "Sem link"
```

**Cenário:** Link inválido
```
Dado que estou autenticado
E estou na página de lista de desejos
Quando preencho link "não é uma url"
Então o campo exibe erro: "URL inválida"
```

---

## 7. Estatísticas

### US-029: Total de Gastos por Categoria

**Cenário:** Exibição correta
```
Dado que tenho gastos nas categorias:
- "Alimentação": R$ 800,00 (orçamento R$ 1.000,00)
- "Transporte": R$ 400,00 (orçamento R$ 300,00)
E estou na página de categorias
Então vejo:
- "Alimentação": R$ 800,00 (80% do orçamento) - OK
- "Transporte": R$ 400,00 (133% do orçamento) - Alerta visual
```

**Cenário:** Categoria estourou orçamento
```
Dado que categoria "Lazer" tem orçamento R$ 200,00
E tenho R$ 250,00 em despesas na categoria
Quando acesso a página de categorias
Então vejo alerta visual (vermelho/amarelo)
E mensagem indicando que orçamento foi ultrapassado
```

**Cenário:** Cálculo inclui todas as despesas
```
Dado que categoria "Alimentação" tem:
- Despesa mensal "Mercado": R$ 500,00
- Despesa avulsa "Farmácia": R$ 50,00
E estou na página de categorias
Então o total para "Alimentação" é R$ 550,00
```

---

## 8. Interface

### US-030: Interface Mobile Responsiva

**Cenário:** Layout em mobile
```
Dado que acesso o sistema em um dispositivo mobile (375px)
Quando o sistema carrega
Então todos os elementos são visíveis
E botões têm tamanho mínimo de toque 44x44px
E texto é legível sem zoom
```

**Cenário:** Navegação mobile
```
Dado que estou em mobile
Quando clico no menu hamburger
Então o menu abre em tela cheia
E posso navegar entre páginas
```

**Cenário:** Formulários mobile
```
Dado que estou em mobile
Quando preencho um formulário
Então o teclado não cobre o campo ativo
E o botão de submit está visível após scroll
```

---

### US-031: Interface Desktop Adaptada

**Cenário:** Layout em desktop
```
Dado que acesso o sistema em desktop (1280px+)
Quando o sistema carrega
Então o conteúdo está centralizado
E há espaçamento adequado nas laterais
E elementos não estão esticados excessivamente
```

**Cenário:** Hover states
```
Dado que estou em desktop
Quando passo o mouse sobre um botão
Então há feedback visual (hover)
```

---

## 9. Casos Extremos (Edge Cases)

### Validações Genéricas

| Cenário | Comportamento Esperado |
|---------|------------------------|
| Nome com caracteres especiais | Aceitar (ex: "Café & Lanches") |
| Preço com vírgula | Converter automaticamente para ponto |
| Preço com R$ | Remover R$ e processar valor |
| Dia 31 em mês de 30 dias | Aceitar, será dia inválido em alguns meses |
| Campos com apenas espaços | Rejeitar como vazio |
| Sessão expirada | Redirecionar para login |
| Duplo clique no botão | Processar apenas uma vez |
| Dados corrompidos no banco | Exibir erro genérico, não detalhes |

---

## 10. Checklist de Testes de Aceitação

### Autenticação
- [ ] Cadastro com dados válidos funciona
- [ ] Cadastro com email duplicado exibe erro
- [ ] Login com credenciais corretas funciona
- [ ] Login com credenciais incorretas exibe erro
- [ ] Sessão persiste após recarga
- [ ] Logout funciona corretamente

### Categorias
- [ ] CRUD completo funciona
- [ ] Nome duplicado é rejeitado
- [ ] Exclusão remove categoria mas mantém transações
- [ ] Listagem mostra todas as categorias do usuário

### Transações
- [ ] CRUD de despesas mensais funciona
- [ ] CRUD de despesas avulsas funciona
- [ ] CRUD de receitas mensais funciona
- [ ] CRUD de receitas avulsas funciona
- [ ] Total é calculado corretamente
- [ ] Total atualiza em tempo real

### Lista de Desejos
- [ ] CRUD de itens funciona
- [ ] Links são clicáveis e abrem em nova aba
- [ ] Links inválidos são validados

### Estatísticas
- [ ] Total por categoria está correto
- [ ] Percentual de orçamento é calculado
- [ ] Alerta visual para orçamento estourado

### Interface
- [ ] Mobile responsive funciona
- [ ] Desktop adaptado funciona
- [ ] Navegação é intuitiva
- [ ] Mensagens de erro são claras
