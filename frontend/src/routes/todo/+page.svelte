<script lang="ts">
  import TodoApp from '$lib/components/TodoApp.svelte';
  import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
  <title>Todo App - Django Svelte Template</title>
  <meta name="description" content="Manage your todos with this Django and Svelte application" />
</svelte:head>

<Header />
<div class="container mx-auto px-4 py-8">
  <TodoApp />
</div>