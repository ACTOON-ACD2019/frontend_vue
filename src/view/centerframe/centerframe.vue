<template>
  <div class="middle">
    <div class="middle_left">
      <div class="loadcut">
        <div v-if="showcut">
          <div v-for="cut of cuts" :key="cut.idx">
            <div class="image">
              <img :src="cut.url" width="100" height="100" @click="addCanvas(cut.url)" />
              <br />
            </div>
            <!--<div class="fname">{{ cut.type }} {{ cut.sequence }}</div>-->
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
        프로젝트 명
        <br />
        {{ project }}
      </div>
      <div class="middle_right_middle">
        <user-layer />
      </div>
      <div class="middle_right_down">
        <div class="userhistory">
          작업 기록
          <b-form-select v-model="selected" :options="tasks" :select-size="9"></b-form-select>
          <b-button size="sm" variant="info" @click="deleteTask">최근 기록 되돌리기</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserLayer from "../../components/userlayer";
import FabView from "../../components/canvas";
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
    this.$EventBus.$on("loadCut", () => {
      this.getCutList();
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

      // this.cuts = [];
      //     this.cuts.push({url:"https://post-phinf.pstatic.net/MjAxODAxMjJfMTU4/MDAxNTE2NTk5MzE0Mzk3.tpo98J5uKOWXI_DKeVshDaXv0A-6fpTvDdbDWX3Uqbkg.dJcyQ8Y4rABIDFt2kbJRsUVjgLmT0Mo9hYVurPAgyfIg.JPEG/6-1.jpg?type=w1200"},
      //     {url:"https://post-phinf.pstatic.net/MjAxODAxMjJfMTcx/MDAxNTE2NTk5MjU0Njg0.x0xAsVSjoF-vBmiwyQbfUy42yNF1qI4IOWlMGaTq-Ykg.XlcaWo5N9UX9C4Zbe3PMb8_c1FnySQL3oYPGZkO1jgcg.JPEG/1.jpg?type=w1200"},
      //     {url:"https://post-phinf.pstatic.net/MjAxODAxMjJfMzIg/MDAxNTE2NTk5MjczNjY1.Ss6hMgUgPlt7bq_sqvDswv-_RMqrmpiCpLd3vLev2fQg.gK7M1ap5NCUr7Nv8PGrmd4GVG2mU56M79X3MyhTJQ5kg.JPEG/2.jpg?type=w1200"},
      //     {url:"https://post-phinf.pstatic.net/MjAxODAxMjJfOSAg/MDAxNTE2NTk5Mjc4NTIw.m1AcAEgafuasLtQTN3BqAHGYS7YsCL1sBVLScrHY6yQg.J8QUzfWq-SwdmQIua17d9TN64XBRQyyUv0Da80-4i9Eg.JPEG/3.jpg?type=w1200"},
      //     {url:"https://post-phinf.pstatic.net/MjAxODAxMjJfMjYy/MDAxNTE2NTk5MjgzMjU2.goOTFBHTV6o1jLu3fPGlw_Ey3WedV_Kxb3oJHHCKCHgg.AOcrqJTu8AX0tYNE6NHoGF4jq1huYvThU3YmVIwvCTog.JPEG/4.jpg?type=w1200"},
      //     {url:"https://post-phinf.pstatic.net/MjAxODAxMjJfMjQg/MDAxNTE2NTk5Mjg5NTM1.iMv8cIGzlZfoRzRqnVBu2phY4mWVzFKD-aJAE9ebJZwg.wAnqevBrV49oS_uuooy91-YOQ3ZshL4aY5aAqjhmvPsg.JPEG/5.jpg?type=w1200"},
      //     {url:"https://post-phinf.pstatic.net/MjAxODAxMjJfNDUg/MDAxNTE2NTk5MjM1NzYx.OS5TeZfmicJ96mjsme6r003Kk-qMZPhzZoRRZIAtjd4g.MS4jAzRFPfd8LRYmX-mlLbo4zywY-Pmsu6ss8o1rlfYg.JPEG/7.jpg?type=w1200"},
      //     {url:"https://post-phinf.pstatic.net/MjAxODAxMjJfMzAw/MDAxNTE2NTk5MjMxMzI5.QPoiFzAtZXaexijdSx_hcYLKF_lElYFAxWUQRRZq0JMg.XzQD2sW-1xjB2QyNrRHr4QYRQk3klaq4EN33XlxkDTkg.JPEG/8.jpg?type=w1200"},
      //     )
      //     this.showcut = true;

      this.$http
        .get(Config.link + "api/cut/" + localStorage.getItem("project") + "/")
        .then(response => {
          this.cuts = [];
          var obj = JSON.parse(response.data);
          for (let j in obj) {
            for (let i in obj[j]) {
              console.log(response);
              this.cuts.push({
                url: Config.link + "media/" + obj[j][i].file,
                type: obj[j][i].type,
                sequence: obj[j][i].sequence
              });
            }
          }

          this.showcut = true;
          console.log(this.cuts);
          console.log("컷 로드 성공");
        })
        .catch(function(error) {
          console.log(error);
          console.log("컷 로드 실패");
        });
    },
    addCanvas(url) {
      this.$EventBus.$emit("addCanvasImage", url);
    }
  },
  components: { UserLayer, FabView }
};
</script>

<style scoped>
.middle {
  height: calc(100% - 160px);
  width: 100%;
  text-align: center;
}

.middle_left {
  width: 150px;
  border-right-width: 2px;
  border-right-style: inset;
  border-right-color: rgb(41, 41, 41);
  overflow: auto;
}

.middle_center {
  width: calc(100% - 300px);
}

.middle_canvas {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-align: center;
}

.middle_right {
  height: 100%;
  width: 150px;
  border-left-width: 2px;
  border-left-style: inset;
  border-left-color: rgb(41, 41, 41);
}

.middle_right_up {
  height: 50px;
  border-bottom-width: 2px;
  border-bottom-color: rgb(41, 41, 41);
}
.middle_right_middle {
  height: -moz-calc((100% - (50px))/2);
  height: -webkit-calc((100% - (50px))/2);
  height: calc((100% - (50px)) / 2);
}
.middle_right_down {
  height: -moz-calc((100% - (50px))/2);
  height: -webkit-calc((100% - (50px))/2);
  height: calc((100% - (50px)) / 2);
}

div.middle > div {
  float: left;
  height: 100%;
}
</style>