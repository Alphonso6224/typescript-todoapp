<template>
  <div>
    <!-- Header -->
    <TodoHeader @add-todo="addTodo" />

    <!-- Main -->
    <TodoMain
      :taches="todos"
      @delete-todo="deleteTodo"
      @complete-todo="completedTodo"
      @edit-todo="editTodo"
    />

    <!-- Footerr -->
    <TodoFooter :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { useStorage } from '@vueuse/core'

// const todos = ref<Todo[]>([])
// Utilisation du useStorage
const todos = useStorage<Todo[]>('todoapp-todos', [])

function addTodo(value: string): void {
  if (!value.trim().length) return
  todos.value.unshift({
    id: nanoid(),
    title: value,
    complete: false
  })
}

function deleteTodo(elm: Todo): void {
  todos.value = todos.value.filter((todo) => todo !== elm)
}

function completedTodo(todo: Todo, completedValue: boolean) {
  todo.complete = completedValue
}

function editTodo(todo: Todo, value: string) {
  todo.title = value
}
</script>

<style scoped></style>
