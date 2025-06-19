<script lang="ts">
  import { fly } from 'svelte/transition';
  
  let activeSection = 'overview';
  
  function scrollToSection(sectionId: string) {
    activeSection = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<svelte:head>
  <title>Documentation - Django Svelte Template</title>
  <meta name="description" content="Complete documentation for the Django Svelte template - setup, API reference, deployment, and best practices." />
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
  <!-- Navigation -->
  <nav class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-200">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Documentation</h1>
        <a href="/" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">← Back to App</a>
      </div>
    </div>
  </nav>

  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <div class="flex gap-8">
      <!-- Sidebar -->
      <aside class="w-64 sticky top-24 h-fit">
        <nav class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
          <h2 class="font-semibold text-gray-900 dark:text-white mb-4">Contents</h2>
          <ul class="space-y-2 text-sm">
            {#each [
              { id: 'overview', title: 'Overview' },
              { id: 'tech-stack', title: 'Tech Stack' },
              { id: 'quick-start', title: 'Quick Start' },
              { id: 'api-reference', title: 'API Reference' },
              { id: 'frontend-guide', title: 'Frontend Guide' },
              { id: 'deployment', title: 'Deployment' },
              { id: 'best-practices', title: 'Best Practices' }
            ] as section}
              <li>
                <button
                  on:click={() => scrollToSection(section.id)}
                  class="text-left w-full px-3 py-2 rounded-md transition-colors {activeSection === section.id ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'}"
                >
                  {section.title}
                </button>
              </li>
            {/each}
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-colors duration-200">
        <div class="p-8 prose prose-lg dark:prose-invert max-w-none">
          
          <!-- Overview Section -->
          <section id="overview" in:fly={{ y: 20, duration: 600 }}>
            <h1>Django + Svelte Template</h1>
            
            <div class="not-prose bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-4 mb-6">
              <p class="text-blue-800 dark:text-blue-200">
                <strong>Production-ready full-stack template</strong> combining Django 5.2.3 with Svelte 5, 
                featuring authentication, CRUD operations, and modern development tools.
              </p>
            </div>

            <h2>Features</h2>
            <div class="not-prose grid md:grid-cols-2 gap-4 mb-6">
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                <h3 class="text-green-800 dark:text-green-200 font-semibold mb-2">🏗️ Backend</h3>
                <ul class="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Django 5.2.3</li>
                  <li>• Django REST Framework</li>
                  <li>• Session-based authentication</li>
                  <li>• CSRF protection</li>
                  <li>• SQLite database</li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                <h3 class="text-purple-800 dark:text-purple-200 font-semibold mb-2">🎨 Frontend</h3>
                <ul class="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Svelte 5 with runes</li>
                  <li>• SvelteKit framework</li>
                  <li>• TypeScript support</li>
                  <li>• Tailwind CSS</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Tech Stack Section -->
          <section id="tech-stack">
            <h2>Tech Stack</h2>
            
            <div class="not-prose grid md:grid-cols-3 gap-6 mb-6">
              <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="text-2xl mb-2">🐍</div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Backend</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">Django 5.2.3<br/>Python 3.12<br/>REST Framework</p>
              </div>
              <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="text-2xl mb-2">⚡</div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Frontend</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">Svelte 5<br/>TypeScript<br/>Tailwind CSS</p>
              </div>
              <div class="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="text-2xl mb-2">🔧</div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Tools</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">Vite<br/>Docker<br/>npm scripts</p>
              </div>
            </div>
          </section>

          <!-- Quick Start Section -->
          <section id="quick-start">
            <h2>Quick Start</h2>
            
            <pre class="not-prose bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm"><code># 1. Install dependencies
npm run setup

# 2. Run migrations
npm run migrate

# 3. Create superuser
npm run createsuperuser

