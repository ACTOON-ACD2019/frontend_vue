
<template>
  <div class="optionalmenu">
    <div v-if="om_type == 1">
      <div class="om1">
        <b-button variant="outline-light">크기조절</b-button>
      </div>
      <div class="om1">
        <b-button variant="outline-light">HSV 변경</b-button>
      </div>
      <div class="om1">
        <b-button variant="outline-light">핸드 마스킹</b-button>
      </div>
    </div>
    <div v-else-if="om_type == 2">
      <div class="om2">
        <b-button variant="outline-light">진동</b-button>
      </div>
      <div class="om2">
        <b-button variant="outline-light">반짝이기</b-button>
      </div>
      <div class="om2">
        <b-button variant="outline-light">돌리기</b-button>
      </div>
      <div class="om2">
        <b-button variant="outline-light">회전하기</b-button>
      </div>
      <div class="om2">
        <b-button variant="outline-light">흔들기</b-button>
      </div>
      <div class="om2">
        <b-button variant="outline-light">이동하기</b-button>
      </div>
      <div class="om2">
        <b-button variant="outline-danger">저장</b-button>
      </div>
    </div>
    <div v-else-if="om_type == 3">
      <div class="om3">
        <b-button variant="outline-light">음향 목록</b-button>
      </div>
    </div>
    <div v-else-if="om_type == 4">
      <div class="om4">
        <b-button variant="outline-light">선택 완료</b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      om_type: 0
    };
  },
  beforeMount(){
    this.om_type = 0
  },
  created() {
    this.$EventBus.$on("image", () => {
      this.om_type = 1
    });
    this.$EventBus.$on("movie", () => {
      this.om_type = 2
    });
    this.$EventBus.$on("sound", () => {
      this.om_type = 3
    });
    this.$EventBus.$on("draw", () => {
      this.om_type = 4
    });
  }
};
</script>

<style scoped>
.optionalmenu {
  margin-top: 10px;
  text-align: center;
}
.optionalmenu > div > div.om1 {
  display: inline-block;
  width: 16%;
}
.optionalmenu > div > div.om2 {
  display: inline-block;
  width: 14%;
}
.optionalmenu > div > div.om3 {
  display: inline-block;
  width: 100%;
}
.optionalmenu > div > div.om4 {
  display: inline-block;
  width: 100%;
}
</style>