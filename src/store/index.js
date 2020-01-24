import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'
import 'firebase/firestore'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      taskList: [],
      pagination: {
          page: 0,
          size: 10
      },
      loader: false
  },
  mutations: {
      loadedTaskList(state, taskList){
          state.taskList = taskList
      },
      addTask(state, newTask){
          state.taskList.unshift(newTask)
      },
      changePaginationPage(state, newPage){
          state.pagination.page = newPage;
      },
      deleteTask(state, task){
        state.taskList.forEach((taskItem, index) => {
            if(taskItem.date === task.date){
                state.taskList.splice(index, 1)
            }
        })
      },
      taskMakeCompleted(state, task){
          state.taskList.forEach((taskItem, index) => {
              if(taskItem.date === task.date){
                  state.taskList[index].isCompleted = task.isCompleted
              }
          })
      },
      editTask(state, task){
          state.taskList.forEach((taskItem, index) => {
              if(taskItem.date === task.date){
                  state.taskList[index].title = task.title
              }
          })
      },
      loaderToggle(state, status){
          state.loader = status
      }
  },
  actions: {
      loadedTaskList({commit}){
          commit("loaderToggle", true);
          db.collection("todoList").orderBy("date", "asc").get()
              .then(function(querySnapshot) {
                  const taskList = [];
                  querySnapshot.forEach(function(task) {
                      taskList.unshift({...task.data()})
                  });
                  commit("loadedTaskList", taskList)
                  commit("loaderToggle", false);
              })
              .catch(function(error) {
                  console.log("Error getting documents: ", error);
              });
      },
      addTask({commit}, newTask){
          db.collection("todoList").doc(`task_${newTask.date}`).set(newTask)
        commit("addTask", newTask)
      },
      deleteTask({commit}, task){
          db.collection("todoList").doc(`task_${task.date}`).delete();
          commit("deleteTask", task)
      },
      taskMakeCompleted({commit}, task){
          db.collection("todoList").doc(`task_${task.date}`).update({
              isCompleted: task.isCompleted
          });
          commit("taskMakeCompleted", task)
      },
      editTask({commit}, task){
          db.collection("todoList").doc(`task_${task.date}`).update({
              title: task.title
          });
          commit("editTask", task)
      }
  },
    getters: {
        sliceTaskListPagination: (state) => {
            let start = state.pagination.page * state.pagination.size;
            let end = state.pagination.page * state.pagination.size + state.pagination.size;
            return state.taskList.slice(start, end);
        }
    }
})
