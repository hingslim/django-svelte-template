import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  kit: {
    adapter: adapter({
      pages: '../backend/static',
      assets: '../backend/static',
      fallback: null,
      precompress: false,
      strict: true
    }),
    alias: {
      '$lib': './src/lib'
    }
  },
  preprocess: vitePreprocess()
};