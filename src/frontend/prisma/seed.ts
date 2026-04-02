import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  console.log('========================================')
  console.log('  SEED - Finances Nuxt')
  console.log('========================================\n')

  const email = process.env.TEST_USER_EMAIL || 'teste@finances.com'
  const password = process.env.TEST_USER_PASSWORD || 'Teste123'
  const name = process.env.TEST_USER_NAME || 'Usuario Teste'

  console.log(`Email: ${email}`)
  console.log(`Senha: ${password}`)
  console.log(`Nome: ${name}\n`)

  console.log('Gerando hash da senha...')
  const hashedPassword = await bcrypt.hash(password, 12)
  console.log(`Hash: ${hashedPassword.substring(0, 30)}...\n`)

  console.log('Limpando dados existentes...')
  await prisma.wishlistItem.deleteMany({ where: { user: { email } } })
  await prisma.occasionalIncome.deleteMany({ where: { user: { email } } })
  await prisma.monthlyIncome.deleteMany({ where: { user: { email } } })
  await prisma.occasionalExpense.deleteMany({ where: { user: { email } } })
  await prisma.monthlyExpense.deleteMany({ where: { user: { email } } })
  await prisma.category.deleteMany({ where: { user: { email } } })
  await prisma.user.deleteMany({ where: { email } })
  console.log('Dados antigos removidos.\n')

  console.log('Criando usuario...')
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })
  console.log(`Usuario criado com ID: ${user.id}\n`)

  console.log('Criando categorias...')
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Alimentacao', budget: 1000, color: '#F59E0B', icon: '🍔', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Transporte', budget: 500, color: '#3B82F6', icon: '🚗', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Moradia', budget: 2000, color: '#14B8A6', icon: '🏠', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Saude', budget: 300, color: '#10B981', icon: '💊', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Educacao', budget: 200, color: '#8B5CF6', icon: '📚', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Lazer', budget: 300, color: '#EC4899', icon: '🎮', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Contas', budget: 400, color: '#6B7280', icon: '📄', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Tecnologia', budget: 200, color: '#F97316', icon: '📱', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Salario', budget: null, color: '#10B981', icon: '💰', userId: user.id }
    }),
    prisma.category.create({
      data: { name: 'Freelance', budget: null, color: '#6366F1', icon: '💻', userId: user.id }
    })
  ])
  console.log(`${categories.length} categorias criadas.\n`)

  const [
    catAlimentacao,
    catTransporte,
    catMoradia,
    catSaude,
    catEducacao,
    catLazer,
    catContas,
    catTecnologia,
    catSalario,
    catFreelance
  ] = categories

  console.log('Criando despesas mensais...')
  await Promise.all([
    prisma.monthlyExpense.create({ data: { name: 'Aluguel', price: 1500, day: 5, categoryId: catMoradia.id, userId: user.id } }),
    prisma.monthlyExpense.create({ data: { name: 'Internet', price: 99.90, day: 10, categoryId: catContas.id, userId: user.id } }),
    prisma.monthlyExpense.create({ data: { name: 'Netflix', price: 55.90, day: 15, categoryId: catLazer.id, userId: user.id } }),
    prisma.monthlyExpense.create({ data: { name: 'Spotify', price: 21.90, day: 20, categoryId: catLazer.id, userId: user.id } }),
    prisma.monthlyExpense.create({ data: { name: 'Academia', price: 99.90, day: 1, categoryId: catSaude.id, userId: user.id } }),
    prisma.monthlyExpense.create({ data: { name: 'Plano de Saude', price: 350, day: 25, categoryId: catSaude.id, userId: user.id } }),
    prisma.monthlyExpense.create({ data: { name: 'Celular', price: 149.90, day: 12, categoryId: catTecnologia.id, userId: user.id } }),
    prisma.monthlyExpense.create({ data: { name: 'Universidade', price: 150, day: 30, categoryId: catEducacao.id, userId: user.id } })
  ])

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  console.log('Criando despesas avulsas...')
  await Promise.all([
    prisma.occasionalExpense.create({ data: { name: 'Supermercado', price: 450, day: 5, month: currentMonth, year: currentYear, categoryId: catAlimentacao.id, userId: user.id } }),
    prisma.occasionalExpense.create({ data: { name: 'Restaurante', price: 85, day: 10, month: currentMonth, year: currentYear, categoryId: catAlimentacao.id, userId: user.id } }),
    prisma.occasionalExpense.create({ data: { name: 'Uber', price: 120, day: 15, month: currentMonth, year: currentYear, categoryId: catTransporte.id, userId: user.id } }),
    prisma.occasionalExpense.create({ data: { name: 'Farmacia', price: 75.50, day: 20, month: currentMonth, year: currentYear, categoryId: catSaude.id, userId: user.id } }),
    prisma.occasionalExpense.create({ data: { name: 'Cinema', price: 60, day: 22, month: currentMonth, year: currentYear, categoryId: catLazer.id, userId: user.id } }),
    prisma.occasionalExpense.create({ data: { name: 'Conta de Luz', price: 180, day: 8, month: currentMonth, year: currentYear, categoryId: catContas.id, userId: user.id } }),
    prisma.occasionalExpense.create({ data: { name: 'Conta de Agua', price: 80, day: 12, month: currentMonth, year: currentYear, categoryId: catContas.id, userId: user.id } })
  ])

  console.log('Criando receitas mensais...')
  await Promise.all([
    prisma.monthlyIncome.create({ data: { name: 'Salario', price: 5500, day: 5, categoryId: catSalario.id, userId: user.id } }),
    prisma.monthlyIncome.create({ data: { name: 'Vale Refeicao', price: 400, day: 20, categoryId: catAlimentacao.id, userId: user.id } }),
    prisma.monthlyIncome.create({ data: { name: 'Vale Transporte', price: 200, day: 20, categoryId: catTransporte.id, userId: user.id } })
  ])

  console.log('Criando receitas avulsas...')
  await Promise.all([
    prisma.occasionalIncome.create({ data: { name: 'Freelance Website', price: 1500, day: 15, month: currentMonth, year: currentYear, categoryId: catFreelance.id, userId: user.id } }),
    prisma.occasionalIncome.create({ data: { name: 'Venda de Livro', price: 45, day: 20, month: currentMonth, year: currentYear, categoryId: catEducacao.id, userId: user.id } })
  ])

  console.log('Criando lista de desejos...')
  await Promise.all([
    prisma.wishlistItem.create({ data: { name: 'Tenis Nike Air Max', price: 450, link: 'https://www.nike.com.br', categoryId: catLazer.id, userId: user.id } }),
    prisma.wishlistItem.create({ data: { name: 'Kindle Paperwhite', price: 599, link: 'https://www.amazon.com.br', categoryId: catEducacao.id, userId: user.id } }),
    prisma.wishlistItem.create({ data: { name: 'Fone AirPods Pro', price: 1200, link: 'https://www.apple.com', categoryId: catTecnologia.id, userId: user.id } }),
    prisma.wishlistItem.create({ data: { name: 'Monitor LG 27"', price: 1800, categoryId: catTecnologia.id, userId: user.id } }),
    prisma.wishlistItem.create({ data: { name: 'Camisa Flamengo', price: 149.90, link: 'https://www.netshoes.com.br', isPurchased: true, categoryId: catLazer.id, userId: user.id } })
  ])

  console.log('\n========================================')
  console.log('  SEED CONCLUIDO COM SUCESSO!')
  console.log('========================================\n')
  console.log('Credenciais de login:')
  console.log(`  Email: ${email}`)
  console.log(`  Senha: ${password}\n`)
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
