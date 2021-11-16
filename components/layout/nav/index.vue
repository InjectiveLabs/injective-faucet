<template>
  <nav class="block flex-1 lg:flex">
    <v-nav-item-dummy href="https://hub.injective.network">
      Hub
    </v-nav-item-dummy>
    <v-nav-item-dummy href="https://explorer.injective.network">
      Explorer
    </v-nav-item-dummy>
    <v-nav-item-dummy href="https://hub.injective.network/trade">
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
