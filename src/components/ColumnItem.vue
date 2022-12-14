<script setup>
import ModalItemEdit from './ModalItemEdit.vue'

import IconLeftArrow from "./icons/IconLeftArrow.vue"
import IconEdit from './icons/IconEdit.vue'
import IconRightArrow from './icons/IconRightArrow.vue'
import IconArchive from './icons/IconArchive.vue'

import { ref, computed } from 'vue'
import { API, kanban } from '../store.js'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const badgeColorClass = computed(() => {
  if (props.item.priority === 1)
    return "background-red"
  else if (props.item.priority === 2)
    return "background-orange"
  else
    return "background-blue"
})

const isButtonLeftDisabled = computed(() => {
  return (props.item.column.index === 0);
})

const isLastColumn = computed(() => {
  return (props.item.column.index === kanban.length - 1)
})

function moveLeft() {
  API.moveItem(props.item, props.item.column, props.item.column.index - 1)
}

function moveRight() {
  API.moveItem(props.item, props.item.column, props.item.column.index + 1)
}

function archive() {
  API.moveItem(props.item, props.item.column, null)
}

const showModal = ref(false) // Edit modal

// The drop function is defined in `Column.vue`
function onDragStart(event, item) {
  // event.dataTransfer.dropEffect = 'move'
  // event.dataTransfer.effectAllowed = 'move'
  // event.dataTransfer.setData('itemUUID', item.uuid)
  API.startDrag(item)
}
</script>

<template>
  <Teleport to="body">
    <ModalItemEdit :show="showModal" :item="props.item" @close="showModal = false" />
  </Teleport>

  <li class="item" draggable="true" @dragstart="onDragStart($event, props.item)">
    <div class="item-header">
      <h3>{{ item.name }}</h3>
      <div class="priority-badge" :class="badgeColorClass">{{ item.priority }}</div>
    </div>

    <div class="item-body">
      <p v-if="item.desc" class="item-desc">{{ item.desc }}</p>
      <i v-else class="item-desc text-muted" style="display: block" >без описания</i>

      <i style="padding-bottom: 1rem; display: block;">{{ item.createdAt }}</i>

      <div class="item-buttons">
        <button
          @click="moveLeft"
          :disabled="isButtonLeftDisabled"
          title="Move to the left">
          <i class="icon"><IconLeftArrow /></i>
        </button>

        <button title="Edit" @click="showModal = true">
          <i class="icon"><IconEdit /></i>
        </button>

        <button v-if="isLastColumn" @click="moveRight" title="Archive">
          <i class="icon">
            <IconArchive />
          </i>
        </button>

        <button v-else @click="moveRight" title="Move to the right">
          <i class="icon">
            <IconRightArrow />
          </i>
        </button>
      </div>
    </div>
  </li>
</template>


<style scoped>
.item {
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-soft);
  border: 1px solid  var(--color-border);
  border-radius: 0.25rem;

  cursor: default;
}

.item-header {
  background-color: var(--color-background-mute);
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

/*    min-height: 20rem;*/
}

.priority-badge {
  border-radius: 50rem;
  padding: 0.25rem 0.55rem;
  line-height: 1;
  font-weight: 800;
  color: var(--vt-c-white-soft);
}

.background-blue {
  background-color: #0d6efd;
}

.background-orange {
  background-color: #fd7e14;
}

.background-red {
  background-color: #dc3545;
}

.item-body {
  flex: 1 1 auto;

  padding: 1rem;
}

.item-desc {
  padding-bottom: 2rem;
}

.text-muted {
  opacity: 0.6;
}

.item-buttons {
  display: flex;
  justify-content: space-between;
}

.item-buttons > button {
  width: 2.3rem;
  height: 2.3rem;
  padding: 0.4rem;
  background-color: var(--color-background-mute);
  cursor: pointer;

  border: 1px solid  var(--color-border);
  border-radius: 0.25rem;

  display: flex;
  place-items: center;
  place-content: center;

  transition: filter .2s ease-in-out;
}

.item-buttons > button:disabled {
  background-color: var(--color-background-soft);
  cursor: default;
}

.item-buttons > button:enabled:hover {
  filter: brightness(var(--btn-hover-brightness));
}

.icon {
  display: flex;
  place-items: center;
  place-content: center;
/*    width: 2rem;*/
/*    height: 2rem;*/
/*    width: 100%;*/
/*    height: 100%;*/

  color: var(--color-text);
}
</style>