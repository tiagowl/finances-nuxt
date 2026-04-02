export interface User {
  id: string
  email: string
  name?: string | null
}

export interface Category {
  id: string
  name: string
  budget: number | null
  color: string | null
  icon: string | null
  transactionCount?: number
  totalSpent?: number
  percentage?: number | null
  isOverBudget?: boolean
  createdAt: string
  updatedAt: string
}

export interface MonthlyExpense {
  id: string
  name: string
  price: number
  day: number
  categoryId: string
  userId: string
  category: Pick<Category, 'id' | 'name' | 'color' | 'icon'>
  createdAt: string
  updatedAt: string
}

export interface OccasionalExpense extends Omit<MonthlyExpense, 'day'> {
  day: number
  month: number
  year: number
}

export interface MonthlyIncome extends MonthlyExpense {}

export interface OccasionalIncome extends OccasionalExpense {}

export interface WishlistItem {
  id: string
  name: string
  price: number
  link: string | null
  isPurchased: boolean
  categoryId: string
  userId: string
  category: Pick<Category, 'id' | 'name' | 'color' | 'icon'>
  createdAt: string
  updatedAt: string
}

export interface Summary {
  totalIncome: number
  totalExpenses: number
  balance: number
  monthlyIncomes: number
  occasionalIncomes: number
  monthlyExpenses: number
  occasionalExpenses: number
  month: number
  year: number
}

export interface ApiResponse<T> {
  data?: T
  error?: string
}
