<script setup>
import Column from './components/Column.vue'
import { kanban, archived } from './store.js'
</script>


<template>
  <main class="wrapper">
    <div class="board">
      <Column
        v-for="column in kanban"
        :column="column"
        :key="column.uuid" />
    </div>

    <h3>Archived:</h3>
    <ul v-for="item in archived" :key="item.uuid">
      <li>{{ item.name }}</li>
    </ul>
  </main>

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
    flex-direction: column;
    align-items: stretch;
  }

  /* Scrollable grid */
  .board {
    padding: 2rem;
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-auto-columns: 24rem;
    gap: 2rem;
/*    grid-template-columns: unset;*/
/*    grid-template-rows: unset;*/
    overflow: scroll;
  }
</style>
