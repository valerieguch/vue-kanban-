<script setup>
import IconEcosystem from './components/icons/IconEcosystem.vue';
import Column from './components/Column.vue'
import ModalItemCreate from './components/ModalItemCreate.vue'

import { ref } from 'vue'
import { kanban, archived } from './store.js'

// TODO maybe move this to a header component?
const preferDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
if (preferDarkTheme) document.querySelector('body').classList.add('dark');
let isDarkTheme = ref(preferDarkTheme)

function switchTheme() {
  isDarkTheme = !isDarkTheme
  document.querySelector('body').classList.toggle('dark');
}

const showModal = ref(false)
</script>


<template>
  <header class="header">
    <div class="header-wrapper">
      <a href="#" class="header-logo">
        <IconEcosystem />
      </a>

      <!-- TODO make centered, probably using grid -->
      <h1 class="header-app-name">Канбан</h1>

      <div class="theme-switch-wrapper">
        <label for="switch">Темная тема</label>
        <input
          type="checkbox"
          :checked="preferDarkTheme"
          @change="switchTheme"
          id="switch"
          class="theme-switch">
      </div>

      <!-- <button @click="switchTheme">Switch theme</button> -->
    </div>
  </header>

  <main class="wrapper">
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

    <!-- <p>Columns</p>
    <ul v-for="column in kanban">
      <p>{{ column.name }}:</p>
      <li v-for="item in column.items">
        {{ item.name }}, priority: {{ item.priority }}
      </li>
    </ul> -->
  <footer class="footer">
    <div class="footer-wrapper">Валерия Гучустян, 191-322</div>
  </footer>
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

.header-app-name {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  font-size: 1.5em;
}

.wrapper {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn-create-task {
  /* TODO ugly */
  margin: 3rem 2rem 0rem 2rem;
/*  width: 9rem;*/
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
/*  background-color: var(--color-btn-green);*/
}

/* TODO make scorllable */
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

.theme-switch-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-switch {
  border-radius: 2em;
  width: 40px;
  height: 20px;
  background-color: #fff;
  border: 1px solid var(--color-border);
  appearance: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: 0;
  background-image: url('./assets/img/switch.svg');
  transition: background-position .2s ease-in-out;
}

.theme-switch:checked {
  background-position: right center;
  background-image: url('./assets/img/switch-checked.svg');
  background-color: #776acf;
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
