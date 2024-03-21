<script setup>
import router from "@/router.js";
import AppDrop from "@/components/AppDrop.vue";
import AppDrag from "@/components/AppDrag.vue";
import {useBoardStore} from "@/stores/board.js";

const store=useBoardStore();
const emit=defineEmits(['moveTaskOrColumn']);
const props=defineProps({
  task:{
    type:Object,
    required:true
  },
  taskIndex:{
    type:Number,
    required:true
  },
  columnIndex:{
    type:Number,
    required:true
  }
});
const goToTask=(id)=>{
  router.push({name:"task", params:{id:id}});
}
const moveTask = ({fromColumnIndex,fromTaskIndex}) => {
  store.moveTask(fromColumnIndex, props.columnIndex, fromTaskIndex, props.taskIndex);
}
const moveColumn = ({fromColumnIndex}) => {
  store.moveColumn(fromColumnIndex, props.columnIndex);
}
const moveTaskOrColumn = (transferData) => {
  console.log(transferData)
  if (transferData.type === 'task') {
    moveTask(transferData);
  } else {
    moveColumn(transferData);
  }
}
</script>

<template>
<!--  <AppDrop @drop="emit('moveTaskOrColumn',{type:'task',fromColumnIndex:columnIndex, fromTaskIndex:taskIndex, toTaskIndex:props.taskIndex})">-->
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag :transfer-data="{type:'task',fromColumnIndex:columnIndex, fromTaskIndex:taskIndex}"
             class="flex items-center flex-wrap shadow mb-2 p-2 rounded bg-white text-gray-700"
             @click="goToTask(task.id)">
      <span class="w-full font-bold">{{ task.name }}</span>
      <p v-if="task.description" class="w-full mt-1 text-sm">{{ task.description }}</p>
    </AppDrag>
  </AppDrop>

</template>
