<template>
  <div class="userlayer">
    <b-badge>Layers</b-badge>
    <div>
        <div>
          <b-form-select class="force-overflow loadcut scrollbar" id="style-1" v-model="selected" :options="layers" :select-size="6s"></b-form-select>
        </div>
      </div>
    <b-button class="bt-layer" size="sm" @click="zUp()">▲</b-button>
    <b-button class="bt-layer" size="sm" @click="zDown()">▼</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      layers: [
        { value: "1", text: "1", idx:"1"},
        { value: "1", text: "2", idx:"2" },
        { value: "1", text: "3", idx:"3" },
        { value: "1", text: "4", idx:"4" },
        { value: "1", text: "5", idx:"5" },
        { value: "1", text: "6", idx:"6" },
        { value: "1", text: "7", idx:"7" },
        { value: "1", text: "8", idx:"8" },
        { value: "1", text: "9", idx:"9" },
        { value: "1", text: "10", idx:"10" },
        { value: "1", text: "11", idx:"11" },
        { value: "1", text: "12", idx:"12" },
        { value: "1", text: "13", idx:"13" },
        { value: "1", text: "14", idx:"14" },
        { value: "1", text: "15", idx:"15" }
      ],
    };
  },
  created() {
    this.$EventBus.$on("refreshLayer", objects => {
      this.layers = [
        
      ];

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
  text-align: left;
}



.bt-layer {
  float:left;
  width:50%;
}
</style>