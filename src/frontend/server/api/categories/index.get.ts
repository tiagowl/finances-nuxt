import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const categories = await prisma.category.findMany({
    where: { userId: user.userId },
    include: {
      _count: {
        select: {
          monthlyExpenses: true,
          occasionalExpenses: true
        }
      }
    },
    orderBy: { name: 'asc' }
  })

  return {
    categories: categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      budget: cat.budget,
      color: cat.color,
      icon: cat.icon,
      transactionCount: cat._count.monthlyExpenses + cat._count.occasionalExpenses,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt
    }))
  }
})
