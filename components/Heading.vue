<template>
  <div class="flex items-center justify-start px-2 bg-white">
    <button
      @click="go(-1)"
      class="flex-1 text-left absolute font-bold"
    >
      <i class="fa fa-long-arrow-left mr-1 text-gray-600" />
    </button>
    <h1 class="bg-white font-semibold text-xl p-2 flex-1 text-center">{{ title }}</h1>
    <nuxt-link
      to="/"
      class="px-2 bg-gray-200 hover:bg-gray-300 rounded"
    >Home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    back: String
  },
  methods: {
    go(url) {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
