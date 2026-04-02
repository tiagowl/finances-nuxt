import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve ter pelo menos 1 letra maiúscula')
    .regex(/[0-9]/, 'Senha deve ter pelo menos 1 número'),
  name: z.string().optional()
})

export const loginSchema = z.object({
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
})

export const categorySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(50, 'Nome deve ter no máximo 50 caracteres'),
  budget: z.number().positive('Orçamento deve ser positivo').optional().nullable(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve ser um hex válido').optional().nullable(),
  icon: z.string().max(50).optional().nullable()
})

export const transactionSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  price: z.number().positive('Valor deve ser positivo'),
  day: z.number().int().min(1, 'Dia deve ser entre 1 e 31').max(31, 'Dia deve ser entre 1 e 31'),
  categoryId: z.string().min(1, 'Categoria é obrigatória')
})

export const occasionalTransactionSchema = transactionSchema.extend({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000).max(2100)
})

export const wishlistSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  price: z.number().positive('Valor deve ser positivo'),
  link: z.string().url('Link inválido').optional().nullable(),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  isPurchased: z.boolean().optional()
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type TransactionInput = z.infer<typeof transactionSchema>
export type OccasionalTransactionInput = z.infer<typeof occasionalTransactionSchema>
export type WishlistInput = z.infer<typeof wishlistSchema>
