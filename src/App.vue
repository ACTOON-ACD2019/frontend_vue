<template>
  <div class="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>

html, body{
  height: 100%;
  width: 100%;
}

.app {
  height: 100%;
  width: 100%;
}

.my-modal {
  z-index:5;
}
.tui-image-editor-container .color-picker-control {
  padding: 2px;
}
</style>