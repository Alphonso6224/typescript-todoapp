<template>
  <Header class="header">
    <RouterLink to="/">
      <h1>Todos</h1>
    </RouterLink>

    <input
      class="new-todo"
      type="text"
      placeholder="Entrez une tâche"
      autofocus
      autocomplete="off"
    />
  </Header>
</template>

<script setup lang="ts"></script>

<style scoped></style>