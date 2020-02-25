<template>
  <div
    to="/cart"
    class="fixed bottom-0 w-full py-4 px-4 max-w-sm rounded overflow-hidden shadow-lg bg-white text-xl flex justify-between items-center"
    v-if="cart && cart.data && cart.data.length>0"
  >
    <div>Cart ({{ cart.data.length }} items) - {{cart.meta.display_price.with_tax.formatted}}
    </div>
    <nuxt-link
      to="/cart"
      class="bg-gray-200 rounded-lg px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white"
    >Checkout</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["cart"]
};
</script>

<style>
</style>