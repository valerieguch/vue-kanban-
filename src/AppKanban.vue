<script setup>
import Column from './components/Column.vue'
import { kanban } from './store.js'
</script>


<template>
  <div class="wrapper">
    <div class="board">
      <Column
        v-for="column in kanban"
        :column="column"
        :key="column.uuid" />
    </div>
  </div>

    <!-- <p>Columns</p>
    <ul v-for="column in kanban">
      <p>{{ column.name }}:</p>
      <li v-for="item in column.items">
        {{ item.name }}, priority: {{ item.priority }}
      </li>
    </ul> -->
</template>


<style scoped>
  .wrapper {
    margin: 0 auto;
    display: flex;
    align-items: stretch;
  }

  /* Scrollable grid */
  .board {
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: 25rem;
    gap: 2rem;
/*    grid-template-columns: unset;*/
/*    grid-template-rows: unset;*/
    overflow: scroll;
  }
</style>
