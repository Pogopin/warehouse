import { defineStore } from 'pinia';
import { inventoryStartItems } from '@/config/startPositionItems.js';

const id = "inventory-store";
export const useInventoryStore = defineStore(id, {
  state: () => {
    return {
      inventoryList: [],
    };
  },
  getters: {
    getInventoryListData: (state) => state.inventoryList,
  },
  actions: {
    fillInventoryCells() {
      if(localStorage.getItem('list')) {
        this.inventoryList = JSON.parse(localStorage.getItem('list'))
      } else {
			this.inventoryList.length = 0;
			this.inventoryList.push(...inventoryStartItems);
			for (let i = 3; i < 25; i++) {
			  const randomId = i + 1;
			  this.inventoryList.push({icon: '', counter: 0, position: i + 1, isEmpty: true, id: randomId});
			}
		}
    },
    async deleteItemsInState(value, changeItem) {
      this.inventoryList.map((el)=> {
        if(el.id === changeItem.id) {
          if(el.counter < value) {alert('Недопустимое количество!'); return};
          (el.counter === +(value)) ? (
            el.counter = null,
            el.icon = '',
            el.isEmpty = true
           ) : (el.counter = el.counter - +(value));
        }
      })
    },
    async onSetNewPosition(droppingId, droppedId) {
      let tempData = {};
      this.inventoryList.map((el)=> {
        (el.id === +(droppingId)) ? (
          tempData = {...el},
          el.icon = '',
          el.isEmpty = true,
          el.counter = null
        ) : (false);
      })
      this.inventoryList.map((el)=> {
        (el.id === +(droppedId)) ? (
          el.icon = tempData.icon,
          el.counter = tempData.counter,
          el.isEmpty = false
        ) : (false);
      })
    },
    getItemByID(droppedId) {
      const item = this.inventoryList.find(item => item.id === +(droppedId));
      return item;
    },
    checkItemStatusInList(name) { //проверка, есть ли уже item в инвентаре, и возвращаем его индекс
      const foundIndex = this.inventoryList.findIndex(item => item.icon === name);
      return foundIndex;
    },
    addNewItemInList(value, index) {
      if(+value === 0) {alert('Недопустимое количество'); return}
      this.inventoryList[index].counter += +(value);
    },
    findFirstEmptyCell(activeItem, quantity) {
      const indexEmptyCell = this.inventoryList.findIndex(item => item.isEmpty === true);
      this.inventoryList[indexEmptyCell].icon = activeItem
      this.inventoryList[indexEmptyCell].counter += +(quantity)
      this.inventoryList[indexEmptyCell].isEmpty = false
    },
    saveInLocalStorage() {
      console.log('сохранено');
      localStorage.setItem('list', JSON.stringify(this.inventoryList));
    }
  },
});
