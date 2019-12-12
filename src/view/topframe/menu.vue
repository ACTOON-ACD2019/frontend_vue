<template>
  <div class="mainmenu">
    <div v-if="isLoaded" class="menu1">
      <b-dropdown
        variant="secondary"
        id="dropdown-1"
        text="Menu"
        block
        class="m-2"
        menu-class="w-100"
      >
        <b-dropdown-item @click="showNewModal">New Project</b-dropdown-item>
        <b-dropdown-item @click="showLoadModalOpen">Project Load</b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-else class="menu2">
      <div class="menu2_thum">
        <project-thumnail
          :project="selected.project_name"
          :src="selected.src"
          :date="selected.created_at"
          :desc="selected.desc"
        ></project-thumnail>
      </div>
      <div class="menu2_menu">
        <b-dropdown
          variant="secondary"
          id="dropdown-2"
          text="Menu"
          block
          class="m-2"
          menu-class="w-100"
        >
          <b-dropdown-item @click="showNewModal">New Project</b-dropdown-item>
          <b-dropdown-item @click="showLoadModalOpen">Project Load</b-dropdown-item>
          <b-dropdown-item @click="showUploadModal">Add Image</b-dropdown-item>
          <b-dropdown-item @click="saveVideo()">Save</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <project-inform title="New Project" :visible.sync="newModal">
      <div class="modal_body">
        <div class="label_container">
          <label ref="프로젝트 이름">Project Name</label>
          <b-form-input id="input-default" placeholder="Enter your project name" v-model="name"></b-form-input>
        </div>
        <div class="label_container">
          <label ref="프로젝트 설명">Project Description</label>
          <b-form-input
            id="input-default"
            placeholder="Enter your project description"
            v-model="description"
          ></b-form-input>
        </div>
        <br />
        <br />
        <div class="label_container">
          <b-form-group label="Select or Input the canvas size">
            <b-form-radio-group
              class="radio-group-1"
              v-model="canvasSelected"
              :options="coptions"
              name="radio-options"
            ></b-form-radio-group>
          </b-form-group>
          <br />
          <div v-if="canvasSelected == 1">
            width
            <b-form-input v-model="custom_width" placeholder="Enter Canvas width" type="number"></b-form-input>
            <br />height
            <b-form-input v-model="custom_height" placeholder="Enter Canvas height" type="number"></b-form-input>
          </div>
          <br />
          <br />
          <b-button squared @click="newProject()">Confirm</b-button>
          <b-button squared variant="danger" @click="showNewModal()">Exit</b-button>
        </div>
      </div>
    </project-inform>

    <project-inform title="Project List" :visible.sync="loadModal">
      <div class="modal_body">
        <div class="label_container">
          <label ref="프로젝트 목록">Project List</label>
          <b-form-select v-model="selected.project_name" :options="projects" :select-size="6"></b-form-select>
        </div>
        <br />
        <div class="label_container">
          <b-button squared variant="dark" @click="loadProject">Confirm</b-button>
          <b-button squared variant="danger" @click="deleteProject">Delte</b-button>
          <b-button squared variant="light" @click="showPatchModal(selected.project_name)">Edit</b-button>
        </div>
      </div>
    </project-inform>

    <project-inform title="Project Edit" :visible.sync="patchModal">
      <div class="modal_body">
        <div class="label_container">
          <label ref="프로젝트 이름">Project Name</label>
          <b-form-input
            id="input-default"
            placeholder="Enter your project name"
            v-model="patchName"
          ></b-form-input>
        </div>
        <div class="label_container">
          <label ref="프로젝트 설명">Project Description</label>
          <b-form-input
            id="input-default"
            placeholder="Enter your project description"
            v-model="patchDes"
          ></b-form-input>
        </div>
        <br />
        <div class="label_container">
          <b-button squared @click="patchProject">Confirm</b-button>
          <b-button squared variant="danger" @click="showPatchModal">Exit</b-button>
        </div>
      </div>
    </project-inform>

    <project-inform title="Image Upload" :visible.sync="uploadModal">
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
      selected: {
        check: true,
        project_name: "",
        desc: "",
        created_at: "",
        src: ""
      },
      isLoaded: true,

      canvasSelected: "",
      custom_width: 0,
      custom_height: 0,
      canv_width: 0,
      canv_height: 0,
      coptions: [
        { text: "480 x 320", value: { width: 480, height: 320 } },
        { text: "640 x 480", value: { width: 640, height: 480 } },
        { text: "800 x 600", value: { width: 800, height: 600 } },
        { text: "1024 x 768", value: { width: 1024, height: 768 } },
        { text: "1280 x 800", value: { width: 1280, height: 800 } },
        { text: "Customize", value: 1 }
      ]
    };
  },
  watch: {
    "selected.project_name": function() {
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
    showPatchModal(name) {
      this.patchName = name;
      this.patchModal = !this.patchModal;
    },
    newProject() {
      console.log("프로젝트 생성 시작");
      if (this.canvasSelected == 1) {
        this.canv_width = this.custom_width;
        this.canv_height = this.custom_height;
      } else {
        this.canv_width = this.canvasSelected.width;
        this.canv_height = this.canvasSelected.height;
      }
      this.$http
        .put(Config.link + "api/project/", {
          name: this.name,
          description: this.description,
          resolution_width: this.canv_width,
          resolution_height: this.canv_height
        })
        .then(response => {
          localStorage.setItem("project", this.name);
          console.log("프로젝트 생성 완료");
          alert("프로젝트가 생성되었습니다.");
          this.selected.project_name = response.data.name;
          this.selected.desc = response.data.description;
          this.selected.created_at = response.data.created_at;
          this.$EventBus.$emit("editCanvas", this.canv_width, this.canv_height);
          this.$EventBus.$emit("loadCut");
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
                response.data[i].description +
                " / CreateAt : " +
                response.data[i].created_at
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
        .get(Config.link + "api/project/" + this.selected.project_name + "/")
        .then(response => {
          console.log("프로젝트 로드 성공");
          localStorage.setItem("project", response.data.name);
          this.selected.project_name = response.data.name;
          this.selected.desc = response.data.description;
          this.selected.created_at = response.data.created_at;
          this.canv_width = response.data.resolution_width;
          this.canv_height = response.data.resolution_height;
          this.$EventBus.$emit("editCanvas", this.canv_width, this.canv_height);
          this.$EventBus.$emit("loadCut");
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
        .delete(Config.link + "api/project/" + this.selected.project_name + "/")
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
        .patch(
          Config.link + "api/project/" + this.selected.project_name + "/",
          {
            name: this.patchName,
            description: this.patchDes
          }
        )
        .then(response => {
          console.log("프로젝트 수정 성공");
          alert("프로젝트가 수정되었습니다.");
          this.getProjectList();
          this.showPatchModal();
        })
        .catch(error => {
          console.log("프로젝트 수정 실패");
        });
    },
    saveVideo(){
      this.$EventBus.$emit("saving");
    }
  },
  components: { ProjectInform, FileUpload, ProjectThumnail }
};
</script>

<style scoped>
.mainmenu {
  position: relative;
  height: 100%;
}

#dropdown-1 {
  width: 30%;
  top: 12px;
  left: 35%;
}

.menu2 {
  width: 100%;
}
.menu2_thum {
  position: fixed;
  top: 15px;
  left: 220px;
}

#dropdown-2 {
  width: 30%;
  top: 12px;
  left: 35%;
}
</style>