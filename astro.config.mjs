// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import { unified } from '@astrojs/markdown-remark';

import rehypeParenthetical from './src/lib/rehype-parenthetical.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://bartmakehay.github.io',

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    processor: unified({ rehypePlugins: [rehypeParenthetical] })
  },

  integrations: [mdx()]
});