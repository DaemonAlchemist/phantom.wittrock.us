import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path';

const _ = (path:string) => resolve(__dirname, path);

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '^/claude/.*': {
                target: 'https://api.anthropic.com/v1',
                changeOrigin: true,
                rewrite: (path) => {
                    console.log(path);
                    return path.replace(/^\/claude/, '');
                },
                configure: (proxy, _options) => {
                    proxy.on('error', (err, _req, _res) => {
                      console.log('proxy error', err);
                    });
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                      console.log('Sending Request to the Target:', req.method, req.url);
                    });
                    proxy.on('proxyRes', (proxyRes, req, _res) => {
                      console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                    });
                  },
              },
        }
    },
    define: {
        'process.env': {},
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@assets":     _("./src/assets"),
            "@components": _("./src/components"),
            "@lib":        _("./src/lib"),
            "@plugins":    _("./src/plugins"),
            "@styles":     _("./src/styles"),
        }
    }
})
