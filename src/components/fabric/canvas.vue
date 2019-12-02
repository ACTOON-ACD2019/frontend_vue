<template>
  <div class="fabric">
    <fabric-canvas :width="800" :height="400">
      <fabric-circle :id="2"></fabric-circle>
      <fabric-image :url="url" :id="3"></fabric-image>
    </fabric-canvas>
  </div>
</template>

<script>
import vueFabricWrapper from "vue-fabric-wrapper";

export default {
  name: "fabric",
  data(){
    return {
      url:"../img/1.jpg"
    }
  },
  components: {
    FabricImage: vueFabricWrapper.FabricImageFromURL
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
