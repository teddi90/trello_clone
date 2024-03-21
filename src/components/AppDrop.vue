<script setup>
const emit=defineEmits(['drop']);
const onDrop = (e) => {
  const transferData = JSON.parse(e.dataTransfer.getData('payload'));
  emit('drop',transferData);
}
</script>

<template>
  <div @drop.stop="onDrop($event)"
       @dragover.prevent
       @dragenter.prevent>
    <slot/>
  </div>
</template>
