<template>
	<div class="inventary">
		<div class="inventary__leftbar">
			<div class="inventary__leftbar-img">
        <img src="@/assets/images/sunduk640.png" alt="sunduk">
      </div>
      <div class="inventary__leftbar-body">
				<h3 class="inventary__leftbar-title">Список</h3>
        <div class="inventary__leftbar-wrap">
          <div class="inventary__leftbar-block">
            <Cell v-for="(el, index) in iconsArray" :key="index" class="inventary__leftbar-cell"
              :nameIcon="el.icon"
              width="75px"
              height="70px"
              @click="getStatusItem(el, $event)"
            />
          </div>
          <BaseInput @update:value="(value) => inputValue = value" class="inventary__input" type="number" name="itemsInput" placeholder="кол-во"/>
          <BaseButton @click="addition" text="Добавить"/>

        </div>
      </div>
		</div>
		<div class="inventary__content">
			<Grid/>
		</div>
		<div class="inventary__footer">
      <div class="inventary__footer-body">
        <div class="inventary__footer-content">wareHouse</div>
      </div>
    </div>
	</div>

</template>
<script setup>
import { Grid, Cell } from '@/components';
import { BaseButton, BaseInput } from '@/components/ui';
import { iconsArray } from '@/config/startPositionItems.js';
import { ref } from 'vue';
import { useInventoryStore } from '@/stores/index.js';

const inventoryStore = useInventoryStore();
const inputValue = ref(0);
const statusInInventory = ref();
const currentItemForAdd = ref();

const getStatusItem = (item, event) => {
  (!document.querySelector('.active')) ? event.target.closest('.cell__img').classList.add('active') :
  document.querySelector('.active').classList.remove('active');

  currentItemForAdd.value = item.icon;
  event.target.closest('.cell__img').classList.add('active');
}

const addition = () => {
  if(inputValue.value === undefined || inputValue.value === 0) {
    alert('Неверное количество'); return
  }
  statusInInventory.value = inventoryStore.checkItemStatusInList(currentItemForAdd.value) // проверка, где находится нужный item в инвентаре и возвращаем индекс
  if(statusInInventory.value >= 0) inventoryStore.addNewItemInList(inputValue.value, statusInInventory.value)//если item есть, прибавляем счетчик
  else {//если нет ищем первую свободную ячейку
    inventoryStore.findFirstEmptyCell(currentItemForAdd.value, inputValue.value);
  }

}
</script>
<style scoped>
.inventary__leftbar-cell:hover {
  border-color: green !important;
}
.inventary {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 1fr 72px;
  gap: 20px 20px;
  grid-template-areas:
    "leftbar content"
    "footer footer";
}
.inventary__content { grid-area: content; }
.inventary__leftbar { grid-area: leftbar; }
.inventary__footer { grid-area: footer; }

.inventary__leftbar {
	background-color: #2D2D2D;
	border-radius: 12px;
	padding-left: 14px;
	padding-right: 14px;
	padding-top: 18px;
}

.inventary__footer-body {
  background-color: #2D2D2D;
  border: 1px solid #4D4D4D;
  border-radius: 12px;
  padding: 18px;
  width: 856px;
}
.inventary__footer-content {
  width: 100%;
  height: 36px;
  background-color: #3C3C3C;
  border-radius: 12px;
  color: white;
  text-align: center;
  /* display: table-cell; */
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inventary__leftbar-img {
  max-width: 350px;
  width: 205px;
  margin: auto;
}
.inventary__leftbar-title {
  color: lightcyan;
}
.inventary__leftbar-wrap {
  background-color: #3a312c;
  height: 195px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}
.inventary__leftbar-block {
  display: flex;
  justify-content: center;
  gap: 4px;
  padding-top: 10px;
}
.inventary__input {
  max-width: 90px;
  padding: 12px;
  background-color: #4D4D4D;
  outline: none;
  border-radius: 8px;
  border: none;
  color: white;

  width: -webkit-fill-available;

}


</style>
