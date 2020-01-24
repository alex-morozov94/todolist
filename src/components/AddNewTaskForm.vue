<template>
    <form class="add-new-task-form" @submit.prevent="addTask()">
        <textarea class="add-new-task-form__field" placeholder="Введите заголовок задачи..." v-model="newTaskTitle"></textarea>
        <button class="add-new-task-form__btn" type="submit">Add task</button>
    </form>
</template>

<script>
    export default {
        name: 'AddNewTaskForm',
        data: function () {
            return {
                newTaskTitle: ""
            }
        },
        methods: {
            addTask(){
                const newTask = {
                    date: Date.now(),
                    title: this.newTaskTitle
                }
                this.$store.dispatch("addTask", newTask);
                this.$store.commit("changePaginationPage", 0);
                this.newTaskTitle = "";
            }
        }
    }
</script>

<style lang="scss">
   @import "../scss/add-new-task-form.scss";
</style>

