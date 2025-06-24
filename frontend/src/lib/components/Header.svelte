<script lang="ts">
  import { user, todos, error } from '$lib/stores';
  import { authApi } from '$lib/api';
  import { fly } from 'svelte/transition';

  const handleLogout = async () => {
    try {
      await authApi.logout();
      user.set(null);
      todos.set([]);
      error.set(null);
    } catch (error) {
      // Logout failed, but continue to clear local state
    }
  };
</script>

<header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-200">
  <div class="container mx-auto px-4 py-4">
    <div class="flex justify-between items-center">
      <div in:fly={{ x: -20, duration: 600 }}>
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Todo App
        </h1>
      </div>
      
      {#if $user}
        <div in:fly={{ x: 20, duration: 600 }} class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {$user.username.charAt(0).toUpperCase()}
            </div>
            <span class="text-gray-700 dark:text-gray-300 font-medium">Welcome, {$user.username}!</span>
          </div>
          <button
            on:click={handleLogout}
            class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium"
          >
            Logout
          </button>
        </div>
      {/if}
    </div>
  </div>
</header>