# 4. Start development servers
npm run dev</code></pre>

            <div class="not-prose bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500 p-4 mb-6">
              <p class="text-amber-800 dark:text-amber-200">
                <strong>Requirements:</strong> Python 3.10+ (3.12 recommended), Node.js 18+
              </p>
            </div>

            <h3>Development URLs</h3>
            <ul>
              <li><strong>Frontend:</strong> <a href="http://localhost:5173">http://localhost:5173</a></li>
              <li><strong>Backend API:</strong> <a href="http://localhost:8000/api">http://localhost:8000/api</a></li>
              <li><strong>Django Admin:</strong> <a href="http://localhost:8000/admin">http://localhost:8000/admin</a></li>
            </ul>
          </section>

          <!-- API Reference Section -->
          <section id="api-reference">
            <h2>API Reference</h2>
            
            <div class="space-y-6">
              <div>
                <h3>Authentication Endpoints</h3>
                <div class="not-prose bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                  <table class="w-full text-sm min-w-full">
                    <thead>
                      <tr class="text-left border-b border-gray-200 dark:border-gray-600">
                        <th class="pb-2 font-medium text-gray-900 dark:text-white">Method</th>
                        <th class="pb-2 font-medium text-gray-900 dark:text-white">Endpoint</th>
                        <th class="pb-2 font-medium text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                      <tr>
                        <td class="py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span></td>
                        <td class="py-2 font-mono text-gray-900 dark:text-gray-300">/api/login/</td>
                        <td class="py-2 text-gray-700 dark:text-gray-300">User login</td>
                      </tr>
                      <tr>
                        <td class="py-2"><span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono">POST</span></td>
                        <td class="py-2 font-mono text-gray-900 dark:text-gray-300">/api/logout/</td>
                        <td class="py-2 text-gray-700 dark:text-gray-300">User logout</td>
                      </tr>
                      <tr>
                        <td class="py-2"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">GET</span></td>
                        <td class="py-2 font-mono text-gray-900 dark:text-gray-300">/api/user/</td>
                        <td class="py-2 text-gray-700 dark:text-gray-300">Get current user info</td>
                      </tr>
                      <tr>
                        <td class="py-2"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">GET</span></td>
                        <td class="py-2 font-mono text-gray-900 dark:text-gray-300">/api/csrf/</td>
                        <td class="py-2 text-gray-700 dark:text-gray-300">Get CSRF token</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3>Todo Endpoints</h3>
                <div class="not-prose bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
                  <table class="w-full text-sm min-w-full">
                    <thead>
                      <tr class="text-left border-b border-gray-200 dark:border-gray-600">
                        <th class="pb-2 font-medium text-gray-900 dark:text-white">Method</th>
                        <th class="pb-2 font-medium text-gray-900 dark:text-white">Endpoint</th>
                        <th class="pb-2 font-medium text-gray-900 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                      <tr>
                        <td class="py-2"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">GET</span></td>
                        <td class="py-2 font-mono text-gray-900 dark:text-gray-300">/api/todos/</td>
                        <td class="py-2 text-gray-700 dark:text-gray-300">List user's todos</td>
                      </tr>
                      <tr>
                        <td class="py-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">POST</span></td>
                        <td class="py-2 font-mono">/api/todos/</td>
                        <td class="py-2 text-gray-700 dark:text-gray-300">Create new todo</td>
                      </tr>
                      <tr>
                        <td class="py-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">PATCH</span></td>
                        <td class="py-2 font-mono text-gray-900 dark:text-gray-300">/api/todos/&#123;id&#125;/</td>
                        <td class="py-2 text-gray-700 dark:text-gray-300">Update todo</td>
                      </tr>
                      <tr>
                        <td class="py-2"><span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-mono">DELETE</span></td>
                        <td class="py-2 font-mono">/api/todos/&#123;id&#125;/</td>
                        <td class="py-2 text-gray-700 dark:text-gray-300">Delete todo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <!-- Frontend Guide Section -->
          <section id="frontend-guide">
            <h2>Frontend Guide</h2>
            
            <h3>Project Structure</h3>
            <pre class="not-prose bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto text-sm"><code>frontend/
├── src/
│   ├── routes/           # SvelteKit pages
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   └── docs/
│   ├── lib/
│   │   ├── components/   # Reusable components
│   │   ├── stores.ts     # Global state
│   │   └── api.ts        # API client
│   └── app.css          # Global styles
├── package.json
└── vite.config.js       # Build configuration</code></pre>

            <h3>Key Components</h3>
            <div class="not-prose grid md:grid-cols-2 gap-4 mb-6">
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">State Management</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Uses Svelte stores for global state management (user, todos, UI state)</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 dark:text-white mb-2">API Client</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">Centralized HTTP client with CSRF token handling and error management</p>
              </div>
            </div>
          </section>

          <!-- Deployment Section -->
          <section id="deployment">
            <h2>Deployment</h2>
            
            <h3>Production Build</h3>
            <pre class="not-prose bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto text-sm"><code># Build frontend
npm run build

# Collect static files
npm run collectstatic

# Set environment variables
export DEBUG=False
export SECRET_KEY=your-secret-key
export ALLOWED_HOSTS=yourdomain.com</code></pre>

            <h3>Docker Deployment</h3>
            <pre class="not-prose bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto text-sm"><code># Development
docker-compose up

# Production
docker-compose -f docker-compose.prod.yml up</code></pre>
          </section>

          <!-- Best Practices Section -->
          <section id="best-practices">
            <h2>Best Practices</h2>
            
            <h3>Security</h3>
            <ul>
              <li>Always use HTTPS in production</li>
              <li>Set strong SECRET_KEY in production</li>
              <li>Configure proper ALLOWED_HOSTS</li>
              <li>Use environment variables for sensitive data</li>
              <li>Implement proper user permissions</li>
            </ul>

            <h3>Performance</h3>
            <ul>
              <li>Use database indexes for frequently queried fields</li>
              <li>Implement pagination for large datasets</li>
              <li>Optimize images and static assets</li>
              <li>Use CDN for static file delivery</li>
              <li>Enable gzip compression</li>
            </ul>

            <h3>Development</h3>
            <ul>
              <li>Use virtual environments for Python dependencies</li>
              <li>Keep requirements.txt updated</li>
              <li>Write tests for critical functionality</li>
              <li>Use TypeScript for better development experience</li>
              <li>Follow consistent code formatting</li>
            </ul>
          </section>

          <!-- Footer -->
          <footer class="not-prose mt-16 pt-8 border-t border-gray-200 dark:border-gray-600">
            <div class="text-center text-gray-600 dark:text-gray-300">
              <p class="mb-4">
                Built with ❤️ using Django 5.2.3 and Svelte 5
              </p>
              <div class="flex justify-center space-x-6 text-sm">
                <a href="https://docs.djangoproject.com/" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Django Docs</a>
                <a href="https://svelte.dev/docs" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Svelte Docs</a>
                <a href="https://kit.svelte.dev/docs" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">SvelteKit Docs</a>
                <a href="https://tailwindcss.com/docs" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Tailwind Docs</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  </div>
</div>

<style>
  /* Ensure smooth scrolling */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>