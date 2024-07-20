<template>
  <div>
    <!-- Header -->
    <TodoHeader @add-todo="addTodo" />

    <!-- Main -->
    <TodoMain
      :taches="filteredTodos"
      @delete-todo="deleteTodo"
      @complete-todo="completedTodo"
      @edit-todo="editTodo"
    />

    <!-- Footer -->
    <TodoFooter :todos="todos" @delete-completed="deleteCompleted"/>
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { computed, ref } from 'vue'
import { nanoid } from 'nanoid'
import { useStorage } from '@vueuse/core'
import { useRoute } from 'vue-router'

// const todos = ref<Todo[]>([])
// Utilisation du useStorage
const todos = useStorage<Todo[]>('todoapp-todos', [])
const route = useRoute()

const filters = computed(() => {
  return {
    all: todos,
    waiting: todos.value.filter((todo) => !todo.complete),
    completed: todos.value.filter((todo) => todo.complete)
  }
})

const waitingTodos = computed<Todo[]>(() => filters.value.waiting)
const completedTodos = computed<Todo[]>(() => filters.value.completed)

const filteredTodos = computed(() => {
  switch (route.name) {
    case 'waiting':
      return waitingTodos.value
    case 'completed':
      return completedTodos.value
    default:
      return todos.value
  }
})

function addTodo(value: string): void {
  if (!value.trim().length) return
  todos.value.unshift({
    id: nanoid(),
    title: value,
    complete: false
  })
}

function deleteCompleted(): void {
  todos.value = todos.value.filter((todo) => !todo.complete)
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
