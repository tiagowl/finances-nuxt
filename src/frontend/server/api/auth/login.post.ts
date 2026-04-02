import prisma from '~/server/utils/prisma'
import { comparePassword } from '~/server/utils/password'
import { signAccessToken, signRefreshToken } from '~/server/utils/jwt'
import { loginSchema } from '~/server/utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: 'Dados inválidos',
        data: result.error.flatten()
      })
    }

    const { email, password } = result.data

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Email ou senha incorretos'
      })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      throw createError({
        statusCode: 401,
        message: 'Email ou senha incorretos'
      })
    }

    const accessToken = signAccessToken({ userId: user.id, email: user.email })
    const refreshToken = signRefreshToken({ userId: user.id })

    setCookie(event, 'auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 15
    })

    setCookie(event, 'refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token: accessToken
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      message: 'Erro interno do servidor'
    })
  }
})
