<script setup>
import {useBoardStore} from "@/stores/board.js";
import ColumnTask from "@/components/ColumnTask.vue";

defineProps({
  column:{
    type:Object,
    required:true
  },
  columnIndex:{
    type:Number,
    required:true
  }
});
const store = useBoardStore();
const createTask=(event, columnIndex)=>{
  store.createTask(columnIndex,event.target.value);
  event.target.value='';
}

const moveTask=(e,toColumnInx, toTaskInx)=>{
  const fromColumnInx=e.dataTransfer.getData('from-column-index');
  const fromTaskInx=e.dataTransfer.getData('from-task-index');

  store.moveTask(fromColumnInx,toColumnInx,fromTaskInx, toTaskInx);
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
const moveTaskOrColumn=(e, toColumnInx, toTaskInx)=>{
  const type=e.dataTransfer.getData('type');
  const toTaskIndex = toTaskInx !== undefined ? toTaskInx : store.board.columns[toColumnInx].tasks.length;
  if(type==='task'){
    moveTask(e,toColumnInx,toTaskIndex);
  } else {
    moveColumn(e,toColumnInx);
  }
}
const deleteColumn=(columnIndex)=>{
  store.deleteColumn(columnIndex)
}
</script>

<template>
  <div class="bg-gray-200 p-2 mr-4 shadow rounded min-w-[350px]"
       draggable="true"
       @dragstart.self="pickupColumn($event, columnIndex)"
       @drop="moveTaskOrColumn($event, columnIndex)"
       @dragover.prevent
       @dragenter.prevent
  >
    <div class="flex items-center mb-2 font-bold justify-between">
      <div>{{ column.name }}</div>
      <button @click="deleteColumn(columnIndex)" type="button" class="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 hover:text-red-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="list-reset">
      <ColumnTask v-for="(task, $taskIndex) in column.tasks"
                  :key="task.id"
                  :task="task"
                  :taskIndex="$taskIndex"
                  :columnIndex="columnIndex"
                  @move-task-or-column="moveTaskOrColumn"
      />
      <input @keyup.enter="createTask($event,columnIndex)"
             type="text" class="block p-2 w-full bg-transparent focus:outline-none" placeholder="+ Add new task"
      />
    </div>
  </div>
</template>
