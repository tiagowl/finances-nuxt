import { defineStore } from 'pinia'
import type { WishlistItem } from '~/types'

interface WishlistState {
  items: WishlistItem[]
  loading: boolean
  error: string | null
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistState => ({
    items: [],
    loading: false,
    error: null
  }),

  getters: {
    total: (state) => 
      state.items.filter(i => !i.isPurchased).reduce((sum, i) => sum + i.price, 0),
    purchasedTotal: (state) => 
      state.items.filter(i => i.isPurchased).reduce((sum, i) => sum + i.price, 0),
    pendingItems: (state) => state.items.filter(i => !i.isPurchased),
    purchasedItems: (state) => state.items.filter(i => i.isPurchased)
  },

  actions: {
    async fetchItems() {
      this.loading = true
      this.error = null
      try {
        const response = await $fetch<{ items: WishlistItem[]; total: number }>('/api/wishlist')
        this.items = response.items
      } catch (error: any) {
        this.error = error.data?.message || 'Erro ao carregar'
      } finally {
        this.loading = false
      }
    },

    async createItem(data: Partial<WishlistItem>) {
      try {
        const response = await $fetch<{ item: WishlistItem }>('/api/wishlist', {
          method: 'POST',
          body: data
        })
        this.items.unshift(response.item)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async updateItem(id: string, data: Partial<WishlistItem>) {
      try {
        const response = await $fetch<{ item: WishlistItem }>(`/api/wishlist/${id}`, {
          method: 'PUT',
          body: data
        })
        const index = this.items.findIndex(i => i.id === id)
        if (index !== -1) this.items[index] = response.item
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    },

    async togglePurchased(id: string) {
      const item = this.items.find(i => i.id === id)
      if (!item) return { success: false, error: 'Item não encontrado' }
      return this.updateItem(id, { isPurchased: !item.isPurchased })
    },

    async deleteItem(id: string) {
      try {
        await $fetch(`/api/wishlist/${id}`, { method: 'DELETE' })
        this.items = this.items.filter(i => i.id !== id)
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.data?.message }
      }
    }
  }
})
