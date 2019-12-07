<template>
  <div class="thumnail">
    <div>
      <img src="../assets/team logo.png" width="50" height="50" />
    </div>
    <div>
      {{ project }} <span style = "font-size:10px;">{{ desc }}</span>
      <br />
      {{ date }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: localStorage.getItem("project")
    };
  },
  props: ["src", "date", "desc"]
};
</script>

<style scoped>
.thumnail > div{
  float: left;
}
.thumnail > div > span {
  vertical-align: bottom;
}
</style>

