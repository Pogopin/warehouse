<template>
  <!-- <div class="item" v-if="isEmpty"></div> -->
    <div class="cell">
      <div class="cell-img">
        <Icon
					:name="props.nameIcon"
				/>
      </div>
      <div class="cell__counter" v-if="props.counter">
        {{ props.counter }}
      </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { Icon } from '@/components';
const props = defineProps({
	isEmpty: {
		type: Boolean,
		default: true
	},
	nameIcon: {
		type: String,
	},
	counter: {
		type: Number
	}
})
</script>
<style scoped>

.cell {
	border: 1px solid #4D4D4D;
	background-color: #2D2D2D;
  position: relative;
  cursor: pointer;
}
.cell:first-child {
	border-top-left-radius: 12px;
}
.cell:nth-child(5) {
  border-top-right-radius: 12px;
}
.cell:nth-child(21) {
  border-bottom-left-radius: 12px;
}
.cell:nth-child(25) {
  border-bottom-right-radius: 12px;
}

.cell-img {
	width: 105px;
	height: 100px;
	position: relative;

}
.cell__counter {
  position: absolute;
  bottom: -1px;
  right: 0;
  /* padding: 4px; */
  padding: 1px 3px 0px 4px;
  border: 1px solid #4D4D4D;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  border-top-left-radius: 6px;

  color: #FFFFFF;
  opacity: 0.4;
}


</style>
