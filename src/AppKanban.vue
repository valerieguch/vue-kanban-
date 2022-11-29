<script setup>
import Header from './components/Header.vue'
import Column from './components/Column.vue'
import ModalItemCreate from './components/ModalItemCreate.vue'

import { ref } from 'vue'
import { kanban, archived } from './store.js'

function switchTheme() {
  isDarkTheme = !isDarkTheme
  document.querySelector('body').classList.toggle('dark');
}

const showModal = ref(false)
</script>


<template>
  <Header />

  <main class="main-wrapper">
    <button @click="showModal = true" class="btn-create-task">Создать задачу</button>

    <Teleport to="body">
      <ModalItemCreate :show="showModal" @close="showModal = false" />
    </Teleport>

    <div class="board">
      <Column
        v-for="column in kanban"
        :column="column"
        :key="column.uuid" />
    </div>

    <div style="padding-bottom: 1rem;">
      <h3>Archive:</h3>
      <i v-if="archived.length === 0">Empty</i>
      <ul v-else v-for="item in archived" :key="item.uuid">
        <li>{{ item.name }}</li>
      </ul>
    </div>
  </main>

  <!-- TODO this is a hack to make footer stick to the bottom. Not elegant at all. -->
  <div class="spacer"></div>

  <footer class="footer">
    <div class="footer-wrapper">Валерия Гучустян, 191-322</div>
  </footer>
</template>


<style scoped>
.main-wrapper {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn-create-task {
  margin: 3rem 2rem 0rem 2rem;
  height: 2.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1.1em;

  color: var(--vt-c-white-soft);
  background-color: var(--color-btn-green);
  border: none;
  border-radius: 0.25rem;

  cursor: pointer;

  transition: filter .2s ease-in-out;
}

.btn-create-task:hover {
  filter: brightness(120%);
}

.board {
  padding: 2rem;
  min-height: 40rem;

  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-auto-columns: 24rem;
  gap: 2rem;
/*    grid-template-columns: unset;*/
/*    grid-template-rows: unset;*/
/*    overflow: scroll;*/
}

.spacer {
  flex-grow: 1;
}

.footer {
  background-color: var(--color-background-mute);
}

.footer-wrapper {
  min-height: 3rem;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;
}
</style>
