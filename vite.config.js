import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html'
    }
  },
  publicDir: 'public' // public 폴더가 빌드 시 그대로 포함되도록
})
