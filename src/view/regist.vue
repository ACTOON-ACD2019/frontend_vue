<template>
  <div class="login-wrap">
    <div class="sidenav">
      <div class="login-main-text">
        <h2>
          ACTOON
          <br />Regist Page
        </h2>
        <p>register from here to access.</p>
      </div>
    </div>
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
          <form>
            <div class="form-group">
              <label>User Name</label>
              <input type="text" class="form-control" placeholder="UserName" v-model="reg_username" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" placeholder="Password" v-model="reg_pass" />
            </div>
            <button
              type="submit"
              class="btn btn-black"
              value="login"
              v-on:click.stop.prevent="regist"
            >Register</button>

            <router-link to="/login">
              <button class="btn btn-secondary">Login</button>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '../../config/config'

export default {
  data() {
    return {
      reg_username: "",
      reg_pass: ""
    };
  },
  methods: {
    regist() {
      console.log("회원가입 시작")
      var instance = this.$http.create();
      instance.defaults.headers.common = {};
      instance.post(Config.link + "api/auth/register/", {
          username: this.reg_username,
          password: this.reg_pass
        })
        .then(response => {
          console.log("회원가입 성공")
          alert("정상적으로 회원가입 되었습니다.");
          this.$router.push({ path: "/login" });
        })
        .catch(error => {
            if (error.response.status == 400 && this.reg_username){
                alert("이미 존재하는 이름입니다.");
            }
            else {
              alert("잘못된 접근입니다.")
            }
            console.log("회원가입 실패");
        });
    }
  }
};
</script>

<style scoped>
.main-head {
  height: 150px;
  background: #fff;
}

.sidenav {
  height: 100%;
  background-color: #000;
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  .login-form {
    margin-top: 10%;
  }

  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 40%;
  }

  .sidenav {
    width: 40%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 80%;
  }

  .register-form {
    margin-top: 20%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}

.btn-black {
  background-color: #000 !important;
  color: #fff;
}
</style>
