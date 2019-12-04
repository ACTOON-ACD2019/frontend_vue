<template>
  <fcanvas :height="hsize" :width="wsize">
    <fabric-circle :id="2" :backgroundColor="color"></fabric-circle>
    <fabric-circle :id="3" :backgroundColor="bgcolor"></fabric-circle>
    <fabric-circle :id="4"></fabric-circle>
    <fabric-circle :id="5"></fabric-circle>
    <fabric-circle :id="6"></fabric-circle>
    <fabric-circle :id="7"></fabric-circle>
  </fcanvas>
</template>

<script>
import vueFabricWrapper from "vue-fabric-wrapper";
var fabric = vueFabricWrapper;
export default {
  name: "fabric",
  data() {
    return {
      bgcolor: '#000000',
      wsize: 640,
      hsize: 480,
      url: "../img/1.jpg",
      color: "rgba(0,255,0,1)"
    };
  },
  created() {
    this.$EventBus.$on("addCanvasImage", () => {
      //this.uploadModal = false;
    });
  },
  components: {
    fcanvas : fabric.FabricCanvas
  }
};
</script>

<style scoped>

</style>
