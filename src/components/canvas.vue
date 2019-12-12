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
      width: this.width,
      height: this.height,
      preserveObjectStacking: true
    });
    canvas.selection = false;
    this.canvas = canvas;
    this.canvas.setBackgroundImage(
      require("@/assets/c_back1.jpg"),
      canvas.renderAll.bind(canvas),
      {
        backgroundImageStretch: true,
        opacity: 0.7,
        width: this.width,
        height: this.height
      }
    );

    fabric.util.addListener(canvas.upperCanvasEl, "click", e => {
      let objType = canvas.findTarget(e).type;
      if (objType != "") {
        this.$EventBus.$emit(
          "selectLayer",
          canvas.getObjects().indexOf(canvas.findTarget(e))
        );
      }
    });

    fabric.util.addListener(canvas.upperCanvasEl, "dblclick", e => {
      let objType = canvas.findTarget(e).type;
      if (objType != "") {
        this.$EventBus.$emit(
          "imageEditorOpen",
          canvas.findTarget(e)._element.src
        );
      }
    });
    document.onkeydown = evt => {
      evt = evt || window.event;
      if (evt.keyCode === 46) {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
        }
      }
    };
    canvas.renderAll();
  },
  created() {
    this.$EventBus.$on("editCanvas", (width, height) => {
      this.canvas.setWidth(width);
      this.canvas.setHeight(height);
      this.canvas.calcOffset();
      this.canvas.setBackgroundImage(
        require("@/assets/c_back1.jpg"),
        this.canvas.renderAll.bind(this.canvas),
        {
          backgroundImageStretch: true,
          opacity: 0.7,
          width: width,
          height: height
        }
      );
      this.canvas.renderAll();
    });
    this.$EventBus.$on("resetCanvas", () => {
      this.canvas.clear();
    });

    this.$EventBus.$on("selectObject", index => {
      this.canvas.setActiveObject(this.canvas.item(index));
    });

    this.$EventBus.$on("moveObject", () => {
      this.canvas.setActiveObject(this.canvas.item(index));
    });

    this.$EventBus.$on("addCanvasImage", obj => {
      console.log("이미지 생성 시작");
      fabric.Image.fromURL(
        Config.link + "media/" + obj.background.file,
        oImg => {
          this.canvas.add(oImg);
          this.idx = this.canvas.getObjects().indexOf(oImg);
          oImg.set({
            type: obj.background.type,
            sequence: obj.background.sequence,
            idx: this.idx
          });
          this.$EventBus.$emit("addLayer", obj.background, this.idx);
        }
      );
      for (let i = 0; i < obj.bubbles.length; i++) {
        fabric.Image.fromURL(
          Config.link + "media/" + obj.bubbles[String(i)].file,
          oImg => {
            this.canvas.add(oImg);
            this.idx = this.canvas.getObjects().indexOf(oImg);
            oImg.set({
              type: obj.bubbles[String(i)].type,
              sequence: obj.bubbles[String(i)].sequence,
              sub_sequence: obj.bubbles[String(i)].sub_sequence,
              idx: this.idx
            });
            this.$EventBus.$emit("addLayer", obj.bubbles[String(i)], this.idx);
          }
        );
      }
    });

    this.$EventBus.$on("zindexUp", idx => {
      var canvasObjs = this.canvas.getObjects();
      var canvasObj = canvasObjs[String(idx)];
      this.canvas.bringToFront(canvasObj);
      fabric.Canvas.prototype.orderObjects = function(compare) {
        this._objects.sort(compare);
        this.renderAll();
      };
    });

    this.$EventBus.$on("zindexDown", idx => {
      var canvasObjs = this.canvas.getObjects();
      var canvasObj = canvasObjs[String(idx)];
      this.canvas.sendToBack(canvasObj);
      fabric.Canvas.prototype.orderObjects = function(compare) {
        this._objects.sort(compare);
        this.renderAll();
      };
    });

    this.$EventBus.$on("saving", () => {
      var canvasObjs = this.canvas.getObjects();
      console.log(canvasObjs);
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
