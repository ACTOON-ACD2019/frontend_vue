<template>
  <div class="vue-canvas">
    <canvas id="cv1" ref="canv" />
  </div>
</template>

<script>
import jQuery from "jquery";
import Config from "../../config/config";

export default {
  props: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    }
  },
  data() {
    return {
      layers: [],
      idx: 0
    };
  },
  mounted: function() {
    var canvas = new fabric.Canvas("cv1", {
      //backgroundImage: require("@/assets/canvas_back.jpg"),
      width: this.width,
      height: this.height
    });
    canvas.selection = false;
    this.canvas = canvas;
    this.canvas.setBackgroundImage(
      require("@/assets/canvas_back.jpg"),
      canvas.renderAll.bind(canvas),
      {
        opacity: 0.5,
        width: this.width,
        height: this.height
      }
    );

    // this.canvas.on("mouse:down", target => {
    //   // console.log(target);
    //   // var activeObj = this.canvas.getActiveObject();
    //   // console.log(this.canvas.getObjects().indexOf(activeObj));
    // });
    fabric.util.addListener(canvas.upperCanvasEl, "click", (e) => {
      let objType = canvas.findTarget(e).type;
      console.log(objType);
      if (objType == "image") {
        this.$EventBus.$emit("selectLayer", canvas.getObjects().indexOf(canvas.findTarget(e)));
      }
    });

    fabric.util.addListener(canvas.upperCanvasEl, "dblclick", function(e) {
      let objType = canvas.findTarget(e).type;
      console.log(objType);
      if (objType == "image") {
        alert("이미지");
      }
    });

    canvas.renderAll();
  },
  created() {
    this.$EventBus.$on("resetCanvas", () => {});
    this.$EventBus.$on("addCanvasImage", obj => {
      console.log("이미지 생성 시작");
      fabric.Image.fromURL(
        Config.link + "media/" + obj.background.file,
        oImg => {
          this.canvas.add(oImg);
          this.idx = this.canvas.getObjects().indexOf(oImg);
          this.$EventBus.$emit("addLayer", obj.background, this.idx);
        }
      );
      for (let i = 0; i < obj.bubbles.length; i++) {
        fabric.Image.fromURL(
          Config.link + "media/" + obj.bubbles[String(i)].file,
          oImg => {
            this.canvas.add(oImg);
            this.idx = this.canvas.getObjects().indexOf(oImg);
            this.$EventBus.$emit("addLayer", obj.bubbles[String(i)], this.idx);
          }
        );
      }
    });
  },
  methods: {
    load() {
      console.log("dd");
    }
  }
};
</script>

<style scoped>
.vue-canvas {
  position: absolute;
  text-align: center;
}
</style>
