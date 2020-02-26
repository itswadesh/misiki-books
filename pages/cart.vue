<template>
  <div>
    <Heading :title="`Cart`" />
    <div
      class="flex justify-center"
      v-if="loading"
    >
      <img src="/loading.svg" />
    </div>
    <div
      v-if="cart.data.length == 0 && !loading"
      class="bg-white mb-4 px-6  flex flex-col justify-center items-center"
    >
      <img
        src="empty-book.svg"
        alt=""
      />
      <div class="text-center text-3xl">Your cart is empty</div>
      <p class="my-4 mx-auto">You'll need to add some items to the cart before you can checkout.</p>
      <nuxt-link
        to="/"
        class="my-8 px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white block rounded shadow-lg w-full text-center"
      >Go</nuxt-link>
    </div>

    <div v-else-if="cart.data.length>0">
      <div class="flex flex-wrap my-1">
        <div
          class="w-full"
          v-for="item in cart.data"
          :key="item.id"
        >
          <CartItem
            :item="item"
            @onCartUpdated="onCartUpdated"
          />
        </div>
      </div>
    </div>
    <StickyFooter
      :cart="cart"
      title="Checkout"
      link="/checkout"
    />
  </div>
</template>

<script>
import MoltinService from "~/services/moltin.js";
import CartItem from "~/components/CartItem";
import Heading from "~/components/Heading.vue";
import StickyFooter from "~/components/StickyFooter.vue";

export default {
  name: "app",
  components: { CartItem, Heading, StickyFooter },
  data() {
    return {
      cart: { data: [] },
      loading: false
    };
  },
  async created() {
    try {
      this.loading = true;
      this.cart = await MoltinService.getCart();
    } catch (e) {
      console.log("err...", e);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async onCartUpdated(cart) {
      this.cart = cart;
    }
  }
};
</script>
  