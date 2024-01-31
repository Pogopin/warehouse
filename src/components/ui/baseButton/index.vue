<template>
  <button class="btn" :class="[props.modifyStyle]">
    {{ props.text }}
  </button>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: String,
  modifyStyle: String,
  disabled: Boolean
});
</script>
<style scoped>
.btn {
  border-radius: 8px;
  padding: 8px 15px;
  cursor: pointer;
}
.btn-red {
  background-color: #FA7272;
  color: white;
}
.btn-green {
  background-color: #a1d175;
  color: grey;
}
</style>
