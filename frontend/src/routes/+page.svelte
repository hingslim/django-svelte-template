<script lang="ts">
  import { user } from "$lib/stores";
  import { fly } from "svelte/transition";

  const features = [
    {
      icon: "🚀",
      title: "Modern Stack",
      description: "Django 5.2 backend with Svelte 5 frontend",
      tech: "Full-stack",
    },
    {
      icon: "🔐",
      title: "Authentication",
      description: "Session-based auth with CSRF protection",
      tech: "Security",
    },
    {
      icon: "📱",
      title: "Responsive UI",
      description: "Mobile-first design with Tailwind CSS",
      tech: "Frontend",
    },
    {
      icon: "🔄",
      title: "REST API",
      description: "Django REST Framework with proper serialization",
      tech: "Backend",
    },
    {
      icon: "⚡",
      title: "Hot Reload",
      description: "Instant development feedback with Vite",
      tech: "DevX",
    },
    {
      icon: "🐳",
      title: "Docker Ready",
      description: "Production deployment configuration included",
      tech: "DevOps",
    },
  ];

  const techStack = [
    { name: "Django 5.2", color: "bg-green-500", desc: "Backend Framework" },
    { name: "Svelte 5", color: "bg-orange-500", desc: "Reactive Frontend" },
    { name: "TypeScript", color: "bg-blue-500", desc: "Type Safety" },
    { name: "Tailwind", color: "bg-cyan-500", desc: "Utility CSS" },
    { name: "SQLite", color: "bg-gray-500", desc: "Database" },
    { name: "Vite", color: "bg-purple-500", desc: "Build Tool" },
  ];
</script>

<svelte:head>
  <title>Django + Svelte Template</title>
  <meta
    name="description"
    content="A modern full-stack template combining Django REST Framework with Svelte 5, featuring authentication, CRUD operations, and production-ready deployment."
  />
  <meta
    name="keywords"
    content="Django, Svelte, TypeScript, REST API, Full-stack, Template"
  />
</svelte:head>

<!-- Hero Section -->
<section
  class="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 transition-colors duration-200"
>
  <div class="container mx-auto px-4 text-center">
    <div in:fly={{ y: 30, duration: 800, delay: 200 }}>
      <h1
        class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
      >
        Django
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
        >
          meets
        </span>
        Svelte
      </h1>

      <p
        class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
      >
        A production-ready full-stack template combining the power of Django
        REST Framework with the elegance of Svelte 5. Build modern web
        applications with confidence.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="/todo"
          class="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Try Live Demo
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>

        <a
          href="https://github.com/hingslim/django-svelte-template"
          target="_blank"
          class="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clip-rule="evenodd"
            />
          </svg>
          View Source
        </a>
      </div>

      {#if $user}
        <div
          class="mt-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg inline-block"
        >
          <p class="text-green-700 dark:text-green-300">
            Welcome back, <strong>{$user.username}</strong>!
            <a href="/todo" class="underline hover:no-underline"
              >Go to your todos →</a
            >
          </p>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
  <div class="container mx-auto px-4">
    <div
      in:fly={{ y: 50, duration: 800, delay: 400 }}
      class="text-center mb-16"
    >
      <h2
        class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
      >
        Everything you need to build modern web apps
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        This template provides a solid foundation with best practices, security,
        and developer experience built-in.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature, index}
        <div
          in:fly={{ y: 30, duration: 600, delay: 600 + index * 100 }}
          class="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-500"
        >
          <div class="text-4xl mb-4">{feature.icon}</div>
          <div
            class="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2"
          >
            {feature.tech}
          </div>
          <h3
            class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          >
            {feature.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {feature.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Tech Stack Section -->
<section
  class="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
>
  <div class="container mx-auto px-4">
    <div
      in:fly={{ y: 30, duration: 800, delay: 1000 }}
      class="text-center mb-16"
    >
      <h3
        class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
      >
        Built with Modern Technologies
      </h3>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Carefully selected technologies that work together seamlessly for the
        best developer and user experience.
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {#each techStack as tech, index}
        <div
          in:fly={{ y: 20, duration: 500, delay: 1200 + index * 100 }}
          class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div
            class="w-12 h-12 {tech.color} rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold"
          >
            {tech.name.charAt(0)}
          </div>
          <div class="font-semibold text-gray-900 dark:text-white text-sm">
            {tech.name}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {tech.desc}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section
  class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700"
>
  <div class="container mx-auto px-4 text-center">
    <div in:fly={{ y: 30, duration: 800, delay: 1400 }}>
      <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">
        Ready to start building?
      </h3>
      <p
        class="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto"
      >
        Clone this template and have a production-ready Django + Svelte
        application running in minutes!
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/todo"
          class="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white dark:bg-gray-100 rounded-full hover:bg-gray-50 dark:hover:bg-gray-200 transition-colors duration-200 shadow-lg"
        >
          Try the Demo
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </a>

        <a
          href="https://github.com/hingslim/django-svelte-template"
          target="_blank"
          class="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-blue-600 dark:hover:text-blue-700 transition-colors duration-200"
        >
          Get Started
          <svg
            class="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
