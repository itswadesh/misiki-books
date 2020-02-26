<template>
  <div>
    <Heading :title="`Checkout`" />
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

    <div
      v-else-if="checkout"
      class="mx-auto bg-white m-4 p-4 tracking-wider leading-loose"
    >
      <div
        v-if="checkout.data"
        class="bg-green-400 text-white rounded shadow text-center p-6 mb-4"
      >
        Order placed successfully. <br />
        Total amount to pay: <br />
        <span class="text-5xl text-center">{{checkout.data.meta.display_price.with_tax.formatted}}</span>
      </div>
      <ul v-if="checkout.included">
        <li
          v-for="(i,ix) in checkout.included.items"
          :key="i.id"
        >
          {{ix+1}} - {{i.name}} ({{i.meta.display_price.with_tax.value.formatted}} * {{i.quantity}})
        </li>
      </ul>
      <hr />
      <div
        v-if="checkout.data"
        class="font-bold"
      >
        Total: {{checkout.data.meta.display_price.with_tax.formatted}}
      </div>
      <div class="mt-6 text-center">
        <nuxt-link
          to="/"
          class="px-8 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded text-xl "
        >Home</nuxt-link>
      </div>
    </div>
    <div v-else-if="cart.data.length > 0">
      <div
        class="bg-gray-200 p-4"
        v-bind:class="{ error: isError }"
        v-if="errors"
      >

        <ul id="bg-white">
          <li
            v-for="(error,ix) in errors"
            :key="ix"
          >
            <div class="">
              {{ error.source }}
            </div>
            <div class="text-red-500">{{ error.detail }}</div>
          </li>
        </ul>

      </div>
      <form
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit"
        class="bg-white my-4 py-4 flex flex-col flex-wrap"
      >
        <div class="px-4">
          <div class="flex">
            <Textbox
              v-model="address.first_name"
              label="First Name"
              class="mb-4 w-1/2 mr-2"
            />
            <Textbox
              v-model="address.last_name"
              label="Last Name"
              class="mb-4 flex-1"
            />
          </div>
          <Textbox
            v-model="address.phone"
            label="Phone"
            class="mb-4 flex-1"
          />
          <Textarea
            v-model="address.line_1"
            label="Address"
            class="mb-4"
          />
          </div>
        <div
        class="fixed bottom-0 w-full py-4 px-4 max-w-sm rounded overflow-hidden shadow-lg bg-white text-xl flex justify-between items-center"
        v-if="cart && cart.data && cart.data.length>0"
        >
        <div>Cart ({{ cart.data.length }} items) - {{cart.meta.display_price.with_tax.formatted}}</div>
          <button :disabled="loading"  class="bg-gray-200 rounded-lg px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white">
            <span v-if="!loading">Place Order</span>
            <img src="/loading.svg" v-else/>
          </button>
        </div>
        </form>
      </div>
  </div>
</template>

<script>
import MoltinService from "~/services/moltin.js";
import CartItem from "~/components/CartItem";
import Heading from "~/components/Heading.vue";
import StickyFooter from "~/components/StickyFooter.vue";
import { Textbox, Textarea } from "~/components/ui";
export default {
  name: "app",
  components: { Textbox, Textarea, CartItem, Heading, StickyFooter },
  data() {
    return {
      isError: false,
      errors: "",
      customer: { phone: null, name: null },
      address: {
        phone: null,
        first_name: null,
        last_name: null,
        line_1: null,
        postcode: "763002",
        county: "Sunabeda",
        country: "India",
        address: null
      },
      cart: { data: [] },
      checkout: null,
      loading: false
    };
  },
  async created() {
    try {
      this.loading = true;
      this.cart = await MoltinService.getCart();
    } catch (e) {
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        this.customer = {
          email: this.address.phone + "@misiki.in",
          name: this.address.first_name + " " + this.address.last_name
        };
        this.checkout = await MoltinService.checkout(
          this.customer,
          this.address,
          this.address
        );
        await MoltinService.deleteCart();
        // this.$router.push("/success/" + checkout.data.id);
      } catch (e) {
        this.isError = true;
        this.errors = e.errors;
        console.log("err...", e);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
  