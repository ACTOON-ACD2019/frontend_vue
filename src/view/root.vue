<template>
    <div class="root">
        <top-frame/>
        <center-frame/>
        <bottom-frame/>
    </div>
</template>

<script>
import TopFrame from "./topframe/topframe"
import CenterFrame from "./centerframe/centerframe"
import BottomFrame from "./bottomframe/bottomframe"

export default {
  name: 'root',
  components: { TopFrame, CenterFrame, BottomFrame }
}
</script>

<style scoped>
  .root {
    position:relative;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

</style>