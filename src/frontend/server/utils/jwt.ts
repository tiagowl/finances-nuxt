import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

const config = useRuntimeConfig()

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export interface RefreshPayload {
  userId: string
  type: 'refresh'
  iat?: number
  exp?: number
}

export function signAccessToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn || '15m'
  })
}

export function signRefreshToken(payload: { userId: string }): string {
  return jwt.sign({ ...payload, type: 'refresh' }, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiresIn || '7d'
  })
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, config.jwtSecret) as JWTPayload
}

export function verifyRefreshToken(token: string): RefreshPayload {
  const decoded = jwt.verify(token, config.refreshTokenSecret) as RefreshPayload
  if (decoded.type !== 'refresh') {
    throw new Error('Invalid token type')
  }
  return decoded
}

export function getUserFromEvent(event: H3Event): JWTPayload | null {
  return event.context.user as JWTPayload | null
}

export function requireAuth(event: H3Event): JWTPayload {
  const user = getUserFromEvent(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  return user
}
