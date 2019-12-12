<template>
  <div class="thumnail">
    <div>
      <img :src="link" width="50" height="50" />
    </div>
    <div>
      {{ project }}
      <span style="font-size:10px;">{{ desc }}</span>
      <br />
      <span style="font-size:10px;">{{ date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: require('@/assets/empty.png')
    };
  },
  props: ["project", "src", "date", "desc"],
  watch: {
    project: function(newVal, oldVal) {
      if (this.src == "") {
        this.link = require('@/assets/empty.png')
      } else this.link = this.src;
    }
  }
};
</script>

<style scoped>
.thumnail {
  width: 100%;
  height: 50px;
}
.thumnail > div {
  float: left;
}
.thumnail > div > img {
  margin-right: 10px;
}
.thumnail > div > span {
  vertical-align: bottom;
}
</style>

