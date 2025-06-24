<script lang="ts">
  import { page } from '$app/stores';
  import { user, theme } from '$lib/stores';
  import { fly, slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  $: currentPath = $page.url.pathname;
  
  let mobileMenuOpen = false;
  
  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };
  
  const closeMobileMenu = () => {
    mobileMenuOpen = false;
  };

  onMount(() => {
    theme.init();
  });
</script>

<nav class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Brand -->
      <div in:fly={{ x: -20, duration: 600 }}>
        <a href="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">DS</span>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Django + Svelte
          </span>
        </a>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center space-x-8">
        <a 
          href="/" 
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors {currentPath === '/' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}"
        >
          Home
        </a>
        <a 
          href="/todo" 
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors {currentPath === '/todo' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}"
        >
          Todo App
        </a>
        <a 
          href="/docs" 
          class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Docs
        </a>
      </div>

      <!-- User Info / Actions -->
      <div in:fly={{ x: 20, duration: 600 }} class="flex items-center space-x-4">
        <!-- Theme Toggle -->
        <button
          on:click={theme.toggle}
          class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {#if $theme === 'dark'}
            <!-- Sun icon for light mode -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          {:else}
            <!-- Moon icon for dark mode -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          {/if}
        </button>

        {#if $user}
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <span class="text-white font-semibold text-sm">
                {$user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <span class="hidden sm:block text-sm text-gray-700 dark:text-gray-300">
              {$user.username}
            </span>
          </div>
        {:else}
          <a 
            href="/todo"
            class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Get Started
          </a>
        {/if}

        <!-- Mobile menu button -->
        <button 
          on:click={toggleMobileMenu}
          class="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {#if mobileMenuOpen}
            <!-- X icon when menu is open -->
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <!-- Hamburger icon when menu is closed -->
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Navigation (toggleable) -->
    {#if mobileMenuOpen}
      <div 
        class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
        transition:slide={{ duration: 300 }}
      >
        <div class="flex flex-col space-y-2">
          <a 
            href="/" 
            on:click={closeMobileMenu}
            class="px-3 py-2 rounded-md text-sm font-medium {currentPath === '/' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'} transition-colors"
          >
            Home
          </a>
          <a 
            href="/todo" 
            on:click={closeMobileMenu}
            class="px-3 py-2 rounded-md text-sm font-medium {currentPath === '/todo' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'} transition-colors"
          >
            Todo App
          </a>
          <a 
            href="/docs" 
            on:click={closeMobileMenu}
            class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Docs
          </a>
          
          <!-- Mobile theme toggle -->
          <div class="px-3 py-2 border-t border-gray-100 dark:border-gray-700 mt-2 pt-4">
            <button
              on:click={theme.toggle}
              class="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {#if $theme === 'dark'}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Light Mode</span>
              {:else}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Dark Mode</span>
              {/if}
            </button>
          </div>

          <!-- Mobile user actions -->
          {#if $user}
            <div class="px-3 py-2 border-t border-gray-100 dark:border-gray-700 mt-2 pt-4">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-semibold text-sm">
                    {$user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  {$user.username}
                </span>
              </div>
            </div>
          {:else}
            <div class="px-3 py-2 border-t border-gray-100 dark:border-gray-700 mt-2 pt-4">
              <a 
                href="/todo"
                on:click={closeMobileMenu}
                class="block text-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get Started
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</nav>