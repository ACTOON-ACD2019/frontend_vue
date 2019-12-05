<template>
  <div class="test">
    <canvas id="cv1" />
  </div>
</template>

<script>
import jQuery from "jquery";
let $ = jQuery;
//var canvas = new editor("cv1"); // initializing editor class with canvas id 'cv1'

export default {
  data() {
    return {
      width: 800,
      height: 600,
      canvas: new editor("cv1")
    };
  },
  mounted() {
    this.canvas.init(this.width, this.height);
  },
  created() {
    this.$EventBus.$on("addCanvasImage", url => {
      console.log("캔버스에 이미지 생성");
      this.canvas.addImage(url, null);
      this.$EventBus.$emit("refreshLayer");
    });
  },
};
</script>

<style scoped>
.test {
  position: absolute;
  padding-top: 2%;
  padding-left: 2%;
}
</style>
