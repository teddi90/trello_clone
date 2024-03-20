<script setup>
import router from "@/router.js";
const emit=defineEmits(['moveTaskOrColumn']);
defineProps({
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
const pickupTask=(e,taskIndex,fromColumnInx)=>{
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.dropEffect='move';

  e.dataTransfer.setData('from-task-index',taskIndex);
  e.dataTransfer.setData('from-column-index',fromColumnInx);
  e.dataTransfer.setData('type','task');
}
</script>

<template>
  <div class="flex items-center flex-wrap shadow mb-2 p-2 rounded bg-white text-gray-700"
       draggable="true"
       @dragstart="pickupTask($event, taskIndex, columnIndex)"
       @dragover.prevent
       @dragenter.prevent
       @drop.stop="emit('moveTaskOrColumn',$event, columnIndex, taskIndex)"
       @click="goToTask(task.id)">
    <span class="w-full font-bold">{{ task.name }}</span>
    <p v-if="task.description" class="w-full mt-1 text-sm">{{ task.description }}</p>
  </div>

</template>
