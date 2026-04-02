import prisma from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true
    }
  })

  if (!dbUser) {
    throw createError({
      statusCode: 404,
      message: 'Usuário não encontrado'
    })
  }

  return { user: dbUser }
})
