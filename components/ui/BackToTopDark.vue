<template>
  <button @click="toTop" v-if="scrolled > 1000">
    <img class="m-auto w-1/3" src="/up-arrow.png" alt="" />
  </button>
</template>

<script>
export default {
  name: "BackToTop",
  data() {
    return {
      shouldShow: false,
      scrolled: 0
    };
  },
  components: {},
  methods: {
    toTop() {
      if (process.client) {
        window.scroll({ behavior: "smooth", left: 0, top: 100 });
      }
    }
  },
  mounted() {
    if (process.client) {
      window.addEventListener("scroll", () => {
        this.scrolled = window.scrollY;
      });
    }
  }
};
</script>
<style scoped>
button {
  display: block;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  background-color: #555;
  color: white;
  cursor: pointer;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  font-size: 22px;
}

button:hover {
  background-color: #555;
}
</style>