<template>
    <div class="middle">
      <div class="middle_left">
        <load-cut/>
      </div>
      <div class="middle_center">
        <div class="middle_canvas">
          
        </div>
      </div>
      <div class="middle_right">
        <div class="middle_right_up">
          
        </div>
        <div class="middle_right_down">
          <user-history/>
        </div>
      </div>
    </div>
</template>

<script>
import LoadCut from "../../components/loadcut"
import UserHistory from "../../components/userhistory"

export default {
  components: { LoadCut, UserHistory }
}
</script>



<style scoped>
  .middle {
    height: calc(100% - 160px);
    width: 100%;
    
  }

  .middle_left {
    width:150px;
    border-right-width: 2px;
    border-right-style: inset;
    border-right-color: rgb(41, 41, 41);
  }

  .middle_center {
    width:calc(100% - 300px);
  }

  .middle_canvas {
    margin-top: 70px;
    margin-left: 150px;
    width:70%;
    height:70%;
    vertical-align: middle;
    text-align: center;
    background-color: gray;
  }

  .middle_right {
    width:150px;
    border-left-width: 2px;
    border-left-style: inset;
    border-left-color: rgb(41, 41, 41);
  }

  .middle_right>div {
    height: 50%;
  }

  div.middle>div{
    float:left;
    height: 100%;
  }
</style>