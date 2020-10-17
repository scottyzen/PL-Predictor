export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'pl-predictor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
  ],
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyDB576euB7ojr8ri6n8sXffpSTeGxxVg5o",
      authDomain: "pl-predictor.firebaseapp.com",
      databaseURL: "https://pl-predictor.firebaseio.com",
      projectId: "pl-predictor",
      storageBucket: "pl-predictor.appspot.com",
      messagingSenderId: "263868010901",
      appId: "1:263868010901:web:b69820de1f43026d66269c"
    },
    services: {
      auth: true,
      realtimeDb: true
    }
 },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
