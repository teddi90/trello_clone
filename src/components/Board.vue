<script setup>
import {useBoardStore} from "@/stores/board.js";
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import BoardColumn from "@/components/BoardColumn.vue";

const store = useBoardStore();
const route = useRoute();
const router = useRouter();
const newColumnName=ref('');
store.$subscribe((mutation, state) => {
  localStorage.setItem('board', JSON.stringify(state.board))
})
const isTaskOpen=computed(()=>{
  return route.name==='task';
})
const close=()=>{
  router.push({name:'board'});
}
const createColumn=()=>{
  store.createColumn(newColumnName.value);
  newColumnName.value='';
}

</script>

<template>
  <div class="flex flex-row items-start m-4">
    <BoardColumn v-for="(column, $columnIndex) in store.board.columns"
                 :key="column.name"
                 :column="column"
                 :columnIndex="$columnIndex"
    />
    <div class="bg-gray-200 p-2 mr-4 shadow rounded min-w-[350px]">
      <input @keyup.enter="createColumn()"
             v-model="newColumnName"
             type="text" class="block p-2 w-full bg-transparent focus:outline-none" placeholder="+ Add new column"
      />
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