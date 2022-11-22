<script setup>
defineProps({
  column: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- <div class="wrapper"> -->
    <div class="column">
      <h2 class="name">{{ column.name }} ({{ column.items.length }})</h2>
    </div>
  <!-- </div> -->
</template>


<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    background-color: var(--color-background-soft);
    border: 1px solid  var(--color-border);
    border-radius: 0.25rem;
  }

  .column {
/*    width: 100%;*/
    height: 100%;

    display: flex;
    background-color: var(--color-background-soft);
    border: 1px solid  var(--color-border);
    border-radius: 0.25rem;
  }

  .name {
    color: var(--color-text);
  }
</style>