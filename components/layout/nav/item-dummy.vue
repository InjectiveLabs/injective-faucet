<template>
  <a
    v-bind="$attrs"
    class="
      text-gray-200
      hover:bg-gray-800 hover:text-white
      flex
      items-center
      px-6
      tracking-widest
      py-2
      uppercase
      text-xs
      rounded
      cursor-pointer
      mx-px
    "
    target="_blank"
  >
    <span class="block">
      <slot></slot>
    </span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  //
})
</script>
