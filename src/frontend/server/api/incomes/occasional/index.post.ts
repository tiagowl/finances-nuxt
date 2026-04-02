import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'
import { occasionalIncomeSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody(event)
  
  const result = occasionalIncomeSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
    })
  }

  const { name, price, day, month, year, categoryId } = result.data

  if (categoryId) {
    const category = await prisma.category.findFirst({
      where: { id: categoryId, userId: user.userId }
    })

    if (!category) {
      throw createError({
        statusCode: 400,
        message: 'Categoria não encontrada'
      })
    }
  }

  const income = await prisma.occasionalIncome.create({
    data: {
      name,
      price,
      day,
      month,
      year,
      categoryId: categoryId || null,
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

  return { income }
})
