import viteConfig from './vite.config'
import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'

export default mergeConfig(viteConfig, defineConfig(
  {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',      
      reporters: ['verbose', 'json'], 
      outputFile: './test-output.json', 
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
      threads: false,
      browser: {
        enabled: true,
        name: 'chrome'
      },
      deps: {
        inline: ['@testing-library/jest-dom'],
      },
    }
  }
)) 

