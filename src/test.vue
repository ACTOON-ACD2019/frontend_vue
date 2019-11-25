Skip to content
Why GitHub? 
Enterprise
Explore 
Marketplace
Pricing 
Search

Sign in
Sign up
361.5k716rowanwins/vue-dropzone
 Code Issues 71 Pull requests 14 Projects 0 Security Insights
Join GitHub today
GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together.

vue-dropzone/docs/src/pages/demo.vue
@rowanwins rowanwins Update package version
f11aa0a on 25 Mar
@vrajroham@rowanwins@ansidev@AlexanderYW
Executable File  456 lines (444 sloc)  11.7 KB
  
<template>
  <div>
    <h1>Demo</h1>
    <p>Below you can see Vue2-Dropzone in action.</p>
    <vue-dropzone ref="myVueDropzone" id="dropzone"
      @vdropzone-file-added="vfileAdded"
      @vdropzone-success="vsuccess"
      @vdropzone-error="verror"
      @vdropzone-removed-file="vremoved"
      @vdropzone-sending="vsending"
      @vdropzone-success-multiple="vsuccessMuliple"
      @vdropzone-sending-multiple="vsendingMuliple"
      @vdropzone-queue-complete="vqueueComplete"
      @vdropzone-total-upload-progress="vprogress"
      @vdropzone-mounted="vmounted"
      @vdropzone-drop="vddrop"
      @vdropzone-drag-start="vdstart"
      @vdropzone-drag-end="vdend"
      @vdropzone-drag-enter="vdenter"
      @vdropzone-drag-over="vdover"
      @vdropzone-drag-leave="vdleave"
      @vdropzone-duplicate-file="vdduplicate"
      :options="dropzoneOptions"
      >
    </vue-dropzone>
  </div>
</template>

<script>
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
var example = `
<vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
....
dropzoneOptions: {
    url: 'https://httpbin.org/post',
    thumbnailWidth: 150,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" }
}`
export default {
  data() {
    return {
      ok: true,
      example: "````" + example + "````",
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 50,
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true
      },
      fileAdded: false,
      filesAdded: false,
      success: false,
      error: false,
      removedFile: false,
      sending: false,
      successMultiple: false,
      sendingMultiple: false,
      queueComplete: false,
      uploadProgress: false,
      progress: false,
      myProgress: 0,
      isMounted: false,
      dDrop: false,
      dStarted: false,
      dEnded: false,
      dEntered: false,
      dOver: false,
      dLeave: false
    }
  },
  components: {
    vueDropzone,
  },
  methods: {
    vfileAdded(file) {
      this.fileAdded = true
      // window.toastr.info('', 'Event : vdropzone-file-added')
    },
    vfilesAdded(file) {
      this.filesAdded = true
      // window.toastr.info('', 'Event : vdropzone-files-added')
    },
    vsuccess(file, response) {
        alert("aaa")
      this.success = true
      // window.toastr.success('', 'Event : vdropzone-success')
    },
    verror(file) {
      this.error = true
      // window.toastr.error(file.upload.filename, 'Event : vdropzone-error - ' + file.status)
    },
    vremoved(file, xhr, error) {
      this.removedFile = true
      // window.toastr.warning('', 'Event : vdropzone-removedFile')
    },
    vsending(file, xhr, formData) {
      this.sending = true
      // window.toastr.warning('', 'Event : vdropzone-sending')
    },
    vsuccessMuliple(files, response) {
      this.successMultiple = true
      alert("bbb")
      // window.toastr.success('', 'Event : vdropzone-success-multiple')
    },
    vsendingMuliple(file, xhr, formData) {
      this.sendingMultiple = true
      // window.toastr.warning('', 'Event : vdropzone-sending-multiple')
    },
    vqueueComplete(file, xhr, formData) {
      this.queueComplete = true
      alert("ccc")
      // window.toastr.success('', 'Event : vdropzone-queue-complete')
    },
    vprogress(totalProgress, totalBytes, totalBytesSent) {
      this.progress = true
      this.myProgress = Math.floor(totalProgress)
      // window.toastr.success('', 'Event : vdropzone-sending')
    },
    vmounted() {
      this.isMounted = true
    },
    vddrop() {
      this.dDrop = true
    },
    vdstart() {
      this.dStarted = true
    },
    vdend() {
      this.dEnded = true
    },
    vdenter() {
      this.dEntered = true
    },
    vdover() {
      this.dOver = true
    },
    vdleave() {
      this.dLeave = true
    },
    vdduplicate() {
      this.dDuplicate = true
    }
  },
  watch: {
    fileAdded() {
      let that = this
      setTimeout(function() {
        that.fileAdded = false
      }, 2000)
    },
    filesAdded() {
      let that = this
      setTimeout(function() {
        that.filesAdded = false
      }, 2000)
    },
    success() {
      let that = this
      setTimeout(function() {
        that.success = false
      }, 50)
    },
    error() {
      let that = this
      setTimeout(function() {
        that.error = false
      }, 2000)
    },
    removedFile() {
      let that = this
      setTimeout(function() {
        that.removedFile = false
      }, 2000)
    },
    sending() {
      let that = this
      setTimeout(function() {
        that.sending = false
      }, 2000)
    },
    successMultiple() {
      let that = this
      setTimeout(function() {
        that.successMultiple = false
      }, 2000)
    },
    sendingMultiple() {
      let that = this
      setTimeout(function() {
        that.sendingMultiple = false
      }, 2000)
    },
    queueComplete() {
      let that = this
      setTimeout(function() {
        that.queueComplete = false
      }, 2000)
    },
    progress() {
      let that = this
      setTimeout(function() {
        that.progress = false
      }, 2000)
    },
    isMounted() {
      let that = this
      setTimeout(function() {
        that.isMounted = false
      }, 2000)
    },
    dDrop() {
      let that = this
      setTimeout(function() {
        that.dDrop = false
      }, 2000)
    },
    dStarted() {
      let that = this
      setTimeout(function() {
        that.dStarted = false
      }, 2000)
    },
    dEnded() {
      let that = this
      setTimeout(function() {
        that.dEnded = false
      }, 2000)
    },
    dEntered() {
      let that = this
      setTimeout(function() {
        that.dEntered = false
      }, 2000)
    },
    dOver() {
      let that = this
      setTimeout(function() {
        that.dOver = false
      }, 2000)
    },
    dLeave() {
      let that = this
      setTimeout(function() {
        that.dLeave = false
      }, 2000)
    },
    dDuplicate() {
      let that = this
      setTimeout(function() {
        that.dDuplicate = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.active {
  color: #78CB5B;
}
.inactive {
  color: #fff000;
}
.fa.fa-circle:before {
  content: "\25C9";
  /*color: #000;*/
}
th {
  text-align: center;
}
td:nth-child(1) {
  text-align: center;
}
td:nth-child(3) {
  text-align: center;
}
td:nth-child(2) {
  padding-left: 40px;
}
.event-active {
  font-weight: bold;
  color: #78CB5B;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}
</style>