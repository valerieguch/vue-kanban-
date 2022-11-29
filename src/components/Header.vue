<script setup>
import IconEcosystem from './icons/IconEcosystem.vue';

// If the user prefers dark theme, then use the colors from `body.dark`
const preferDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

if (preferDarkTheme) {
  document.querySelector('body').classList.add('dark');
}

function switchTheme() {
  document.querySelector('body').classList.toggle('dark');
}
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
  background-image: url('../assets/img/switch.svg');
  transition: background-position .2s ease-in-out;
}

.theme-switch:checked {
  background-position: right center;
  background-image: url('../assets/img/switch-checked.svg');
  background-color: #776acf;
}
</style>
