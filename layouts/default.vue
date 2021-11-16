<template>
  <div id="pro" class="w-full h-full bg-gray-1050 relative">
    <transition name="page" appear>
      <div>
        <v-sidebar-mobile
          :is-sidebar-open="isOpenSidebar"
          @sidebar-closed="onCloseSideBar"
        />
        <client-only>
          <div class="min-h-screen relative bg-gray-1050 h-full flex flex-col">
            <v-topbar @sidebar-opened="isOpenSidebar = true" />
            <main class="w-full h-full flex-1 flex justify-center items-center">
              <nuxt />
            </main>
            <v-footer class="mt-auto" />
          </div>
        </client-only>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Footer from '~/components/layout/footer/index.vue'
import Topbar from '~/components/layout/topbar.vue'
import SidebarMobile from '~/components/layout/sidebar-mobile.vue'

export default Vue.extend({
  components: {
    'v-topbar': Topbar,
    'v-footer': Footer,
    'v-sidebar-mobile': SidebarMobile,
  },

  data() {
    return {
      isOpenSidebar: false,
    }
  },

  mounted() {
    //
  },

  beforeDestroy() {
    //
  },

  methods: {
    onCloseSideBar() {
      if (this.isOpenSidebar) {
        this.isOpenSidebar = false
      }
    },
  },
})
</script>
