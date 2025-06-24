import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { User, Todo } from './api';

export const user = writable<User | null>(null);
export const todos = writable<Todo[]>([]);
export const loading = writable(false);
export const error = writable<string | null>(null);

// Theme store with localStorage persistence
function createThemeStore() {
  const defaultTheme = 'light';
  const initialTheme = browser ? localStorage.getItem('theme') ?? defaultTheme : defaultTheme;
  
  const { subscribe, set, update } = writable<'light' | 'dark'>(initialTheme as 'light' | 'dark');

  return {
    subscribe,
    set: (value: 'light' | 'dark') => {
      if (browser) {
        localStorage.setItem('theme', value);
        // Apply theme to document root
        if (value === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      set(value);
    },
    toggle: () => {
      update(current => {
        const newTheme = current === 'light' ? 'dark' : 'light';
        if (browser) {
          localStorage.setItem('theme', newTheme);
          // Apply theme to document root
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return newTheme;
      });
    },
    init: () => {
      if (browser) {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme ?? (prefersDark ? 'dark' : 'light');
        
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set(theme);
      }
    }
  };
}

export const theme = createThemeStore();

// Status notification store
export const statusMessage = writable<{message: string, show: boolean}>({
  message: '',
  show: false
});