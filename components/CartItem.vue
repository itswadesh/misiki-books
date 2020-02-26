<template>
  <div class="w-full flex my-1 bg-white shadow-lg relative">
    <button
      @click="removeFromCart(item.id)"
      class="absolute right-0 rounded h-6 w-6 mt-1 mr-1 bg-gray-200 text-center align-top"
    >x</button>
    <img
      class="w-20 h-32 object-contain m-4"
      v-lazy="item.image.href"
      alt=""
    />
    <div class="mx-4 rounded-b leading-normal w-full flex flex-col justify-center">
      <div class="text-gray-900 font-bold text-xl mb-2">{{item.name}}</div>
      <div class="flex justify-between items-center text-gray-700 text-base">
        {{ item.quantity }}x {{ item.meta.display_price.with_tax.value.formatted }}
        <img
          alt="..."
          class="w-3 h-4 align-middle"
          src="/loading.svg"
          v-if="loading"
        />
        <div v-else>
          <!-- <button
            v-if="!loading"
            class="w-8 h-8 rouned-full rounded-full px-3 py-1 font-semibold cursor-pointer bg-gray-500 text-black shadow"
            @click="updateCart(item.product_id,item.quantity-1)"
          >-</button> -->
          {{item.quantity}}
          <button
            class="w-8 h-8 rouned-full rounded-full px-3 py-1 font-semibold cursor-pointer bg-blue-500 text-white shadow"
            @click="addToBag(item.product_id,1)"
          >+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoltinService from "~/services/moltin";
export default {
  props: ["item"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async addToBag(id, quantity) {
      try {
        this.loading = true;
        const cart = await MoltinService.addToCart(id, quantity);
        this.$toast.success("Added to your cart").goAway(3000);
        this.$emit("onCartUpdated", cart);
      } catch (e) {
        if (e.errors) this.$toast.error(e.errors[0].title).goAway(5000);
      } finally {
        this.loading = false;
      }
    },
    async updateCart(id, quantity) {
      try {
        this.loading = true;
        const cart = await MoltinService.updateCart(id, quantity);
        this.$toast.success("Cart qty updated").goAway(3000);
        this.$emit("onCartUpdated", cart);
      } catch (e) {
        if (e.errors) this.$toast.error(e.errors[0].title).goAway(5000);
      } finally {
        this.loading = false;
      }
    },
    async removeFromCart(itemId) {
      try {
        this.loading = true;
        const cart = await MoltinService.removeFromCart(itemId);
        this.$toast.success("Added to your cart").goAway(3000);
        this.$emit("onCartUpdated", cart);
      } catch (e) {
        if (e.errors) this.$toast.error(e.errors[0].title).goAway(5000);
      } finally {
        this.loading = false;
      }
    },
    getProductThumb: function(product) {
      var placeholder = "/instagram.png";
      try {
        var fileId = product.relationships.main_image.data.id;

        var file = this.images.find(function(el) {
          return fileId === el.id;
        });

        return file.link.href || placeholder;
      } catch (e) {
        return placeholder;
      }
    }
  }
};
</script>

<style>
</style>