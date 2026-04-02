import { z } from 'zod'

export function useValidation() {
  const registerSchema = z.object({
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Senha deve ter pelo menos 1 letra maiúscula')
      .regex(/[0-9]/, 'Senha deve ter pelo menos 1 número'),
    name: z.string().optional()
  })

  const loginSchema = z.object({
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z.string().min(1, 'Senha é obrigatória')
  })

  const categorySchema = z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(50),
    budget: z.number().positive().optional().nullable(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional().nullable(),
    icon: z.string().max(50).optional().nullable()
  })

  const transactionSchema = z.object({
    name: z.string().min(3, 'Nome é obrigatório').max(100),
    price: z.number().positive('Valor deve ser positivo'),
    day: z.number().int().min(1).max(31),
    categoryId: z.string().min(1, 'Categoria é obrigatória')
  })

  const occasionalTransactionSchema = transactionSchema.extend({
    month: z.number().int().min(1).max(12),
    year: z.number().int().min(2000).max(2100)
  })

  const wishlistSchema = z.object({
    name: z.string().min(3, 'Nome é obrigatório').max(100),
    price: z.number().positive('Valor deve ser positivo'),
    link: z.string().url('Link inválido').optional().nullable(),
    categoryId: z.string().min(1, 'Categoria é obrigatória'),
    isPurchased: z.boolean().optional()
  })

  function validate<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: Record<string, string> } {
    const result = schema.safeParse(data)
    
    if (result.success) {
      return { success: true, data: result.data }
    }

    const errors: Record<string, string> = {}
    result.error.errors.forEach(err => {
      const path = err.path.join('.')
      errors[path] = err.message
    })

    return { success: false, errors }
  }

  return {
    registerSchema,
    loginSchema,
    categorySchema,
    transactionSchema,
    occasionalTransactionSchema,
    wishlistSchema,
    validate
  }
}
