import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'
import { categorySchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const result = categorySchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: 'Dados inválidos',
      data: result.error.flatten()
    })
  }

  const existing = await prisma.category.findFirst({
    where: { 
      id,
      userId: user.userId 
    }
  })

  if (!existing) {
    throw createError({
      statusCode: 404,
      message: 'Categoria não encontrada'
    })
  }

  if (result.data.name !== existing.name) {
    const duplicate = await prisma.category.findFirst({
      where: { 
        userId: user.userId, 
        name: result.data.name,
        id: { not: id }
      }
    })

    if (duplicate) {
      throw createError({
        statusCode: 400,
        message: 'Já existe uma categoria com este nome'
      })
    }
  }

  const category = await prisma.category.update({
    where: { id },
    data: result.data
  })

  return { category }
})
