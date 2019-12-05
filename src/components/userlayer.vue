<template>
  <div class="userlayer">
    레이어 목록
    <b-form-select v-model="selected" :options="layers" :select-size="9"></b-form-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected:"",
      layers:[]
    };
  },
  created() {
    this.$EventBus.$on("refreshLayer", () => {
      console.log("레이어 갱신");
    });
  }
};
</script>

<style scoped>
.userlayer {
  height: 100%;
}
</style>