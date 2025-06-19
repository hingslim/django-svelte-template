<script lang="ts">
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import StatusNotification from '$lib/components/StatusNotification.svelte';
</script>

<Navigation />
<main class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
  <slot />
</main>
<StatusNotification />