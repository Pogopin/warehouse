<template>
  <!-- <div :class="['modal', { 'active': props.isActive == true }]"> -->
  <div :class="classes">
    <div class="modal__closebtn" @click="closeModal">
      <img src="@/assets/icons/carbon_close.svg" alt="">
    </div>
    <div class="modal__image">
      <slot name="icon"></slot>
    </div>
    <div class="modal__body"></div>
    <div class="modal__footer">
      <slot name="footer" ></slot>
    </div>

  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const classes = computed(() => ({
  'active' : props.isActive,
  'modal' : true
}))

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
  background-color: #2D2D2D;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  opacity: 1;
  transform: translateX(120%);
  transition: transform .5s;
  border: 1px solid #4D4D4D;
  max-width: 250px;
  width: 220px;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.modal.active {
  transform: translateX(0%);
}
.modal__closebtn {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}
.modal__image {
  margin-top: 30px;
  height: 130px;
  /* width: 130px;
  height: 130px;
  padding: 55px 60px 40px 60px; */
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
.modal__body {
  height: 100%;
}
.modal__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  /* height: 258px;
   */
  height: 100%;
}
.mt {
  margin-bottom: 20px;
}

</style>
