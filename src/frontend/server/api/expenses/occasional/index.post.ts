import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'
import { occasionalExpenseSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody(event)
  
  const result = occasionalExpenseSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
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

  const expense = await prisma.occasionalExpense.create({
    data: {
      name,
      price,
      day,
      month,
      year,
      categoryId,
      userId: user.userId
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
