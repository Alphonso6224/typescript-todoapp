<template>
  <main class="main">
    <ul class="todo-list">
      <!-- TodoItem v-for= -->
      <TodoItem
        v-for="todo in taches"
        :key="todo.id"
        :todo="todo"
        @delete-todo="emit('delete-todo', todo)"
        @complete-todo="completedTodo"
        @edit-todo="editTodo"
      />
    </ul>
  </main>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types';
import TodoItem from '@/components/TodoItem.vue';

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void;
  (e: 'complete-todo', todo: Todo, completeVal: boolean): void;
  (e: 'edit-todo', todo: Todo, value: string): void;
}>();

const props = defineProps<{
  taches: Todo[];
}>();

function completedTodo(todo: Todo, completedValue: boolean) {
  emit('complete-todo', todo, completedValue);
}

function editTodo(todo: Todo, value: string) {
  emit('edit-todo', todo, value); // emmettre un event
}
</script>

<style scoped></style>
