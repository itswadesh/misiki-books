<template>
  <div>
    <Heading :title="`Order Successful`" />
    <div
      class="ui warning message"
      v-if="order || order.data.length == 0"
    >
      <p>Error occured with your order</p>
    </div>

    <div v-else>

    </div>
  </div>
</template>

<script>
import MoltinService from "~/services/moltin.js";
import Heading from "~/components/Heading.vue";
import StickyFooter from "~/components/StickyFooter.vue";
export default {
  name: "app",
  components: { Heading, StickyFooter },
  data() {
    return {
      order: {},
      loading: false
    };
  },
  async created() {
    try {
      this.order = await MoltinService.order(this.$route.params.id);
    } catch (e) {
      console.log("err...", e);
    } finally {
    }
  }
};
</script>
  