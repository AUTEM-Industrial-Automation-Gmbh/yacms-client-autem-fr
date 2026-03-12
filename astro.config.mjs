import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    site: 'https://zestones.github.io',
    base: '/yacms-client-autem',
    integrations: [react(), sitemap()],
    build: {
        inlineStylesheets: 'always',
        compressHTML: true
    },
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'zod-to-json-schema': path.resolve(__dirname, './src/stubs/zod-to-json-schema.ts'),
            },
        },
        css: {
            transformer: 'postcss',
        },
        server: {
            host: true,
            watch: {
                ignored: ['**/yablocks/**']
            }
        }
    },
});