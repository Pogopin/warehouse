<template>
	<div class="grid" @dragover.prevent @dragenter.prevent>
		<Cell v-for="el in items" :key="el.id" :nameIcon="el.icon" :counter="el.counter" :class="{'disabled' : isActiveModal}"
      @click.prevent="clickCell($event, el)"
      @dragstart="onItemDragStart($event, el)"
      @drop="onItemDrop($event, el.id)"
	  />
    <Modal
      @close:modal="cancel"
      :isActive="isActiveModal"
    >
      <template v-slot:icon>
        <Icon
          style="transform: none; position: static; width: 100%; height: 100%"
          :name="currentCell.icon"
        />
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
  // console.log(item)

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
  if(!(+value)) {alert('Недопустимое количество!'); itemsDeleteValue.value = null; return}
  itemsDeleteValue.value = value;
}
async function clickAccept() {
  await inventoryStore.deleteItemsInState(itemsDeleteValue.value, currentCell.value);
  cancel();
}
function onItemDragStart(event, item) {
    const isEmpty = item.isEmpty;

    if (!event.dataTransfer || isEmpty) {
        return;
    }
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('droppingId', String(item.id));
}
function onItemDrop(event, droppedId) {
  if (!event.dataTransfer || event.dataTransfer.getData('droppingId') === '') {
    return;
  }
  const droppingId = parseInt(event.dataTransfer.getData('droppingId'));

  const droppedCell = inventoryStore.getItemByID(droppedId);
  if(droppedCell.isEmpty) inventoryStore.onSetNewPosition(droppingId, droppedId);// проверка пустая ячейка или нет
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
.disabled {
  pointer-events: none;
  opacity: 0.9;
}
</style>
