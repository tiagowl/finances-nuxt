import { defineStore } from 'pinia'
import type { MonthlyExpense, OccasionalExpense, MonthlyIncome, OccasionalIncome, Summary } from '~/types'

interface TransactionsState {
  monthlyExpenses: MonthlyExpense[]
  occasionalExpenses: OccasionalExpense[]
  monthlyIncomes: MonthlyIncome[]
  occasionalIncomes: OccasionalIncome[]
  summary: Summary | null
  loading: boolean
  error: string | null
}

export const useTransactionsStore = defineStore('transactions', {
  state: (): TransactionsState => ({
    monthlyExpenses: [],
    occasionalExpenses: [],
    monthlyIncomes: [],
    occasionalIncomes: [],
    summary: null,
    loading: false,
    error: null
  }),

  getters: {
    totalMonthlyExpenses: (state) => 
      state.monthlyExpenses.reduce((sum, e) => sum + e.price, 0),
    totalOccasionalExpenses: (state) => 
      state.occasionalExpenses.reduce((sum, e) => sum + e.price, 0),
    totalMonthlyIncomes: (state) => 
      state.monthlyIncomes.reduce((sum, i) => sum + i.price, 0),
    totalOccasionalIncomes: (state) => 
      state.occasionalIncomes.reduce((sum, i) => sum + i.price, 0),
    totalExpenses: (state) => {
      const monthly = state.monthlyExpenses.reduce((sum, e) => sum + e.price, 0)
      const occasional = state.occasionalExpenses.reduce((sum, e) => sum + e.price, 0)
      return monthly + occasional
    },
    totalIncomes: (state) => {
      const monthly = state.monthlyIncomes.reduce((sum, i) => sum + i.price, 0)
      const occasional = state.occasionalIncomes.reduce((sum, i) => sum + i.price, 0)
      return monthly + occasional
    },
    balance: (state) => {
      const incomes = [
        ...state.monthlyIncomes,
        ...state.occasionalIncomes
      ].reduce((sum, i) => sum + i.price, 0)
      const expenses = [
        ...state.monthlyExpenses,
        ...state.occasionalExpenses
      ].reduce((sum, e) => sum + e.price, 0)
      return incomes - expenses
    }
  },

  actions: {
    async fetchMonthlyExpenses() {
      this.loading = true
      try {
        const response = await $fetch<{ expenses: MonthlyExpense[]; total: number }>('/api/expenses/monthly')
        this.monthlyExpenses = response.expenses
      } catch (error: any) {
        this.error = error.data?.message || 'Erro ao carregar'
      } finally {
        this.loading = false
      }
    },

    async createMonthlyExpense(data: Partial<MonthlyExpense>) {
      try {
        const response = await $fetch<{ expense: MonthlyExpense }>('/api/expenses/monthly', {
          method: 'POST',
          body: data
        })
        this.monthlyExpenses.push(response.expense)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async updateMonthlyExpense(id: string, data: Partial<MonthlyExpense>) {
      try {
        const response = await $fetch<{ expense: MonthlyExpense }>(`/api/expenses/monthly/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.monthlyExpenses.findIndex(e => e.id === id)
        if (index !== -1) this.monthlyExpenses[index] = response.expense
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async deleteMonthlyExpense(id: string) {
      try {
        await $fetch(`/api/expenses/monthly/${id}`, { method: 'DELETE' })
        this.monthlyExpenses = this.monthlyExpenses.filter(e => e.id !== id)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async fetchOccasionalExpenses(month?: number, year?: number) {
      this.loading = true
      try {
        const params = new URLSearchParams()
        if (month) params.set('month', String(month))
        if (year) params.set('year', String(year))
        const url = `/api/expenses/occasional${params.toString() ? '?' + params.toString() : ''}`
        const response = await $fetch<{ expenses: OccasionalExpense[]; total: number }>(url)
        this.occasionalExpenses = response.expenses
      } catch (error: any) {
        this.error = error.data?.message || 'Erro ao carregar'
      } finally {
        this.loading = false
      }
    },

    async createOccasionalExpense(data: Partial<OccasionalExpense>) {
      try {
        const response = await $fetch<{ expense: OccasionalExpense }>('/api/expenses/occasional', {
          method: 'POST',
          body: data
        })
        this.occasionalExpenses.push(response.expense)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async updateOccasionalExpense(id: string, data: Partial<OccasionalExpense>) {
      try {
        const response = await $fetch<{ expense: OccasionalExpense }>(`/api/expenses/occasional/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.occasionalExpenses.findIndex(e => e.id === id)
        if (index !== -1) this.occasionalExpenses[index] = response.expense
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async deleteOccasionalExpense(id: string) {
      try {
        await $fetch(`/api/expenses/occasional/${id}`, { method: 'DELETE' })
        this.occasionalExpenses = this.occasionalExpenses.filter(e => e.id !== id)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async fetchMonthlyIncomes() {
      this.loading = true
      try {
        const response = await $fetch<{ incomes: MonthlyIncome[]; total: number }>('/api/incomes/monthly')
        this.monthlyIncomes = response.incomes
      } catch (error: any) {
        this.error = error.data?.message || 'Erro ao carregar'
      } finally {
        this.loading = false
      }
    },

    async createMonthlyIncome(data: Partial<MonthlyIncome>) {
      try {
        const response = await $fetch<{ income: MonthlyIncome }>('/api/incomes/monthly', {
          method: 'POST',
          body: data
        })
        this.monthlyIncomes.push(response.income)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async updateMonthlyIncome(id: string, data: Partial<MonthlyIncome>) {
      try {
        const response = await $fetch<{ income: MonthlyIncome }>(`/api/incomes/monthly/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.monthlyIncomes.findIndex(i => i.id === id)
        if (index !== -1) this.monthlyIncomes[index] = response.income
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async deleteMonthlyIncome(id: string) {
      try {
        await $fetch(`/api/incomes/monthly/${id}`, { method: 'DELETE' })
        this.monthlyIncomes = this.monthlyIncomes.filter(i => i.id !== id)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async fetchOccasionalIncomes(month?: number, year?: number) {
      this.loading = true
      try {
        const params = new URLSearchParams()
        if (month) params.set('month', String(month))
        if (year) params.set('year', String(year))
        const url = `/api/incomes/occasional${params.toString() ? '?' + params.toString() : ''}`
        const response = await $fetch<{ incomes: OccasionalIncome[]; total: number }>(url)
        this.occasionalIncomes = response.incomes
      } catch (error: any) {
        this.error = error.data?.message || 'Erro ao carregar'
      } finally {
        this.loading = false
      }
    },

    async createOccasionalIncome(data: Partial<OccasionalIncome>) {
      try {
        const response = await $fetch<{ income: OccasionalIncome }>('/api/incomes/occasional', {
          method: 'POST',
          body: data
        })
        this.occasionalIncomes.push(response.income)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async updateOccasionalIncome(id: string, data: Partial<OccasionalIncome>) {
      try {
        const response = await $fetch<{ income: OccasionalIncome }>(`/api/incomes/occasional/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.occasionalIncomes.findIndex(i => i.id === id)
        if (index !== -1) this.occasionalIncomes[index] = response.income
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async deleteOccasionalIncome(id: string) {
      try {
        await $fetch(`/api/incomes/occasional/${id}`, { method: 'DELETE' })
        this.occasionalIncomes = this.occasionalIncomes.filter(i => i.id !== id)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async fetchSummary(month?: number, year?: number) {
      try {
        const params = new URLSearchParams()
        if (month) params.set('month', String(month))
        if (year) params.set('year', String(year))
        const url = `/api/reports/summary${params.toString() ? '?' + params.toString() : ''}`
        const response = await $fetch<{ summary: Summary }>(url)
        this.summary = response.summary
      } catch (error: any) {
        this.error = error.data?.message || 'Erro ao carregar resumo'
      }
    }
  }
})
