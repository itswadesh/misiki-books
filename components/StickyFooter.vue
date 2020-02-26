<template>
  <div
    class="fixed bottom-0 w-full py-4 px-4 max-w-sm rounded overflow-hidden shadow-lg bg-white text-xl flex justify-between items-center"
    v-if="cart && cart.data && cart.data.length>0"
  >
    <div>Cart ({{ cart.data.length }} items) - {{cart.meta.display_price.with_tax.formatted}}
    </div>
    <nuxt-link
      :to="link"
      class="bg-gray-200 rounded-lg px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white"
    >{{title}}</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    cart: { type: Object },
    title: { type: String },
    link: { type: String }
  }
};
</script>

<style>
</style>