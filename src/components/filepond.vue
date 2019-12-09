<template>
  <div id="test">
    <div v-if="!optseleted">
      <span style="font-weight:bold">Please Select Image Option</span>
      <br />
      <br />
      <span style="font-weight:bold">Comic Genre</span>
      <b-form-group>
        <b-form-radio-group
          id="radio-group-1"
          v-model="selectedOpt.genre"
          :options="image.genre"
          name="genre"
        ></b-form-radio-group>
      </b-form-group>
      <span style="font-weight:bold">Background Color</span>
      <b-form-group>
        <b-form-radio-group
          id="radio-group-2"
          v-model="selectedOpt.bgcolor"
          :options="image.bgcolor"
          name="bgcolor"
        ></b-form-radio-group>
      </b-form-group>
      <span style="font-weight:bold">Which language to translate</span>
      <b-form-group>
        <b-form-radio-group
          id="radio-group-3"
          v-model="selectedOpt.language"
          :options="image.language"
          name="language"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-valid-feedback :state="state">
        <b-button @click="()=>{this.optseleted = !this.optseleted}">Confirm</b-button>
      </b-form-valid-feedback>
    </div>

    <div v-else>
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

    <preview-image title="Preview Image" :visible.sync="previewImage">
      <div class="modal_body">
        <div class="label_container">
          <img :src="previewURL" class="preview-image" />
        </div>
        <div class="label_container">
          <b-button variant="secondary" @click="showPreview()" size="lg">Confirm</b-button>
        </div>
      </div>
    </preview-image>
  </div>
</template>

<script>
import vueFilePond from "vue-filepond";
import PreviewImage from "./showmodal";
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
      optseleted: false,
      image: {
        genre: [{ text: "Comic", value: "C" }, { text: "Webtoon", value: "W" }],
        bgcolor: [{ text: "Black", value: "B" }, { text: "White", value: "W" }],
        language: [
          { text: "Korean", value: "K" },
          { text: "English", value: "E" }
        ]
      },
      selectedOpt: {
        genre: "",
        bgcolor: "",
        language: ""
      },
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
              console.log(response.data.proceeded_image);
              this.previewURL =
                Config.link + "media/" + response.data.proceeded_image;
              this.showPreview();
              load(response.data);
              this.$EventBus.$emit("loadCut");
            })
            .catch(error => {
              alert("시간 초과가 발생했습니다. 서버의 상태를 확인해주세요.");
              console.log("Request cancelled", error.message);
            });
        }
      },
      myFiles: [],
      previewImage: false,
      previewURL: ""
    };
  },
  methods: {
    showPreview() {
      this.previewImage = !this.previewImage;
    },
    handleFilePondInit: function() {
      console.log("FilePond has initialized");
    }
  },
  computed: {
    state() {
      return Boolean(
        this.selectedOpt.genre &&
          this.selectedOpt.bgcolor &&
          this.selectedOpt.language
      );
    }
  },
  components: {
    FilePonds,
    PreviewImage
  }
};
</script>

<style scoped>
.optLabel {
  font-weight: bold;
  font-size: 20px;
}
</style>