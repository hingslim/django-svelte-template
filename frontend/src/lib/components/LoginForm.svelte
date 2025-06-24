<script lang="ts">
  import { user, error, loading } from '$lib/stores';
  import { authApi, refreshCsrfToken } from '$lib/api';
  import { fly } from 'svelte/transition';

  let username = '';
  let password = '';

  const handleLogin = async () => {
    if (!username || !password) {
      error.set('Please enter both username and password');
      return;
    }

    loading.set(true);
    error.set(null);

    try {
      const response = await authApi.login(username, password);
      
      // Refresh CSRF token after login since session changed
      await refreshCsrfToken();
      
      user.set(response.data.user);
      username = '';
      password = '';
      error.set(null);
    } catch (err: any) {
      error.set(err.response?.data?.detail || 'Login failed');
    } finally {
      loading.set(false);
    }
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    handleLogin();
  };
</script>

<div class="w-full max-w-md mx-auto">
  <div in:fly={{ y: 20, duration: 600 }}>
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Welcome to Todo App
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        Sign in to manage your todos
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-200">
      <form on:submit={handleSubmit} class="space-y-6">
        <div in:fly={{ y: 20, duration: 400, delay: 200 }}>
          <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            bind:value={username}
            disabled={$loading}
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your username"
            required
          />
        </div>

        <div in:fly={{ y: 20, duration: 400, delay: 300 }}>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            bind:value={password}
            disabled={$loading}
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your password"
            required
          />
        </div>

        {#if $error}
          <div 
            in:fly={{ y: 20, duration: 400 }}
            class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl"
          >
            {$error}
          </div>
        {/if}

        <div in:fly={{ y: 20, duration: 400, delay: 400 }}>
          <button
            type="submit"
            disabled={$loading}
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-300 disabled:to-indigo-300 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            {$loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>

      <div in:fly={{ y: 20, duration: 400, delay: 500 }} class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
        <p class="text-sm text-gray-600 dark:text-gray-300 text-center">
          Demo credentials: Create a user via Django admin<br />
          or use <code class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">manage.py createsuperuser</code>
        </p>
      </div>

      <div class="mt-6 text-center">
        <a 
          href="/" 
          class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  </div>
</div>