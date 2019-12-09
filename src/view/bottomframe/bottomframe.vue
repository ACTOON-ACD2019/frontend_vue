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
                <img
                  class="btn-effect frotate"
                  src="../../assets/rotate.png"
                  @click="showFullrotate"
                />
                <img class="btn-effect shake" src="../../assets/shake.png" @click="showShake" />
                <img
                  class="btn-effect translate"
                  src="../../assets/shift.png"
                  @click="showTransition"
                />
              </b-tab>
              <b-tab title="Timeline">
                <p>I'm the second tab</p>
              </b-tab>
            </b-tabs>
          </div>
        </li>
      </ul>
    </nav>

    <movie-effect title="EarthQuake" :visible.sync="earthquake.visible">
      <div class="modal_body">
        <div class="label_container">
          <label
            ref="설명"
          >The earthquake is the shake effect depending on times, strength, and, speed.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          Strength : {{ earthquake.power }}
          <br />
          <b-form-input id="range-1" v-model="earthquake.power" type="range" min="0" max="40"></b-form-input>
          <br />
        </div>
        <div class="body_container">
          Speed : {{ earthquake.speed }}
          <br />
          <b-form-input id="range-1" v-model="earthquake.speed" type="range" min="0" max="5"></b-form-input>
          <br />
        </div>
        <div class="body_container">
          Time : {{ earthquake.time }}
          <br />
          <b-form-input id="range-1" v-model="earthquake.time" type="range" min="0" max="10"></b-form-input>
          <br />
        </div>
        <br />
        <div class="label_container">
          <b-button squared>Confirm</b-button>
          <b-button squared variant="danger" @click="showEarthquake">Exit</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="Flash" :visible.sync="flash.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">The flash is an effect which twinkles.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          Time : {{ flash.time }}
          <br />
          <b-form-input id="range-1" v-model="flash.time" type="range" min="0" max="10"></b-form-input>
          <br />
        </div>
        <br />
        <div class="label_container">
          <b-button squared>Confirm</b-button>
          <b-button squared variant="danger" @click="showFlash">Exit</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="Spin" :visible.sync="rotate.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">The Spin is an effect depending on clockwise, speed, and, angle.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          Angle : {{ rotate.degree }}
          <br />
          <b-form-input id="range-1" v-model="rotate.degree" type="range" min="0" max="360"></b-form-input>
          <br />
        </div>
        <div class="body_container">
          clockwise
          <br />
          <b-form-radio-group v-model="rotate.direction" :options="options" name="radio-inline"></b-form-radio-group>
        </div>
        <div class="body_container">
          Speed : {{ rotate.speed }}
          <br />
          <b-form-input id="range-1" v-model="rotate.speed" type="range" min="0" max="10"></b-form-input>
          <br />
        </div>
        <br />
        <div class="label_container">
          <b-button squared>Confirm</b-button>
          <b-button squared variant="danger" @click="showRotate">Exit</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="Rotate" :visible.sync="fullrotate.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">The Rotate is an effect depending on clockwise, count.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          Clockwise
          <br />
          <b-form-radio-group v-model="fullrotate.direction" :options="options" name="radio-inline"></b-form-radio-group>
          <br />
        </div>
        <div class="body_container">
          Count : {{ fullrotate.count }}
          <br />
          <b-form-input id="range-1" v-model="fullrotate.count" type="range" min="0" max="10"></b-form-input>
          <br />
        </div>
        <br />
        <div class="label_container">
          <b-button squared>Confirm</b-button>
          <b-button squared variant="danger" @click="showFullrotate">Exit</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="Shake" :visible.sync="shake.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">The Shake is an effect depending on degree, speed, and, count</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          Degree : {{ shake.degree }}
          <br />
          <b-form-input id="range-1" v-model="shake.degree" type="range" min="0" max="45"></b-form-input>
          <br />
        </div>
        <div class="body_container">
          Speed : {{ shake.speed }}
          <br />
          <b-form-input id="range-1" v-model="shake.speed" type="range" min="0" max="10"></b-form-input>
          <br />
        </div>
        <div class="body_container">
          Count : {{ shake.count }}
          <br />
          <b-form-input id="range-1" v-model="shake.count" type="range" min="0" max="5"></b-form-input>
          <br />
        </div>
        <br />
        <div class="label_container">
          <b-button squared>Confirm</b-button>
          <b-button squared variant="danger" @click="showShake">Exit</b-button>
        </div>
      </div>
    </movie-effect>

    <movie-effect title="Shift" :visible.sync="transition.visible">
      <div class="modal_body">
        <div class="label_container">
          <label ref="설명">The move effect is the effect of moving at speed to the target coordinate.</label>
          <br />
          <br />
        </div>
        <div class="body_container">
          Speed : {{ transition.speed }}
          <br />
          <b-form-input id="range-1" v-model="transition.speed" type="range" min="0" max="10"></b-form-input>
          <br />
        </div>
        <div class="body_container">
          Coordinate
          <br />
          x<b-form-input type="number" v-model="transition.xdes"></b-form-input>
          y<b-form-input type="number" v-model="transition.ydes"></b-form-input>
          <br />
        </div>
        <br />
        <div class="label_container">
          <b-button squared>Confirm</b-button>
          <b-button squared variant="danger" @click="showTransition">Exit</b-button>
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
        { text: "Clockwise", value: false },
        { text: "CounterClockwise", value: true }
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
      shake: {
        visible: false,
        degree: 0,
        speed: 0,
        count: 0
      },
      transition: {
        visible: false,
        speed: 0,
        xdes: 0,
        ydes: 0
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
  color: white;
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