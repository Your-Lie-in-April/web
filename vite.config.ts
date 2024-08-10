import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: [
            { find: '@', replacement: '/src' },
            {
                find: '@fontsource',
                replacement: path.resolve(__dirname, 'node_modules/@fontsource'),
            },
        ],
    },
});
