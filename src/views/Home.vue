<template>
  <div>
    <ul class="task-list" v-show="!this.$store.state.loader">
      <li class="task"
          :class="{'is-completed' : task.isCompleted}"
          v-for="(task, index) in this.$store.getters.sliceTaskListPagination"
          v-bind:key="index" >
        <div class="task__checkbox">
          <input type="checkbox" v-model="task.isCompleted" @change="taskMakeCompleted(task)" :id="'checkbox-' + index">
          <label :for="'checkbox-' + index"></label>
        </div>
        <div class="task__title">{{task.title}}</div>
        <input type="text" class="task__field" v-model="task.title" @input="editTask(task)">
        <div class="task__triggers">
          <div class="task__trigger-item task__trigger-edit task-edit" @click="editingTask($event)"></div>
          <div class="task__trigger-item task__trigger-delete" @click="deteleTask(task)"></div>
        </div>
      </li>
    </ul>
    <Pagination/>
    <div class="loader" v-show="this.$store.state.loader"></div>
  </div>
</template>

<script>
  import Pagination from "@/components/Pagination.vue"


    export default {
        name: 'home',
        data: function () {
            return{
            }
        },
        components: {
            Pagination
        },
        methods: {
            deteleTask(task){
                this.$store.dispatch("deleteTask", task);
            },
            editingTask(e){
                e.target.closest(".task").querySelector(".task__field").focus();
                e.target.closest(".task").classList.toggle("is-editing")
            },
            editTask(task){
                this.$store.dispatch("editTask", task);
            },
            taskMakeCompleted(task){
                this.$store.dispatch("taskMakeCompleted", task)
            }
        },
        mounted(){
            const _this = this;
            document.body.addEventListener("click", (e) => {
                if(!e.target.classList.contains("task__field") && !e.target.classList.contains("task-edit")){
                    _this.$el.querySelectorAll(".task").forEach(task => {
                        task.classList.remove("is-editing")
                    })
                }

            })
        }

    }
</script>

<style lang="scss">
  @import "../scss/task.scss";
</style>
