<template>
  <div class="login-wrap">
    <div class="sidenav">
      <div class="login-main-text">
        <h2>
          ACTOON
          <br />Login Page
        </h2>
        <p>Login from here to access.</p>
      </div>
    </div>
    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form">
          <form>
            <div class="form-group">
              <label>User Name</label>
              <input type="text" class="form-control" placeholder="UserName" v-model="login_username" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" placeholder="Password" v-model="login_pass" />
            </div>
            <button
              type="submit"
              class="btn btn-black"
              value="login"
              v-on:click.stop.prevent="login"
            >Login</button>
            <router-link to="/regist">
              <button class="btn btn-secondary">Register</button>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_username: "",
      login_pass: ""
    };
  },
  methods: {
    login() {
      console.log("로그인 시작");
      var instance = this.$http.create();
      instance.defaults.headers.common = {};
      instance.post("https://beta.actoon.sokdak.me/api/auth/", {
          headers: {
            'Authorization': null
          },
          username: this.login_username,
          password: this.login_pass
        })
        .then(response => {
          localStorage.setItem("username", this.login_username);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("auth", "Token " + response.data.token)
          alert("로그인 되었습니다.");
          console.log("로그인 성공");
          this.$router.push({ path: "/root" });
          history.go(0)
        })
        .catch(error => {
            if (error.response.status == 400){
              console.log("로그인 실패")
              alert("아이디 혹은 비밀번호가 잘못되었습니다.");
            }
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
