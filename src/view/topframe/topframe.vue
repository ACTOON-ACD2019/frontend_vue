<template>
  <div class="header">
    <div class="header_left">
      <div class="team_logo">
        <img src="../../assets/logo1.png" title="ACTOON" />
      </div>
    </div>
    <div class="header_center">
      <main-menu />
    </div>
    <div class="header_right">
      <div class="info-id">
        {{ user_id }}
      </div>
      <div class="info-btn">
        <b-button variant="secondary" size="sm" :pressed.sync="logoutModal">Logout</b-button>
      </div>

      <user-inform title="Log Out" :visible.sync="logoutModal">
        <div class="modal_body">
          <div class="label_container">
            <label ref="안내문">
              Your work so far is automatically saved.
              <br />Do you want to Logout?
            </label>
            <br />
            <br />
          </div>
          <div class="label_container">
            <b-button variant="secondary" @click="logout" size="lg">Logout</b-button>
          </div>
        </div>
      </user-inform>
    </div>
  </div>
</template>

<script>
import MainMenu from "./menu";
import UserInform from "../../components/showmodal";

export default {
  data() {
    return {
      user_id: localStorage.getItem("username"),
      logoutModal: false
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      alert("로그아웃 되었습니다!");
      this.$router.push({ path: "/login" });
      history.go(0);
    }
  },
  components: { MainMenu, UserInform }
};
</script>


<style scoped>

.header {
  z-index:auto;
  position:relative;
  height: 80px;
  width: 100%;
  background-color: #000000;
  color: white;
}

div.header > div {
  position:relative;
  float: left;
  height: 100%;
}

.header_left {
  position:relative;
  width: 210px;
}

.team_logo img {
  position:relative;
  width: 190px;
  height: 60px;
  margin-top: 10px;
  margin-left: 10px;
}

.header_center {
  position:relative;
  text-align: center;
  width: calc(100% - 420px);
}

.header_right {
  position:fixed;
  height: 100%;
  width: 210px;
  text-align: center;
}

.info-id {
  float:left;
  margin-top:25px;
  margin-left:10px;
}
.info-btn {
  float:right;
  margin-top:25px;
  margin-right:10px;
}
</style>