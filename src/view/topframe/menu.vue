<template>
  <div class="mainmenu">
    <div v-if="isLoaded" class="menu1">
      <b-dropdown id="dropdown-1" text="Menu" block class="m-2" menu-class="w-100">
        <b-dropdown-item @click="showNewModal">New Project</b-dropdown-item>
        <b-dropdown-item @click="showLoadModalOpen">Project Load</b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-else class="menu2">
      <div class="menu2_thum">
        <project-thumnail :src="projects_cnt" :date="projects_cnt" :desc="desc"></project-thumnail>
      </div>
      <div class="menu2_menu">
        <b-dropdown id="dropdown-2" text="Menu" block class="m-2" menu-class="w-100">
          <b-dropdown-item @click="showNewModal">New Project</b-dropdown-item>
          <b-dropdown-item @click="showLoadModalOpen">Project Load</b-dropdown-item>
          <b-dropdown-item @click="showUploadModal">Add Image</b-dropdown-item>
          <b-dropdown-item @click="()=>{this.$EventBus.$emit('showEditor',1);}">Video Editor</b-dropdown-item>
          <b-dropdown-item @click="()=>{this.$EventBus.$emit('showEditor',2);}">Image Editor</b-dropdown-item>
        </b-dropdown>
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
          <b-button squared variant="danger" @click="showLoadModalClose">취소</b-button>
        </div>
      </div>
    </project-inform>

    <project-inform title="프로젝트 수정" :visible.sync="patchModal">
      <div class="modal_body">
        <div class="label_container">
          <label ref="프로젝트 이름">프로젝트 이름</label>
          <b-form-input
            id="input-default"
            placeholder="Enter your project name"
            v-model="patchName"
          ></b-form-input>
        </div>
        <div class="label_container">
          <label ref="프로젝트 설명">프로젝트 설명</label>
          <b-form-input
            id="input-default"
            placeholder="Enter your project description"
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
import FileUpload from "../../components/filepond";
import Config from "../../../config/config";
import ProjectThumnail from "../../components/projectthumnail";

export default {
  data() {
    return {
      newModal: false,
      loadModal: false,
      patchModal: false,
      uploadModal: false,

      name: "",
      description: "",
      patchName: "",
      patchDes: "",

      projects: [],
      projects_cnt: 0,
      project: "",
      desc: "",
      selected: true,
      isLoaded: true
    };
  },
  watch: {
    selected: function(val) {
      this.patchName = val;
    },
    project: function() {
      this.isLoaded = false;
    }
  },
  mounted() {
    if (localStorage.getItem("project") != null) this.isLoaded = false;
  },
  created() {
    this.$EventBus.$on("filepond", () => {
      this.showUploadModal();
    });
  },
  methods: {
    showUploadModal() {
      this.uploadModal = !this.uploadModal;
    },
    showNewModal() {
      this.newModal = !this.newModal;
    },
    showLoadModalOpen() {
      this.projects = [];
      this.getProjectList();
      this.loadModal = !this.loadModal;
    },
    showLoadModalClose() {
      this.loadModal = !this.loadModal;
    },
    showPatchModal() {
      this.patchModal = !this.patchModal;
    },
    newProject() {
      console.log("프로젝트 생성 시작");
      this.$http
        .put(Config.link + "api/project/", {
          name: this.name,
          description: this.description
        })
        .then(response => {
          localStorage.setItem("project", this.name);
          console.log("프로젝트 생성 완료");
          alert("프로젝트가 생성되었습니다.");
          this.project = response.data.name;
          this.desc = response.data.description;
          this.showNewModal();
        })
        .catch(error => {
          if (error.response.status == 400) {
            alert("이미 존재하는 프로젝트 이름입니다.");
            console.log("프로젝트 생성 실패");
          }
        });
    },
    getProjectList() {
      console.log("프로젝트 목록 로드 시작");
      this.projects_cnt = 0;
      this.projects = [];
      this.$http
        .get(Config.link + "api/project/", {
          headers: { Authorization: localStorage.getItem("auth") }
        })
        .then(response => {
          this.projects_cnt = 0;
          for (let i in response.data) {
            this.projects.push({
              value: response.data[i].name,
              text:
                "Name : " +
                response.data[i].name +
                " / Description : " +
                response.data[i].description
            });
            this.projects_cnt++;
          }
          console.log(
            "총 " + this.projects_cnt + "개의 프로젝트 목록 로드 성공"
          );
        })
        .catch(function(error) {
          console.log("프로젝트 목록 로드 실패");
        });
    },
    loadProject() {
      console.log("프로젝트 로드 시작");
      this.$http
        .get(Config.link + "api/project/" + this.selected + "/")
        .then(response => {
          console.log("프로젝트 로드 성공");
          localStorage.setItem("project", response.data.name);
          this.project = response.data.name;
          this.desc = response.data.description;
          this.$EventBus.$emit("loadCut");
          //this.$EventBus.$emit("loadtask");
          this.showLoadModalClose();
        })
        .catch(error => {
          console.log("프로젝트 로드 실패");
          alert("잘못된 접근입니다.");
        });
    },
    deleteProject() {
      console.log("프로젝트 삭제 시작");
      this.$http
        .delete(Config.link + "api/project/" + this.selected + "/")
        .then(response => {
          console.log("프로젝트 삭제 성공");
          alert("프로젝트가 삭제되었습니다.");
          this.getProjectList();
        })
        .catch(error => {
          console.log("프로젝트 삭제 실패");
          alert("잘못된 접근입니다.");
        });
    },

    patchProject() {
      console.log("프로젝트 수정 시작");
      this.$http
        .patch(Config.link + "api/project/" + this.selected + "/", {
          name: this.patchName,
          description: this.patchDes
        })
        .then(response => {
          console.log("프로젝트 수정 성공");
          alert("프로젝트가 수정되었습니다.");
          this.getProjectList();
          this.showPatchModal();
        })
        .catch(error => {
          console.log("프로젝스 수정 실패");
        });
    }
  },
  components: { ProjectInform, FileUpload, ProjectThumnail }
};
</script>

<style scoped>
#dropdown-1 {
  float: center;
  width: 99%;
}
#dropdown-2 {
  width: 100%;
}
.menu2 {
  width: 100%;
  height: 100%;
}
.menu2 > div {
  width: 45%;
  display: inline-block;
  vertical-align: middle;
}
</style>