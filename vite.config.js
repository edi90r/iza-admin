import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    // const env = loadEnv(mode, process.cwd(), "");
    return {
        define: {
            'process.env.API_KEY': JSON.stringify(env.API_KEY),
            'process.env.AUTH_DOMAIN': JSON.stringify(env.AUTH_DOMAIN),
            'process.env.PROJECT_ID': JSON.stringify(env.PROJECT_ID),
            'process.env.STORAGE_BUCKET': JSON.stringify(env.STORAGE_BUCKET),
            'process.env.MESSAGINNG_SENDER_ID': JSON.stringify(env.MESSAGINNG_SENDER_ID),
            'process.env.APP_ID': JSON.stringify(env.APP_ID),
        },
        plugins: [react(), svgr()],
    };
});
