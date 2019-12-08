<template>
  <div class="vue-canvas">
    <canvas id="cv1" ref="canv" />
  </div>
</template>

<script>
import jQuery from "jquery";
import Config from '../../config/config'

export default {
  data() {
    return {
      width: 800,
      height: 600,
      canvas: new editor("cv1"),
      layers: []
    };
  },
  mounted() {
    this.canvas.init(this.width, this.height);
  },
  created() {
    this.$EventBus.$on("addCanvasImage", obj => {
      console.log("이미지 생성 시작");
      this.canvas.addImage(Config.link + "media/" + obj.background.file, null);
      this.$EventBus.$emit("refreshLayer", obj.background);
      for (let i = 0; i < obj.bubbles.length; i++) {
        this.canvas.addImage(Config.link + "media/" + obj.bubbles[String(i)].file, null);
        this.$EventBus.$emit("refreshLayer", obj.bubbles[String(i)]);
      }
      //console.log(this.canvas.getImageInfo().length);
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
