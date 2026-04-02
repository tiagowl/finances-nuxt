import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const incomes = await prisma.monthlyIncome.findMany({
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

  const total = incomes.reduce((sum, i) => sum + i.price, 0)

  return {
    incomes,
    total
  }
})
