<template>
  <div class="middle">
    <div class="middle_left">
      <div class="loadcut scrollbar" id="style-1">
        <div v-if="showcut" class="force-overflow toonframe">
          <div
            v-for="(cut, index) of cuts"
            :key="index"
            @click="addCanvas(cut)"
            style="cursor: pointer"
            draggable="true"
          >
            <div v-if="index % 2 == 0">
              왼쪽
              <div class="image">
                <img :src="cut.thumbnail.file" class="thumb-img" />
                <br />
              </div>
            </div>
            <div v-else>
              오른쪽
              <div class="image">
                <img :src="cut.thumbnail.file" class="thumb-img" />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle_center">
      <div class="middle_canvas">
        <fab-view />
        <!-- <div v-if="editor == 1">
          <fab-view />
        </div>
        <div v-else-if="editor == 2">
          <tui-editor />
        </div>-->
      </div>
    </div>
    <div class="middle_right">
      <div class="middle_right_top">
        <user-layer />
      </div>
      <hr class="class-1" />
      <div class="middle_right_middle">
        <div class="userhistory">
          <h4>
            <b-badge variant="dark">History</b-badge>
          </h4>
          <b-form-select
            variant="dark"
            class="force-overflow loadcut scrollbar"
            id="style-1"
            v-model="selected"
            :options="tasks"
            :select-size="7"
          ></b-form-select>
          <b-button variant="dark" size="sm" class="bt-history" @click="deleteTask">Undo</b-button>
        </div>
      </div>
      <div class="middle_right_bottom"></div>
    </div>
  </div>
</template>

<script>
import UserLayer from "../../components/userlayer";
import FabView from "../../components/canvas";
import TuiEditor from "../../components/tuieditor";
import Config from "../../../config/config";

export default {
  data() {
    return {
      selected: "",
      tasks_size: 0,
      tasks: [
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" },
        { value: "1", text: "1" }
      ],
      deleteIdx: "",
      project: localStorage.getItem("project"),
      showcut: false,
      editor: 0,
      cuts: []
    };
  },
  created() {
    this.$EventBus.$on("loadCut", () => {
      this.$EventBus.$emit("refreshLayer");
      this.getCutList();
    });
    this.$EventBus.$on("showEditor", kind => {
      this.showEditor(kind);
    });
    /*
    this.$EventBus.$on("loadtask", () => {
      this.getTaskList();
    });
    */
  },
  methods: {
    getTaskList() {
      this.tasks = [];
      this.$http
        .get(Config.link + "api/task/" + localStorage.getItem("project") + "/")
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
          Config.link +
            "api/task/" +
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
    getCutList() {
      console.log(
        "프로젝트 명 : " + localStorage.getItem("project") + "의 컷 로드 시작"
      );

      this.$http
        .get(Config.link + "api/cut/" + localStorage.getItem("project") + "/")
        .then(response => {
          console.log("컷 목록 불러오기 성공");
          this.cuts = [];
          var obj = JSON.parse(response.data);
          console.log(obj);
          for (let i = 0; i < obj.length; i++) {
            this.cuts.push(obj[String(i)]);
            this.cuts[i].thumbnail.file =
              Config.link + "media/" + this.cuts[i].thumbnail.file;
          }
          this.showcut = true;
        })
        .catch(error => {
          this.cuts = [];
          console.log("컷 로드 실패");
        });
    },
    addCanvas(obj) {
      this.$EventBus.$emit("addCanvasImage", obj);
    },
    showEditor(kind) {
      this.editor = kind;
    }
  },
  components: { UserLayer, FabView, TuiEditor }
};
</script>

<style scoped>
.middle {
  position: relative;
  height: calc(100% - 80px);
  width: 100%;
  text-align: center;
}
.middle_left {
  width: 210px;
  border-right-width: 2px;
  border-right-style: inset;
  border-right-color: rgb(41, 41, 41);
}

.thumb-img {
  padding: 10px 10px 10px 10px;
  width: 120px;
  height: 120px;
}
.middle_center {
  position: relative;
  width: calc(100% - 420px);
}

.middle_canvas {
  width: 100%;
  height: 100%;
}

.middle_right {
  height: 100%;
  width: 210px;
  border-left-width: 2px;
  border-left-style: inset;
  border-left-color: rgb(41, 41, 41);
  background-color: gray;
}

.middle_right_top {
  height: -moz-calc((100%-60px)/2 - 90px);
  height: -webkit-calc((100%-60px)/2 - 90px);
  height: calc((100%-60px) / 2 - 90px);
  transform: translate(0, -12px);
}
.middle_right_middle {
  height: -moz-calc((100%-60px)/2 - 90px);
  height: -webkit-calc((100%-60px)/2 - 90px);
  height: calc((100%-60px) / 2 - 90px);
  transform: translate(0, -12px);
}
.middle_right_bottom {
  height: auto;
  height: -webkit-calc(auto);
  height: calc(auto);
  background-color: black;
}

.userhistory {
  text-align: left;
}
.bt-history {
  width: 100%;
}

div.middle > div {
  height: 100%;
  float: left;
}
</style>