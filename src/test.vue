<template>
  <div class="bot">
    <nav class="nav__cont">
      <ul class="nav">
        <li class="nav__items">
          <h3>
            <b-badge>Effect / Timeline</b-badge>
          </h3>
          <div class="bot-menu-effect">
            <b-tabs content-class="mt-3" fill>
              <b-tab title="Effect" active>
                  <b-button variant="outline-light" @click="showEarthquake">진동</b-button>
                  <b-button variant="outline-light" @click="showFlash">반짝이기</b-button>
                  <b-button variant="outline-light" @click="showRotate">돌리기</b-button>
                  <b-button variant="outline-light" @click="showFullrotate">회전하기</b-button>
                  <b-button variant="outline-light" @click="showShake">흔들기</b-button>
                  <b-button variant="outline-light" @click="showTransition">이동하기</b-button>
                  <b-button variant="outline-danger" @click="showSave">저장</b-button>
              </b-tab>
              <b-tab title="Timeline">
                <p>I'm the second tab</p>
              </b-tab>
            </b-tabs>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.bot {
  width: calc(100%-330px);
}

.nav__cont {
  left: 200px;
  right: 130px;
  bottom: 0;
  position: fixed;
  height: 40px;
  z-index: 100;
  background-color: #202020;
  overflow: hidden;
  transition: height 0.3s ease;
  text-align: center;
  cursor: pointer;
  &:hover {
    height: 220px;
  }
}

.nav {
  position: fixed;
  width: -moz-calc(100% - (200px + 130px));
  width: -webkit-calc(100% - (200px + 130px));
  width: calc(100% - (200px + 130px));
  text-align: center;
  list-style-type: none;
  color: white;
}

.nav__items {
  width: 100%;
  font-family: "roboto";
}

.bot-menu-effect {
  height: 170px;
  background-color: brown;
}

</style>