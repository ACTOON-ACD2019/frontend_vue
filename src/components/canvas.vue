<template>
  <div class="vue-canvas">
    <canvas id="cv1" ref="canv" />
  </div>
</template>

<script>
import jQuery from "jquery";

export default {
  data() {
    return {
      width: 640,
      height: 480,
      canvas: new editor("cv1"),
      layers: []
    };
  },
  mounted() {
    this.canvas.init(this.width, this.height);
  },
  created() {
    this.$EventBus.$on("addCanvasImage", url => {
      console.log("이미지 생성 url = ", url);
      this.canvas.addImage(url, null);
      console.log(this.canvas.canvas._objects);

      
      // for (let i in (this.canvas.canvas._objects.length+1)){
      //   this.layers.push({
      //     name : this.canvas.canvas._objects[i].name,
      //     type : "이미지"
      //   })
      // }
      // console.log(this.canvas.canvas._objects[0])
      // console.log(this.layers)
      //this.$EventBus.$emit("refreshLayer",this.canvas.canvas._objects);
    });
  }
};
</script>

<style scoped>
.vue-canvas {
  position: absolute;
  text-align: center;
}
</style>
