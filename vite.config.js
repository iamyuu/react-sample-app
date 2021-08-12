import path from 'path'
import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '/src'),
    },
  },
  plugins: [reactRefresh()],
})
