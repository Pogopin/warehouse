<template>  
  <div class="layout">    
    <div class="layout__content">
      <RouterView />
    </div>    
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.layout__content {
  flex: 1;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
