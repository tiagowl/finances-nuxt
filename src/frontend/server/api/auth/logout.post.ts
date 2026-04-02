export default defineEventHandler(async (event) => {
  deleteCookie(event, 'auth_token')
  deleteCookie(event, 'refresh_token')
  
  return { success: true }
})
