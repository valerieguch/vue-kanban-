<script setup>
import ColumnItem from './ColumnItem.vue'

import { API } from '../store.js'

const props = defineProps({
  column: {
    type: Object,
    required: true
  }
})


// Item drop event
function onDrop(event) {
  // const uuid = event.dataTransfer.getData('itemUUID')
  const item = API.getDraggedItem()
  if (item.column !== props.column) {
    API.moveItem(item, item.column, props.column)
  }
  API.stopDrag()
}
</script>

<template>
  <div class="column" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
    <h2 class="column-header">{{ column.name }} ({{ column.items.length }})</h2>

    <!-- TODO items should be scrollable. At the moment the column just grows to fit all of them. -->
    <ul class="items">
      <ColumnItem
        v-for="item in column.items"
        :item="item"
        :key="item.uuid" />
    </ul>
  </div>
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
/*    overflow: scroll;*/
}
</style>