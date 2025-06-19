<script lang="ts">
  import { onMount } from 'svelte';
  import { user } from '$lib/stores';
  import { authApi } from '$lib/api';
  import LoginForm from '$lib/components/LoginForm.svelte';

  let authChecked = false;
  let isLoading = true;

  onMount(async () => {
    if (authChecked) return;
    
    try {
      const response = await authApi.getUserInfo();
      user.set(response.data);
    } catch (error) {
      user.set(null);
    }
    
    authChecked = true;
    isLoading = false;
  });
</script>

{#if isLoading}
  <div class="min-h-screen flex items-center justify-center">
    <div class="animate-pulse text-gray-500">Loading...</div>
  </div>
{:else if $user}
  <!-- User is authenticated, show the todo app -->
  <slot />
{:else}
  <!-- User not authenticated, show inline login form -->
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
    <LoginForm />
  </div>
{/if}