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
      <div class="info">
        {{ user_id }}
        <br />
        <b-button size="sm" :pressed.sync="logoutModal">Logout</b-button>
      </div>

      <user-inform :visible.sync="logoutModal">
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
            <b-button @click="logout" size="lg">Logout</b-button>
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
  height: 60px;
  width: 100%;
  background-color: #393949;
  color: white;
}

div.header > div {
  float: left;
  height: 100%;
}

.header_left {
  width: 200px;
}

.team_logo img {
  width: 200px;
  height: 60px;
}

.header_center {
  text-align: center;
  width: calc(100% - 330px);
}

.header_right {
  width: 130px;
  text-align: center;
}
</style>