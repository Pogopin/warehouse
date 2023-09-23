<template>
	<div class="grid">
		<Cell v-for="el in items" :key="el.id" :nameIcon="el.icon" :counter="el.counter"
      @click.prevent="clickCell($event, el)"
	  />
    <Modal
      @close:modal="cancel"
      :isActive="isActiveModal"
    >
      <template v-slot:icon>
        <Icon
          style="transform: none; position: static; width: 100%; height: 100%"
          :name="currentCell.icon"/>
      </template>
      <template v-slot:footer>
        <div v-if="isActiveRemoveBtn">
          <BaseButton
            text="Удалить предмет"
            modifyStyle="btn-red"
            @click="onClickItemRemove"/>
        </div>
        <div v-else>
          <BaseInput class="modal__input" type="text" name="itemsCount" placeholder="Введите количество" @update:value="(value) => setDeleteItems(value)" />
          <div class="footer__action-buttons">
            <BaseButton text="Отмена" @click="cancel"/>
            <BaseButton text="Подтвердить" modifyStyle="btn-red" @click="clickAccept()"/>
          </div>
        </div>
      </template>

    </Modal>
	</div>

</template>
<script setup>
import { Cell, Modal, Icon } from '@/components';
import { BaseButton, BaseInput } from '@/components/ui';
import { ref, computed, onBeforeMount, defineEmits } from 'vue';
import { useInventoryStore } from '@/stores/index.js';

const inventoryStore = useInventoryStore();
const currentCell = ref('');
const isActiveModal = ref(false);
const isActiveRemoveBtn = ref(true);
const itemsDeleteValue = ref();

const items = computed(()=> {
  return inventoryStore.getInventoryListData;
})
function clickCell(event, item) {
  console.log(item)

  currentCell.value = item;
  if(!item.isEmpty) {
    isActiveModal.value = true;
  }
  }
function onClickItemRemove() {
  isActiveRemoveBtn.value = false;
}
function cancel() {
  isActiveModal.value = false;
  isActiveRemoveBtn.value = true;
}
function setDeleteItems(value) {
  itemsDeleteValue.value = value;
}
async function clickAccept() {
  await inventoryStore.deleteItemsInState(itemsDeleteValue.value, currentCell.value);
  cancel();
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
.footer__action-buttons {
  display: flex;
}
.modal__input {
  padding: 12px;
  background-color: #4D4D4D;
  outline: none;
  border-radius: 8px;
  border: none;
  color: white;
  margin-bottom: 10px;
  width: -webkit-fill-available;
}
</style>
