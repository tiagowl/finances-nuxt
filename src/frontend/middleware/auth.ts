export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    try {
      await authStore.fetchUser()
    } catch {
      return navigateTo('/')
    }
  }

  if (!authStore.isAuthenticated) {
    return navigateTo('/')
  }
})
