<template>
  <img
    :src="imageSrc"
    ref="lazyload"
    alt=""
    :class="fitLoader"
    @click="$emit('click')"
    draggable="false"
  />
</template>

<script>
export default {
  name: "Lazyload",
  data() {
    return {
      observer: null,
      intersecting: false,
      loading: false,
      options: {
        rootMargin: "50px",
        threshold: 0
      }
    };
  },
  props: {
    src: {
      type: String,
      default: ""
    }
  },
  watch: {
    src() {
      this.$refs.lazyload.setAttribute("src", require("@/static/oval.svg"));
      this.startObserving();
    }
  },
  computed: {
    imageSrc() {
      return this.intersecting ? this.src : require("@/static/oval.svg");
    },
    fitLoader() {
      return {
        "fit--loader": this.loading
      };
    }
  },
  methods: {
    /*
     * startObserving
     *
     * Binds IntersectinObserver to the image elemnt
     * to lazy load it whn the image comes in the
     * viewport.
     */
    startObserving() {
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          this.loading = true;
          this.loadImage();
        }
      }, this.options || {});

      this.observer.observe(this.$el);
    },

    loadImage() {
      let imageTag = this.$refs.lazyload;
      let image = new Image();
      image.onload = () => {
        imageTag.setAttribute("src", this.src);
        this.loading = false;
        this.observer.disconnect();
      };
      image.src = this.src;
    }
  },

  mounted() {
    if (process.client) {
      if ("IntersectionObserver" in window) {
        // this.loading = true
        this.startObserving();
      }
    }
  },

  destroyed() {
    this.loading = false;
    this.observer.disconnect();
  }
};
</script>

<style scoped>
.fit--loader {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 50px !important;
  height: 50px !important;
  margin-top: 50% auto;
}
</style>