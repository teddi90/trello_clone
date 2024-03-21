<script setup>
import {useBoardStore} from "@/stores/board.js";
import ColumnTask from "@/components/ColumnTask.vue";
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";

const props=defineProps({
  column: {
    type: Object,
    required: true
  },
  columnIndex: {
    type: Number,
    required: true
  }
});
const store = useBoardStore();
const createTask = (event, columnIndex) => {
  store.createTask(columnIndex, event.target.value);
  event.target.value = '';
}

const moveTask = ({fromColumnIndex,fromTaskIndex,toTaskIndex}) => {
  store.moveTask(fromColumnIndex, props.columnIndex, fromTaskIndex, toTaskIndex);
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
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag :transfer-data="{type:'column',fromColumnIndex:columnIndex}" class="bg-gray-200 p-2 mr-4 shadow rounded min-w-[350px]">
        <div class="flex items-center mb-2 font-bold ">{{ column.name }}</div>
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
    </AppDrag>
  </AppDrop>
</template>
