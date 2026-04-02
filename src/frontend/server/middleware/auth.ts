import { verifyAccessToken, type JWTPayload } from '../utils/jwt'

export default defineEventHandler(async (event) => {
  const publicPaths = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/health'
  ]

  const path = event.path
  
  if (publicPaths.some(p => path.startsWith(p))) {
    return
  }

  if (!path.startsWith('/api/')) {
    return
  }

  const token = getCookie(event, 'auth_token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  try {
    const decoded = verifyAccessToken(token)
    event.context.user = decoded as JWTPayload
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token'
    })
  }
})
