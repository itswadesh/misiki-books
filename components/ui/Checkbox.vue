<template>
  <label
    class="vertical-filters-label common-customCheckbox hover:bg-none"
    :for="id || uniqueId"
  >
    <input
      type="checkbox"
      :id="id || uniqueId"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :color="color"
      :checked="checkboxState"
      @click="toggle"
    />
    <span
      v-if="color"
      data-colorhex="black"
      class="colour-label colour-colorDisplay"
      :style="{'background-color':color}"
    ></span>
    <span class="text-gray-800 ml-2 text-sm">
      <slot />
    </span>
    <span
      class="text-gray-500 text-xs"
      v-if="count"
    >({{count}})</span>
    <div class="common-checkboxIndicator"></div>
  </label>
</template>
<style scoped>
.common-checkboxIndicator {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border: 1px solid #c3c2c9;
  background: #fff;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  margin-top: 2.5px;
}
.vertical-filters-filters .vertical-filters-label {
  display: block;
  width: 95%;
  white-space: nowrap;
  cursor: pointer;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  min-height: 17px;
  color: #282c3f;
}
.common-customCheckbox {
  position: relative;
  cursor: pointer;
}
.common-customCheckbox input:checked ~ .common-checkboxIndicator {
  border: none;
  background: linear-gradient(87deg, #fb6340, #da1c5f) !important;
}
.common-checkboxIndicator:after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 5px;
  border: 2px solid #fff;
  border-color: #fff;
  border-top-style: none;
  border-right-style: none;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
label {
  line-height: 2;
  cursor: pointer;
}
</style>
<script>
export default {
  name: "Checkbox",
  model: {
    prop: "model",
    event: "change"
  },
  props: {
    id: {
      type: String,
      required: false
    },
    model: {
      type: String | Array,
      default: undefined
    },
    color: {
      type: String,
      required: false
    },
    circle: {
      type: Boolean,
      default: false,
      required: false
    },
    checked: {
      type: Boolean,
      required: false
    },
    value: {
      type: [String, Boolean],
      required: false,
      default: ""
    },
    count: {
      type: [String, Number],
      required: false
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: Number,
      required: false
    },
    fontSize: {
      type: Number,
      required: false
    }
  },
  data: () => ({
    uniqueId: ""
  }),
  computed: {
    checkboxState() {
      // if (this.model === undefined) return this.value;
      if (Array.isArray(this.model))
        return this.model.indexOf(this.value) !== -1;
      return this.model && this.value;
    }
  },
  methods: {
    toggle() {
      if (this.disabled) return;
      let value = this.model || this.value;
      if (Array.isArray(value)) {
        const i = value.indexOf(this.value);
        if (i === -1) value.push(this.value);
        else value.splice(i, 1);
      } else {
        value = [];
        value.push(this.value);
      }
      this.$emit("change", value);
    },

    genId() {
      if (this.id === undefined || typeof String) {
        this.uniqueId = `m-checkbox--${Math.random()
          .toString(36)
          .substring(2, 10)}`;
      } else {
        this.uniqueId = this.id;
      }
    }
  },
  watch: {
    checked(v) {
      if (v !== this.checkboxState) this.toggle();
    }
  },
  mounted() {
    this.genId();
    if (this.checked && !this.checkboxState) {
      this.toggle();
    }
  }
};
</script>