<template>
  <div>
    <h3 class="text-xl text-gray-200 text-center">
      Enter your
      <span class="text-primary-500 font-black"> Injective Address </span>
      to receive testnet funds!
    </h3>
    <div class="mt-6 bg-gray-800 rounded-xl p-4 lg:p-6">
      <v-input
        v-model="address"
        placeholder="inj"
        label="Your Injective Address"
      >
      </v-input>
      <div class="w-full mt-6 text-center">
        <v-button lg class="w-full" primary @click.stop="handleClickOnSubmit">
          Submit
        </v-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VInput from '~/components/inputs/input.vue'
import VButton from '~/components/elements/button.vue'

export default Vue.extend({
  components: {
    VButton,
    VInput,
  },

  data() {
    return {
      address: '',
    }
  },

  methods: {
    handleClickOnSubmit() {
      const { address } = this

      if (!address) {
        return this.$toast.error('Please enter your address')
      }

      if (!address.startsWith('inj')) {
        return this.$toast.error('Please enter a valid Injective address')
      }

      if (address.length !== 42) {
        return this.$toast.error('Please enter a valid Injective address')
      }

      if (!process.env.APP_API_FAUCET_ENDPOINT) {
        return this.$toast.error(
          'Please set APP_API_FAUCET_ENDPOINT in your .env'
        )
      }

      this.$axios
        .$get(`${process.env.APP_API_FAUCET_ENDPOINT}?address=${this.address}`)
        .then((response: any) => {
          this.$toast.success(response.message)
        })
        .catch((e) => {
          this.$toast.error(e.response ? e.response.data.message : e.message)
        })
    },
  },
})
</script>
