<template>
  <div class="loadcut"></div>
</template>

<script>
export default {
  data() {
    return {
      cuts: []
    };
  },
  created() {
    this.$EventBus.$on("loadCut", cnt => {
      this.getCutList(cnt);
    });
  },
  methods: {
    getCutList(cnt) {
      console.log(cnt);
      this.$http
        .get(
          "https://beta.actoon.sokdak.me/api/cut/" +
            localStorage.getItem("project") +
            "/" +
            cnt,
          {
            headers: { Authorization: localStorage.getItem("auth") }
          }
        )
        .then(response => {
          for (let i in response.data) {
            console.log(response.data[i]);
            this.projects.push({
              sequence: response.data[i].sequence,
              type: response.data[i].type,
              file: response.data[i].file,
              idx: i
            });
          }
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>

<style scoped>
.loadcut {
  height: 100%;
}
</style>