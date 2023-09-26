import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { inventoryStartItems } from '@/config/startPositionItems.js'

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
      this.inventoryList.length = 0;
      this.inventoryList.push(...inventoryStartItems);
      for (let i = 3; i < 25; i++) {
        const randomId = i + 1;
        this.inventoryList.push({icon: '', counter: 0, position: i + 1, isEmpty: true, id: randomId});
      }
    },
    async deleteItemsInState(value, changeItem) {
      this.inventoryList.map((el)=> {
        if(el.id === changeItem.id) {
          if(el.counter < value) {alert('Недопустимое количество!'); return};
          if(el.counter === Number(value)) {
            el.counter = null;
            el.icon = '';
            el.isEmpty = true;
          } else el.counter = el.counter - Number(value);
        }
      })
    },
    async onSetNewPosition(droppingId, droppedId) {
      let tempData = {};
      this.inventoryList.map((el)=> {
        if(el.id === Number(droppingId)) {
          tempData = {...el};
          el.icon = '';
          el.isEmpty = true;
          el.counter = null;
        }
      })
      this.inventoryList.map((el)=> {
        if(el.id === Number(droppedId)) {
          el.icon = tempData.icon;
          el.counter = tempData.counter;
          el.isEmpty = false;
        }
      })
    },
    getItemByID(droppedId) {
      let item = {}
      this.inventoryList.forEach((el)=> {
        if(el.id === Number(droppedId)) item = el
      })
      return item;
    }
  },
});
