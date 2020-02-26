<template>
  <div class="group">
    <center>
      <div class="floating-form">
        <div class="floating-label">
          <textarea
            class="floating-input bg-gray-100 border-b w-full rounded hover:bg-gray-300 focus:outline-none focus:border-pink-500"
            placeholder=" "
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
            :type="type"
            :aria-label="label"
            :rows="rows"
          />
          <span class="highlight"></span>
          <label class="bg-gray-100">{{label}}</label>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    type: { type: String, default: "text" },
    value: { type: String },
    rows: { type: Number, default: 4 }
  }
};
</script>

<style scoped>
textarea {
  overflow: auto;
}
.floating-label {
  position: relative;
  margin-bottom: 20px;
}
.floating-input {
  padding: 4px 4px;
  display: block;
  width: 100%;
  padding: 14px 12px 0;
  border: none;
  overflow: auto;
}

.floating-input:focus {
  outline: none;
  border-bottom: 2px solid #da1c5f;
}

label {
  color: #999;
  font-size: 1rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 8px;
  top: 13px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -1px;
  font-size: 14px;
  color: #fb6340;
}

.floating-select:focus ~ label,
.floating-select:not([value=""]):valid ~ label {
  top: -18px;
  font-size: 14px;
  color: #fb6340;
}
</style>