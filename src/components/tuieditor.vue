<template>
  <div class="imageEditorApp">

    <tui-image-editor
      ref="tuiImageEditor"
      :include-ui="useDefaultUI"
      :options="options"
      @addText="onAddText"
      @objectMoved="onObjectMoved"
    ></tui-image-editor>
  </div>
</template>

<script>
import "tui-color-picker/dist/tui-color-picker.css";
import { ImageEditor } from '@toast-ui/vue-image-editor';

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
  data() {
    return {
      useDefaultUI: true,
      options: {
        includeUI: {
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
  methods: {
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
<style>


</style>