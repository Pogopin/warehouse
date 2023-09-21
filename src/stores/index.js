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
        this.inventoryList.push({icon: '', counter: 0, position: i + 1, isEmpty: true, id: randomId, isDraggable: false,});
      }
      // console.log(this.inventoryList);
    }

  },
});
