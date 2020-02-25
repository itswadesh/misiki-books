<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <img
      class="w-full h-32 object-contain"
      v-lazy="getProductThumb(product)"
      alt=""
    >
    <div class="px-2 pt-4">
      <div class="font-bold text-xl mb-2">{{product.name}}</div>
      <!-- <p class="text-gray-700 text-base">
        {{product.description}}
      </p> -->
    </div>
    <div class="px-2 py-4 flex justify-between items-center">
      <span class=" py-1 text-xl font-black text-gray-700 mr-2">{{ price }}</span>
      <img
        alt="..."
        class="w-3 h-4 align-middle"
        src="/loading.svg"
        v-if="loading"
      />
      <button
        v-else
        class="w-8 h-8 rouned-full rounded-full px-3 py-1 font-semibold cursor-pointer bg-blue-500 text-white"
        @click="addToBag(product)"
      >+</button>
    </div>
  </div>
</template>

<script>
import MoltinService from "~/services/moltin.js";

export default {
  props: ["product", "images", "price"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async addToBag(product) {
      try {
        this.loading = true;
        const cart = await MoltinService.addToCart(product.id, 1);
        this.$toast.success("Added to your cart").goAway(3000);
        this.$emit("onCartUpdated", cart);
      } catch (e) {
        this.$toast.error(e.errors[0].title).goAway(5000);
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
        this.$toast.error(e.errors[0].title).goAway(5000);
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