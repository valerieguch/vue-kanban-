<script setup>
import { kanban } from '../store.js'

const props = defineProps({
    show: Boolean
})
</script>

<template>
  <!-- <Transition name="modal"> -->
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3>Создать задачу</h3>

          <div class="modal-body">
            <div class="field-wrapper">
              <label for="item-name" class="label">Название</label>
              <!-- TODO remove ugly border when focused -->
              <input
                id="item-name"
                type="text"
                placeholder="Название задачи"
                class="input">
            </div>

            <div class="field-wrapper">
              <label for="item-desc" class="label">Описание</label>
              <!-- <input
                id="item-desc"
                type="text"
                class="input text-area"> -->
              <textarea
                id="item-desc"
                class="input text-area"
                rows="3"
                placeholder="Описание задачи"></textarea>
            </div>

            <div class="column-and-priority">
              <div class="field-wrapper">
                <label for="column-select" class="label">Категория</label>
                <select name="column-index" id="column-select">
                  <option v-for="column in kanban" :value="column.index">{{ column.name }}</option>
                </select>
              </div>

              <fieldset class="priority">
                <legend class="label">Приоритет</legend>

                <div class="options">
                  <div>
                    <input type="radio" id="3" name="priority" value="3" checked>
                    <label for="3" class="priority-label">3</label>
                  </div>

                  <div>
                    <input type="radio" id="2" name="priority" value="2">
                    <label for="2" class="priority-label">2</label>
                  </div>

                  <div>
                    <input type="radio" id="1" name="priority" value="1">
                    <label for="1" class="priority-label">1</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="modal-footer">
            default footer
            <button
              class="btn-ok"
              @click="$emit('close')"
            >OK</button>
          </div>
        </div>
      </div>
    </div>
  <!-- </Transition> -->
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
/*  transition: opacity 0.3s ease;*/
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  padding: 1rem;
}

.modal-container {
  max-width: 32rem;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.2s ease;

  display: flex;
  flex-direction: column;
}

.modal-header h3 {
  color: var(--color-text);
}

.modal-body {
  margin: 20px 0;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.2rem 0;
}

.label {
  font-size: 1.1em;
}

.input {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;

  padding: .375rem .75rem;
  font-size: 1.1em;
/*  transition: border-color .2s ease-in-out;*/
  transition: background-color .2s ease-in-out;
}

.input:focus {
/*  background-color: var(--color-background-mute);*/
/*  border: 20px solid var(--color-btn-green);*/
}

.text-area {
  resize: none;
}

.column-and-priority {
/*  padding: .5rem 0;*/

  display: flex;
  gap: 2rem;
}

fieldset.priority {
  border: none;
  padding: 0.2rem 0;
}

fieldset.priority legend {
  padding: 0.3rem 0 0 0;
}

fieldset.priority .options {
  display: flex;
  gap: 1rem;
}

.priority-label {
  font-size: 1.1em;
  margin-left: 0.3rem;
}

select {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;

  padding: .375rem .75rem;

  font-size: 1.1em;
}

.btn-ok {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

/*
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}
*/
</style>