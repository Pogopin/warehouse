import { defineAsyncComponent } from 'vue';

const BaseButton = defineAsyncComponent(() => import('./baseButton/index.vue'));
const BaseInput = defineAsyncComponent(() => import('./baseInput/index.vue'));

export { BaseButton, BaseInput }
