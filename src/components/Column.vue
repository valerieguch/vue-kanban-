<script setup>
import ColumnItem from './ColumnItem.vue'
defineProps({
  column: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- <div class="wrapper"> -->
    <!-- TODO make column constant height, items should be scrollable -->
    <div class="column">
      <h2 class="column-header">{{ column.name }} ({{ column.items.length }})</h2>

      <ul class="items">
        <ColumnItem
          v-for="item in column.items"
          :item="item"
          :key="item.uuid" />
      </ul>
    </div>
  <!-- </div> -->
</template>


<style scoped>
  .column {
/*    width: 100%;*/
    height: 100%;

    display: flex;
    flex-direction: column;
    background-color: var(--color-background-soft);
    border: 1px solid  var(--color-border);
    border-radius: 0.25rem;
  }

  .column-header {
    background-color: var(--color-background-mute);
    padding: 0.5rem 1rem;
    text-align: center;
  }

  .items {
    list-style: none;
    padding: 1rem;
    display: grid;
    align-items: center;
    grid-auto-flow: row;
    grid-auto-rows: minmax(10rem, auto);
    gap: 1rem;

/*    display: flex;*/
/*    flex-direction: column;*/
/*    gap: 1rem;*/

/*    max-height: 20rem;*/
    overflow: scroll;
  }
</style>