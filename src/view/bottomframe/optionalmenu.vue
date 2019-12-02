
<template>
  <div class="optionalmenu">
    <div v-if="om_type == 1">
      <div class="om1">
        <b-button variant="outline-light" @click="showEarthquake">진동</b-button>
      </div>
      <div class="om1">
        <b-button variant="outline-light" @click="showFlash">반짝이기</b-button>
      </div>
      <div class="om1">
        <b-button variant="outline-light" @click="showRotate">돌리기</b-button>
      </div>
      <div class="om1">
        <b-button variant="outline-light" @click="showFullrotate">회전하기</b-button>
      </div>
      <div class="om1">
        <b-button variant="outline-light" @click="showShake">흔들기</b-button>
      </div>
      <div class="om1">
        <b-button variant="outline-light" @click="showTransition">이동하기</b-button>
      </div>
      <div class="om1">
        <b-button variant="outline-danger" @click="showSave">저장</b-button>
      </div>
    </div>
    <div v-else-if="om_type == 2">
      <div class="om2">
        <b-button variant="outline-light">음향 목록</b-button>
      </div>
    </div>
    <div v-else-if="om_type == 3">
      <div class="om3">
        <b-button variant="outline-light">선택 완료</b-button>
      </div>
    </div>

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
      om_type: 0,
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
  beforeMount() {
    this.om_type = 0;
  },
  created() {
    this.$EventBus.$on("movie", () => {
      this.om_type = 1;
    });
    this.$EventBus.$on("sound", () => {
      this.om_type = 2;
    });
    this.$EventBus.$on("draw", () => {
      this.om_type = 3;
    });
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
    },
    showSave(){
      alert("작업한 결과를 저장합니다. ")
    }
  }
};
</script>

<style scoped>
.optionalmenu {
  margin-top: 10px;
  text-align: center;
  color: black;
}
.optionalmenu > div > div.om1 {
  display: inline-block;
  width: 14%;
}
.optionalmenu > div > div.om2 {
  display: inline-block;
  width: 100%;
}
.optionalmenu > div > div.om3 {
  display: inline-block;
  width: 100%;
}

.body_container {
  text-align: left;
}
</style>