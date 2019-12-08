<template>
  <div class="bot">
    <nav class="nav__cont">
      <ul class="nav">
        <li class="nav__items">
          <h3>Effect / Timeline ▲</h3>
          <div class="bot-menu-effect">
            <b-tabs content-class="mt-3" fill variant="secondary">
              <b-tab title="Effect" active>
                <img class="btn-effect earth" src="../../assets/earth.png" @click="showEarthquake" />
                <img class="btn-effect flash" src="../../assets/flash.png" @click="showFlash" />
                <img class="btn-effect rotate" src="../../assets/spin.png" @click="showRotate" />
                <img class="btn-effect frotate" src="../../assets/rotate.png" @click="showFullrotate" />
                <img class="btn-effect shake" src="../../assets/shake.png" @click="showShake" />
                <img class="btn-effect translate" src="../../assets/shift.png" @click="showTransition" />
              </b-tab>
              <b-tab title="Timeline">
                <p>I'm the second tab</p>
              </b-tab>
            </b-tabs>
          </div>
        </li>
      </ul>
    </nav>


    <movie-effect title="진동" :visible.sync="earthquake.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">진동 효과는 강도와 속도의 값으로 시간(초)만큼 흔들리는 효과입니다. (지진)</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          강도 : {{ earthquake.power }}
          <br />
          <b-form-input id="range-1" v-model="earthquake.power" type="range" min="0" max="40"></b-form-input>
        </div>
        <div class="body_container">
          속도 : {{ earthquake.speed }}
          <br />
          <b-form-input id="range-1" v-model="earthquake.speed" type="range" min="0" max="5"></b-form-input>
        </div>
        <div class="body_container">
          시간 : {{ earthquake.time }}
          <br />
          <b-form-input id="range-1" v-model="earthquake.time" type="range" min="0" max="10"></b-form-input>
        </div>
        <div class="label_container">
          <b-button squared>확인</b-button>
          <b-button squared variant="danger" @click="showEarthquake">취소</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="반짝이기" :visible.sync="flash.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">반짝이기 시간(초)만큼 반짝이는 효과입니다.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          시간 : {{ flash.time }}
          <br />
          <b-form-input id="range-1" v-model="flash.time" type="range" min="0" max="10"></b-form-input>
        </div>
        <div class="label_container">
          <b-button squared>확인</b-button>
          <b-button squared variant="danger" @click="showFlash">취소</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="돌리기" :visible.sync="rotate.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">돌리기 효과는 시계(반시계)방향으로 속도만큼 각도까지 회전하는 효과입니다.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          각도 : {{ rotate.degree }}
          <br />
          <b-form-input id="range-1" v-model="rotate.degree" type="range" min="0" max="360"></b-form-input>
        </div>
        <div class="body_container">
          방향
          <br />
          <b-form-radio-group v-model="rotate.direction" :options="options" name="radio-inline"></b-form-radio-group>
        </div>
        <div class="body_container">
          속도 : {{ rotate.speed }}
          <br />
          <b-form-input id="range-1" v-model="rotate.speed" type="range" min="0" max="10"></b-form-input>
        </div>
        <div class="label_container">
          <b-button squared>확인</b-button>
          <b-button squared variant="danger" @click="showRotate">취소</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="회전하기" :visible.sync="fullrotate.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">회전하기 효과는 시계(반시계)방향으로 횟수 만큼 회전하는 효과입니다.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          방향
          <br />
          <b-form-radio-group v-model="fullrotate.direction" :options="options" name="radio-inline"></b-form-radio-group>
        </div>
        <div class="body_container">
          횟수 : {{ fullrotate.count }}
          <br />
          <b-form-input id="range-1" v-model="fullrotate.count" type="range" min="0" max="10"></b-form-input>
        </div>
        <div class="label_container">
          <b-button squared>확인</b-button>
          <b-button squared variant="danger" @click="showFullrotate">취소</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="흔들기" :visible.sync="shake.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">흔들기 효과는 각도만큼 속도로 횟수만큼 흔드는 효과입니다.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          각도 : {{ shake.degree }}
          <br />
          <b-form-input id="range-1" v-model="shake.degree" type="range" min="0" max="45"></b-form-input>
        </div>
        <div class="body_container">
          속도 : {{ shake.speed }}
          <br />
          <b-form-input id="range-1" v-model="shake.speed" type="range" min="0" max="10"></b-form-input>
        </div>
        <div class="body_container">
          횟수 : {{ shake.count }}
          <br />
          <b-form-input id="range-1" v-model="shake.count" type="range" min="0" max="5"></b-form-input>
        </div>
        <div class="label_container">
          <b-button squared>확인</b-button>
          <b-button squared variant="danger" @click="showShake">취소</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="이동하기" :visible.sync="transition.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">이동하기 효과는 목표 좌표까지 속도로 이동하는 효과입니다.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          속도 : {{ transition.speed }}
          <br />
          <b-form-input id="range-1" v-model="transition.speed" type="range" min="0" max="10"></b-form-input>
        </div>
        <div class="body_container">
          좌표
          <br />
          x<b-form-input type="number" v-model="transition.xdes"></b-form-input>
          y<b-form-input type="number" v-model="transition.ydes"></b-form-input>
        </div>
        <div class="label_container">
          <b-button squared>확인</b-button>
          <b-button squared variant="danger" @click="showTransition">취소</b-button>
        </div>
      </div>
    </movie-effect>
  </div>
