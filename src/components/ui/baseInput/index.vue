<template>
  <input :type="props.type" :placeholder="props.placeholder" :id="props.id" :name="props.name" v-model="val"/>

</template>
<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: "text",
  },
  name: String,
  placeholder: String,
  value: String
});
const emits = defineEmits(["update:value"]);
const val = computed({
  get() {
    // return "";
    return props.value;
  },
  set(value) {
    emits("update:value", value);
  },
});
</script>
