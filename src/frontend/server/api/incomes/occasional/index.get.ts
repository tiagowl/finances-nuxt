import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const query = getQuery(event)
  
  const month = query.month ? Number(query.month) : new Date().getMonth() + 1
  const year = query.year ? Number(query.year) : new Date().getFullYear()

  const incomes = await prisma.occasionalIncome.findMany({
    where: { 
      userId: user.userId,
      month,
      year
    },
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
    orderBy: { day: 'desc' }
  })

  const total = incomes.reduce((sum, i) => sum + i.price, 0)

  return {
    incomes,
    total,
    month,
    year
  }
})
