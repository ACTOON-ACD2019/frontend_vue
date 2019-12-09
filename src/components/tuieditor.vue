<template>
  <tui-image-editor
    ref="tuiImageEditor"
    :include-ui="useDefaultUI"
    :options="options"
    @addText="onAddText"
    @objectMoved="onObjectMoved"
  ></tui-image-editor>
</template>

<script>
import "tui-color-picker/dist/tui-color-picker.css";
import { ImageEditor } from "@toast-ui/vue-image-editor";

const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
var blackTheme = {
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc
};

export default {
  components: {
    "tui-image-editor": ImageEditor
  },
  props: {
    src: String
  },
  data() {
    return {
      url: "",
      useDefaultUI: true,
      options: {
        includeUI: {
          loadImage: {
            path: this.src,
            name: "editImage"
          },
          theme: blackTheme,
          uiSize: {
            width: "100%",
            height: "1000px"
          },
          menuBarPosition: "left"
        },
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
        }
      }
    };
  },
  mounted() {
    $(".tui-image-editor-download-btn").replaceWith(
      '<button class="tui-image-editor-download-btn">Save</button>'
    );
  },
  created() {
    document.addEventListener("click", evt => {
      if (evt.target.className == "tui-image-editor-download-btn") {
        this.url = this.$refs.tuiImageEditor.invoke("toDataURL");
        var file = this.dataURLtoFile(this.url, "editimage");
        console.log(file);
        alert("이미지가 수정되었습니다.");
        this.$EventBus.$emit("imageEditorClose");
      }
    });
  },
  methods: {
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    onAddText(res) {
      console.group("addText");
      console.log("Client Position : ", res.clientPosition);
      console.log("Origin Position : ", res.originPosition);
      console.groupEnd();
    },
    onObjectMoved(res) {
      console.group("objectMoved");
      console.log("Left : ", res.left);
      console.log("Top : ", res.top);
      console.groupEnd();
    }
  }
};
</script>

<style scoped>
</style>