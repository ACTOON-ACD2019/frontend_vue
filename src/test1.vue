<template>
  <div id="test">
    <file-pond
      name="test"
      ref="pond"
      label-idle="Drag and drop to upload content!<br />...or click to select a file from your computer"
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="options"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
    />
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
import Config from "../config/config";
import "../dist/filepond.min.css";
import "../dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const FilePonds = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  data: function() {
    return {
      options: {
        url: Config.link + "api/media/" + localStorage.getItem("project") + "/",
        headers : {
          Authorization: localStorage.getItem("auth")
        }
      },
      myFiles: []
    };
  },
  methods: {
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // FilePond instance methods are available on `this.$refs.pond`
    }
  },
  components: {
    FilePonds
  }
};
</script>