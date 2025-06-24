<script lang="ts">
  import { statusMessage } from '$lib/stores';
  import { fly } from 'svelte/transition';
</script>

{#if $statusMessage.show}
  <div 
    class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    in:fly={{ y: 100, duration: 500, opacity: 0 }}
    out:fly={{ y: 100, duration: 300, opacity: 0 }}
  >
    <div class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl text-sm font-semibold border border-green-400 backdrop-blur-sm">
      <span class="flex items-center gap-2">
        {$statusMessage.message}
      </span>
    </div>
  </div>
{/if}