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
          >
            <div class="cutLayout">
              <div v-if="index % 2" class="sideblock"></div>
              <div class="image">
                <img :src="cut.thumbnail.file" class="thumb-img" />
                <br />
              </div>
              <div v-if="!(index % 2)" class="sideblock"></div>
            </div>
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

    <image-editor :visible.sync="editorModal">
      <div class="modal_body">
        <div class="label_container">
          <tui-editor :src="src" />
        </div>
      </div>
    </image-editor>
  </div>
</template>

<script>
import UserLayer from "../../components/userlayer";
import FabView from "../../components/canvas";
import TuiEditor from "../../components/tuieditor";
import Config from "../../../config/config";
import ImageEditor from "../../components/editormodal";

export default {
  data() {
    return {
      src: "",
      editorModal: false,
      selected: "",
      tasks_size: 0,
      tasks: [
        { value: "1", text: "SC0 -> Earth" },
        { value: "1", text: "BU0_1 -> Shake" },
        { value: "1", text: "SC1 -> None" },
        { value: "1", text: "BU1_1 -> None" },
        { value: "1", text: "BU1_2 -> transition" },
        { value: "1", text: "SC2 -> Flash" },
        { value: "1", text: "BU2_1 -> Rotate" },
      ],
      deleteIdx: "",
      project: localStorage.getItem("project"),
      showcut: false,
      editor: 0,
      cuts: [],
    };
  },
  created() {
    
    this.$EventBus.$on("loadCut", () => {
      this.$EventBus.$emit("resetCanvas");
      this.$EventBus.$emit("resetLayer");
      this.getCutList();
    });
    this.$EventBus.$on("showEditor", kind => {
      this.showEditor(kind);
    });
    this.$EventBus.$on("imageEditorOpen", src => {
      this.src = src;
      this.editorModal = true;
    });
    this.$EventBus.$on("imageEditorClose", () => {
      this.editorModal = false;
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
    }
  },
  components: { UserLayer, FabView, TuiEditor, ImageEditor }
};
</script>

<style lang="scss" scoped>
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

.cutLayout > div {
  display: inline-block;
}

.sideblock {
  width: 30px;
  height: 100px;
}

.thumb-img {
  margin: 20px 10px 10px 10px;
  width: 100px;
  height: 100px;
}

.toonframe {
  position:relative;
  left:10%;
  right:10%;
  top:-5%;
  width:80%;
  height:auto;
  border: solid;
}
.middle_center {
  position: relative;
  width: calc(100% - 420px);
  overflow-x:auto;
  overflow-y:auto;
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