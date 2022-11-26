<script setup>
import IconEcosystem from './components/icons/IconEcosystem.vue';
import Column from './components/Column.vue'
import { ref } from 'vue'
import { kanban, archived } from './store.js'

const preferDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
if (preferDarkTheme) document.querySelector('body').classList.add('dark');
let isDarkTheme = ref(preferDarkTheme)

function switchTheme() {
  isDarkTheme = !isDarkTheme
  document.querySelector('body').classList.toggle('dark');
}

</script>


<template>
  <header class="header">
    <div class="header-wrapper">
      <a href="#" class="header-logo">
        <IconEcosystem />
      </a>

      <h1 style="font-size: 1.5em;">Канбан</h1>

      <button @click="switchTheme">Switch theme</button>
      <!-- <div class="theme-switcher">
        <i>theme</i>
      </div> -->
    </div>
  </header>

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
.header {
  background-color: var(--color-background-mute);
}

.header-wrapper {
  min-height: 3rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  color: var(--color-text);
  padding: 0.2rem;
  scale: 150%;
}

.wrapper {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* TODO make scorllable */
.board {
  padding: 2rem;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-auto-columns: 24rem;
  gap: 2rem;
/*    grid-template-columns: unset;*/
/*    grid-template-rows: unset;*/
/*    overflow: scroll;*/
}
</style>
