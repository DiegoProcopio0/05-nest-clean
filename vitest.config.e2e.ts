import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vitest-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
    exclude: ['data'],
  },
  plugins: [
    tsConfigPaths({ projects: ['tsconfig.json'] }),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
