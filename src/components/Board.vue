<script setup>
import {useBoardStore} from "@/stores/board.js";
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const store = useBoardStore();
const route = useRoute();
const router = useRouter();
store.$subscribe((mutation, state) => {
  localStorage.setItem('board', JSON.stringify(state.board))
})
const isTaskOpen=computed(()=>{
  return route.name==='task';
})
const goToTask=(id)=>{
  router.push({name:"task", params:{id:id}});
}
const close=()=>{
  router.push({name:'board'});
}
const createTask=(event, columnIndex)=>{
  store.createTask(columnIndex,event.target.value);
  event.target.value='';
}
const pickupTask=(e,taskIndex,fromColumnInx)=>{
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.dropEffect='move';

  e.dataTransfer.setData('task-index',taskIndex);
  e.dataTransfer.setData('from-column-index',fromColumnInx);
  e.dataTransfer.setData('type','task');

}
const moveTask=(e,toColumnInx)=>{
  const fromColumnInx=e.dataTransfer.getData('from-column-index');
  const taskIndex=e.dataTransfer.getData('task-index');

  store.moveTask(fromColumnInx,toColumnInx,taskIndex);
}

const pickupColumn=(e,fromColumnInx)=>{
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.dropEffect='move';

  e.dataTransfer.setData('from-column-index',fromColumnInx);
  e.dataTransfer.setData('type','column');

}
const moveColumn=(e,toColumnInx)=>{
  const fromColumnInx=e.dataTransfer.getData('from-column-index');

  store.moveColumn(fromColumnInx,toColumnInx);
}
const moveTaskOrColumn=(e,toColumnInx)=>{
  const type=e.dataTransfer.getData('type');
  if(type==='task'){
    moveTask(e,toColumnInx);
  } else {
    moveColumn(e,toColumnInx);
  }
}
</script>

<template>
  <div class="flex flex-row items-start m-4">
    <div class="bg-gray-200 p-2 mr-4 shadow rounded min-w-[350px]"
         v-for="(column,$columnIndex) in store.board.columns"
         :key="column.name"
         draggable="true"
         @dragstart.self="pickupColumn($event,$columnIndex)"
         @drop="moveTaskOrColumn($event,$columnIndex)"
         @dragover.prevent
         @dragenter.prevent
    >
      <div class="flex items-center mb-2 font-bold ">{{ column.name }}</div>
      <div class="list-reset">
        <div class="flex items-center flex-wrap shadow mb-2 p-2 rounded bg-white text-gray-700"
             v-for="(task, $taskIndex) in column.tasks"
             :key="task.id"
             draggable="true"
             @dragstart="pickupTask($event,$taskIndex,$columnIndex)"
             @dragover.prevent
             @dragenter.prevent
             @click="goToTask(task.id)">
          <span class="w-full font-bold">{{ task.name }}</span>
          <p v-if="task.description" class="w-full mt-1 text-sm">{{ task.description }}</p>
        </div>
        <input @keyup.enter="createTask($event,$columnIndex)"
               type="text" class="block p-2 w-full bg-transparent focus:outline-none" placeholder="+ Enter new task"

        />
      </div>
    </div>
    <div class="absolute inset-0 bg-black bg-opacity-70 h-full w-full"
      v-if="isTaskOpen"
      @click.self="close">
      <RouterView/>
    </div>
  </div>

</template>

<style scoped>

</style>