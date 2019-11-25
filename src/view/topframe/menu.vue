<template>
  <div class="mainmenu">
    <div v-if="kind_menu==1">
      <div class="m1">
        <b-button squared size="lg" @click="showNewModal">새 프로젝트</b-button>
      </div>
      <div class="m1">
        <b-button squared size="lg" @click="showLoadModal">프로젝트 불러오기</b-button>
      </div>
    </div>
    <div v-else-if="kind_menu==2">
      <div class="m2">
        <b-button squared size="lg" @click="showUploadModal">이미지 추가</b-button>
      </div>
      <div class="m2">
        <b-button squared size="lg" @click="()=>{this.$EventBus.$emit('image');}">이미지 편집</b-button>
      </div>
      <div class="m2">
        <b-button squared size="lg" @click="()=>{this.$EventBus.$emit('movie');}">영상 편집</b-button>
      </div>
      <div class="m2">
        <b-button squared size="lg" @click="()=>{this.$EventBus.$emit('sound');}">음향 편집</b-button>
      </div>
      <div class="m2">
        <b-button squared size="lg" @click="()=>{this.$EventBus.$emit('draw');}">이미지 그리기</b-button>
      </div>
    </div>

    <project-inform title="프로젝트 생성" :visible.sync="newModal">
      <div class="modal_body">
        <div class="label_container">
          <label ref="프로젝트 이름">프로젝트 이름</label>
          <b-form-input id="input-default" placeholder="Enter your project name" v-model="name"></b-form-input>
        </div>
        <div class="label_container">
          <label ref="프로젝트 설명">프로젝트 설명</label>
          <b-form-input
            id="input-default"
            placeholder="Enter your project description"
            v-model="description"
          ></b-form-input>
        </div>
        <br />
        <br />
        <div class="label_container">
          <b-button squared @click="newProject">프로젝트 생성</b-button>
          <b-button squared variant="success" @click="showNewModal">취소</b-button>
        </div>
      </div>
    </project-inform>

    <project-inform title="프로젝트 목록" :visible.sync="loadModal">
      <div class="modal_body">
        <div class="label_container">
          <label ref="프로젝트 목록">프로젝트 목록</label>
          <b-form-select v-model="selected" :options="projects" :select-size="6"></b-form-select>
        </div>
        <br />
        <div class="label_container">
          <b-button squared @click="loadProject">선택 완료</b-button>
          <b-button squared variant="warning" @click="deleteProject">삭제</b-button>
          <b-button squared variant="success" @click="showPatchModal">수정</b-button>
          <b-button squared variant="danger" @click="showLoadModal">취소</b-button>
        </div>
      </div>
    </project-inform>

    <project-inform title="프로젝트 수정" :visible.sync="patchModal">
      <div class="modal_body">
        <div class="label_container">
          <label ref="프로젝트 수정">프로젝트 수정</label>
          <b-form-input
            id="input-default"
            placeholder="Enter your project Description"
            v-model="patchDes"
          ></b-form-input>
        </div>
        <br />
        <div class="label_container">
          <b-button squared @click="patchProject">확인</b-button>
          <b-button squared variant="danger" @click="showPatchModal">취소</b-button>
        </div>
      </div>
    </project-inform>

    <project-inform title="이미지 업로드" :visible.sync="uploadModal">
      <div class="modal_body">
        <div class="label_container">
          <file-upload></file-upload>
        </div>
      </div>
    </project-inform>
  </div>
</template>

<script>
import ProjectInform from "../../components/showmodal";
import FileUpload from "../../components/fileUpload/filepond";

export default {
  data() {
    return {
      kind_menu: 2,
      newModal: false,
      loadModal: false,
      patchModal: false,
      uploadModal: false,

      name: "",
      description: "",
      patchDes: "",

      projects: [],
      selected: null,
      projects_cnt: 0
    };
  },
  created() {
      this.$EventBus.$on("filepond", () => {
        this.uploadModal = false;
      });
  },
  beforeMount() {
    this.getProjectList();
  },
  methods: {
    getProjectList() {
      this.$http
        .get("https://beta.actoon.sokdak.me/api/project/", {
          headers: { Authorization: localStorage.getItem("auth") }
        })
        .then(response => {
          let i
          for (i in response.data) {
            console.log(i)
            this.projects.push({
              value: response.data[i].name,
              text:
                "Name : " +
                response.data[i].name +
                " / Description : " +
                response.data[i].description
            });
          }
          this.projects_cnt = i;
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    showUploadModal() {
      this.uploadModal = !this.uploadModal;
    },
    showNewModal() {
      this.newModal = !this.newModal;
    },
    showLoadModal() {
      this.loadModal = !this.loadModal;
    },
    showPatchModal() {
      this.patchModal = !this.patchModal;
    },
    kindMenu() {
      this.kind_menu = !this.kind_menu;
    },
    newProject() {
      this.$http
        .put("https://beta.actoon.sokdak.me/api/project/", {
          name: this.name,
          description: this.description
        })
        .then(response => {
          alert("프로젝트가 생성되었습니다.");
          this.showNewModal();
          this.kindMenu();
          localStorage.setItem("project", this.name);
        })
        .catch(error => {
          console.log(error.response);
          if (error.response.status == 400) {
            alert("이미 존재하는 프로젝트 이름입니다.");
          }
        });
    },
    loadProject() {
      this.projects = [];
      this.$http
        .get("https://beta.actoon.sokdak.me/api/project/" + this.selected + "/")
        .then(response => {
          this.showLoadModal();
          this.kindMenu();
          localStorage.setItem("project", this.selected);
          this.$EventBus.$emit("loadProject");
          console.log("loadProject")
          this.$EventBus.$emit("loadCut", this.projects_cnt);
          console.log("loadCut")
        })
        .catch(error => {
          console.log(error.response);
          alert("잘못된 접근입니다.");
        });
    },
    deleteProject() {
      this.$http
        .delete(
          "https://beta.actoon.sokdak.me/api/project/" + this.selected + "/"
        )
        .then(response => {
          alert("프로젝트가 삭제되었습니다.");
          this.loadProject();
        })
        .catch(error => {
          console.log(error.response);
          alert("잘못된 접근입니다.");
        });
    },

    patchProject() {
      /*
        this.$http
        .patch("https://beta.actoon.sokdak.me/api/project/", {
          name: this.name,
          description: this.patchDes
        })
        .then(response => {
          alert("프로젝트가 수정되었습니다.");
          this.loadProject();
          this.showPatchModal();
        })
        .catch(error => {
          console.log(error.response);
          if (error.response.status == 400) {
            alert("이미 존재하는 프로젝트 이름입니다.");
          }
        });
        */
    }
  },
  components: { ProjectInform, FileUpload }
};
</script>

<style scoped>
.mainmenu {
  padding-top: 10px;
}
.mainmenu > div > div.m1 {
  float: left;
  width: 50%;
}
.mainmenu > div > div.m2 {
  float: left;
  width: 20%;
}
</style>