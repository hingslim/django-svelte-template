<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { todoApi, type Todo } from '$lib/api';
  import { error } from '$lib/stores';

  const dispatch = createEventDispatcher<{ created: Todo }>();

  let title = '';
  let description = '';
  let priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium';
  let due_date = '';
  let category = '';
  let tags = '';
  let isSubmitting = false;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!title.trim()) {
      error.set('Title is required');
      return;
    }

    isSubmitting = true;
    error.set(null);

    try {
      const response = await todoApi.createTodo({
        title: title.trim(),
        description: description.trim(),
        priority,
        due_date: due_date || null,
        category: category.trim(),
        tags: tags.trim(),
      });

      dispatch('created', response.data);
      title = '';
      description = '';
      priority = 'medium';
      due_date = '';
      category = '';
      tags = '';
    } catch (err: any) {
      error.set('Failed to create todo');
      // Error creating todo - already displayed to user via error store
    } finally {
      isSubmitting = false;
    }
  };
</script>

<form on:submit={handleSubmit} class="space-y-4">
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="flex-1">
      <input
        type="text"
        bind:value={title}
        placeholder="What needs to be done?"
        disabled={isSubmitting}
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        required
      />
    </div>
    <button
      type="submit"
      disabled={isSubmitting || !title.trim()}
      class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
    >
      {isSubmitting ? 'Adding...' : 'Add Todo'}
    </button>
  </div>

  <div>
    <textarea
      bind:value={description}
      placeholder="Description (optional)"
      disabled={isSubmitting}
      rows="2"
      class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-200"
    ></textarea>
  </div>

  <!-- New fields section -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Priority -->
    <div>
      <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Priority
      </label>
      <select
        id="priority"
        bind:value={priority}
        disabled={isSubmitting}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      >
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🟠 High</option>
        <option value="urgent">🔴 Urgent</option>
      </select>
    </div>

    <!-- Due Date -->
    <div>
      <label for="due_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Due Date
      </label>
      <input
        type="datetime-local"
        id="due_date"
        bind:value={due_date}
        disabled={isSubmitting}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      />
    </div>

    <!-- Category -->
    <div>
      <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Category
      </label>
      <input
        type="text"
        id="category"
        bind:value={category}
        placeholder="e.g., Work, Personal"
        disabled={isSubmitting}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      />
    </div>

    <!-- Tags -->
    <div>
      <label for="tags" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Tags
      </label>
      <input
        type="text"
        id="tags"
        bind:value={tags}
        placeholder="urgent, meeting, project"
        disabled={isSubmitting}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      />
    </div>
  </div>
</form>