</template>

<script>
import MovieEffect from "../../components/showmodal";
export default {
  data() {
    return {
      selected: null,
      options: [
        { text: "시계방향", value: false },
        { text: "반시계방향", value: true }
      ],
      earthquake: {
        visible: false,
        power: 0,
        speed: 0,
        time: 0
      },
      flash: {
        visible: false,
        time: 0
      },
      rotate: {
        visible: false,
        degree: 0,
        direction: false,
        speed: 0
      },
      fullrotate: {
        visible: false,
        direction: false,
        count: 0
      },
      shake:{
        visible: false,
        degree:0,
        speed:0,
        count:0
      },
      transition:{
        visible: false,
        speed:0,
        xdes:0,
        ydes:0
      }
    };
  },
  components: {
    MovieEffect
  },
  methods: {
    showEarthquake() {
      this.earthquake.visible = !this.earthquake.visible;
    },
    showFlash() {
      this.flash.visible = !this.flash.visible;
    },
    showRotate() {
      this.rotate.visible = !this.flash.visible;
    },
    showFullrotate() {
      this.fullrotate.visible = !this.fullrotate.visible;
    },
    showShake() {
      this.shake.visible = !this.shake.visible;
    },
    showTransition() {
      this.transition.visible = !this.transition.visible;
    }
  }
};
</script>

<style lang="scss" scoped>
.bot {
  width: calc(100%-330px);
}

.nav__cont {
  left: 210px;
  right: 210px;
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
  width: -moz-calc(100% - (210px + 210px));
  width: -webkit-calc(100% - (210px + 210px));
  width: calc(100% - (210px + 210px));
  text-align: center;
  list-style-type: none;
  color: white;
}

.nav__items {
  width: 100%;
  font-family: "roboto";
}
.nav-item > a {
  color:white;
}

.bot-menu-effect {
  height: 170px;
}
.btn-effect {
  width: 140px;
  height: 110px;
}
.earth:hover {
  content: url("../../assets/earth_h.png");
}
.translate:hover {
  content: url("../../assets/shift_h.png");
}
.rotate:hover {
  content: url("../../assets/spin_h.png");
}
.frotate:hover {
  content: url("../../assets/rotate_h.png");
}
.flash:hover {
  content: url("../../assets/flash_h.png");
}
.shake:hover {
  content: url("../../assets/shake_h.png");
}
</style>