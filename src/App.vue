<template>
  <div id="app">
    <div class="box">
      <h1 class="box__title">Задачи</h1>
      <AddNewTaskForm/>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import AddNewTaskForm from "@/components/AddNewTaskForm.vue"

  export default{
      name: "app",
      data: function () {
          return{

          }
      },
      components: {
          AddNewTaskForm
      },
      created(){
          this.$store.dispatch("loadedTaskList")
      }
  }
</script>

<style lang="scss">
  @import "scss/style.scss";
</style>
