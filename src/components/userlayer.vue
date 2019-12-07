<template>
  <div class="userlayer">
    레이어 목록
    <b-form-select v-model="selected" :options="layers" :select-size="7"></b-form-select>
    <b-button variant="primary" size="sm" @click="zUp()">▲</b-button>
    <b-button variant="primary" size="sm" @click="zDown()">▼</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      layers: [],
    };
  },
  created() {
    this.$EventBus.$on("refreshLayer", objects => {
      this.layers = [];

      // for (let i in objects) {
      //   console.log(i);
      //   // this.layers.push({
      //   //   url: Config.link + "media/" + obj[j][i].file,
      //   //   type: obj[j][i].type,
      //   //   sequence: obj[j][i].sequence
      //   // });
      // }
    });
  },
  methods: {
    zUp() {
      //console.log(this.$parent.$children[0].$refs.canv);
      var canvas = this.$parent.$children[0].$refs.canv;
      var ctx = canvas.getContext("2d");
      //console.log("ctx = ", ctx)
    },
    zDown() {
      console.log("레이어 우선순위 변경");
    }
  }
};
</script>

<style scoped>
.userlayer {
  height: 100%;
}
</style>