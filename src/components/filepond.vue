<template>
  <div id="test">
    <file-pond
      name="test"
      ref="pond"
      label-idle="Drag and drop to upload content!<br />...or click to select a file from your computer"
      v-bind:allow-multiple="false"
      accepted-file-types="image/jpeg, image/png"
      :server="options"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
    />
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
import Config from "../../config/config";
import "../../dist/filepond.min.css";
import "../../dist/filepond-plugin-image-preview.css";
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
        headers: {
          Authorization: localStorage.getItem("auth"),
          "Content-Type": "multipart/form-data"
        },
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const formData = new FormData();
          const url =
            Config.link + "api/media/" + localStorage.getItem("project") + "/";
          formData.append("media_type", "TO");
          formData.append("file", file);

          this.$http({
            method: "post",
            url: url,
            data: formData,
            onUploadProgress: e => {
              progress(e.lengthComputable, e.loaded, e.total);
            }
          })
            .then(response => {
              console.log(response);
              alert("성공적으로 업로드 되었습니다.");
              load(response.data);
              this.$EventBus.$emit("filepond");
              this.$EventBus.$emit("loadCut");
            })
            .catch(thrown => {
              console.log("Request cancelled", thrown.message);
            });
        }
      },
      myFiles: []
    };
  },
  methods: {
    handleFilePondInit: function() {
      console.log("FilePond has initialized");
    }
  },
  components: {
    FilePonds
  }
};
</script>