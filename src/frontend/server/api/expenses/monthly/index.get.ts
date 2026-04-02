import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const expenses = await prisma.monthlyExpense.findMany({
    where: { userId: user.userId },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          color: true,
          icon: true
        }
      }
    },
    orderBy: { day: 'asc' }
  })

  const total = expenses.reduce((sum, e) => sum + e.price, 0)

  return {
    expenses,
    total
  }
})
