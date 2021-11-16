import { metaTags } from './app/meta'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: 'font-sans',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      ...metaTags(),
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png?v2' },
      { rel: 'shortcut icon', type: 'image/png', href: '/favicon.png?v2' },
      { rel: 'apple-touch-icon', type: 'image/png', href: '/favicon.png?v2' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  loading: { color: '#00f2ff' },

  toast: {
    position: 'bottom-right',
    duration: 6000,
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  tailwindcss: {
    config: './tailwind.config.js',
    cssPath: './assets/css/tailwind.scss',
  },

  generate: {
    routes: ['/'],
  },

  env: {
    /** Public **/
    APP_NAME: process.env.APP_NAME,
    APP_BASE_URL: process.env.APP_BASE_URL,

    /** Secrets **/
    APP_API_FAUCET_ENDPOINT: process.env.APP_API_FAUCET_ENDPOINT,
  },
}
