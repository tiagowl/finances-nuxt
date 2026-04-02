import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'
import { occasionalExpenseSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const result = occasionalExpenseSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
    })
  }

  const existing = await prisma.occasionalExpense.findFirst({
    where: { id, userId: user.userId }
  })

  if (!existing) {
    throw createError({
      statusCode: 404,
      message: 'Despesa não encontrada'
    })
  }

  const { name, price, day, month, year, categoryId } = result.data

  const category = await prisma.category.findFirst({
    where: { id: categoryId, userId: user.userId }
  })

  if (!category) {
    throw createError({
      statusCode: 400,
      message: 'Categoria não encontrada'
    })
  }

  const expense = await prisma.occasionalExpense.update({
    where: { id },
    data: {
      name,
      price,
      day,
      month,
      year,
      categoryId
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
    }
  })

  return { expense }
})
