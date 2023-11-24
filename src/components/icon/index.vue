<template>
    <component :is="iconComponent[props.name]" />
</template>

<script setup>
import {ref, computed, watch, defineProps} from "vue";
import { YellowRect, GreenRect, MagentaRect } from '@/components';

const iconComponent = {
    YellowRect, GreenRect, MagentaRect
}
const props = defineProps({
    name: {
        type: String,
        required: false,
    }
});
</script>
