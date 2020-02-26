<template>
  <div>
    <Heading title="Misiki Books" />
    <div class="flex flex-wrap">
      <div
        class="w-1/2"
        v-for="product in products"
        :key="product.id"
      >
        <ProductCard
          :product="product"
          :images="images"
          :price="product.meta.display_price.with_tax.formatted"
          class="my-2 mx-1"
          @onCartUpdated="onCartUpdated"
        />
      </div>
    </div>
    <StickyFooter
      :cart="cart"
      title="Cart"
      link="/cart"
    />
  </div>
</template>
  

<script>
import MoltinService from "~/services/moltin.js";
import ProductCard from "~/components/ProductCard";
import Heading from "~/components/Heading.vue";
import StickyFooter from "~/components/StickyFooter.vue";

export default {
  name: "app",
  components: { ProductCard, Heading, StickyFooter },
  data() {
    return {
      cart: {
        data: []
      },
      products: [],
      images: [],
      meta: {}
    };
  },
  async created() {
    try {
      const {
        data,
        links,
        meta,
        included
      } = await MoltinService.getHomepageProducts();
      this.products = data;
      this.images = included.main_images;
      this.cart = await MoltinService.getCart();
    } catch (e) {
      console.log("err...", e);
    } finally {
    }
  },
  methods: {
    async onCartUpdated(cart) {
      this.cart = cart;
    }
  }
};
</script>
  
  <style>
</style>