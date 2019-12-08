<template>
  <div class="userlayer">
    <h4>
      <b-badge variant="dark">Layers</b-badge>
    </h4>
    <b-form-select
      variant="dark"
      class="force-overflow loadcut scrollbar"
      id="style-1"
      v-model="selected"
      :options="layers"
      :select-size="7"
    ></b-form-select>

    <b-button variant="dark" class="bt-layer" size="sm" @click="zUp()">▲</b-button>
    <b-button variant="dark" class="bt-layer" size="sm" @click="zDown()">▼</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      layers: []
    };
  },
  created() {
    this.$EventBus.$on("refreshLayer", objects => {
      if (objects.type == "BU") {
        this.layers.push({
          value: objects,
          text: "컷 " + objects.sequence + " : " + objects.type,
        });
      } else {
        this.layers.push({
          value: objects,
          text: "컷 " + objects.sequence + " : " + objects.type + objects.sequence,
        });
      }
    });
  },
  methods: {
    zUp() {
      console.log("a");
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
  float: left;
  width: 50%;
}
</style>