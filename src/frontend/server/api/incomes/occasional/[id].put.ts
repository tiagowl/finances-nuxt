import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'
import { occasionalIncomeSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const result = occasionalIncomeSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
    })
  }

  const existing = await prisma.occasionalIncome.findFirst({
    where: { id, userId: user.userId }
  })

  if (!existing) {
    throw createError({
      statusCode: 404,
      message: 'Receita não encontrada'
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

  const income = await prisma.occasionalIncome.update({
    where: { id },
    data: {
      name,
      price,
      day,
      month,
      year,
      categoryId: categoryId || null
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
