import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path';

const _ = (path:string) => resolve(__dirname, path);

// https://vitejs.dev/config/
export default defineConfig({
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
