<template>
    <div class="footer">
      <div class="footer_left">
        <span class="copyright">
          Capstone Design Actoon Team<br />
          김 한, 유동균<br />
          유동현, 박성호
        </span>
      </div>
      <div class="footer_right">
        <optional-menu/>
      </div>
    </div>
</template>

<script>
import OptionalMenu from "./optionalmenu"

export default {
  components: { OptionalMenu }
}
</script>


<style scoped>
  .footer {
		height:90px;
    width: 100%;
    color:white;
    background-color:rgb(41, 41, 41);
  }

  div.footer>div{
    float:left;
    height: 100%;
  }

  .footer_left {
    width: 150px;
    text-align: center;
  }

  .footer_right {
    width: calc(100% - 150px);
  }

  .copyright {
    font-size:8pt;
  }
</style>