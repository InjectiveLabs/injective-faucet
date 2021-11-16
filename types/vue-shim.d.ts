import VueRouter from 'vue-router'
import { Toasted } from 'vue-toasted'

/**
 * Overloads VueI18n interface to avoid needing to cast return value to string.
 */
declare module 'vue-i18n/types' {
  //
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toasted
    $router: VueRouter
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $toast: Toasted
  }
}
