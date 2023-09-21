import { defineAsyncComponent } from 'vue';

const MagentaRect = defineAsyncComponent(() => import('./icon/magentaRect.vue'))
const GreenRect = defineAsyncComponent(() => import('./icon/greenRect.vue'))
const YellowRect = defineAsyncComponent(() => import('./icon/yellowRect.vue'))

const Inventory = defineAsyncComponent(() => import('./inventory/index.vue'))
const Cell = defineAsyncComponent(() => import('./cell/index.vue'))
const Grid = defineAsyncComponent(() => import('./grid/index.vue'))
const Icon = defineAsyncComponent(() => import('./icon/index.vue'))
const Modal = defineAsyncComponent(() => import('./modal/index.vue'))


export {  Inventory, Cell, Grid, MagentaRect, GreenRect, YellowRect, Icon, Modal }
