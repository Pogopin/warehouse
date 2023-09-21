<template>
  <div :class="['modal', { 'active': props.isActive == true }]">
    <div class="modal__closebtn" @click="closeModal">
      <img src="@/assets/icons/carbon_close.svg" alt="">
    </div>
    <div class="modal__image">
      <slot name="icon"></slot>
    </div>
    <div class="modal_line"></div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';


const props = defineProps({
	isActive: {
		type: Boolean,
		default: false
	},
})
const emits = defineEmits(['close:modal'])


function closeModal() {
  // console.log('close')
  emits('close:modal');
}

</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 13px;
  width: 250px;
  height: 512px;
  background-color: #2D2D2D;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  opacity: 1;
  /* margin-right: -100%; */
  transform: translateX(120%);
  transition: transform .5s;
  border: 1px solid #4D4D4D;

}
.modal.active {
  /* margin-right: 0; */
  transform: translateX(0%);
}
.modal__closebtn {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}
.modal__image {
  width: 130px;
  height: 130px;
  padding: 55px 60px 40px 60px;
}
.modal__image img {
  width: 100%;
}
.modal_line {
  width: 220px;
  height: 1px;
  background-color: #4D4D4D;
  margin: 0 auto;
}

</style>
