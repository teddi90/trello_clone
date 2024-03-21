<script setup>
const props = defineProps({
  transferData: {
    type: Object,
    required: true
  }
})
const onDrag = (e) => {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.dropEffect = 'move';

  e.dataTransfer.setData('payload', JSON.stringify(props.transferData))
}
</script>

<template>
  <div draggable="true"
       @dragstart.self="onDrag($event)"
       @dragover.prevent
       @dragenter.prevent>
    <slot/>
  </div>
</template>

<style scoped>

</style>