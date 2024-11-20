import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path';

const _ = (path:string) => resolve(__dirname, path);

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '^/claude/.*': {
                target: 'https://api.anthropic.com',
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
            "@APP":        _("./src/Phantom"),
            "@ATP":        _("./src/ATP"    ),
            "@assets":     _("./src/assets" ),
            "@config":     _("./src/config" ),
            "@styles":     _("./src/styles" ),
        }
    }
})
