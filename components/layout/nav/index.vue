<template>
  <nav class="block flex-1 lg:flex">
    <v-nav-item-dummy href="https://hub.injective.dev/">
      Hub
    </v-nav-item-dummy>
    <v-nav-item-dummy href="https://testnet.explorer.injective.dev/">
      Explorer
    </v-nav-item-dummy>
    <v-nav-item-dummy href="https://testnet.injective.exchange/">
      Trade
    </v-nav-item-dummy>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import VNavItemDummy from './item-dummy.vue'

export default Vue.extend({
  components: {
    VNavItemDummy,
  },
})
</script>
