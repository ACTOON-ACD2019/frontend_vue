<template>
  <div class="middle">
    <div class="middle_left">
      <div class="loadcut">
        <div v-if="showcut">
          <div v-for="cut of cuts" :key="cut.idx">
            <div class="image">
              <img :src="cut.url" />
            </div>
            <div class="fname">{{ cut.type }} {{ cut.sequence }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle_center">
      <div class="middle_canvas">
        <!--<fab-view />-->
      </div>
    </div>
    <div class="middle_right">
      <div class="middle_right_up">
        <user-layer />
      </div>
      <div class="middle_right_down">
        <user-history />
      </div>
    </div>
  </div>
</template>

<script>
import UserHistory from "../../components/userhistory";
import UserLayer from "../../components/userlayer";
import FabView from "../../components/fabric/canvas";

export default {
  data() {
    return {
      showcut: false,
      cuts: [
        {
          url: String,
          type: String,
          sequence: 0
        }
      ]
    };
  },
  created() {
    this.$EventBus.$on("loadCut", cnt => {
      this.getCutList(cnt);
    });
  },
  methods: {
    getCutList(cnt) {
      console.log(
        "프로젝트 명 : " + localStorage.getItem("project") + "의 컷 로드 시작"
      );
      this.$http
        .get("https://beta.actoon.sokdak.me/api/cut/rrr/0/")
        .then(response => {
          this.cuts = [];
          for (let i in response.data) {
            this.cuts.push({
              url: response.data[i].file,
              type: response.data[i].type,
              sequence: response.data[i].sequence
            });
          }
          this.showcut = true;
          console.log(this.cuts);
          console.log("컷 로드 성공");
        })
        .catch(function(error) {
          console.log(error);
          console.log("컷 로드 실패");
        });
    }
  },
  components: { UserHistory, UserLayer, FabView }
};
</script>

<style scoped>
.middle {
  height: calc(100% - 160px);
  width: 100%;
}

.middle_left {
  width: 150px;
  border-right-width: 2px;
  border-right-style: inset;
  border-right-color: rgb(41, 41, 41);
}

.middle_center {
  width: calc(100% - 300px);
}

.middle_canvas {
  margin-top: 70px;
  margin-left: 150px;
  width: 70%;
  height: 70%;
  vertical-align: middle;
  text-align: center;
  background-color: gray;
}

.middle_right {
  width: 150px;
  border-left-width: 2px;
  border-left-style: inset;
  border-left-color: rgb(41, 41, 41);
}

.middle_right > div {
  height: 50%;
}

div.middle > div {
  float: left;
  height: 100%;
}
</style>