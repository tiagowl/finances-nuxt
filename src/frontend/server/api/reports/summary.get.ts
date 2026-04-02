import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const query = getQuery(event)
  
  const month = query.month ? Number(query.month) : new Date().getMonth() + 1
  const year = query.year ? Number(query.year) : new Date().getFullYear()

  const [monthlyIncomes, occasionalIncomes, monthlyExpenses, occasionalExpenses] = await Promise.all([
    prisma.monthlyIncome.findMany({
      where: { userId: user.userId },
      select: { price: true }
    }),
    prisma.occasionalIncome.findMany({
      where: { userId: user.userId, month, year },
      select: { price: true }
    }),
    prisma.monthlyExpense.findMany({
      where: { userId: user.userId },
      select: { price: true }
    }),
    prisma.occasionalExpense.findMany({
      where: { userId: user.userId, month, year },
      select: { price: true }
    })
  ])

  const monthlyIncomesTotal = monthlyIncomes.reduce((sum, i) => sum + i.price, 0)
  const occasionalIncomesTotal = occasionalIncomes.reduce((sum, i) => sum + i.price, 0)
  const monthlyExpensesTotal = monthlyExpenses.reduce((sum, e) => sum + e.price, 0)
  const occasionalExpensesTotal = occasionalExpenses.reduce((sum, e) => sum + e.price, 0)

  const totalIncome = monthlyIncomesTotal + occasionalIncomesTotal
  const totalExpenses = monthlyExpensesTotal + occasionalExpensesTotal
  const balance = totalIncome - totalExpenses

  return {
    summary: {
      totalIncome,
      totalExpenses,
      balance,
      monthlyIncomes: monthlyIncomesTotal,
      occasionalIncomes: occasionalIncomesTotal,
      monthlyExpenses: monthlyExpensesTotal,
      occasionalExpenses: occasionalExpensesTotal,
      month,
      year
    }
  }
})
