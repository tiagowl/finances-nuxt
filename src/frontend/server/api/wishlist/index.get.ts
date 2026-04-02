import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const items = await prisma.wishlistItem.findMany({
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
    orderBy: { createdAt: 'desc' }
  })

  const total = items.filter(i => !i.isPurchased).reduce((sum, i) => sum + i.price, 0)

  return {
    items,
    total
  }
})
