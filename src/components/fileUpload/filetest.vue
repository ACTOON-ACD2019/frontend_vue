<template>
  <div class="filepond">
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      @vdropzone-total-upload-progress="vprogress"
      :options="dropzoneOptions"
    >
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
        <div class="subtitle">...or click to select a file from your computer</div>
      </div>
    </vue-dropzone>
  </div>
</template>
<script>
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "filepond",
  components: {
    vueDropzone: vueDropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        url:
          "https://beta.actoon.sokdak.me/api/media/" +
          localStorage.getItem("project") +
          "/",
        thumbnailWidth: 300,
        thumbnailHeight: 300,
        headers: {
          Authorization: localStorage.getItem("auth")
        }
      }
    };
  },
  methods: {
    vprogress(totalProgress, totalBytes, totalBytesSent) {
      this.myProgress = Math.floor(totalProgress)
      if (this.myProgress == totalProgress){
        this.$EventBus.$emit('filepond');
      }
    }
  }
};
</script>
