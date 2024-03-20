<script setup>
import {computed} from "vue";
import {useBoardStore} from "@/stores/board.js";
const store=useBoardStore();
const props=defineProps({
  id:{
    type:String,
    required:true
  }
})

const task=computed(()=>{
  return store.getTask(props.id)
})

const updateTask=(task,e,key)=>{
  store.updateTask(task,key,e.target.value);
}
</script>

<template>
  <div class="relative flex flex-row bg-white max-w-[800px] px-3 py-4 my-32 mx-auto rounded">
    <div class="flex flex-col flex-grow items-start justify-between mb-2">
      <input type="text" class="p-2 mr-2 flex-grow text-xl w-full font-bold"
      :value="task.name"
             @change="updateTask(task,$event,'name')"
      />
      <textarea :value="task.description"
                @change="updateTask(task, $event,'description')"
                class="relative bg-transparent px-2 border-none h-64 leading-normal w-full"
      />
    </div>

  </div>
</template>

<style scoped>

</style>