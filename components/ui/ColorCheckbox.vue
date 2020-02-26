<template>
  <label
    data-count="4957"
    class="vertical-filters-label common-customCheckbox"
  >
    <input
      type="checkbox"
      value="Black"
    >
    <span
      data-colorhex="black"
      class="colour-label colour-colorDisplay"
      :style="{'background-color':color}"
    ></span>
    <span class="text-gray-800 text-sm">
      FOREVER 21
    </span>
    <span class="text-gray-500 text-xs">(1295)</span>
    <div class="common-checkboxIndicator"></div>

  </label>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "red"
    },
    count: {
      type: Number,
      default: 1295
    },
    text: {
      type: String,
      default: ""
    },
    val: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
.colour-colorDisplay {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  margin-left: 4px;
}
.colour-colorDisplay {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  margin-left: 8px;
}
.common-customCheckbox input:checked ~ .common-checkboxIndicator {
  border: none;
  background: #ff3f6c;
}
.common-checkboxIndicator {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  margin-right: 1em;
  width: 16px;
  height: 16px;
  border: 1px solid #c3c2c9;
  background: #fff;
  border-radius: 2px;
  margin-top: -1.5em;
}
.common-checkboxIndicator:after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 1;
  width: 8px;
  height: 5px;
  border: 2px solid #fff;
  border-color: #fff;
  border-top-style: none;
  border-right-style: none;
  transition: all 0.3s ease-in-out;
  transform: rotate(-45deg);
}
label {
  line-height: 2;
  cursor: pointer;
}
</style>