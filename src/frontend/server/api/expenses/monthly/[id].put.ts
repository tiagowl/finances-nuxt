import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'
import { transactionSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const result = transactionSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
    })
  }

  const existing = await prisma.monthlyExpense.findFirst({
    where: { id, userId: user.userId }
  })

  if (!existing) {
    throw createError({
      statusCode: 404,
      message: 'Despesa não encontrada'
    })
  }

  const category = await prisma.category.findFirst({
    where: { id: result.data.categoryId, userId: user.userId }
  })

  if (!category) {
    throw createError({
      statusCode: 400,
      message: 'Categoria não encontrada'
    })
  }

  const expense = await prisma.monthlyExpense.update({
    where: { id },
    data: result.data,
    include: {
      category: {
        select: {
          id: true,
          name: true,
          color: true,
          icon: true
        }
      }
    }
  })

  return { expense }
})
