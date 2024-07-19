<template>
  <main class="main">
    <ul class="todo-list">
      <!-- TodoItem v-for= -->
      <TodoItem v-for="todo in taches" :key="todo.id" :todo="todo" @delete-todo="emit('delete-todo', todo)" @complete-todo="completedTodo"/>
    </ul>
  </main>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import TodoItem from '@/components/TodoItem.vue'

const emit = defineEmits<{
(e: 'delete-todo', todo: Todo): void
(e: 'complete-todo', todo: Todo, completeVal: boolean): void
}>()

const props = defineProps<{
  taches: Todo[]
}>()

function completedTodo(todo: Todo, completedValue: boolean) {
  emit('complete-todo', todo, completedValue)
}
</script>

<style scoped></style>
