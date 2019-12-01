<template>
  <div class="fabric">
    <fabric-canvas>
      <fabric-circle :id="2"></fabric-circle>
      <fabric-image-from-url :id="'someUUID'"></fabric-image-from-url>
    </fabric-canvas>
  </div>
</template>

<script>
import vueFabricWrapper from "vue-fabric-wrapper";

export default {
  name: "fabric",
  data(){
    return {
      url:"./img/1.jpg"
    }
  },
  components: {
    FabricCanvas: vueFabricWrapper.FabricCanvas,
    FabricCircle: vueFabricWrapper.FabricCircle,
    FabricImageFromUrl: vueFabricWrapper.FabricImageFromUrl
  },
  methods:{
    print(){
      console.log("움직임 감지")
    }
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
