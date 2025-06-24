<script lang="ts">
  import { onMount } from 'svelte';
  import { todos, loading, error, user } from '$lib/stores';
  import { todoApi, type Todo } from '$lib/api';
  import TodoItem from './TodoItem.svelte';
  import TodoForm from './TodoForm.svelte';

  onMount(() => {
    if ($user) {
      loadTodos();
    }
  });

  async function loadTodos() {
    loading.set(true);
    error.set(null);
    
    try {
      const response = await todoApi.getTodos();
      todos.set(response.data.results);
    } catch (err: any) {
      error.set('Failed to load todos');
      // Error loading todos - already displayed to user via error store
    } finally {
      loading.set(false);
    }
  }

  const handleTodoCreated = (newTodo: Todo) => {
    todos.update(current => [newTodo, ...current]);
  };

  const handleTodoUpdated = (updatedTodo: Todo) => {
    todos.update(current => 
      current.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  const handleTodoDeleted = (deletedId: number) => {
    todos.update(current => 
      current.filter(todo => todo.id !== deletedId)
    );
  };

  $: completedCount = $todos.filter(todo => todo.completed).length;
  $: totalCount = $todos.length;
</script>

<div class="max-w-4xl mx-auto">
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">My Todos</h2>
      <div class="text-sm text-gray-600 dark:text-gray-300">
        {completedCount} of {totalCount} completed
      </div>
    </div>

    <TodoForm on:created={e => handleTodoCreated(e.detail)} />
  </div>

  {#if $loading}
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center transition-colors duration-200">
      <div class="animate-pulse text-gray-500 dark:text-gray-400">Loading todos...</div>
    </div>
  {:else if $error}
    <div class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
      {$error}
      <button 
        on:click={loadTodos}
        class="ml-2 underline hover:no-underline"
      >
        Retry
      </button>
    </div>
  {:else if $todos.length === 0}
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
      No todos yet. Create your first one above!
    </div>
  {:else}
    <div class="space-y-3">
      {#each $todos as todo (todo.id)}
        <TodoItem 
          {todo} 
          on:updated={e => handleTodoUpdated(e.detail)}
          on:deleted={e => handleTodoDeleted(e.detail)}
        />
      {/each}
    </div>
  {/if}
</div>