<template>
  <label class="radio">
    <input
      type="radio"
      :checked="shouldBeChecked"
      :value="value"
      @change="updateInput"
      class="mr-1 align-middle"
    />
    <slot class="align-middle" />
    <div class="common-radioIndicator align-middle bg-green-500" :class="color"></div>
  </label>
</template>
<script>
export default {
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    value: {
      type: String
    },
    modelValue: {
      default: ""
    },
    color: {
      default: "red"
    }
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue == this.value;
    }
  },
  methods: {
    updateInput() {
      this.$emit("change", this.value);
    }
  }
};
</script>

<style scoped>
.radio input:checked ~ .primary:before {
  border-color: #fbb140;
  background: #fb6340;
}
.radio input:checked ~ .secondary:before {
  border-color: #40c8fb;
  background: #1c45da;
}
.radio input:checked ~ .green:before {
  border-color: #16ce3e;
  background: #16ce3e;
}
.radio input:checked ~ .blue:before {
  border-color: #3522dd;
  background: #3522dd;
}
.radio input:checked ~ .red:before {
  border-color: #ff3f6c;
  background: #ff3f6c;
}
.radio input:checked ~ .common-radioIndicator:before {
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
  visibility: visible;
  -webkit-box-shadow: inset 0 0 0 3px #fff;
  -moz-box-shadow: inset 0 0 0 3px #fff;
  box-shadow: inset 0 0 0 3px #fff;
}
.common-radioIndicator:before {
  content: "";
  position: absolute;
  z-index: 1;
  width: 16px;
  height: 16px;
  border: 1px solid #c3c2c9;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  visibility: visible;
  display: inline-block;
  vertical-align: middle;
  padding: 2px;
  text-align: center;
}
.radio {
  position: relative;
  cursor: pointer;
  vertical-align: middle;
}
.common-radioIndicator {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
}
.radio input {
  visibility: hidden;
}
</style>