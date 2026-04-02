export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Finances Nuxt',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Controle suas finanças pessoais de forma simples e eficiente' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'Finances Nuxt',
      testUserEmail: process.env.TEST_USER_EMAIL || 'teste@finances.com',
      testUserPassword: process.env.TEST_USER_PASSWORD || 'Teste123'
    }
  },

  routeRules: {
    '/api/**': { cors: true }
  },

  nitro: {
    preset: 'vercel'
  },

  typescript: {
    strict: true
  },

  compatibilityDate: '2024-11-01'
})
