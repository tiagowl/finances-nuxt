import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const categories = await prisma.category.findMany({
    where: { userId: user.userId },
    include: {
      monthlyExpenses: {
        select: { price: true }
      },
      occasionalExpenses: {
        select: { price: true }
      }
    },
    orderBy: { name: 'asc' }
  })

  return {
    categories: categories.map(cat => {
      const monthlyTotal = cat.monthlyExpenses.reduce((sum, e) => sum + e.price, 0)
      const occasionalTotal = cat.occasionalExpenses.reduce((sum, e) => sum + e.price, 0)
      return {
        id: cat.id,
        name: cat.name,
        budget: cat.budget,
        color: cat.color,
        icon: cat.icon,
        totalSpent: monthlyTotal + occasionalTotal,
        transactionCount: cat.monthlyExpenses.length + cat.occasionalExpenses.length,
        createdAt: cat.createdAt,
        updatedAt: cat.updatedAt
      }
    })
  }
})
