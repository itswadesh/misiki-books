<template>
  <button
    v-bind="$attrs"
    :size="size"
    class="w-full p-3 text-lg font-bold rounded"
    :class="{'primary text-white':color=='primary','secondary':color=='none'}"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String },
    size: { type: String, default: "text" },
    color: { type: String, default: "none" }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style scoped>
</style>