import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')

  const existing = await prisma.occasionalIncome.findFirst({
    where: { id, userId: user.userId }
  })

  if (!existing) {
    throw createError({
      statusCode: 404,
      message: 'Receita não encontrada'
    })
  }

  await prisma.occasionalIncome.delete({
    where: { id }
  })

  return { success: true }
})
