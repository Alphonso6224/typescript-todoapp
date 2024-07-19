<template>
  <li :class="{ completed: todo.complete }">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="isTodoCompleted"/>
      <Label>
        {{ todo.title }}
      </Label>
      <button class="destroy" @click="emit('delete-todo', todo)"></button>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import { computed } from 'vue';

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
(e: 'delete-todo', todo: Todo): void
(e: 'complete-todo', todo: Todo, completeVal: boolean): void
}>()

const isTodoCompleted = computed<boolean>({
  get: () => props.todo.complete,
  set: (newVal: boolean) => emit('complete-todo', props.todo, newVal)
});
</script>

<style scoped></style>
