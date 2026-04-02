import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const query = getQuery(event)
  
  const month = query.month ? Number(query.month) : new Date().getMonth() + 1
  const year = query.year ? Number(query.year) : new Date().getFullYear()

  const categories = await prisma.category.findMany({
    where: { userId: user.userId },
    include: {
      monthlyExpenses: true,
      occasionalExpenses: {
        where: { month, year }
      }
    }
  })

  const categoriesWithTotals = categories.map(category => {
    const monthlyTotal = category.monthlyExpenses.reduce((sum, e) => sum + e.price, 0)
    const occasionalTotal = category.occasionalExpenses.reduce((sum, e) => sum + e.price, 0)
    const totalSpent = monthlyTotal + occasionalTotal
    
    const percentage = category.budget ? (totalSpent / category.budget) * 100 : null
    const isOverBudget = category.budget ? totalSpent > category.budget : false

    return {
      id: category.id,
      name: category.name,
      color: category.color,
      icon: category.icon,
      budget: category.budget,
      totalSpent,
      percentage,
      isOverBudget,
      transactions: {
        monthly: monthlyTotal,
        occasional: occasionalTotal
      }
    }
  })

  return {
    categories: categoriesWithTotals.sort((a, b) => b.totalSpent - a.totalSpent)
  }
})
