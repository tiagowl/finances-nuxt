import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'
import { transactionSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody(event)
  
  const result = transactionSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
    })
  }

  const { name, price, day, categoryId } = result.data

  const category = await prisma.category.findFirst({
    where: { id: categoryId, userId: user.userId }
  })

  if (!category) {
    throw createError({
      statusCode: 400,
      message: 'Categoria não encontrada'
    })
  }

  const income = await prisma.monthlyIncome.create({
    data: {
      name,
      price,
      day,
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

  return { income }
})
