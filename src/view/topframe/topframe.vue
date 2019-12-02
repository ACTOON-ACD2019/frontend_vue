<template>
    <div class="header">
      <div class="header_left">
        <div class="team_logo">
          <img src="../../assets/team logo.png" title="ACTOON" />
        </div>
      </div>
      <div class="header_center">
        <main-menu/>
      </div>
      <div class="header_right">
        <div class="info">
          {{ user_id }}님 <br />
          <b-button squared size="sm" :pressed.sync="logoutModal">로그아웃</b-button>
        </div>
        
        <user-inform :visible.sync="logoutModal">
          <div class="modal_body">
              <div class="label_container">
                <label ref="안내문">현재까지의 작업 내역은 자동 저장 됩니다. <br />
                로그아웃 하시겠습니까?</label> <br /><br />
              </div>
              <div class="label_container">
                <b-button @click="logout" squared size="lg">로그아웃</b-button>
              </div>
          </div>
        </user-inform>

      </div>
    </div>
</template>

<script>
import MainMenu from "./menu"
import UserInform from "../../components/showmodal"

export default {
  data() {
    return {
      user_id:localStorage.getItem('username'),
      logoutModal:false
    }
  },
  methods: {
    logout(){
      localStorage.clear();
      alert("로그아웃 되었습니다!")
      this.$router.push({ path: '/login' })
      history.go(0)
    }
  },
  components: { MainMenu, UserInform }
}
</script>


<style scoped>
  .header {
    height: 70px;
    width: 100%;
    background-color:rgb(41, 41, 41);
  }

  div.header>div{
    float: left;
    height: 100%;
  }

  .header_left {
    width:150px;
  }

  .team_logo img {
    width: 150px;
    height: 70px;
  }

  .header_center {
    text-align: center;
    width: calc(100% - 300px);
  }

  .header_right {
    width:150px;
    text-align: center;
  }

  .info {
    padding-top: 10px;
  }
</style>