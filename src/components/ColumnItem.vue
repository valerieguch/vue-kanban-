<script setup>
import IconLeftArrow from "./icons/IconLeftArrow.vue"
import IconEdit from './icons/IconEdit.vue'
import IconRightArrow from './icons/IconRightArrow.vue'
import { computed } from 'vue'
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
</script>

<template>
  <!-- <div class="wrapper"> -->
    <li class="item">
      <div class="item-header">
        <h3>{{ item.name }}</h3>
        <div class="priority-badge" :class="badgeColorClass">{{ item.priority }}</div>
      </div>

      <div class="item-body">
        <p v-if="item.desc" class="item-desc">{{ item.desc }}</p>
        <i v-else class="item-desc text-muted" style="display: block" >без описания</i>

        <i style="padding-bottom: 1rem; display: block;">{{ item.date }}</i>

        <div class="item-buttons">
          <button>
            <i class="icon"><IconLeftArrow /></i>
          </button>

          <button>
            <i class="icon"><IconEdit /></i>
          </button>

          <button>
            <i class="icon"><IconRightArrow /></i>
          </button>
        </div>
      </div>
    </li>
  <!-- </div> -->
</template>


<style scoped>
  .item {
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-soft);
    border: 1px solid  var(--color-border);
    border-radius: 0.25rem;
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