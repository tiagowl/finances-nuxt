import { defineStore } from 'pinia'
import type { Category } from '~/types'

interface CategoriesState {
  categories: Category[]
  loading: boolean
  error: string | null
}

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    categories: [],
    loading: false,
    error: null
  }),

  getters: {
    getCategoryById: (state) => (id: string) => {
      return state.categories.find(c => c.id === id)
    },
    categoriesForSelect: (state) => {
      return state.categories.map(c => ({
        value: c.id,
        label: c.name,
        color: c.color,
        icon: c.icon,
        budget: c.budget,
        totalSpent: c.totalSpent
      }))
    }
  },

  actions: {
    async fetchCategories() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch<{ categories: Category[] }>('/api/categories')
        this.categories = response.categories
      } catch (error: any) {
        this.error = error.data?.message || 'Erro ao carregar categorias'
      } finally {
        this.loading = false
      }
    },

    async createCategory(data: Partial<Category>) {
      try {
        const response = await $fetch<{ category: Category }>('/api/categories', {
          method: 'POST',
          body: data
        })
        this.categories.push(response.category)
        return { success: true }
      } catch (error: any) {
        return { 
          success: false, 
          error: error.data?.message || 'Erro ao criar categoria' 
        }
      }
    },

    async updateCategory(id: string, data: Partial<Category>) {
      try {
        const response = await $fetch<{ category: Category }>(`/api/categories/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.categories.findIndex(c => c.id === id)
        if (index !== -1) {
          this.categories[index] = response.category
        }
        return { success: true }
      } catch (error: any) {
        return { 
          success: false, 
          error: error.data?.message || 'Erro ao atualizar categoria' 
        }
      }
    },

    async deleteCategory(id: string) {
      try {
        await $fetch(`/api/categories/${id}`, { method: 'DELETE' })
        this.categories = this.categories.filter(c => c.id !== id)
        return { success: true }
      } catch (error: any) {
        return { 
          success: false, 
          error: error.data?.message || 'Erro ao excluir categoria' 
        }
      }
    }
  }
})
