import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'
import { categorySchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody(event)
  
  const result = categorySchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
    })
  }

  const { name, budget, color, icon } = result.data

  const existing = await prisma.category.findFirst({
    where: { userId: user.userId, name }
  })

  if (existing) {
    throw createError({
      statusCode: 400,
      message: 'Já existe uma categoria com este nome'
    })
  }

  const category = await prisma.category.create({
    data: {
      name,
      budget,
      color,
      icon,
      userId: user.userId
    }
  })

  return { category }
})
