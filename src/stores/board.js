import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import defaultBoard from "@/default-board.js";
import { v4 as uuidv4 } from 'uuid';

const boardInit=JSON.parse(localStorage.getItem('board')) || defaultBoard;
export const useBoardStore = defineStore('board', () => {
  const board = ref(boardInit);

  const createTask = (columnIndex, name)=>{
    board.value.columns[columnIndex].tasks.push({
      name,
      id:uuidv4(),
      description:'',
    });
  }
  const deleteColumn=(columnIndex)=> {
    board.value.columns.splice(columnIndex, 1);
  }
  const deleteTask=(columnIndex,taskIndex)=>{
    board.value.columns[columnIndex].tasks.splice(taskIndex, 1);
  }
  const createColumn=(name)=>{
    board.value.columns.push({
      name,
      tasks:[],
    })
  }
  const updateTask=(task,key,value)=>{
    let columnIndex;
    let taskIndex;
    
    for (let i = 0; i < board.value.columns.length; i++) {
      const column = board.value.columns[i];

      if (column.tasks.findIndex(t => t.id === task.id) !== -1) {
        columnIndex = i;
        taskIndex = column.tasks.findIndex(t => t.id === task.id);
        break;
      }
    }

    board.value.columns[columnIndex].tasks[taskIndex][key]=value;
  }

  const moveTask=(fromColumnInx, toColumnInx, fromTaskIndex, toTaskInx)=>{
    const taskToMove= board.value.columns[fromColumnInx].tasks.splice(fromTaskIndex,1)[0];
    board.value.columns[toColumnInx].tasks.splice(toTaskInx,0,taskToMove);
  }

  const moveColumn=(fromColumnInx, toColumnInx)=>{
    const columnToMove= board.value.columns.splice(fromColumnInx,1)[0];
    board.value.columns.splice(toColumnInx,0,columnToMove);
  }
  const getTask= (id)=>{
      for (const column of board.value.columns){
        for(const task of column.tasks){
          if (task.id===id){
            return task;
          }
        }
      }
  };

  return { board, getTask, createTask, updateTask, moveTask, moveColumn, createColumn, deleteColumn, deleteTask}
})
