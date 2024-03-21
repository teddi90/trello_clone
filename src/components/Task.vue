<script setup>
import {computed} from "vue";
import {useBoardStore} from "@/stores/board.js";
import {useRouter} from "vue-router";
const store=useBoardStore();
const props=defineProps({
  id:{
    type:String,
    required:true
  }
})
const router=useRouter();
const task=computed(()=>{
  return store.getTask(props.id)
})

const updateTask=(task,e,key)=>{
  store.updateTask(task,key,e.target.value);
}
</script>

<template>
  <div class="relative flex flex-row bg-white max-w-[800px] px-3 py-4 my-32 mx-auto rounded">
    <button @click="router.push({name:'board'});"
        class="absolute right-2 top-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="flex flex-col flex-grow items-start justify-between mb-2">
      <input type="text" class="p-2 mr-2 flex-grow text-xl w-full font-bold focus:outline-none"
             :value="task.name"
             @change="updateTask(task,$event,'name')"
      />
      <textarea :value="task.description"
                @change="updateTask(task, $event,'description')"
                class="relative bg-transparent px-2 border-none h-64 leading-normal w-full focus:outline-none"
                placeholder="Write task description"
      />
    </div>

  </div>
</template>

<style scoped>

</style>