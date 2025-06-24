<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { todoApi, type Todo } from '$lib/api';
  import { scale, fly } from 'svelte/transition';
  import { statusMessage } from '$lib/stores';

  export let todo: Todo;

  const dispatch = createEventDispatcher<{ 
    updated: Todo;
    deleted: number;
  }>();

  let isEditing = false;
  let editTitle = todo.title;
  let editDescription = todo.description;
  let editPriority = todo.priority;
  let editDueDate = todo.due_date ? new Date(todo.due_date).toISOString().slice(0, 16) : '';
  let editCategory = todo.category;
  let editTags = todo.tags;
  let isUpdating = false;
  let isDeleting = false;
  let showCelebration = false;
  let celebrationParticles: Array<{id: number, x: number, y: number, rotation: number, scale: number, color: string}> = [];

  const toggleCompleted = async () => {
    isUpdating = true;
    const wasCompleted = todo.completed;
    
    try {
      const response = await todoApi.updateTodo(todo.id, {
        completed: !todo.completed
      });
      dispatch('updated', response.data);
      
      // Trigger celebration animation when completing (not uncompleting)
      if (!wasCompleted && response.data.completed) {
        triggerCelebration();
      }
    } catch (error) {
      // Error updating todo - silently handle
    } finally {
      isUpdating = false;
    }
  };

  const triggerCelebration = () => {
    showCelebration = true;
    
    // Create more confetti particles with better distribution
    celebrationParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 45 + Math.random() * 10, // Center around the checkbox
      y: 45 + Math.random() * 10,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: ['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-pink-400', 'bg-purple-400', 'bg-orange-400'][i % 6]
    }));
    
    // Show status message at bottom of page
    statusMessage.set({
      message: '🎉 Awesome job! ✨',
      show: true
    });
    
    // Hide celebration after animation
    setTimeout(() => {
      showCelebration = false;
      celebrationParticles = [];
    }, 2000);
    
    // Hide status message after delay
    setTimeout(() => {
      statusMessage.set({
        message: '',
        show: false
      });
    }, 3000);
  };

  const startEdit = () => {
    isEditing = true;
    editTitle = todo.title;
    editDescription = todo.description;
    editPriority = todo.priority;
    editDueDate = todo.due_date ? new Date(todo.due_date).toISOString().slice(0, 16) : '';
    editCategory = todo.category;
    editTags = todo.tags;
  };

  const cancelEdit = () => {
    isEditing = false;
    editTitle = todo.title;
    editDescription = todo.description;
    editPriority = todo.priority;
    editDueDate = todo.due_date ? new Date(todo.due_date).toISOString().slice(0, 16) : '';
    editCategory = todo.category;
    editTags = todo.tags;
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;

    isUpdating = true;
    try {
      const response = await todoApi.updateTodo(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
        due_date: editDueDate || null,
        category: editCategory.trim(),
        tags: editTags.trim(),
      });
      dispatch('updated', response.data);
      isEditing = false;
    } catch (error) {
      // Error updating todo - silently handle
    } finally {
      isUpdating = false;
    }
  };

  const deleteTodo = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    isDeleting = true;
    try {
      await todoApi.deleteTodo(todo.id);
      dispatch('deleted', todo.id);
    } catch (error) {
      // Error deleting todo - silently handle
      isDeleting = false;
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  $: formattedDate = new Date(todo.created_at).toLocaleDateString();
  $: formattedDueDate = todo.due_date ? new Date(todo.due_date).toLocaleDateString() : null;
  $: priorityIcon = {
    low: '🟢',
    medium: '🟡', 
    high: '🟠',
    urgent: '🔴'
  }[todo.priority];
  $: priorityColor = {
    low: 'text-green-600 dark:text-green-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    high: 'text-orange-600 dark:text-orange-400',
    urgent: 'text-red-600 dark:text-red-400'
  }[todo.priority];
</script>

<div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200 {todo.completed ? 'opacity-75' : ''} overflow-hidden">
  <div class="flex items-start gap-3">
    <button
      on:click={toggleCompleted}
      disabled={isUpdating}
      class="mt-1 w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-blue-500 transition-colors {todo.completed ? 'bg-blue-500 border-blue-500' : ''}"
    >
      {#if todo.completed}
        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      {/if}
    </button>

    <div class="flex-1 min-w-0">
      {#if isEditing}
        <div class="space-y-3">
          <!-- Title -->
          <input
            type="text"
            bind:value={editTitle}
            on:keydown={handleKeydown}
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isUpdating}
            placeholder="Todo title"
          />
          
          <!-- Description -->
          <textarea
            bind:value={editDescription}
            on:keydown={handleKeydown}
            placeholder="Description"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-200"
            disabled={isUpdating}
          ></textarea>
          
          <!-- New fields in a grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <!-- Priority -->
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                bind:value={editPriority}
                disabled={isUpdating}
                class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🟠 High</option>
                <option value="urgent">🔴 Urgent</option>
              </select>
            </div>

            <!-- Due Date -->
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
              <input
                type="datetime-local"
                bind:value={editDueDate}
                disabled={isUpdating}
                class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>

            <!-- Category -->
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <input
                type="text"
                bind:value={editCategory}
                placeholder="e.g., Work"
                disabled={isUpdating}
                class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>

            <!-- Tags -->
            <div>
              <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
              <input
                type="text"
                bind:value={editTags}
                placeholder="urgent, meeting"
                disabled={isUpdating}
                class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
          
          <!-- Action buttons -->
          <div class="flex gap-2">
            <button
              on:click={saveEdit}
              disabled={isUpdating || !editTitle.trim()}
              class="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm px-3 py-1 rounded transition-colors"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button
              on:click={cancelEdit}
              disabled={isUpdating}
              class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white text-sm px-3 py-1 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      {:else}
        <div class="space-y-2">
          <!-- Title and Description -->
          <h3 class="font-medium text-gray-900 dark:text-white {todo.completed ? 'line-through' : ''}">{todo.title}</h3>
          {#if todo.description}
            <p class="text-gray-600 dark:text-gray-300 text-sm {todo.completed ? 'line-through' : ''}">{todo.description}</p>
          {/if}
          
          <!-- New fields display -->
          <div class="flex flex-wrap gap-3 text-xs">
            <!-- Priority -->
            <span class="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full {priorityColor}">
              {priorityIcon} {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
            
            <!-- Due Date -->
            {#if todo.due_date}
              <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                📅 {formattedDueDate}
              </span>
            {/if}
            
            <!-- Category -->
            {#if todo.category}
              <span class="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                📂 {todo.category}
              </span>
            {/if}
            
            <!-- Tags -->
            {#if todo.tags}
              <span class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                🏷️ {todo.tags}
              </span>
            {/if}
          </div>
          
          <!-- Created date -->
          <p class="text-xs text-gray-400 dark:text-gray-500">Created: {formattedDate}</p>
        </div>
      {/if}
    </div>

    {#if !isEditing}
      <div class="flex gap-1">
        <button
          on:click={startEdit}
          disabled={isUpdating}
          class="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 p-1 transition-colors"
          title="Edit"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          on:click={deleteTodo}
          disabled={isDeleting}
          class="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors"
          title="Delete"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    {/if}
  </div>

  <!-- Enhanced Celebration Animation -->
  {#if showCelebration}
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <!-- Multiple expanding rings for depth -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div 
          in:scale={{ duration: 1200, start: 0.2 }}
          class="absolute w-32 h-32 border-4 border-green-400 rounded-full opacity-30"
          style="animation: ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;"
        ></div>
        <div 
          in:scale={{ duration: 1000, delay: 100, start: 0.3 }}
          class="absolute w-24 h-24 border-3 border-green-500 rounded-full opacity-40"
          style="animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"
        ></div>
        <div 
          in:scale={{ duration: 800, delay: 200, start: 0.4 }}
          class="absolute w-16 h-16 border-2 border-green-600 rounded-full opacity-50"
          style="animation: ping 0.8s cubic-bezier(0, 0, 0.2, 1) infinite;"
        ></div>
      </div>
      
      <!-- Central success indicator with bouncy animation -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div 
          in:scale={{ 
            duration: 800, 
            delay: 150,
            start: 0.1,
            opacity: 0
          }}
          class="relative z-20 w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl transform"
          style="animation: bounce 0.8s ease-out;"
        >
          <svg 
            class="w-7 h-7 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="4" 
              d="M5 13l4 4L19 7"
              style="animation: checkmark-draw 0.6s ease-out 0.4s both;"
            />
          </svg>
        </div>
      </div>
      
      <!-- Enhanced confetti particles with physics -->
      {#each celebrationParticles as particle (particle.id)}
        <div 
          in:fly={{ 
            y: -120 - Math.random() * 100,
            x: (particle.x - 50) * (3 + Math.random() * 2),
            duration: 1400 + Math.random() * 600,
            delay: particle.id * 30,
            opacity: 0
          }}
          class="absolute {particle.color} rounded-full shadow-lg"
          style="
            left: {particle.x}%; 
            top: {particle.y}%; 
            width: {2 + particle.scale}px;
            height: {2 + particle.scale}px;
            transform: rotate({particle.rotation}deg);
            animation: particle-float {1.4 + Math.random() * 0.6}s ease-out {particle.id * 30}ms forwards;
          "
        ></div>
      {/each}
      
      <!-- Floating sparkles -->
      {#each Array(8) as _, i}
        <div 
          in:scale={{ 
            duration: 800, 
            delay: 300 + i * 100,
            start: 0
          }}
          class="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-80"
          style="
            left: {40 + Math.random() * 20}%; 
            top: {40 + Math.random() * 20}%;
            animation: sparkle {1 + Math.random() * 0.5}s ease-out {300 + i * 100}ms forwards;
          "
        ></div>
      {/each}
      
    </div>
  {/if}
</div>