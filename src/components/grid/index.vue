<template>
	<div class="grid">
		<Cell v-for="el in items" :key="el.id" :nameIcon="el.icon" :counter="el.counter"
      @click.prevent="clickCell($event, el)"
	  />
    <Modal
      @close:modal="isActiveModal = false"
      :isActive="isActiveModal"
    >
      <template v-slot:icon>
        <Icon
          style="transform: none; position: static; width: 100%; height: 100%"
          :name="currentCell.icon"/>
      </template>

    </Modal>
	</div>

</template>
<script setup>
import { Cell, Modal, Icon } from '@/components';
import { ref, computed, onBeforeMount, defineEmits } from 'vue';
import { useInventoryStore } from '@/stores/index.js';

const inventoryStore = useInventoryStore();
const currentCell = ref('');
const isActiveModal = ref(false);

const items = computed(()=> {
  return inventoryStore.getInventoryListData
})
function clickCell(event, item) {
  console.log(item)

  currentCell.value = item;
  if(!item.isEmpty) {
    isActiveModal.value = true;
  }
  // isActiveModal.value = !isActiveModal.value;

}


onBeforeMount(()=> {
  inventoryStore.fillInventoryCells()
})

</script>
<style scoped>
.grid {
	display: flex;
	flex-wrap: wrap;
	max-width: 550px;
  position: relative;
  overflow: hidden;
}
</style>
