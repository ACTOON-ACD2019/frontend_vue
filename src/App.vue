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
  position:relative;
  height: 100%;
  width: 100%;
}

.app {
  position:relative;
  height: 100%;
  width: 100%;
}

.scrollbar {
  background-color: white;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}

#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

.my-modal {
  position:relative;
  z-index:50;
}

.tui-image-editor-container .color-picker-control {
  padding: 2px;
}
span {
  margin-left: 1px;
  transform: translate(0,8px);
}
</style>