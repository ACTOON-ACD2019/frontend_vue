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
        <fab-view />
      </div>
    </div>
    <div class="middle_right">
      <div class="middle_right_up">
        <user-layer />
      </div>
      <div class="middle_right_down">
        <div class="userhistory">
          <b-form-select v-model="selected" :options="tasks" :select-size="5"></b-form-select>
          <b-button size="sm" variant="info" @click="deleteTask">최근 기록 되돌리기</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserLayer from "../../components/userlayer";
import FabView from "../../components/fabric/canvas";

export default {
  data() {
    return {
      selected: "",
      tasks: [],
      deleteIdx: "",

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
    this.$EventBus.$on("loadtask", () => {
      this.getTaskList();
    });
  },
  methods: {
    getTaskList() {
      this.tasks = [];
      this.$http
        .get(
          "https://beta.actoon.sokdak.me/api/task/" +
            localStorage.getItem("project") +
            "/"
        )
        .then(response => {
          let i = "";
          for (i in response.data) {
            this.tasks.push({
              value: i + 1,
              text: i + " 아이콘 : " + response.data[i].effect
              //나중에 삭제한 태스크도 프론트에서 스택으로 처리해서 넣을 예정
            });
          }
          this.deleteIdx = i;
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    deleteTask() {
      this.$http
        .delete(
          "https://beta.actoon.sokdak.me/api/task/" +
            localStorage.getItem("project") +
            "/" +
            this.deleteIdx +
            "/"
        )
        .then(response => {
          console.log("최근 기록 삭제 완료");
          this.getTaskList();
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
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
  components: { UserLayer, FabView }
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