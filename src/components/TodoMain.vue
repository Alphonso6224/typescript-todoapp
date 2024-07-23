<template>
  <main class="main">
    <div>
      <input class="toggle-all" id="toggle-all-input" type="checkbox" v-model="toggleAll" />
      <label htmlFor="toggle-all-input">Switcher toutes les tâches</label>
    </div>
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
import { computed } from 'vue';

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void;
  (e: 'complete-todo', todo: Todo, completeVal: boolean): void;
  (e: 'edit-todo', todo: Todo, value: string): void;
  (e: 'toggle-all-input', value: boolean): void;
}>();

const props = defineProps<{
  taches: Todo[];
}>();

const toggleAll = computed<boolean>({
  get: () => props.taches.every((todo) => todo.complete),
  set: (value: boolean) => {
    emit('toggle-all-input', value);
  }
});

function completedTodo(todo: Todo, completedValue: boolean) {
  emit('complete-todo', todo, completedValue);
}

function editTodo(todo: Todo, value: string) {
  emit('edit-todo', todo, value); // emmettre un event
}
</script>

<style scoped></style>
