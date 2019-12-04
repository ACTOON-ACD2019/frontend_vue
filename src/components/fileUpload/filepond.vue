<template>
    <div class="dropbox">
      <input
        class="input-file"
        type="file"
        @change="upload($event.target.name, $event.target.files)"
        @drop="upload($event.target.name, $event.target.files)"
      />
      <br /><br /><br />
      <h3>Drag and drop to upload content!</h3>
      <br />
      <h4>...or click to select a file from your computer</h4>
      <br /><br /><br />
    </div>
</template>

<script>
import Config from '../../../config/config'
export default {
  methods: {
    upload(name, files) {
      console.log("파일 업로드 시작");
      const formData = new FormData();
      
      const url = Config.link + "api/media/" + localStorage.getItem("project") + "/";
      console.log(url);
      formData.append('media_type', 'TO');
      formData.append('file', files[0]);
      this.$http
        .post(
          url,
          formData
        )
        .then(response => {
          alert("파일이 업로드 되었습니다.")
          console.log("파일 업로드 성공");
        })
        .catch(error => {
          console.log("파일 업로드 실패");
        });
    }
  }
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed #aaa;
  background: #7fb4dd;
  width: 500px;
  height: auto;
  position: relative;
  margin: 0 auto;
}
.dropbox > h2 {
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 2;
}
.input-file {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>