<template>
  <div class="userhistory">
    <b-form-select v-model="selected" :options="tasks" :select-size="5"></b-form-select>
    <b-button size="sm" variant="info" @click="deleteTask">최근 기록 되돌리기</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      tasks: [],
      deleteIdx: ""
    };
  },
  created() {
    this.$EventBus.$on("loadtask", () => {
      this.getTaskList();
    });
  },
  methods: {
    getTaskList() {
      this.tasks = [];
      this.$http
        .get(
          "https://beta.actoon.sokdak.me/api/task/" +
            localStorage.getItem("project") +
            "/"
        )
        .then(response => {
          let i = "";
          for (i in response.data) {
            this.tasks.push({
              value: i + 1,
              text: i + " 아이콘 : " + response.data[i].effect
              //나중에 삭제한 태스크도 프론트에서 스택으로 처리해서 넣을 예정
            });
          }
          this.deleteIdx = i;
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    deleteTask() {
      this.$http
        .delete(
          "https://beta.actoon.sokdak.me/api/task/" +
            localStorage.getItem("project") +
            "/" +
            this.deleteIdx +
            "/"
        )
        .then(response => {
          console.log("최근 기록 삭제 완료");
          this.getTaskList();
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>

<style scoped>
.userhistory {
  height: 100%;
  text-align: center;
}
.b-form-select {
  height: 100px;
}
</style>