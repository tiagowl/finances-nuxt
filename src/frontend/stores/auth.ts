import { defineStore } from 'pinia'
import type { User } from '~/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
  }),

  getters: {
    userName: (state) => state.user?.name || state.user?.email?.split('@')[0] || 'Usuário',
    userInitials: (state) => {
      const name = state.user?.name || state.user?.email || '?'
      return name.substring(0, 2).toUpperCase()
    }
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      try {
        const response = await $fetch<{ user: User; token: string }>('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })
        
        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true
        
        return { success: true }
      } catch (error: any) {
        return { 
          success: false, 
          error: error.data?.message || 'Login falhou' 
        }
      } finally {
        this.loading = false
      }
    },

    async register(email: string, password: string, name?: string) {
      this.loading = true
      try {
        const response = await $fetch<{ user: User; token: string }>('/api/auth/register', {
          method: 'POST',
          body: { email, password, name }
        })
        
        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true
        
        return { success: true }
      } catch (error: any) {
        return { 
          success: false, 
          error: error.data?.message || 'Cadastro falhou' 
        }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' })
      } catch {
        // Ignore logout errors
      } finally {
        this.user = null
        this.token = null
        this.isAuthenticated = false
      }
    },

    async fetchUser() {
      try {
        const response = await $fetch<{ user: User }>('/api/auth/me')
        this.user = response.user
        this.isAuthenticated = true
      } catch {
        this.user = null
        this.isAuthenticated = false
      }
    },

    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    }
  }
})
