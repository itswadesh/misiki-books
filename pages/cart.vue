<template>
  <div>
    <Heading :title="`Cart`" />
    <div
      class="ui warning message"
      v-if="cart.data.length == 0"
    >
      <div class="header">Your cart is empty</div>
      <p>You'll need to add some items to the cart before you can checkout.</p>
    </div>

    <div v-else>
      <div class="flex flex-wrap">
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
      cart: {
        data: []
      }
    };
  },
  async created() {
    try {
      this.cart = await MoltinService.getCart();
    } catch (e) {
      console.log("err...", e);
    }
  },
  methods: {
    async onCartUpdated(cart) {
      this.cart = cart;
    }
  }
};
</script>
  