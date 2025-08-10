/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  modules: {
      // Your existing CSS Modules configuration
    },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setUpTests.ts'],
    // projects: [
    //   // you can use a list of glob patterns to define your projects
    //   // Vitest expects a list of config files
    //   // or directories where there is a config file
    //   'packages/*',
    //   'tests/*/vitest.config.{e2e,unit}.ts',
    //   // you can even run the same tests,
    //   // but with different configs in the same "vitest" process
    //   {
    //     test: {
    //       name: 'happy-dom',
    //       root: './shared_tests',
    //       environment: 'happy-dom',
    //       setupFiles: ['./setup.happy-dom.ts'],
    //     },
    //   },
    //   {
    //     test: {
    //       name: 'node',
    //       root: './shared_tests',
    //       environment: 'node',
    //       setupFiles: ['./setup.node.ts'],
    //     },
    //   },
    // ],
  },
})
